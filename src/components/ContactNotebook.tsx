import React, { useState } from 'react';
import { SpiralBinding } from './SpiralBinding';
import { PostageStamp } from './PostageStamp';
import { PERSONAL_INFO } from '../data/portfolioData';
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
      alert("Please fill in your name, email, and message! ✎");
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
        colors: ['#FCEBEB', '#F1EBF5', '#EEF3EB', '#FEF7DA', '#E27B7B'],
      });
    }, 600);
  };

  return (
    <section id="contact" className="relative mb-14 select-none">
      <div className="relative bg-[#FAF5EB] border-2 md:border-[3px] border-[#3C3530] shadow-[6px_6px_0px_#3C3530] rounded-2xl md:rounded-3xl p-5 md:p-8">
        {/* Section Title */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-dashed border-[#3C3530]/20 pb-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#E27B7B]">
              <span>💌 ⋆ ✎</span>
              <span>send a letter, collaborate or say hi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#3C3530] flex items-center gap-2">
              <span>Notebook Contact</span>
              <span className="text-xl">🌸</span>
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <PostageStamp icon="💌" label="MAIL" price="✿ 1st" color="#FCEBEB" />
          </div>
        </div>

        {/* Content Layout: Left Information & Doodles, Right Spiral Pad Insert */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Info & Sticky Notes */}
          <div className="lg:col-span-5 text-left space-y-4">
            <div className="bg-[#FEF7DA] p-5 rounded-2xl border-2 border-[#3C3530] shadow-[3px_3px_0px_#3C3530] rotate-[-1deg]">
              <h3 className="font-extrabold text-lg text-[#3C3530] mb-2 flex items-center gap-2">
                <span>📬</span>
                <span>Direct Mailbox</span>
              </h3>
              <p className="text-sm text-[#3C3530]/90 mb-3">
                whether you want to discuss systems programming, C++ custom allocators, research collaborations, or full-time / internship opportunities—my inbox is always open!
              </p>
              <div className="space-y-1.5 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold">email:</span>
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="underline text-[#E27B7B] font-bold">
                    {PERSONAL_INFO.email}
                  </a>
                </div>
                <div>
                  <span className="font-bold">location:</span> {PERSONAL_INFO.location}
                </div>
                <div>
                  <span className="font-bold">campus:</span> {PERSONAL_INFO.institution}
                </div>
              </div>
            </div>

            {/* Quick Stamps Container */}
            <div className="bg-[#FAF5EB] p-4 rounded-xl border-2 border-[#3C3530] shadow-[2px_2px_0px_#3C3530] flex flex-wrap items-center justify-around gap-2">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="hover:scale-105 transition-transform"
              >
                <PostageStamp icon="🐙" label="GITHUB" price="★ FREE" color="#FAF5EB" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:scale-105 transition-transform"
              >
                <PostageStamp icon="💼" label="LINKEDIN" price="★ NET" color="#EBF4F5" />
              </a>
              <a
                href="/RESUME_Q-1.pdf"
                target="_blank"
                rel="noreferrer"
                className="hover:scale-105 transition-transform"
              >
                <PostageStamp icon="📄" label="RESUME" price="★ PDF" color="#EEF3EB" />
              </a>
            </div>
          </div>

          {/* Right: The Exact Spiral Pad Insert from the Mockup */}
          <div className="lg:col-span-7">
            <div className="relative bg-white rounded-2xl border-2 md:border-[3px] border-[#3C3530] shadow-[5px_5px_0px_#3C3530] overflow-hidden">
              {/* Spiral rings on the left edge of this insert pad */}
              <div className="absolute left-0 top-0 bottom-0 w-8 z-20 bg-[#F5EFE6] border-r-2 border-[#3C3530] flex flex-col justify-around py-3">
                <SpiralBinding count={10} />
              </div>

              {/* Pad inner content (with left padding for spiral rings) */}
              <div className="pl-12 pr-6 py-6 text-left relative bg-lined-paper min-h-[380px] flex flex-col justify-between">
                {/* Dog-eared bottom-right corner with smiley face */}
                <div className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none">
                  {/* Fold triangle */}
                  <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[48px] border-b-[#EADBC8] border-l-[48px] border-l-transparent drop-shadow-[-2px_-2px_2px_rgba(0,0,0,0.15)]" />
                  <div className="absolute bottom-1 right-2 text-xs font-bold text-[#3C3530] select-none rotate-[-45deg]">
                    ( ◠‿◠ )
                  </div>
                </div>

                <div>
                  {/* Title */}
                  <div className="flex items-center justify-between border-b-2 border-[#3C3530] pb-2 mb-4">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#3C3530] tracking-tight">
                      Contact Form <span className="text-sm font-normal text-[#3C3530]/60 font-mono">✎</span>
                    </h3>
                    <span className="text-xs font-mono text-[#3C3530]/60">tear-away pad</span>
                  </div>

                  {isSubmitted ? (
                    <div className="py-12 text-center space-y-3">
                      <div className="text-5xl animate-bounce">💌</div>
                      <h4 className="text-2xl font-bold text-[#3C3530]">message delivered! ✿</h4>
                      <p className="text-sm text-[#3C3530]/80 font-mono max-w-sm mx-auto">
                        thank you {formData.name}! your note has landed on uday's desk. i'll get back to you soon!
                      </p>
                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({ name: '', email: '', message: '' });
                        }}
                        className="mt-4 px-4 py-1.5 bg-[#FEF7DA] border-2 border-[#3C3530] rounded-xl font-bold text-xs shadow-[2px_2px_0px_#3C3530]"
                      >
                        ✎ write another note
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Name input */}
                      <div>
                        <label className="block text-xs sm:text-sm font-bold text-[#3C3530] mb-0.5">
                          your name! ✎
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Yuki, Ada Lovelace..."
                          className="w-full bg-transparent border-b-2 border-[#3C3530] px-1 py-1 text-sm font-medium text-[#3C3530] placeholder-[#3C3530]/40 focus:outline-none focus:border-[#E27B7B]"
                        />
                      </div>

                      {/* Email input */}
                      <div>
                        <label className="block text-xs sm:text-sm font-bold text-[#3C3530] mb-0.5">
                          email ✎
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="your.email@domain.com"
                          className="w-full bg-transparent border-b-2 border-[#3C3530] px-1 py-1 text-sm font-medium text-[#3C3530] placeholder-[#3C3530]/40 focus:outline-none focus:border-[#E27B7B]"
                        />
                      </div>

                      {/* Message input */}
                      <div>
                        <label className="block text-xs sm:text-sm font-bold text-[#3C3530] mb-0.5">
                          message ~
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="say hello, discuss low-latency systems or send a doodle..."
                          className="w-full bg-transparent border-b-2 border-[#3C3530] px-1 py-1 text-sm font-medium text-[#3C3530] placeholder-[#3C3530]/40 focus:outline-none focus:border-[#E27B7B] resize-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-6 py-2 bg-[#FCEBEB] hover:bg-[#FAD9D9] border-2 md:border-[3px] border-[#3C3530] rounded-full font-extrabold text-sm sm:text-base shadow-[3px_3px_0px_#3C3530] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group"
                        >
                          <span className="group-hover:scale-125 transition-transform text-[#E27B7B]">♡</span>
                          <span>{isSubmitting ? 'Sending...' : 'Submit'}</span>
                          <span className="text-xs font-normal text-[#3C3530]/60 font-mono">✿</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                <div className="pt-4 text-[11px] font-mono text-[#3C3530]/60 flex items-center gap-1">
                  <span>✎</span>
                  <span>auto-dispatched with love and zero heap allocation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
