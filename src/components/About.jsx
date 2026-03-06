import React from 'react';

export default function About() {
    return (
        <section id="about">
            <div className="container">
                <div className="about-grid">
                    <div>
                        <div className="section-label gsap-reveal">// about</div>
                        <h2 className="section-title gsap-reveal">Building from<br />first principles.</h2>
                        <div className="about-text gsap-reveal">
                            <p>I'm a <span>machine learning engineer</span> who builds things from the ground up — not just wrapping APIs, but writing training loops, designing architectures, and running experiments until the loss curve actually goes down.</p>
                            <p>Right now I'm training a <span>152M parameter language model</span> (TESS) — a full 7-stage pipeline from pre-training to multi-step reasoning. I care about understanding what's happening inside the model, not just the eval metrics.</p>
                            <p>On the applied side, I built a <span>terminal-native automation agent</span> similar to Claude Code — context-aware, multi-step planning, plugin system.</p>
                        </div>
                        <div className="stat-grid gsap-reveal">
                            <div className="stat-card">
                                <div className="stat-num">152M</div>
                                <div className="stat-label">Parameters (TESS)</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-num">7</div>
                                <div className="stat-label">Training Stages</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-num">94%</div>
                                <div className="stat-label">GPU Utilization</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-num">∞</div>
                                <div className="stat-label">Coffees Consumed</div>
                            </div>
                        </div>
                    </div>
                    <div className="gsap-reveal">
                        <div className="sysinfo">
                            <div className="row comment"># system profile</div>
                            <div className="row"><span className="k">name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span className="v">= Rohit Kumar</span></div>
                            <div className="row"><span className="k">role&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span className="v">= ML Engineer</span></div>
                            <div className="row"><span className="k">location&nbsp;&nbsp;</span><span className="v">= India</span></div>
                            <div className="row"><span className="k">focus&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span className="v">= ML + AI Systems</span></div>
                            <hr />
                            <div className="row comment"># current run</div>
                            <div className="row"><span className="k">model&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span className="va">= TESS [152M]</span></div>
                            <div className="row"><span className="k">stage&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span className="va">= 7 / 7</span></div>
                            <div className="row"><span className="k">loss&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span className="vg">= ↓ converging</span></div>
                            <div className="row"><span className="k">gpu_util&nbsp;&nbsp;</span><span className="va">= 94%</span></div>
                            <div className="row"><span className="k">vram&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span className="va">= 21.4 / 24 GB</span></div>
                            <hr />
                            <div className="row comment"># availability</div>
                            <div className="row"><span className="k">open_to&nbsp;&nbsp;&nbsp;</span><span className="vg">= collab / work</span></div>
                            <div className="row"><span className="k">response&nbsp;&nbsp;</span><span className="vg">= fast ✓</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
