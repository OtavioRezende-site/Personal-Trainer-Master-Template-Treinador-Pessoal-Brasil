import React from 'react';
import { motion } from 'motion/react';
import { TrainerProfile } from '../data/trainer';

interface MethodologySectionProps {
  profile: TrainerProfile;
}

export const MethodologySection: React.FC<MethodologySectionProps> = ({ profile }) => {
  return (
    <section id="metodologia" className="py-20 md:py-28 bg-[#121517] text-[#F5F4F0] border-t border-[#24292E]/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-14 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-wider uppercase text-[#CCFF00] mb-3">
            <span className="w-2 h-0.5 bg-[#CCFF00]" />
            <span>{profile.methodology.label}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight text-[#F5F4F0] leading-tight mb-4 text-balance">
            {profile.methodology.headline}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#9E9C96]">
            {profile.methodology.subheadline}
          </p>
        </motion.div>

        {/* Chronological Step-by-Step Flow with Motion */}
        <div className="relative border-l border-[#24292E] ml-4 md:ml-8 pl-6 md:pl-12 space-y-10 md:space-y-14">
          {profile.methodology.steps.map((item, index) => {
            const hasPhoto = index === 3; // Step 04 has visual proof

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="relative group"
              >
                {/* Dot marker on line */}
                <div className="absolute -left-[31px] md:-left-[55px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#181C1E] border-2 border-[#CCFF00] group-hover:bg-[#CCFF00] transition-colors" />

                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-12 p-6 md:p-8 rounded-2xl bg-[#0B0D0E] border border-[#24292E] group-hover:border-[#CCFF00]/40 transition-all shadow-lg"
                >
                  <div className="lg:w-1/3">
                    <span className="text-xs font-mono font-bold text-[#CCFF00] tracking-wider block mb-1">
                      ETAPA {item.step}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-[#F5F4F0] group-hover:text-white transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#9E9C96] mt-1 italic">
                      {item.summary}
                    </p>
                  </div>

                  <div className="lg:w-2/3 pt-3 lg:pt-0 lg:border-l lg:border-[#24292E] lg:pl-8 text-sm sm:text-base text-[#9E9C96] leading-relaxed">
                    <p className="mb-3">{item.details}</p>
                    {hasPhoto && (
                      <div className="mt-4 rounded-xl overflow-hidden border border-[#24292E] relative h-40 w-full max-w-md group-hover:border-[#CCFF00]/40 transition-colors shadow-md">
                        <img
                          src="/images/battle-ropes.jpg"
                          alt="Sessão de treinamento com cordas navais e acompanhamento do treinador"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                          <span className="text-[11px] font-mono text-[#CCFF00]">
                            Supervisão direta e incentivo em cada repetição
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
