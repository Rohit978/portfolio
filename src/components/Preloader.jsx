import { useEffect, useState } from 'react';

export default function Preloader() {
    const [percent, setPercent] = useState(0);
    const [lines, setLines] = useState([]);
    const [isDone, setIsDone] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const allLines = [
        'BIOS v2.4.1 — system check...',
        'CUDA: detected | GPU: RTX [OK]',
        'Loading kernel modules... [OK]',
        'Mounting /home/rohit... [OK]',
        'Initializing neural environment...',
        'Welcome back. Session started.'
    ];

    useEffect(() => {
        let pct = 0;
        let pli = 0;

        const preInterval = setInterval(() => {
            pct = Math.min(pct + (Math.random() * 3 + 1), 100);
            setPercent(Math.floor(pct));

            const showNextLine = () => {
                if (pli < allLines.length) {
                    setLines(prev => [...prev, allLines[pli]]);
                    pli++;
                }
            };

            if (pct > 15 && pli === 0) showNextLine();
            if (pct > 30 && pli === 1) showNextLine();
            if (pct > 50 && pli === 2) showNextLine();
            if (pct > 65 && pli === 3) showNextLine();
            if (pct > 80 && pli === 4) showNextLine();

            if (pct >= 100) {
                clearInterval(preInterval);
                showNextLine();
                setTimeout(() => setIsDone(true), 600);
                setTimeout(() => {
                    setIsVisible(false);
                    // Dispatch a custom event to tell Hero animations to start
                    window.dispatchEvent(new Event('preloaderComplete'));
                }, 1400);
            }
        }, 40);

        return () => clearInterval(preInterval);
    }, []);

    if (!isVisible) return null;

    return (
        <div id="preloader" style={{ opacity: isDone ? 0 : 1, transition: 'opacity 0.8s' }}>
            <div className="pre-logo">ROHIT.DEV</div>
            <div className="pre-lines" id="preLines">
                {lines.map((line, idx) => (
                    <span key={idx} className="pre-line show">{line}</span>
                ))}
            </div>
            <div className="pre-bar-wrap">
                <div className="pre-bar-label">
                    <span>// initializing</span>
                    <span id="prePercent">{percent}%</span>
                </div>
                <div className="pre-bar">
                    <div className="pre-bar-fill" id="preBarFill" style={{ width: `${percent}%` }}></div>
                </div>
            </div>
        </div>
    );
}
