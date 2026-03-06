export const blogs = [
    {
        id: "tess-training-issues",
        title: "TESS 152M Training Pipeline: Issues & Solutions Log",
        excerpt: "A brutally honest look at the major obstacles encountered while training a 152M parameter LLM from scratch, including reasoning collapse, identity dilution, and catastrophic forgetting—and the architectural pivots required to solve them.",
        date: "2026-03-07",
        tags: ["PyTorch", "LLM Training", "TESS", "Research"],
        readTime: "8 min read",
        content: `
# TESS Training Pipeline: Issues & Solutions Log

This document records the major obstacles encountered while training the TESS 150M model and the architectural or pipeline solutions implemented to resolve them.

---

### 1. The "Reasoning Collapse" (Repetition Loops)
* **The Issue:** When explicitly trained on complex reasoning datasets (MathQA, ARC, step-by-step logic), the 150M model collapsed. It either generated infinite repetition loops (e.g., \`x = 3 apples. x = 3 apples...\`) or outputted nonsensical logic. The model's parameter count is simply too small to robustly maintain internal multi-step reasoning states.
* **The Solution:** **Pivoted the core strategy.** Instead of forcing inward reasoning, we rebuilt TESS to act as a conversational router. It now relies on delegating complex tasks (math, searches, code execution) to external tools via tags (\`[CALCULATE]\`, \`[SEARCH]\`, \`[CODE]\`), leveraging its strength in pattern matching rather than deep logic.

### 2. Conversational Data Over-Complication
* **The Issue:** Standard instruction-tuning datasets (like Dolly or OpenAssistant) contain long-form essays, math equations, code blocks, and numbered step-by-step lists. Training on these caused the model to randomly output \`Step 1:\` without knowing how to finish the list, polluting conversations.
* **The Solution:** Implemented a strict \`has_bad_patterns()\` content filter in Stage 5. It outright rejects any training example containing \`Step 1/2...\`, math operators, coding keywords (\`def\`, \`for\`, \`\`\`\`), or excessive bullet points. We also hard-capped all responses to ≤150 words.

### 3. Masking Pre-training Hallucinations (Stage 5 LR)
* **The Issue:** Even after generating the Stage 5 conversational dataset, the model hallucinated being a "neuro-symbolic AI model" when asked its identity. It was clinging to data from its Stage 3/4 pre-training because the learning rate was too gentle.
* **The Solution:** Raised Stage 5's \`PEAK_LR\` from a conservative \`5e-6\` to a standard Supervised Fine-Tuning (SFT) rate of \`5e-5\`. This commanded the optimizer to aggressively map the new conversational and identity behaviors over the pre-training weights. 

### 4. Deterministic Generation Loops
* **The Issue:** Even with healthy weights, the \`generate()\` testing functions would occasionally fall into stuttering loops like *"I'm glad I had a joke, but I'm glad I could help."* This occurred because standard multinomial sampling allowed the model to pick low-probability tokens from the long "noise tail" of the vocabulary, permanently disrupting the context window.
* **The Solution:** Added strict \`top_k=50\` filtering to all generation loops across all scripts. This forces the model to only sample from the top 50 most likely tokens, cleanly severing the noise tail.

### 5. False Positives in Content Filtering
* **The Issue:** The initial math filter regex (\`\\d+\\s*[+\\-*/=]\\s*\\d+\`) was too aggressive. It accidentally rejected perfectly fine conversational lines like *"There are 8 planets"* if an \`=\` sign appeared anywhere else in the text, or *"Created in 2024"* if preceded by a hyphen.
* **The Solution:** Tightened the Regex to require a full equation structure: \`\\d+\\s*[+\\-*/]\\s*\\d+\\s*=\\s*\\d+\` (e.g., \`a + b = c\`), protecting standard conversational sentences.

### 6. Uneven Identity Sampling
* **The Issue:** When inserting 50 identity reinforcement questions into the dataset, using \`random.choice(identity_pairs)\` meant some questions were trained heavily by chance, while others were ignored entirely.
* **The Solution:** Shifted to deterministic modulo sampling (\`identity_pairs[i % len(identity_pairs)]\`) to guarantee a perfectly even distribution of all identity behaviors.

### 7. Stage 6 Architecture Mismatch
* **The Issue:** The \`train_stage6_tools.py\` script was written at a different time and used a slightly different \`TESS\` class definition (returning tuples instead of dicts, featuring an extra dropout layer). This completely broke checkpoint loading from Stage 5.
* **The Solution:** Replaced the entire architecture block in Stage 6 to perfectly mirror Stage 5, ensuring a seamless 1:1 weight transfer.

### 8. Tool Trigger Overfitting (Imbalanced Routing)
* **The Issue:** In Stage 6, the dataset only contained ~24% direct conversational responses (\`[NONE]\`). Furthermore, the model was training for 8 epochs on a tiny dataset. This caused TESS to over-trigger tool usage, trying to \`[SEARCH]\` for basic greetings.
* **The Solution:** Added 35 handcrafted conversational examples (greetings, empathy, opinions) to push the \`[NONE]\` ratio up to a healthy ~30%. Also reduced the epoch count from 8 to 5 to prevent overfitting. (Additionally, fixed a bug where the injection loop was accidentally adding these extra \`[NONE]\` examples twice).

### 9. Missing Tool Result Integration Layer
* **The Issue:** Stage 6 successfully taught TESS to output \`[CALCULATE] 15*17\`. However, once the backend evaluated that and fed back \`255\`, TESS had absolutely no training on how to respond to a raw number injected into its prompt.
* **The Solution:** Created an entirely new training phase, **Stage 7 (\`train_stage7_tool_response.py\`)**. This stage explicitly feeds TESS prompts like \`[TOOL_RESULT] 255\` and teaches it to generate natural wrap-ups like *"15 times 17 is 255!"* It also includes examples of graceful error handling (e.g., *"Sorry, my search failed."*).

### 10. Hardcoded Accelerator Crashes
* **The Issue:** Running the scripts on a standard CPU runtime resulted in hard crashes (\`AssertionError: Torch not compiled with CUDA enabled\`) because all tensor pushes were hardcoded to \`.cuda()\`.
* **The Solution:** Abstracted device assignment to \`device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')\` across all scripts. The scripts now detect the environment and issue a clear, readable warning if a GPU must be enabled in the Kaggle/Colab settings.

### 11. Identity Dilution & Response Degradation
* **The Issue:** In Stage 5, the model learned its identity but would occasionally pivot into OpenAssistant personas (e.g., *"I'm TESS, a doctor"*). Furthermore, longer responses often degraded into repetition. This occurred because the 50 identity examples were massively diluted (~2% concentration) against 2,500 conversational datasets, and the 150-word cap was still beyond the 150M model's coherence threshold.
* **The Solution:** Heavily upsampled identity examples from 50 to 400 loops (and basic facts from 30 to 200) to ensure a strong imprint. Lowered \`MAX_RESPONSE_WORDS\` from 150 to an ultra-strict 60 words, forcing the model to exclusively mimic punchy, tightly coherent responses.

### 12. Stage 6 Routing Failure (LR too low)
* **The Issue:** After running Stage 6, the model learned the \`[TAG]\` bracket formatting, but fundamentally failed to distinguish *when* to use which tag (scoring 4/10 on the test set, defaulting heavily to \`[SEARCH]\`). The \`PEAK_LR\` was set to \`5e-6\`.

### 13. Stage 7 Catastrophic Forgetting (Loss of Conversation/Identity)
* **The Issue:** Training Stage 7 successfully taught the model to wrap \`[TOOL_RESULT]\` outputs into natural language. However, it completely destroyed the model's ability to hold a regular conversation or remember its identity (hallucinating things like "I was trained on a large scale, 10,000 km/h").
* **The Cause:** The Stage 7 dataset consisted *exclusively* of \`[TOOL_RESULT]\` examples (Math, Search, Code, Errors). There were zero standard conversational examples. Because the 150M model has a very limited parameter space, training it exclusively on the \`[TOOL_RESULT]\` syntax for 8 epochs overwrote the conversational weights learned in Stage 5.
* **The Solution:** Injected a \`conv_examples\` dataset containing standard greetings, identity questions, and small talk into the Stage 7 generation script. Upsampled these examples by 8x to act as a powerful anchor. Kept the learning rate at a gentle \`5e-6\` to weave the new tool-wrapping logic cleanly into the existing conversational matrix.

### 14. Stage 7 Code Formatting Hallucinations (Capacity Limits)
* **The Issue:** While Stage 7 successfully learned to wrap Math and Search results, and maintained its conversational identity, it completely hallucinated responses for \`[CODE]\` results ("Sorry, I couldn't get the advice"). 
* **The Cause:** A 150M parameter model simply does not have the capacity to reliably format complex multi-line python code mappings while simultaneously maintaining its conversational and identity weights. We pushed the model too hard.
* **The Solution:** We completely removed the \`[CODE]\` result formatting expectations from the \`train_stage7_tool_response.py\` dataset. We are shifting the architecture so that the model only acts as a conversational wrapper for simple data (Math, Search, Errors), while allowing the hardware runtime script to handle complex \`[CODE]\` execution silently. We upsampled \`[ERROR]\` examples to 16x to ensure graceful failure scenarios are heavily reinforced.
`
    },
    {
        id: "tess-terminal-pro",
        title: "Building TESS Terminal Pro: The AI Operating System",
        excerpt: "An architectural deep-dive into how I built a headless browser agent inside the terminal, allowing a local AI to intercept intents, bypass YouTube ads, and orchestrate complex OS-level commands automatically.",
        date: "Coming Soon",
        tags: ["Python", "Playwright", "Agentic AI", "CLI"],
        readTime: "5 min read",
        content: `
# Building TESS Terminal Pro

*This blog post is currently being written. Check back later for a comprehensive breakdown of the TESS Terminal Pro architecture, the playwright headless browser automation strategies, and the LLM intent routing mechanisms.*
`
    },
    {
        id: "potato-browser",
        title: "POTATO Browser: Why I Built a Privacy-First Electron App",
        excerpt: "Exploring the technical decisions behind building a custom Chromium-based browser focused strictly on privacy, tracker-blocking, and seamless integration with the local Ollama AI ecosystem.",
        date: "Coming Soon",
        tags: ["Electron", "Node.js", "Ollama", "Privacy"],
        readTime: "4 min read",
        content: `
# POTATO Browser Architecture

*This blog post is currently being written. Check back later for details on compiling Chromium, writing strict network interception rules in Electron, and embedding local LLM inference engines directly into the browser shell.*
`
    }
];
