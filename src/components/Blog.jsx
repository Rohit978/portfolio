import React, { useState, useEffect } from 'react';
import Markdown from 'markdown-to-jsx';
import { blogs } from '../data/blogs';
import { X } from 'lucide-react';

export default function Blog() {
    const [activeBlog, setActiveBlog] = useState(null);

    // Prevent body scrolling when modal is open
    useEffect(() => {
        if (activeBlog) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [activeBlog]);

    return (
        <section id="blog" className="blog-section">
            <div className="container">
                <div className="section-label gsap-reveal">// blog & logs</div>
                <h2 className="section-title gsap-reveal">Training logs &<br />retrospectives.</h2>

                <div className="blog-grid gsap-reveal" style={{ marginTop: '3rem' }}>
                    {blogs.map(blog => (
                        <div key={blog.id} className="blog-card" onClick={() => setActiveBlog(blog)}>
                            <div className="blog-card-header">
                                <span className="blog-date">{blog.date}</span>
                                <span className="blog-readtime">{blog.readTime}</span>
                            </div>
                            <h3 className="blog-card-title">{blog.title}</h3>
                            <p className="blog-card-excerpt">{blog.excerpt}</p>
                            <div className="blog-tags">
                                {blog.tags.map(tag => (
                                    <span key={tag} className="tech-tag" style={{ border: '1px solid rgba(0, 255, 136, 0.2)', padding: '2px 8px', fontSize: '0.7rem', color: '#00ff88', marginRight: '6px', borderRadius: '2px', fontFamily: "'Share Tech Mono', monospace" }}>{tag}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Reading Modal */}
            {activeBlog && (
                <div className="blog-modal-backdrop" onClick={() => setActiveBlog(null)}>
                    <div className="blog-modal-content" onClick={e => e.stopPropagation()}>
                        <button className="blog-modal-close" onClick={() => setActiveBlog(null)}>
                            <X size={24} />
                        </button>
                        <div className="blog-modal-header">
                            <div className="blog-modal-meta">
                                <span>{activeBlog.date}</span> &bull; <span>{activeBlog.readTime}</span>
                            </div>
                            <div style={{ marginTop: '1rem', marginBottom: '2rem' }}>
                                {activeBlog.tags.map(tag => (
                                    <span key={tag} style={{ border: '1px solid rgba(0, 255, 136, 0.4)', padding: '4px 10px', fontSize: '0.8rem', color: '#00ff88', marginRight: '8px', borderRadius: '4px', fontFamily: "'Share Tech Mono', monospace", background: 'rgba(0,255,136,0.05)' }}>{tag}</span>
                                ))}
                            </div>
                        </div>
                        <div className="blog-markdown-body">
                            <Markdown
                                options={{
                                    overrides: {
                                        h1: { component: 'h1', props: { className: 'md-h1' } },
                                        h2: { component: 'h2', props: { className: 'md-h2' } },
                                        h3: { component: 'h3', props: { className: 'md-h3' } },
                                        p: { component: 'p', props: { className: 'md-p' } },
                                        code: { component: 'code', props: { className: 'md-code' } },
                                        pre: { component: 'pre', props: { className: 'md-pre' } },
                                        ul: { component: 'ul', props: { className: 'md-ul' } },
                                        li: { component: 'li', props: { className: 'md-li' } },
                                        strong: { component: 'strong', props: { className: 'md-strong' } },
                                        em: { component: 'em', props: { className: 'md-em' } }
                                    }
                                }}
                            >
                                {activeBlog.content}
                            </Markdown>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
