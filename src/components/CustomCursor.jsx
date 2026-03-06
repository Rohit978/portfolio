import { useEffect, useRef } from 'react';

export default function CustomCursor() {
    const cursorRef = useRef(null);
    const cursorRingRef = useRef(null);

    useEffect(() => {
        let mx = 0, my = 0, rx = 0, ry = 0;
        let animFrame;

        const onMouseMove = (e) => {
            mx = e.clientX;
            my = e.clientY;
            if (cursorRef.current) {
                cursorRef.current.style.left = mx + 'px';
                cursorRef.current.style.top = my + 'px';
            }
        };

        const animCursor = () => {
            rx += (mx - rx) * 0.12;
            ry += (my - ry) * 0.12;
            if (cursorRingRef.current) {
                cursorRingRef.current.style.left = rx + 'px';
                cursorRingRef.current.style.top = ry + 'px';
            }
            animFrame = requestAnimationFrame(animCursor);
        };

        document.addEventListener('mousemove', onMouseMove);
        animCursor();

        const addHoverStates = () => {
            document.querySelectorAll('a, button, .pill, .btn').forEach(el => {
                el.addEventListener('mouseenter', handleMouseEnter);
                el.addEventListener('mouseleave', handleMouseLeave);
            });
        };

        const handleMouseEnter = () => {
            if (cursorRef.current) { cursorRef.current.style.width = '18px'; cursorRef.current.style.height = '18px'; }
            if (cursorRingRef.current) { cursorRingRef.current.style.width = '50px'; cursorRingRef.current.style.height = '50px'; }
        };

        const handleMouseLeave = () => {
            if (cursorRef.current) { cursorRef.current.style.width = '10px'; cursorRef.current.style.height = '10px'; }
            if (cursorRingRef.current) { cursorRingRef.current.style.width = '36px'; cursorRingRef.current.style.height = '36px'; }
        };

        // Need a mutation observer to attach to dynamically created elements
        const observer = new MutationObserver(addHoverStates);
        observer.observe(document.body, { childList: true, subtree: true });
        addHoverStates();

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(animFrame);
            observer.disconnect();
        };
    }, []);

    return (
        <>
            <div className="cursor" id="cursor" ref={cursorRef}></div>
            <div className="cursor-ring" id="cursorRing" ref={cursorRingRef}></div>
        </>
    );
}
