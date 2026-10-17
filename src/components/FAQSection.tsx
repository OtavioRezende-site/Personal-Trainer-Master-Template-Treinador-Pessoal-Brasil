import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { TrainerProfile } from '../data/trainer';

interface FAQSectionProps {
  profile: TrainerProfile;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ profile }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="duvidas" className="py-20 md:py-28 bg-[#0B0D0E] text-[#F5F4F0] border-t border-[#24292E]/60 overflow-hidden">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        {/* Header with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-wider uppercase text-[#CCFF00] mb-3">
            <span className="w-2 h-0.5 bg-[#CCFF00]" />
            <span>{profile.faq.label}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#F5F4F0] mb-3 text-balance">
            {profile.faq.headline}
          </h2>
          <p className="text-sm text-[#9E9C96]">
            {profile.faq.subheadline}
          </p>
        </motion.div>

        {/* Accordion List with Smooth Expansion */}
        <div className="space-y-4">
          {profile.faq.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="rounded-2xl bg-[#121517] border border-[#24292E] hover:border-[#38414A] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full py-5 px-6 sm:px-8 flex items-center justify-between gap-4 text-left font-bold text-base sm:text-lg text-[#F5F4F0] hover:text-[#CCFF00] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#CCFF00]"
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#9E9C96] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#CCFF00]' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-8 pb-6 text-sm sm:text-base text-[#9E9C96] leading-relaxed border-t border-[#24292E]/60 pt-4">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
