import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { TrainerProfile, buildWhatsAppUrl } from '../data/trainer';

interface FinalCtaSectionProps {
  profile: TrainerProfile;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ profile }) => {
  const finalWhatsAppUrl = buildWhatsAppUrl(
    profile.contact.whatsappNumber,
    profile.contact.consultationMessage
  );

  return (
    <section className="py-20 md:py-32 bg-[#121517] text-[#F5F4F0] border-t border-[#24292E]/60 relative overflow-hidden">
      {/* Decorative ambient radial glow with subtle pulse animation */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.08, 0.16, 0.08],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-[#CCFF00] blur-[140px] rounded-full pointer-events-none"
      />

      <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          className="text-xs font-mono font-bold uppercase tracking-widest text-[#CCFF00] block mb-4"
        >
          Inicie sua Jornada
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F5F4F0] leading-tight mb-6 text-balance"
        >
          {profile.finalCta.headline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-base sm:text-lg md:text-xl text-[#9E9C96] max-w-2xl mx-auto leading-relaxed mb-10"
        >
          {profile.finalCta.subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href={finalWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 sm:px-9 py-4 sm:py-4.5 text-base md:text-lg font-bold text-black bg-[#CCFF00] hover:bg-[#B5E600] rounded-2xl transition-all shadow-xl hover:shadow-[#CCFF00]/30 text-center"
          >
            <MessageCircle className="w-5 h-5 shrink-0" />
            <span>{profile.finalCta.ctaText}</span>
            <ArrowUpRight className="w-5 h-5 shrink-0" />
          </motion.a>
        </motion.div>

        <p className="text-xs text-[#9E9C96] mt-6">
          {profile.finalCta.supportNote}
        </p>
      </div>
    </section>
  );
};
