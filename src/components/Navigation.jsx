import { useEffect, useState } from 'react';

export default function Navigation() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav id="mainNav" className={scrolled ? 'scrolled' : ''}>
            <div className="nav-logo">RK</div>
            <ul className="nav-links">
                <li><a href="#about">about</a></li>
                <li><a href="#globe-section">stack</a></li>
                <li><a href="#projects">projects</a></li>
                <li><a href="#terminal-section">terminal</a></li>
                <li><a href="#blog">blog</a></li>
                <li><a href="#contact">contact</a></li>
            </ul>
        </nav>
    );
}
