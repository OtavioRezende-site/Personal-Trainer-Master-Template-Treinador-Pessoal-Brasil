import React from 'react';
import { motion } from 'motion/react';
import { Target, Activity, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { TrainerProfile } from '../data/trainer';

interface PersonalizedTrainingSectionProps {
  profile: TrainerProfile;
}

export const PersonalizedTrainingSection: React.FC<PersonalizedTrainingSectionProps> = ({ profile }) => {
  const iconMap = [Target, Activity, Clock, ShieldCheck];

  return (
    <section id="individualizacao" className="py-20 md:py-28 bg-[#121517] text-[#F5F4F0] border-t border-[#24292E]/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header Block with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-14 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-wider uppercase text-[#CCFF00] mb-3">
            <span className="w-2 h-0.5 bg-[#CCFF00]" />
            <span>{profile.personalizedTraining.label}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight text-[#F5F4F0] leading-tight mb-5 text-balance">
            {profile.personalizedTraining.headline}
          </h2>
          <p className="text-base sm:text-lg text-[#9E9C96] leading-relaxed">
            {profile.personalizedTraining.lead}
          </p>
        </motion.div>

        {/* 2-Column Section: 4 Pillars on Left & Real Coaching Photography on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Pillars Grid with Staggered Entrance */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profile.personalizedTraining.pillars.map((pillar, idx) => {
              const Icon = iconMap[idx % iconMap.length];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -4, borderColor: 'rgba(204, 255, 0, 0.4)' }}
                  className="bg-[#0B0D0E] hover:bg-[#181C1E] border border-[#24292E] transition-all p-6 sm:p-7 rounded-2xl flex flex-col justify-between group shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono text-[#CCFF00] tracking-widest uppercase">
                        0{idx + 1} // Pilar
                      </span>
                      <Icon className="w-5 h-5 text-[#9E9C96] group-hover:text-[#CCFF00] transition-colors" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#F5F4F0] mb-2 group-hover:text-white transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#9E9C96] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Real Gym Photography with Overlay Detail */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative rounded-3xl overflow-hidden border border-[#24292E] hover:border-[#38414A] bg-[#0B0D0E] min-h-[380px] group flex flex-col justify-end p-6 sm:p-8 shadow-2xl"
          >
            <img
              src="/images/client-squat.jpg"
              alt="Treinador ajustando postura da aluna no agachamento com kettlebell"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            {/* Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D0E] via-[#0B0D0E]/60 via-40% to-transparent" />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#CCFF00] tracking-wider uppercase mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" /> Supervisão em Tempo Real
              </span>
              <h4 className="text-lg sm:text-xl font-bold text-[#F5F4F0] mb-1">
                Correção de Ângulos e Sobrecarga
              </h4>
              <p className="text-xs sm:text-sm text-[#9E9C96] leading-relaxed">
                Cada movimento é acompanhado lado a lado, prevenindo compensações lombares e garantindo máxima eficiência neuromuscular.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Visual Comparison Strip: Generic Routine vs Precision Coaching */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="p-6 sm:p-8 rounded-2xl bg-[#0B0D0E] border border-[#24292E] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
        >
          <div className="max-w-2xl">
            <h4 className="text-base sm:text-lg font-bold text-[#F5F4F0] mb-1">
              Treinar com propósito vs. Cumprir repetições
            </h4>
            <p className="text-xs sm:text-sm text-[#9E9C96]">
              A diferença entre o desânimo de uma ficha impessoal e a motivação diária de saber exatamente o porquê de cada série, carga e descanso.
            </p>
          </div>
          <a
            href="#servicos"
            className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#CCFF00] hover:text-black hover:bg-[#CCFF00] border border-[#CCFF00] rounded-xl transition-all whitespace-nowrap shrink-0 active:scale-95"
          >
            Ver Formatos de Atendimento
          </a>
        </motion.div>
      </div>
    </section>
  );
};
