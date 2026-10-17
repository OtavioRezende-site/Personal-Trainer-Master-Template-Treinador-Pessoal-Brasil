import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';
import { TrainerProfile } from '../data/trainer';

interface DifferentiatorsSectionProps {
  profile: TrainerProfile;
}

export const DifferentiatorsSection: React.FC<DifferentiatorsSectionProps> = ({ profile }) => {
  return (
    <section className="py-20 md:py-28 bg-[#0B0D0E] text-[#F5F4F0] border-t border-[#24292E]/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-14 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-wider uppercase text-[#CCFF00] mb-3">
            <span className="w-2 h-0.5 bg-[#CCFF00]" />
            <span>{profile.differentiators.label}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#F5F4F0] leading-tight text-balance">
            {profile.differentiators.headline}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {profile.differentiators.items.map((diff, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="p-8 rounded-2xl bg-[#121517] border border-[#24292E] hover:border-[#CCFF00]/40 transition-all shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-[#181C1E] border border-[#24292E] flex items-center justify-center text-[#CCFF00]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#F5F4F0]">
                  {diff.title}
                </h3>
              </div>
              <p className="text-sm sm:text-base text-[#9E9C96] leading-relaxed">
                {diff.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
