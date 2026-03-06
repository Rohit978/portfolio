import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

export default function Contact() {
    const [state, handleSubmit] = useForm("xnjgqbba");

    return (
        <section id="contact">
            <div className="container">
                <div className="section-label gsap-reveal">// contact</div>
                <h2 className="section-title gsap-reveal">Let's build<br />something real.</h2>
                <div className="contact-grid" style={{ marginTop: '3rem' }}>
                    <div className="gsap-reveal">
                        <p className="contact-text">
                            Open to interesting problems — collaborations, research, work opportunities, or just talking about model training and AI systems.<br /><br />Best way to reach me is email. I respond fast.
                        </p>
                        <div className="contact-links">
                            <a href="mailto:01rohitkumar0104@gmail.com" className="contact-link"><span className="lbl">EMAIL</span>01rohitkumar0104@gmail.com</a>
                            <a href="https://github.com/Rohit978" target="_blank" rel="noreferrer" className="contact-link"><span className="lbl">GITHUB</span>github.com/Rohit978</a>
                            <a href="https://linkedin.com/in/rohit-kumar-430b8a287" target="_blank" rel="noreferrer" className="contact-link"><span className="lbl">LINKEDIN</span>linkedin.com/in/rohit-kumar-430b8a287</a>
                        </div>
                    </div>
                    <div className="gsap-reveal">
                        <form className="form-wrap" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">// FROM</label>
                                <input className="form-input" name="name" id="cName" type="text" placeholder="your name" required />
                                <ValidationError prefix="Name" field="name" errors={state.errors} style={{ color: '#ff5f56', fontSize: '0.8rem', marginTop: '4px' }} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">// EMAIL</label>
                                <input className="form-input" name="email" id="cEmail" type="email" placeholder="your@email.com" required />
                                <ValidationError prefix="Email" field="email" errors={state.errors} style={{ color: '#ff5f56', fontSize: '0.8rem', marginTop: '4px' }} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">// MESSAGE</label>
                                <textarea className="form-textarea" name="message" id="cMsg" placeholder="what's on your mind..." required></textarea>
                                <ValidationError prefix="Message" field="message" errors={state.errors} style={{ color: '#ff5f56', fontSize: '0.8rem', marginTop: '4px' }} />
                            </div>

                            <div className="form-status" id="formStatus" style={{ minHeight: '24px', marginBottom: '1rem', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.9rem' }}>
                                {state.succeeded && <span style={{ color: '#00ff88' }}>[SUCCESS] Root access granted. Message delivered.</span>}
                                {state.errors && Object.keys(state.errors).length > 0 && <span style={{ color: '#ff5f56' }}>[ERROR] Delivery failed. Please check inputs.</span>}
                                {state.submitting && <span style={{ color: '#ffbd2e' }}>[PENDING] Establishing secure connection...</span>}
                            </div>

                            <button className="submit-btn" type="submit" disabled={state.submitting || state.succeeded}>
                                <span>{state.submitting ? './executing...' : (state.succeeded ? './message_sent' : './send_message.sh')}</span>
                            </button>
                        </form>
                        <p style={{ fontSize: '.7rem', color: 'rgba(0,255,136,0.15)', marginTop: '.8rem', fontFamily: "'Share Tech Mono', monospace" }}>
              // encrypted & transmitted securely via formspree
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
