import React from 'react';
import { motion } from 'motion/react';
import { Award, CheckCircle } from 'lucide-react';
import { TrainerProfile } from '../data/trainer';
import { AnimatedStatCounter } from './AnimatedStatCounter';

interface AboutSectionProps {
  profile: TrainerProfile;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  return (
    <section id="sobre" className="py-20 md:py-28 bg-[#0B0D0E] text-[#F5F4F0] border-t border-[#24292E]/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-wider uppercase text-[#CCFF00] mb-3">
            <span className="w-2 h-0.5 bg-[#CCFF00]" />
            <span>{profile.about.label}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#F5F4F0] max-w-2xl text-balance">
            {profile.about.headline}
          </h2>
        </motion.div>

        {/* Editorial 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Portrait & Credentials */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div className="relative rounded-2xl overflow-hidden border border-[#24292E] bg-[#121517] aspect-[3/4] group shadow-2xl">
              <img
                src={profile.media.trainerPortrait}
                alt={`Retrato profissional de ${profile.name}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D0E] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-5 left-5 right-5">
                <span className="text-xs font-mono uppercase text-[#CCFF00] tracking-wider block mb-1">
                  Registro Profissional
                </span>
                <p className="text-sm font-semibold text-[#F5F4F0]">
                  {profile.cref}
                </p>
              </div>
            </div>

            {/* Verified Credentials */}
            <div className="p-6 rounded-2xl bg-[#121517] border border-[#24292E] hover:border-[#38414A] transition-colors">
              <div className="flex items-center gap-2 text-sm font-bold text-[#F5F4F0] mb-4">
                <Award className="w-4 h-4 text-[#CCFF00]" />
                <span>Formação & Especializações</span>
              </div>
              <ul className="space-y-3">
                {profile.about.credentials.map((cred, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-[#9E9C96]"
                  >
                    <CheckCircle className="w-4 h-4 text-[#CCFF00] shrink-0 mt-0.5" />
                    <span>{cred}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right Column: Narrative Prose, Philosophy & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            <div className="space-y-5 text-sm sm:text-base md:text-lg text-[#9E9C96] leading-relaxed mb-8">
              {profile.about.bioParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Core Philosophy Callout */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="p-6 md:p-8 rounded-2xl bg-[#181C1E] border border-[#24292E] hover:border-[#CCFF00]/40 transition-all mb-10 shadow-lg"
            >
              <span className="text-xs font-mono uppercase tracking-widest text-[#CCFF00] block mb-2">
                Filosofia de Treinamento
              </span>
              <p className="text-base sm:text-lg md:text-xl font-medium text-[#F5F4F0] italic">
                "{profile.about.philosophy}"
              </p>
            </motion.div>

            {/* Key Stats Strip with Animated Numbers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#24292E]">
              {profile.about.stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                >
                  <AnimatedStatCounter numberStr={stat.number} label={stat.label} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
