import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export default function Hero() {
    const canvasRef = useRef(null);

    useEffect(() => {
        // GSAP Animation Trigger
        const startHeroAnim = () => {
            const tl = gsap.timeline();
            tl.to('#hEyebrow', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
                .to('#hName', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
                .to('#hRole', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
                .to('#hCta', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3');
        };

        window.addEventListener('preloaderComplete', startHeroAnim);

        // Three.js Scene Setup (Quantum Data Flow)
        const canvas = canvasRef.current;
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x000502, 0.002);

        const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 5, 80);
        camera.lookAt(0, 0, 0);

        const PARTICLE_COUNT = 3000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(PARTICLE_COUNT * 3);
        const phases = new Float32Array(PARTICLE_COUNT);

        let idx = 0;
        const gridWidth = 75;
        const gridDepth = 40;
        const spacing = 8;

        for (let i = 0; i < gridWidth; i++) {
            for (let j = 0; j < gridDepth; j++) {
                if (idx * 3 >= positions.length) break;
                const x = (i - gridWidth / 2) * spacing + (Math.random() - 0.5) * 4;
                const z = (j - gridDepth / 2) * spacing + (Math.random() - 0.5) * 4;
                const y = (Math.random() - 0.5) * 5;

                positions[idx * 3] = x;
                positions[idx * 3 + 1] = y;
                positions[idx * 3 + 2] = z;

                phases[idx] = Math.random() * Math.PI * 2;
                idx++;
            }
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1));

        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color: { value: new THREE.Color(0x00ff88) },
            },
            vertexShader: `
        uniform float time;
        attribute float phase;
        varying float vAlpha;
        void main() {
            vec3 pos = position;
            float wave1 = sin(pos.x * 0.04 + time * 1.5) * 15.0;
            float wave2 = cos(pos.z * 0.05 + time * 1.0) * 15.0;
            float noise = sin(phase + time * 2.0) * 4.0;
            pos.y += wave1 + wave2 + noise;
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            gl_PointSize = (120.0 / -mvPosition.z);
            vAlpha = smoothstep(-20.0, 25.0, pos.y) * 0.8 + 0.4;
        }
      `,
            fragmentShader: `
        uniform vec3 color;
        varying float vAlpha;
        void main() {
            vec2 xy = gl_PointCoord.xy - vec2(0.5);
            float ll = length(xy);
            if(ll > 0.5) discard;
            float intensity = pow((0.5 - ll) * 2.0, 1.5);
            gl_FragColor = vec4(color, vAlpha * intensity);
        }
      `,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });

        const particleSystem = new THREE.Points(geometry, material);
        scene.add(particleSystem);

        let mouseX = 0, mouseY = 0;
        let targetX = 0, targetY = 10;
        let animFrameId;

        const onMouseMove = e => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
        };
        document.addEventListener('mousemove', onMouseMove);

        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', onResize);

        const clock = new THREE.Clock();

        const animate = () => {
            animFrameId = requestAnimationFrame(animate);
            const time = clock.getElapsedTime();
            material.uniforms.time.value = time * 0.4;

            targetX = mouseX * 50;
            targetY = 15 + mouseY * 25;

            camera.position.x += (targetX - camera.position.x) * 0.05;
            camera.position.y += (targetY - camera.position.y) * 0.05;
            particleSystem.rotation.y = time * 0.05;
            camera.lookAt(0, 0, 0);

            renderer.render(scene, camera);
        };
        animate();

        return () => {
            window.removeEventListener('preloaderComplete', startHeroAnim);
            document.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', onResize);
            cancelAnimationFrame(animFrameId);

            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <section id="hero">
            <canvas id="bgCanvas" ref={canvasRef}></canvas>
            <div className="hero-content">
                <div className="hero-eyebrow" id="hEyebrow">ML Engineer &nbsp;/&nbsp; AI Systems Builder</div>
                <h1 className="hero-name" id="hName">ROHIT<br /><span>KUMAR</span></h1>
                <p className="hero-role" id="hRole">Training models from scratch. Building AI that acts in the world.</p>
                <div className="hero-cta" id="hCta">
                    <a href="#projects" className="btn btn-primary">View Projects</a>
                    <a href="#contact" className="btn btn-ghost">Get in Touch</a>
                </div>
            </div>
            <div className="scroll-hint">
                <span>scroll</span>
                <div className="scroll-dot"></div>
            </div>
        </section>
    );
}
