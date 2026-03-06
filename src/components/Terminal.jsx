import React, { useState, useRef, useEffect } from 'react';
import TessModal from './TessModal';
import { Bot } from 'lucide-react';

export default function Terminal() {
    const [inputVal, setInputVal] = useState('');
    const [isTessOpen, setIsTessOpen] = useState(false);

    // Command Execution State
    const [history, setHistory] = useState([
        { type: 'output', text: 'TESS-OS Terminal v2.4.1 — type help to see available commands.' }
    ]);
    const [commandHistory, setCommandHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);

    const bodyRef = useRef(null);
    const inputRef = useRef(null);

    // Auto-scroll to bottom on new history
    useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
        }
    }, [history]);

    const executeCommand = (cmd) => {
        const trimmedCmd = cmd.trim();
        if (!trimmedCmd) return;

        // Add to history
        setCommandHistory(prev => [...prev, trimmedCmd]);
        setHistoryIndex(-1);

        // Echo command
        const newHistory = [...history, { type: 'input', text: `rohit@tess-os:~$ ${trimmedCmd}` }];

        const lowerCmd = trimmedCmd.toLowerCase();

        switch (lowerCmd) {
            case 'help':
                newHistory.push({ type: 'output', text: 'Available commands:' });
                newHistory.push({ type: 'output', text: '  tess           - Launch the TESS 152M intelligence platform' });
                newHistory.push({ type: 'output', text: '  tess-pro       - Run the Terminal Automation showcase demo' });
                newHistory.push({ type: 'output', text: '  neofetch       - Display system information' });
                newHistory.push({ type: 'output', text: '  status         - View TESS-OS system status' });
                newHistory.push({ type: 'output', text: '  matrix         - Enter the matrix' });
                newHistory.push({ type: 'output', text: '  sudo hire me   - Request admin privileges' });
                newHistory.push({ type: 'output', text: '  clear          - Clear the terminal screen' });
                break;
            case 'tess-pro':
            case 'tess-pro --demo':
                newHistory.push({ type: 'output', text: '> Starting TESS Terminal Pro v2.0...' });
                setHistory(newHistory);

                setTimeout(() => setHistory(prev => [...prev, { type: 'output', text: '> Loading Neural Engine and Persona Data...' }]), 800);
                setTimeout(() => setHistory(prev => [...prev, { type: 'output', text: '> Initializing Playwright browser automation...' }]), 1500);
                setTimeout(() => setHistory(prev => [...prev, { type: 'output', text: '> Awaiting audio/visual intent...' }]), 2500);
                setTimeout(() => setHistory(prev => [...prev, { type: 'output', text: 'user > play him and i on youtube', style: { color: '#00ff88' } }]), 4000);
                setTimeout(() => setHistory(prev => [...prev, { type: 'output', text: '> Intent classified: MEDIA_PLAY (Confidence: 0.98)', style: { color: '#88aaff' } }]), 4800);
                setTimeout(() => setHistory(prev => [...prev, { type: 'output', text: '> Launching Headless Chrome -> https://youtube.com/results?search_query=him+and+i' }]), 6000);
                setTimeout(() => setHistory(prev => [...prev, { type: 'output', text: '> Injecting ad-block scripts & bypassing modals...' }]), 7500);
                setTimeout(() => setHistory(prev => [...prev, { type: 'output', text: '▶ Playing: G-Eazy & Halsey - Him & I (Official Video)', style: { color: '#ffaaaa', fontWeight: 'bold' } }]), 9000);
                return; // Return early because we handled state updates via timeouts
            case 'tess':
                newHistory.push({ type: 'output', text: 'Initializing TESS agent...' });
                setTimeout(() => setIsTessOpen(true), 500);
                break;
            case 'clear':
                setHistory([{ type: 'output', text: 'TESS-OS Terminal v2.4.1 — type help to see available commands.' }]);
                return; // Early return to avoid pushing more history
            case 'neofetch':
                newHistory.push({ type: 'output', text: '       /\\        rohit@tess-os' });
                newHistory.push({ type: 'output', text: '      /  \\       -------------' });
                newHistory.push({ type: 'output', text: '     /____\\      OS: TESS-OS 2.24 (Quantum)' });
                newHistory.push({ type: 'output', text: '    /      \\     Host: Neural Interface v4' });
                newHistory.push({ type: 'output', text: '   /________\\    Kernel: 6.8.0-ml-optimized' });
                newHistory.push({ type: 'output', text: '                 Uptime: 99.99%' });
                newHistory.push({ type: 'output', text: '                 Packages: 1337 (dpkg), 42 (pip)' });
                newHistory.push({ type: 'output', text: '                 Shell: bash 5.1.16' });
                newHistory.push({ type: 'output', text: '                 Memory: 512GB / 1024GB (HBM3)' });
                break;
            case 'status':
                newHistory.push({ type: 'output', text: '[ OK ] Neural Engine    : Active' });
                newHistory.push({ type: 'output', text: '[ OK ] TESS API Gateway : Connected' });
                newHistory.push({ type: 'output', text: '[ OK ] GPU Clusters     : 8/8 Online (A100s)' });
                newHistory.push({ type: 'output', text: '[ INFO] Memory Usage    : 42%' });
                newHistory.push({ type: 'output', text: '[ INFO] Current Load    : 0.14, 0.08, 0.04' });
                break;
            case 'matrix':
                newHistory.push({ type: 'output', text: 'Wake up, Neo...', style: { color: '#00ff88', textShadow: '0 0 5px #00ff88' } });
                newHistory.push({ type: 'output', text: 'The Matrix has you...', style: { color: '#00ff88', textShadow: '0 0 5px #00ff88' } });
                newHistory.push({ type: 'output', text: 'Follow the white rabbit.', style: { color: '#00ff88', textShadow: '0 0 5px #00ff88' } });
                break;
            case 'sudo hire me':
            case 'sudo hire-me':
                newHistory.push({ type: 'output', text: '[sudo] password for guest: *******' });
                newHistory.push({ type: 'output', text: 'Access Granted.', style: { color: '#00ff88', fontWeight: 'bold' } });
                newHistory.push({ type: 'output', text: 'Initiating recruitment protocol... Please email rohit.kumar@example.com to continue.' });
                break;
            default:
                newHistory.push({ type: 'output', text: `bash: ${trimmedCmd}: command not found. Type 'help' for available commands.` });
        }

        setHistory(newHistory);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            executeCommand(inputVal);
            setInputVal('');
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
                setHistoryIndex(nextIndex);
                setInputVal(commandHistory[nextIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex !== -1) {
                const nextIndex = historyIndex + 1;
                if (nextIndex >= commandHistory.length) {
                    setHistoryIndex(-1);
                    setInputVal('');
                } else {
                    setHistoryIndex(nextIndex);
                    setInputVal(commandHistory[nextIndex]);
                }
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            // Simple autocomplete
            const cmds = ['help', 'tess', 'tess-pro', 'clear', 'neofetch', 'status', 'matrix', 'sudo hire me'];
            const match = cmds.find(c => c.startsWith(inputVal.toLowerCase()));
            if (match) setInputVal(match);
        }
    };

    return (
        <section id="terminal-section">
            <div className="container">
                <div className="terminal-intro">
                    <div className="section-label gsap-reveal">// terminal</div>
                    <h2 className="section-title gsap-reveal">Try the<br />interactive shell.</h2>
                    <p className="gsap-reveal" style={{ color: 'rgba(226,232,240,0.5)', fontSize: '.9rem', lineHeight: 1.85, marginBottom: '2rem' }}>
                        Type <code style={{ color: 'var(--green)', fontFamily: "'Share Tech Mono', monospace" }}>tess</code> to launch the 152M intelligence platform directly from this shell, or click the button below.
                    </p>

                    <button
                        onClick={() => setIsTessOpen(true)}
                        className="gsap-reveal flex items-center gap-2 px-6 py-3 bg-[#00ff88]/10 hover:bg-[#00ff88]/20 border border-[#00ff88]/30 rounded-lg text-[#00ff88] transition-all duration-300 font-mono text-sm shadow-[0_0_15px_rgba(0,255,136,0.1)] hover:shadow-[0_0_25px_rgba(0,255,136,0.2)]"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', backgroundColor: 'rgba(0, 255, 136, 0.1)', border: '1px solid rgba(0, 255, 136, 0.3)', borderRadius: '8px', color: '#00ff88', cursor: 'pointer', fontFamily: "'Share Tech Mono', monospace", fontSize: '14px', transition: 'all 0.3s ease' }}
                    >
                        <Bot size={18} />
                        LAUNCH TESS AGENT
                    </button>
                </div>
                <div className="terminal-window gsap-reveal" id="termWindow" onClick={() => inputRef.current?.focus()}>
                    <div className="terminal-titlebar">
                        <span className="tb-dot"></span><span className="tb-dot"></span><span className="tb-dot"></span>
                        <span style={{ marginLeft: '.5rem' }}>bash — rohit@tess-os:~</span>
                    </div>

                    <div className="terminal-body" id="termBody" ref={bodyRef}>
                        {history.map((line, i) => (
                            <div key={i} className={`t-line ${line.type === 'input' ? 't-in' : 't-out'}`} style={{ ...line.style, whiteSpace: 'pre-wrap' }}>
                                {line.type === 'input' && <span style={{ color: '#00ff88', marginRight: '8px' }}></span>}
                                {line.text}
                            </div>
                        ))}

                        <div className="terminal-input-row">
                            <span className="t-input-prefix">rohit@tess-os:~$</span>
                            <input
                                ref={inputRef}
                                type="text"
                                id="termInput"
                                placeholder={history.length > 1 ? "" : "enter command..."}
                                autoComplete="off"
                                spellCheck="false"
                                value={inputVal}
                                onChange={e => setInputVal(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                    </div>
                    <div className="t-hint">
                        ↑↓ history &nbsp;|&nbsp; Tab autocomplete &nbsp;|&nbsp; try: help, neofetch, status, matrix, sudo hire me
                    </div>
                </div>
            </div>

            <TessModal isOpen={isTessOpen} onClose={() => setIsTessOpen(false)} />
        </section>
    );
}
