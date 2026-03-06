import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function SkillGlobe() {
    const canvasRef = useRef(null);
    const wrapRef = useRef(null);
    const [hoverInfo, setHoverInfo] = useState({ visible: false, x: 0, y: 0, name: '', desc: '' });

    useEffect(() => {
        if (window.innerWidth < 768) return;

        const canvas = canvasRef.current;
        const wrap = wrapRef.current;
        let W = wrap.offsetWidth || 500;
        let H = Math.max(wrap.offsetHeight, 500);

        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(W, H);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000);
        camera.position.z = 6.5;

        const globeGroup = new THREE.Group();
        scene.add(globeGroup);

        // 1. Wireframe Sphere
        const sphereGeo = new THREE.IcosahedronGeometry(2, 3);
        const sphereMat = new THREE.MeshBasicMaterial({ color: 0x00ff88, wireframe: true, transparent: true, opacity: 0.1 });
        globeGroup.add(new THREE.Mesh(sphereGeo, sphereMat));

        // 2. Inner Glow Sphere
        const glowGeo = new THREE.SphereGeometry(1.95, 32, 32);
        const glowMat = new THREE.MeshBasicMaterial({ color: 0x001a0d, transparent: true, opacity: 0.8 });
        globeGroup.add(new THREE.Mesh(glowGeo, glowMat));

        // 3. Skill Nodes (Fibonacci Sphere)
        const nodes = [
            { id: 'pytorch', name: 'PyTorch', desc: 'Custom architectures, distributed training, high-performance ML.' },
            { id: 'cuda', name: 'CUDA', desc: 'GPU acceleration, custom kernels, performance optimization.' },
            { id: 'transformers', name: 'Transformers', desc: 'LLM fine-tuning, attention mechanisms, sequence modeling.' },
            { id: 'hf', name: 'HuggingFace', desc: 'Model deployment, pipeline integration, dataset handling.' },
            { id: 'wandb', name: 'W&B', desc: 'Experiment tracking, hyperparameter tuning, model versioning.' },
            { id: 'python', name: 'Python', desc: 'Primary language for ML, APIs, scripting, and data processing.' },
            { id: 'bash', name: 'Bash', desc: 'Unix scripting, pipeline automation, system administration.' },
            { id: 'cpp', name: 'C++', desc: 'High-performance computing and systems level integrations.' },
            { id: 'llm', name: 'LLM APIs', desc: 'Integration with state-of-the-art hosted intelligence.' },
            { id: 'rag', name: 'RAG', desc: 'Retrieval-Augmented Generation architectures & vector DBs.' },
            { id: 'agents', name: 'Agents', desc: 'Building autonomous AI agents with tool use & orchestration.' },
            { id: 'gcp', name: 'GCP', desc: 'Cloud ML infrastructure, model hosting, managed services.' },
            { id: 'linux', name: 'Linux', desc: 'Production environment management and kernel-level config.' },
            { id: 'docker', name: 'Docker', desc: 'Containerization, reproducible training environments, CI/CD.' }
        ];

        // Define dependencies / relations
        const linksData = [
            { source: 'pytorch', target: 'cuda' },
            { source: 'pytorch', target: 'python' },
            { source: 'pytorch', target: 'transformers' },
            { source: 'transformers', target: 'hf' },
            { source: 'transformers', target: 'llm' },
            { source: 'hf', target: 'python' },
            { source: 'wandb', target: 'pytorch' },
            { source: 'python', target: 'bash' },
            { source: 'bash', target: 'linux' },
            { source: 'cpp', target: 'cuda' },
            { source: 'llm', target: 'rag' },
            { source: 'llm', target: 'agents' },
            { source: 'rag', target: 'python' },
            { source: 'agents', target: 'python' },
            { source: 'gcp', target: 'docker' },
            { source: 'gcp', target: 'linux' },
            { source: 'docker', target: 'linux' },
            { source: 'docker', target: 'bash' },
        ];

        const numNodes = nodes.length;
        const radius = 2.4;
        const nodeDict = {}; // id -> mesh data
        const nodeDataList = [];

        // 3a. Plot Nodes
        nodes.forEach((skillItem, i) => {
            const phi = Math.acos(-1 + (2 * i) / numNodes);
            const theta = Math.sqrt(numNodes * Math.PI) * phi;

            const x = radius * Math.cos(theta) * Math.sin(phi);
            const y = radius * Math.sin(theta) * Math.sin(phi);
            const z = radius * Math.cos(phi);

            const vecPos = new THREE.Vector3(x, y, z);

            const nodeMesh = new THREE.Mesh(
                new THREE.SphereGeometry(0.08, 16, 16),
                new THREE.MeshBasicMaterial({ color: 0x00ff88 })
            );
            nodeMesh.position.copy(vecPos);
            globeGroup.add(nodeMesh);

            const ringMesh = new THREE.Mesh(
                new THREE.RingGeometry(0.12, 0.16, 24),
                new THREE.MeshBasicMaterial({ color: 0x00ff88, transparent: true, opacity: 0.6, side: THREE.DoubleSide })
            );
            ringMesh.position.copy(vecPos);
            ringMesh.lookAt(0, 0, 0);
            globeGroup.add(ringMesh);

            // Base line to center (keeps the inner core aesthetic)
            const centerLineMat = new THREE.LineBasicMaterial({ color: 0x00ff88, transparent: true, opacity: 0.15 });
            const centerLineGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), vecPos]);
            const centerLine = new THREE.Line(centerLineGeo, centerLineMat);
            globeGroup.add(centerLine);

            nodeMesh.userData = { id: skillItem.id, name: skillItem.name, desc: skillItem.desc, idx: i };

            const nData = { id: skillItem.id, mesh: nodeMesh, ring: ringMesh, centerLine: centerLine, pos: vecPos, idx: i, connectedEdges: [] };
            nodeDict[skillItem.id] = nData;
            nodeDataList.push(nData);
        });

        // 3b. Plot Edges (Graph Links)
        const edgeObjects = [];
        linksData.forEach(link => {
            const sourceNode = nodeDict[link.source];
            const targetNode = nodeDict[link.target];
            if (sourceNode && targetNode) {
                // Determine a slight curve point (midpoint pulled slightly out from center)
                const midPoint = new THREE.Vector3().addVectors(sourceNode.pos, targetNode.pos).multiplyScalar(0.5);
                const distance = sourceNode.pos.distanceTo(targetNode.pos);
                midPoint.normalize().multiplyScalar(radius + (distance * 0.2)); // Bulge out slightly

                const curve = new THREE.QuadraticBezierCurve3(sourceNode.pos, midPoint, targetNode.pos);
                const points = curve.getPoints(20);
                const geometry = new THREE.BufferGeometry().setFromPoints(points);

                const material = new THREE.LineBasicMaterial({
                    color: 0x00ff88,
                    transparent: true,
                    opacity: 0.15,
                    linewidth: 1
                });

                const splineObject = new THREE.Line(geometry, material);
                splineObject.userData = { sourceId: link.source, targetId: link.target };
                globeGroup.add(splineObject);
                edgeObjects.push(splineObject);

                // Let nodes know about their edges for easy highlighting
                sourceNode.connectedEdges.push({ edge: splineObject, otherNodeId: link.target });
                targetNode.connectedEdges.push({ edge: splineObject, otherNodeId: link.source });
            }
        });

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        let hoveredNode = null;

        const onHoverMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

            if (hoveredNode) {
                setHoverInfo(prev => ({ ...prev, x: e.clientX + 15, y: e.clientY + 15 }));
            }
        };
        window.addEventListener('mousemove', onHoverMove);

        // Create a state tracking mechanism for the 2D labels
        const updateLabels = () => {
            const newLabels = nodeDataList.map(data => {
                const pos = data.pos.clone();
                pos.applyMatrix4(globeGroup.matrixWorld);
                pos.project(camera);

                const x = (pos.x * .5 + .5) * W;
                const y = (pos.y * -.5 + .5) * H;

                // Determine if it's on the front hemisphere
                const nodeWorldPos = new THREE.Vector3().copy(data.pos).applyMatrix4(globeGroup.matrixWorld);
                nodeWorldPos.normalize();
                const cameraDir = new THREE.Vector3(0, 0, 1);
                const dot = nodeWorldPos.dot(cameraDir);
                const isFront = dot > -0.2;

                return {
                    id: data.id,
                    name: data.mesh.userData.name,
                    x, y,
                    visible: isFront,
                    scale: data.mesh.scale.x
                };
            });
            return newLabels;
        };

        let isDragging = false, prevX = 0, prevY = 0, targetRotX = 0, targetRotY = 0;
        canvas.style.cursor = 'grab';

        const onMouseDown = (e) => {
            isDragging = true;
            prevX = e.clientX;
            prevY = e.clientY;
            canvas.style.cursor = 'grabbing';
        };
        canvas.addEventListener('mousedown', onMouseDown);

        const onMouseUp = () => {
            isDragging = false;
            if (!hoveredNode) canvas.style.cursor = 'grab';
        };
        window.addEventListener('mouseup', onMouseUp);

        const onMouseMove = (e) => {
            if (!isDragging) return;
            targetRotY += (e.clientX - prevX) * 0.005;
            targetRotX += (e.clientY - prevY) * 0.005;
            targetRotX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, targetRotX));
            prevX = e.clientX;
            prevY = e.clientY;
        };
        window.addEventListener('mousemove', onMouseMove);

        const onResize = () => {
            if (window.innerWidth < 768) return;
            W = wrap.offsetWidth || 500;
            H = Math.max(wrap.offsetHeight, 500);
            renderer.setSize(W, H);
            camera.aspect = W / H;
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', onResize);

        let time = 0;
        let animFrameId;

        function animate() {
            animFrameId = requestAnimationFrame(animate);
            time += 0.01;

            if (!isDragging) targetRotY += 0.002;

            globeGroup.rotation.y += (targetRotY - globeGroup.rotation.y) * 0.1;
            globeGroup.rotation.x += (targetRotX - globeGroup.rotation.x) * 0.1;

            raycaster.setFromCamera(mouse, camera);
            const meshesToTest = nodeDataList.map(d => d.mesh);
            const intersects = raycaster.intersectObjects(meshesToTest);

            if (intersects.length > 0) {
                const intersectedMesh = intersects[0].object;

                if (hoveredNode !== intersectedMesh) {
                    hoveredNode = intersectedMesh;
                    const hoveredId = hoveredNode.userData.id;

                    // 1. Highlight Node
                    hoveredNode.scale.set(1.8, 1.8, 1.8);
                    hoveredNode.material.color.setHex(0xffffff);

                    // 2. Identify Context (Connected Nodes)
                    const connectedIds = nodeDict[hoveredId].connectedEdges.map(e => e.otherNodeId);

                    // 3. Highlight Edges & Related Nodes, Dim Everything Else
                    nodeDataList.forEach(data => {
                        if (data.id === hoveredId) {
                            data.ring.material.opacity = 0.9;
                            data.centerLine.material.opacity = 0.4;
                            data.mesh.material.color.setHex(0xffffff);
                        } else if (connectedIds.includes(data.id)) {
                            // Connected Node
                            data.mesh.scale.set(1.3, 1.3, 1.3);
                            data.mesh.material.color.setHex(0x00ff88);
                            data.ring.material.opacity = 0.5;
                            data.centerLine.material.opacity = 0.2;
                        } else {
                            // Unrelated Node
                            data.mesh.scale.set(0.8, 0.8, 0.8);
                            data.mesh.material.color.setHex(0x00aa55);
                            data.ring.material.opacity = 0.1;
                            data.centerLine.material.opacity = 0.05;
                        }
                    });

                    edgeObjects.forEach(edge => {
                        if (edge.userData.sourceId === hoveredId || edge.userData.targetId === hoveredId) {
                            edge.material.opacity = 0.8;
                            edge.material.linewidth = 2; // Notice: WebGL ignores linewidth > 1 on most systems, but opacity conveys the glow
                            edge.material.color.setHex(0xffffff);
                        } else {
                            edge.material.opacity = 0.05;
                            edge.material.color.setHex(0x00aa55);
                        }
                    });

                    setHoverInfo(prev => ({
                        visible: true,
                        name: hoveredNode.userData.name,
                        desc: hoveredNode.userData.desc
                    }));
                    canvas.style.cursor = 'pointer';
                }
            } else {
                if (hoveredNode) {
                    // Reset EVERYTHING back to default base line idle state
                    hoveredNode = null;

                    nodeDataList.forEach(data => {
                        data.mesh.scale.set(1, 1, 1);
                        data.mesh.material.color.setHex(0x00ff88);
                        data.centerLine.material.opacity = 0.15;
                    });

                    edgeObjects.forEach(edge => {
                        edge.material.opacity = 0.15;
                        edge.material.color.setHex(0x00ff88);
                    });

                    setHoverInfo(prev => ({ ...prev, visible: false }));
                    canvas.style.cursor = isDragging ? 'grabbing' : 'grab';
                }
            }

            // Idle Ring Pulsing 
            nodeDataList.forEach((data) => {
                const offsetIndex = data.idx * 0.5;
                const scale = 1 + Math.sin(time * 3 + offsetIndex) * 0.3;
                data.ring.scale.set(scale, scale, 1);

                // Only pulsate opacity if we aren't currently highlighting a specific tree
                if (!hoveredNode) {
                    data.ring.material.opacity = 0.2 + Math.max(0, Math.sin(time * 3 + offsetIndex)) * 0.5;
                }
            });

            // Dispatch custom event to update DOM labels
            globeGroup.updateMatrixWorld();
            const labelsData = updateLabels();
            const event = new CustomEvent('globeLabelsUpdate', { detail: { labels: labelsData, hoveredId: hoveredNode ? hoveredNode.userData.id : null } });
            window.dispatchEvent(event);

            renderer.render(scene, camera);
        }
        animate();

        return () => {
            cancelAnimationFrame(animFrameId);
            window.removeEventListener('mousemove', onHoverMove);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('resize', onResize);
            if (canvas) canvas.removeEventListener('mousedown', onMouseDown);

            sphereGeo.dispose();
            sphereMat.dispose();
            glowGeo.dispose();
            glowMat.dispose();
            renderer.dispose();
        };
    }, []);

    const [labels, setLabels] = useState([]);
    const [activeHoverId, setActiveHoverId] = useState(null);

    useEffect(() => {
        const handleLabelsUpdate = (e) => {
            setLabels(e.detail.labels);
            setActiveHoverId(e.detail.hoveredId);
        };
        window.addEventListener('globeLabelsUpdate', handleLabelsUpdate);
        return () => window.removeEventListener('globeLabelsUpdate', handleLabelsUpdate);
    }, []);

    return (
        <section id="globe-section">
            <div className="globe-layout">
                <div className="globe-content">
                    <div className="section-label gsap-reveal">// stack</div>
                    <h2 className="section-title gsap-reveal">The neural<br />network behind<br />the work.</h2>
                    <p className="gsap-reveal" style={{ color: 'rgba(226,232,240,0.5)', fontSize: '.92rem', lineHeight: 1.85, maxWidth: 420, marginBottom: '1.5rem' }}>
                        Interact with the globe → each node represents a technology in my stack. Drag to rotate. The connections show how they relate in production ML pipelines.
                    </p>
                    <div className="skill-pills gsap-reveal">
                        <span className="pill active">PyTorch</span><span className="pill">CUDA</span><span className="pill">Transformers</span>
                        <span className="pill">HuggingFace</span><span className="pill">W&amp;B</span><span className="pill">Python</span>
                        <span className="pill">Bash</span><span className="pill">C/C++</span><span className="pill">Linux</span>
                        <span className="pill">Docker</span><span className="pill">LLM APIs</span><span className="pill">RAG</span>
                        <span className="pill">Agents</span><span className="pill">GCP</span><span className="pill">Git</span>
                    </div>
                </div>
                <div className="globe-canvas-wrap" ref={wrapRef} style={{ position: 'relative' }}>
                    <canvas id="globeCanvas" ref={canvasRef}></canvas>

                    {/* Floating 2D Labels overlay */}
                    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
                        {labels.map(lbl => {
                            const isHovered = activeHoverId === lbl.id;
                            const isDimmed = activeHoverId && !isHovered && lbl.scale < 1.0;
                            const isConnected = activeHoverId && !isHovered && lbl.scale > 1.0;

                            let color = 'rgba(255,255,255,0.6)';
                            let opacity = 0; // Hidden by default
                            let fontWeight = 400;

                            if (activeHoverId) {
                                if (isHovered) {
                                    color = '#ffffff';
                                    opacity = lbl.visible ? 1 : 0.2;
                                    fontWeight = 700;
                                } else if (isConnected) {
                                    color = '#00ff88';
                                    opacity = lbl.visible ? 0.9 : 0.1;
                                    fontWeight = 600;
                                } else {
                                    opacity = lbl.visible ? 0.05 : 0;
                                }
                            }

                            return (
                                <div key={lbl.id} style={{
                                    position: 'absolute',
                                    left: lbl.x + 'px',
                                    top: lbl.y + 'px',
                                    transform: 'translate(12px, -50%)',
                                    fontFamily: '"Share Tech Mono", monospace',
                                    fontSize: isHovered ? '0.85rem' : '0.75rem',
                                    color: color,
                                    opacity: opacity,
                                    fontWeight: fontWeight,
                                    textShadow: isHovered ? '0 0 10px rgba(255,255,255,0.5)' : (isConnected ? '0 0 10px rgba(0,255,136,0.3)' : 'none'),
                                    transition: 'opacity 0.2s, font-size 0.2s, color 0.2s',
                                    whiteSpace: 'nowrap',
                                    zIndex: lbl.visible ? 10 : 1
                                }}>
                                    {lbl.name}
                                </div>
                            );
                        })}
                    </div>

                    <div
                        id="globeTooltip"
                        className={hoverInfo.visible ? 'visible' : ''}
                        style={{
                            display: hoverInfo.visible ? 'block' : 'none',
                            left: hoverInfo.x + 'px',
                            top: hoverInfo.y + 'px'
                        }}
                    >
                        <strong>{hoverInfo.name}</strong>{hoverInfo.desc}
                    </div>
                </div>
            </div>
        </section>
    );
}
