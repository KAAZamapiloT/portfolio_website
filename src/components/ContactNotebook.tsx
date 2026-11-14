import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Decoration } from './Decorations';
import { playCutePop, playCelebrationChime } from '../utils/audio';
import confetti from 'canvas-confetti';

export const ContactNotebook: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please enter your name, email, and message.");
      return;
    }

    setIsSubmitting(true);
    playCutePop(950);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      playCelebrationChime();

      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#FF8FC1', '#BFA8FF', '#9FE8CF', '#FFE98A', '#9FD8FF', '#FF5C9D'],
      });
    }, 500);
  };

  return (
    <div className="window-wrap">
      <section className="window" id="contact">
        <header className="window__bar">
          <span className="window__title">NET.CONNECT // CONTACT PAD</span>
          <span className="dots" aria-hidden="true">
            <i></i>
            <i></i>
            <i></i>
          </span>
        </header>

        <div className="window__body">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
            {/* Left Column: Direct Info Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="card card--yellow">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="label text-xs" style={{ color: 'var(--purple-d)' }}>
                      DIRECT_CHANNEL
                    </span>
                    <span className="badge" style={{ width: 34, height: 34, fontSize: '0.9rem' }}>
                      ✉
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2">
                    Direct Mailbox
                  </h3>

                  <p className="text-sm font-medium mb-3">
                    Whether you want to discuss systems programming, custom memory allocators, real-time UE5 scene pipelines, or engineering opportunities—my inbox is open.
                  </p>

                  <div className="card__inset space-y-2 text-xs font-mono" style={{ background: 'var(--paper)' }}>
                    <div>
                      <span className="label block text-[10px]" style={{ color: 'var(--purple-d)' }}>EMAIL:</span>
                      <a href={`mailto:${PERSONAL_INFO.email}`} className="font-bold">
                        {PERSONAL_INFO.email}
                      </a>
                    </div>
                    <div>
                      <span className="label block text-[10px]" style={{ color: 'var(--purple-d)' }}>LOCATION:</span>
                      <span className="font-bold">{PERSONAL_INFO.location}</span>
                    </div>
                    <div>
                      <span className="label block text-[10px]" style={{ color: 'var(--purple-d)' }}>CAMPUS:</span>
                      <span className="font-bold">{PERSONAL_INFO.institution}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--ink)]/20">
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn--secondary"
                    style={{ padding: '6px 14px', fontSize: '0.78rem' }}
                  >
                    <span>github</span>
                  </a>
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn--secondary"
                    style={{ padding: '6px 14px', fontSize: '0.78rem' }}
                  >
                    <span>linkedin</span>
                  </a>
                  <a
                    href="/UdaySingh_ResumeGameDev.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn--secondary"
                    style={{ padding: '6px 14px', fontSize: '0.78rem', background: 'var(--yellow)' }}
                    title="Download Game Dev Resume"
                  >
                    <span>📄 game dev resume</span>
                  </a>
                  <a
                    href="/RESUME_cont.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn--secondary"
                    style={{ padding: '6px 14px', fontSize: '0.78rem' }}
                    title="Download Systems Resume"
                  >
                    <span>📄 systems resume</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Terminal Form Card */}
            <div className="lg:col-span-7">
              <div className="card card--lavender">
                <div>
                  <div className="flex items-center justify-between mb-3 border-b border-[var(--ink)]/30 pb-2">
                    <h3 className="text-xl font-bold m-0">
                      Send a Message
                    </h3>
                    <span className="tag" style={{ background: 'var(--paper)', fontSize: '0.7rem' }}>
                      FORM // v1.0
                    </span>
                  </div>

                  {isSubmitted ? (
                    <div className="card__inset py-8 text-center space-y-3" style={{ background: 'var(--paper)' }}>
                      <div className="text-4xl">💌</div>
                      <h4 className="text-xl font-bold">MESSAGE DISPATCHED!</h4>
                      <p className="text-sm font-mono max-w-sm mx-auto" style={{ color: 'var(--purple-d)' }}>
                        Thank you, {formData.name}. Your note has been received. I'll get back to you shortly.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({ name: '', email: '', message: '' });
                        }}
                        className="btn"
                        style={{ padding: '6px 16px', fontSize: '0.8rem' }}
                      >
                        WRITE ANOTHER &gt;&gt;
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="label block text-xs mb-1" style={{ color: 'var(--ink)' }}>
                          YOUR NAME:
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Ada Lovelace, Linus Torvalds"
                        />
                      </div>

                      <div>
                        <label className="label block text-xs mb-1" style={{ color: 'var(--ink)' }}>
                          EMAIL ADDRESS:
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="your.email@domain.com"
                        />
                      </div>

                      <div>
                        <label className="label block text-xs mb-1" style={{ color: 'var(--ink)' }}>
                          MESSAGE:
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Inquire about systems projects, performance engineering, or say hello..."
                        />
                      </div>

                      <div className="pt-1">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn"
                        >
                          <span>{isSubmitting ? 'DISPATCHING...' : 'DISPATCH MESSAGE >>'}</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                <div className="text-[11px] font-mono pt-2 border-t border-[var(--ink)]/20" style={{ color: 'var(--purple-d)' }}>
                  [SECURE] Encrypted client-side dispatch with zero heap bloat.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Sparkle SVG on top-right */}
      <Decoration position="top-right" type="sparkle" />
    </div>
  );
};
