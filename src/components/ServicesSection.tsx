import React, { useRef, useState, useEffect } from 'react';
import { ArrowUpRight, Check, Dumbbell, Globe2, ShieldPlus, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { TrainerProfile, buildWhatsAppUrl } from '../data/trainer';
import { getAssetUrl } from '../utils/assets';

interface ServicesSectionProps {
  profile: TrainerProfile;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ profile }) => {
  const serviceIcons = [Dumbbell, Globe2, ShieldPlus];
  const serviceImages = [
    getAssetUrl('images/trainer-walk.jpg'),
    getAssetUrl('images/trainer-cable-setup.jpg'),
    getAssetUrl('images/battle-ropes.jpg'),
  ];

  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Default to middle card (index 1 = Consultoria Online)
  const [activeIndex, setActiveIndex] = useState(1);

  // Track active card on horizontal scroll
  const handleScroll = () => {
    if (!carouselRef.current) return;
    const scrollLeft = carouselRef.current.scrollLeft;
    const cardWidth = cardRefs.current[0]?.offsetWidth || 300;
    const newIndex = Math.round(scrollLeft / (cardWidth + 20));
    if (newIndex >= 0 && newIndex < profile.services.length) {
      setActiveIndex(newIndex);
    }
  };

  const scrollToCard = (index: number, smooth = true) => {
    const targetCard = cardRefs.current[index];
    const carousel = carouselRef.current;
    if (targetCard && carousel) {
      const cardCenter = targetCard.offsetLeft + targetCard.offsetWidth / 2;
      const carouselCenter = carousel.offsetWidth / 2;
      const targetScrollLeft = cardCenter - carouselCenter;

      carousel.scrollTo({
        left: Math.max(0, targetScrollLeft),
        behavior: smooth ? 'smooth' : 'instant',
      });
      setActiveIndex(index);
    }
  };

  // Center middle card by default on mount ONLY inside the horizontal carousel
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    carousel.addEventListener('scroll', handleScroll, { passive: true });

    // Position horizontally to card 1 with zero impact on page vertical scroll
    const centerTimer = setTimeout(() => {
      const targetCard = cardRefs.current[1];
      if (targetCard) {
        const cardCenter = targetCard.offsetLeft + targetCard.offsetWidth / 2;
        const carouselCenter = carousel.offsetWidth / 2;
        carousel.scrollLeft = Math.max(0, cardCenter - carouselCenter);
      }
    }, 50);

    return () => {
      clearTimeout(centerTimer);
      carousel.removeEventListener('scroll', handleScroll);
    };
  }, [profile.services.length]);

  const handlePrev = () => {
    const prev = Math.max(0, activeIndex - 1);
    scrollToCard(prev);
  };

  const handleNext = () => {
    const next = Math.min(profile.services.length - 1, activeIndex + 1);
    scrollToCard(next);
  };

  return (
    <section id="servicos" className="py-20 md:py-28 bg-[#0B0D0E] text-[#F5F4F0] border-t border-[#24292E]/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-wider uppercase text-[#CCFF00] mb-3">
              <span className="w-2 h-0.5 bg-[#CCFF00]" />
              <span>Formatos de Atendimento</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight text-[#F5F4F0] leading-tight mb-3 text-balance">
              Soluções estruturadas para o seu momento e rotina.
            </h2>
            <p className="text-xs sm:text-base text-[#9E9C96]">
              Escolha o modelo de acompanhamento que melhor se encaixa nos seus horários e necessidades.
            </p>
          </div>

          {/* Quick swipe hint + arrow controls on mobile/tablet */}
          <div className="flex items-center justify-between lg:justify-end gap-3 pt-2 lg:pt-0 border-t border-[#24292E]/60 lg:border-t-0">
            <span className="text-xs font-mono text-[#CCFF00] flex items-center gap-1.5 lg:hidden">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Deslize para ver os formatos ⟷</span>
            </span>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handlePrev}
                disabled={activeIndex === 0}
                aria-label="Formato anterior"
                className="w-9 h-9 rounded-xl bg-[#181C1E] border border-[#24292E] hover:border-[#CCFF00] flex items-center justify-center text-[#F5F4F0] disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={activeIndex === profile.services.length - 1}
                aria-label="Próximo formato"
                className="w-9 h-9 rounded-xl bg-[#181C1E] border border-[#24292E] hover:border-[#CCFF00] flex items-center justify-center text-[#F5F4F0] disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Services Carousel / Grid:
            - Generous vertical padding (pt-6 pb-8) so the top green border, glow and scale are NEVER cut off!
            - Snap center ensures crisp positioning. */}
        <div
          ref={carouselRef}
          className="flex lg:grid lg:grid-cols-3 gap-5 lg:gap-8 overflow-x-auto lg:overflow-visible snap-x snap-mandatory scrollbar-none -mx-5 px-5 sm:-mx-8 sm:px-8 pt-5 pb-8"
        >
          {profile.services.map((service, idx) => {
            const Icon = serviceIcons[idx % serviceIcons.length];
            const serviceImg = serviceImages[idx % serviceImages.length];
            const isSelected = activeIndex === idx;

            const serviceWhatsAppUrl = buildWhatsAppUrl(
              profile.contact.whatsappNumber,
              `Olá! Gostaria de mais informações sobre o serviço "${service.title}". Poderia me orientar sobre horários e como iniciar?`
            );

            return (
              <div
                key={service.id}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                className={`w-[85vw] max-w-[350px] sm:w-[380px] lg:w-auto shrink-0 snap-center rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 relative group ${
                  isSelected
                    ? 'bg-[#181C1E] border-2 border-[#CCFF00] shadow-[0_0_30px_rgba(204,255,0,0.18)] ring-1 ring-[#CCFF00]/40 scale-[1.01] lg:scale-100 z-10'
                    : 'bg-[#121517] border border-[#24292E] opacity-90 lg:opacity-100 hover:border-[#38414A]'
                }`}
              >
                {/* Luminous Top Green Highlight Bar on Active Card */}
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#CCFF00] shadow-[0_0_12px_#CCFF00] z-20" />
                )}

                {/* Top Image Preview Banner */}
                <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-[#0B0D0E]">
                  <img
                    src={serviceImg}
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181C1E] via-[#181C1E]/40 to-transparent" />

                  {/* Top Bar with Icon & Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-3 z-10">
                    <div className="w-10 h-10 rounded-xl bg-[#0B0D0E]/85 backdrop-blur-sm border border-[#24292E] flex items-center justify-center text-[#CCFF00] shadow-md">
                      <Icon className="w-5 h-5" />
                    </div>
                    {service.badge && (
                      <span className="text-[11px] font-mono tracking-wider uppercase text-black bg-[#CCFF00] font-extrabold px-3 py-1 rounded-full shadow-lg shadow-black/40">
                        {service.badge}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#F5F4F0] mb-1.5">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-[#CCFF00] mb-3">
                      {service.tagline}
                    </p>
                    <p className="text-xs sm:text-sm text-[#9E9C96] leading-relaxed mb-5">
                      {service.description}
                    </p>

                    {/* Bullet points */}
                    <div className="pt-4 border-t border-[#24292E] space-y-2.5 mb-5">
                      {service.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F5F4F0]">
                          <Check className="w-4 h-4 text-[#CCFF00] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Recommended for note */}
                    <div className="p-3.5 rounded-xl bg-[#0B0D0E]/70 border border-[#24292E]/80 mb-5">
                      <span className="text-[10px] font-mono uppercase text-[#9E9C96] block mb-1 font-semibold">
                        Para quem é indicado:
                      </span>
                      <p className="text-xs text-[#9E9C96] italic leading-relaxed">
                        {service.recommendedFor}
                      </p>
                    </div>
                  </div>

                  {/* Primary WhatsApp Action */}
                  <a
                    href={serviceWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.99] text-center ${
                      isSelected
                        ? 'bg-[#CCFF00] text-black hover:bg-[#B5E600] shadow-lg shadow-[#CCFF00]/20'
                        : 'bg-[#181C1E] text-[#F5F4F0] hover:text-black hover:bg-[#CCFF00] border border-[#24292E]'
                    }`}
                  >
                    <span>{service.ctaText || 'Consultar Disponibilidade'}</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Progress Dots & Navigation on Mobile */}
        <div className="flex lg:hidden items-center justify-center gap-2 mt-2">
          {profile.services.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => scrollToCard(dotIdx)}
              type="button"
              aria-label={`Ir para formato ${dotIdx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === dotIdx
                  ? 'w-8 bg-[#CCFF00] shadow-[0_0_8px_#CCFF00]'
                  : 'w-2 bg-[#24292E] hover:bg-[#3E4752]'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
