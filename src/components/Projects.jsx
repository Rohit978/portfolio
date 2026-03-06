import React, { useEffect, useState } from 'react';

export default function Projects() {
    const [tessOutput, setTessOutput] = useState('');
    const fullText = `> tess play him and i
[TESS-OS] Intent: MEDIA_PLAY
[TESS-OS] Launching Headless Chrome...
[TESS-OS] ▶ Playing: G-Eazy & Halsey - Him & I

> tess create pdf about quantum computing
[TESS-OS] Researching...
[TESS-OS] Generating PDF...
[SUCCESS] Saved to /workspace/quantum.pdf`;

    useEffect(() => {
        let currentText = '';
        let i = 0;

        const typeChar = () => {
            if (i < fullText.length) {
                currentText += fullText.charAt(i);
                setTessOutput(currentText);
                i++;
                setTimeout(typeChar, Math.random() * 50 + 20); // Random typing speed
            } else {
                setTimeout(() => {
                    currentText = '';
                    i = 0;
                    setTessOutput('');
                    typeChar();
                }, 5000); // Loop after 5s
            }
        };

        const timeout = setTimeout(typeChar, 1000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <section id="projects">
            <div className="container">
                <div className="section-label gsap-reveal">// projects</div>
                <h2 className="section-title gsap-reveal">Things I've built<br />that actually work.</h2>
                <div className="projects-grid" style={{ marginTop: '3rem' }}>

                    {/* Featured Project: TESS Terminal Pro */}
                    <div className="project-card gsap-reveal" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                            <div className="proj-index" style={{ fontSize: '3rem' }}>01</div>
                            <div style={{ flex: '1 1 300px' }}>
                                <div className="proj-label" style={{ color: '#00ff88' }}>// FEATURED PROJECT</div>
                                <div className="proj-name" style={{ fontSize: '2rem', marginBottom: '1rem' }}>TESS Terminal Pro v5.1</div>
                                <p className="proj-desc" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                                    The AI Operating System that lives entirely in your terminal. TESS is a hybrid agent capable of controlling your OS, managing files, automating headless browser tasks (like playing YouTube ad-free), generating PDFs, and automating WhatsApp conversations with interchangeable personas. Features built-in context persistence, sandboxed workspaces, and automatic API key rotation to bypass rate limits.
                                </p>
                                <div className="proj-tags" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                                    <span className="tag">Python</span>
                                    <span className="tag">Playwright</span>
                                    <span className="tag">LLM Agents</span>
                                    <span className="tag">OS Automation</span>
                                    <span className="tag">Chromium</span>
                                </div>
                                <div className="proj-stats" style={{ flexDirection: 'row', gap: '1.5rem', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                    <span className="status-badge badge-shipped">V5.1 LIVE</span>

                                    {/* Download Command */}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        background: 'rgba(0,0,0,0.3)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '4px',
                                        padding: '4px 12px',
                                        fontFamily: '"Share Tech Mono", monospace',
                                        fontSize: '0.85rem',
                                        color: '#00ff88'
                                    }}>
                                        <span style={{ color: 'rgba(255,255,255,0.5)', marginRight: '8px' }}>$&gt;</span>
                                        pip install git+https://github.com/Rohit978/tess.git
                                    </div>

                                    <div className="proj-stat">Core: <span>Hybrid AI</span></div>
                                    <div className="proj-stat">Latency: <span>&lt;200ms</span></div>
                                </div>
                            </div>

                            {/* Terminal Visual Hook */}
                            <div style={{
                                flex: '1 1 400px',
                                background: 'rgba(0,10,5,0.8)',
                                border: '1px solid rgba(0,255,136,0.2)',
                                borderRadius: '8px',
                                padding: '1.5rem',
                                fontFamily: '"Share Tech Mono", monospace',
                                fontSize: '0.85rem',
                                color: 'rgba(255,255,255,0.7)',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,255,136,0.05)',
                                display: 'flex',
                                flexDirection: 'column',
                                overflow: 'hidden'
                            }}>
                                <div style={{ display: 'flex', gap: '6px', marginBottom: '1rem' }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }}></div>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }}></div>
                                </div>
                                <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                                    {tessOutput}
                                    <span style={{
                                        display: 'inline-block',
                                        width: '8px',
                                        height: '15px',
                                        background: '#00ff88',
                                        marginLeft: '4px',
                                        verticalAlign: 'middle',
                                        animation: 'blink 1s step-end infinite'
                                    }}></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="project-card gsap-reveal" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                            <div className="proj-index" style={{ fontSize: '3rem' }}>02</div>
                            <div style={{ flex: '1 1 300px' }}>
                                <div className="proj-label" style={{ color: '#00ff88' }}>// FEATURED PROJECT</div>
                                <div className="proj-name" style={{ fontSize: '2rem', marginBottom: '1rem' }}>POTATO Browser</div>
                                <p className="proj-desc" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                                    A modern, electron-based web browser built from the ground up prioritizing absolute privacy and local AI. POTATO features a built-in ad + tracker blocker, "Zen Mode" for focused reading, and is integrated with agentic browsing using TESS entirely on your machine without cloud dependencies.
                                </p>
                                <div className="proj-tags" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                                    <span className="tag">Electron</span>
                                    <span className="tag">Node.js</span>
                                    <span className="tag">Ollama AI</span>
                                    <span className="tag">Privacy</span>
                                </div>
                                <div className="proj-stats" style={{ flexDirection: 'row', gap: '1.5rem', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                    <span className="status-badge badge-shipped">RELEASED</span>

                                    {/* Download Command */}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        background: 'rgba(0,0,0,0.3)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '4px',
                                        padding: '4px 12px',
                                        fontFamily: '"Share Tech Mono", monospace',
                                        fontSize: '0.85rem',
                                        color: '#00ff88'
                                    }}>
                                        <span style={{ color: 'rgba(255,255,255,0.5)', marginRight: '8px' }}>$&gt;</span>
                                        winget install Potato.Browser
                                    </div>
                                </div>
                            </div>

                            {/* Visual Hook */}
                            <div style={{
                                flex: '1 1 400px',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <img
                                    src="/image.png"
                                    alt="POTATO Browser Interface"
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        objectFit: 'cover',
                                        borderRadius: '12px',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                                        border: '1px solid rgba(255,255,255,0.1)'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="project-card gsap-reveal">
                        <div className="proj-index">03</div>
                        <div>
                            <div className="proj-label">// ACTIVE — in training</div>
                            <div className="proj-name">TESS — 152M Language Model</div>
                            <p className="proj-desc">A 152 million parameter language model trained from scratch through 7 progressive stages: pre-training, instruction tuning, reasoning, conversational fine-tuning, and tool-use routing. Full pipeline — tokenizer, architecture, data preprocessing, training loop, evaluation harness.</p>
                            <div className="proj-tags">
                                <span className="tag">PyTorch</span>
                                <span className="tag">CUDA</span>
                                <span className="tag">Transformers</span>
                                <span className="tag">RoPE</span>
                                <span className="tag">Flash Attention</span>
                                <span className="tag">BPE</span>
                            </div>
                        </div>
                        <div className="proj-stats">
                            <span className="status-badge badge-active">TRAINING</span>
                            <div className="proj-stat">Params: <span>152M</span></div>
                            <div className="proj-stat">Arch: <span>decoder-only</span></div>
                            <div className="proj-stat">Loss: <span>↓ converging</span></div>
                        </div>
                    </div>

                </div>
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes blink { 50% { opacity: 0; } }
            `}} />
        </section >
    );
}
