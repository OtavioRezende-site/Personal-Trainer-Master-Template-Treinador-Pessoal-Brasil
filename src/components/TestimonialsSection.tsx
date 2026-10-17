import React from 'react';
import { Quote, AlertCircle } from 'lucide-react';
import { TrainerProfile } from '../data/trainer';

interface TestimonialsSectionProps {
  profile: TrainerProfile;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ profile }) => {
  if (!profile.sectionVisibility.testimonials) {
    return null;
  }

  return (
    <section className="py-20 md:py-28 bg-[#0B0D0E] text-[#F5F4F0] border-t border-[#24292E]/60">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-wider uppercase text-[#CCFF00] mb-3">
            <span className="w-2 h-0.5 bg-[#CCFF00]" />
            <span>{profile.testimonials.label}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#F5F4F0] mb-3 text-balance">
            {profile.testimonials.headline}
          </h2>
          <p className="text-sm text-[#9E9C96]">
            {profile.testimonials.subheadline}
          </p>

          {/* Compliance notice */}
          {profile.isDemoProfile && (
            <div className="mt-4 inline-flex items-center gap-2 p-2.5 rounded-lg bg-[#181C1E] border border-[#24292E] text-xs text-[#9E9C96]">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{profile.testimonials.disclaimer}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {profile.testimonials.items.map((item) => (
            <div
              key={item.id}
              className="p-8 rounded-2xl bg-[#121517] border border-[#24292E] flex flex-col justify-between"
            >
              <div>
                <Quote className="w-8 h-8 text-[#CCFF00] opacity-40 mb-4" />
                <p className="text-sm sm:text-base text-[#F5F4F0] leading-relaxed italic mb-6">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#24292E]">
                <h4 className="text-sm font-bold text-[#F5F4F0]">
                  {item.author}
                </h4>
                <p className="text-xs text-[#9E9C96]">
                  {item.role} · {item.focus}
                </p>
                <span className="inline-block mt-2 text-[11px] font-mono text-[#CCFF00]">
                  {item.verifiedLabel}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
