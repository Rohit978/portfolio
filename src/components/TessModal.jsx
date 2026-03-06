import { useEffect, useRef, useState } from 'react';
import { X, Maximize2, Minimize2, Terminal as TermIcon } from 'lucide-react';

const TESS_DEMO_URL = '/tess-demo/?mode=portfolio_demo';

export default function TessModal({ isOpen, onClose }) {
    const iframeRef = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [iframeLoaded, setIframeLoaded] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            setIframeLoaded(false);
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e) => { if (e.key === 'Escape' && isOpen) onClose(); };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
            style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                zIndex: 1000,
                backgroundColor: 'rgba(0,0,0,0.88)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: isExpanded ? 0 : '1.5rem',
                animation: 'fadeIn .2s ease'
            }}
        >
            <div style={{
                width: '100%',
                maxWidth: isExpanded ? '100%' : '1100px',
                height: isExpanded ? '100vh' : '88vh',
                backgroundColor: '#09090b',
                border: isExpanded ? 'none' : '1px solid rgba(255,255,255,0.08)',
                borderRadius: isExpanded ? 0 : '16px',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
                transition: 'all 0.3s ease',
            }}>

                {/* Header Bar */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 20px',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    backgroundColor: '#09090b',
                    flexShrink: 0,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <TermIcon size={16} style={{ color: '#00ff88' }} />
                        <div>
                            <p style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#f4f4f5', fontFamily: 'Inter, sans-serif' }}>
                                TESS Intelligence Platform
                            </p>
                        </div>
                    </div>

                    {/* Status Dot */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginRight: 'auto', marginLeft: '20px' }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#00ff88', boxShadow: '0 0 6px #00ff88' }} />
                        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontFamily: 'Inter, sans-serif' }}>live</span>
                    </div>

                    <div style={{ display: 'flex', gap: '4px' }}>
                        <button
                            onClick={() => setIsExpanded(v => !v)}
                            title={isExpanded ? 'Restore' : 'Maximize'}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', padding: '6px', borderRadius: '6px', display: 'flex', alignItems: 'center' }}
                        >
                            {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                        </button>
                        <button
                            onClick={onClose}
                            title="Close"
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', padding: '6px', borderRadius: '6px', display: 'flex', alignItems: 'center' }}
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>

                {/* Iframe Body */}
                <div style={{ flex: 1, position: 'relative', backgroundColor: '#09090b' }}>
                    {!iframeLoaded && (
                        <div style={{
                            position: 'absolute', inset: 0,
                            display: 'flex', flexDirection: 'column',
                            alignItems: 'center', justifyContent: 'center', gap: '16px'
                        }}>
                            <style>{`@keyframes spin { to { transform: rotate(360deg); } } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
                            <div style={{
                                width: 28, height: 28,
                                border: '2px solid rgba(0,255,136,0.3)',
                                borderTopColor: '#00ff88',
                                borderRadius: '50%',
                                animation: 'spin 0.8s linear infinite'
                            }} />
                            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px', fontFamily: 'Inter, sans-serif', margin: 0 }}>
                                Connecting to TESS cluster…
                            </p>
                        </div>
                    )}
                    <iframe
                        ref={iframeRef}
                        src={TESS_DEMO_URL}
                        title="TESS AI Platform"
                        style={{
                            width: '100%', height: '100%',
                            border: 'none',
                            opacity: iframeLoaded ? 1 : 0,
                            transition: 'opacity 0.4s ease'
                        }}
                        onLoad={() => setIframeLoaded(true)}
                        allow="clipboard-write"
                    />
                </div>
            </div>
        </div>
    );
}
