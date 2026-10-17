import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { TrainerProfile, buildWhatsAppUrl } from '../data/trainer';

interface CinematicVideoHeroProps {
  profile: TrainerProfile;
  onOpenVideoGuide?: () => void;
}

export const CinematicVideoHero: React.FC<CinematicVideoHeroProps> = ({
  profile,
}) => {
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  // Responsive device / orientation detection
  useEffect(() => {
    const checkViewport = () => {
      // Below 768px is smartphone layout (portrait 9:16)
      // Between 768px and 1023px (tablets): if window height > window width (portrait), use mobile 9:16; if landscape, use desktop 16:9
      const isPortrait = window.innerHeight > window.innerWidth;
      const isNarrow = window.innerWidth < 1024;
      setIsMobileDevice(isNarrow && (window.innerWidth < 768 || isPortrait));
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);

    // Check prefers-reduced-motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', checkViewport);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // Handle video autoplay safely
  useEffect(() => {
    if (prefersReducedMotion) return;

    const activeVideo = isMobileDevice ? mobileVideoRef.current : desktopVideoRef.current;
    if (activeVideo) {
      activeVideo.muted = true;
      const playPromise = activeVideo.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setVideoLoaded(true);
            setVideoError(false);
          })
          .catch((err) => {
            console.warn('Autoplay unfulfilled or media not yet available:', err);
          });
      }
    }
  }, [isMobileDevice, prefersReducedMotion]);

  const handleVideoError = () => {
    setVideoError(true);
  };

  const primaryWhatsAppUrl = buildWhatsAppUrl(
    profile.contact.whatsappNumber,
    profile.contact.primaryMessage
  );

  return (
    <section className="relative w-full h-[100dvh] min-h-[100dvh] max-h-[100dvh] flex flex-col justify-between overflow-hidden bg-[#0B0D0E] select-none">
      {/* 1. CINEMATIC VIDEO & POSTER CONTAINER */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {/* DESKTOP & WIDE TABLET (16:9 Aspect Ratio) */}
        {!isMobileDevice && (
          <div className="relative w-full h-full">
            {/* Fallback & Preload Poster Image */}
            <img
              src={profile.media.desktopPoster}
              alt="Ambiente de treinamento funcional e musculação"
              referrerPolicy="no-referrer"
              className={`absolute inset-0 w-full h-full object-cover object-[70%_center] xl:object-center transition-opacity duration-700 ${
                videoLoaded && !videoError ? 'opacity-0' : 'opacity-100'
              }`}
            />

            {!prefersReducedMotion && (
              <video
                ref={desktopVideoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={profile.media.desktopPoster}
                onLoadedData={() => setVideoLoaded(true)}
                onError={handleVideoError}
                className={`absolute inset-0 w-full h-full object-cover object-[70%_center] xl:object-center transition-opacity duration-700 ${
                  videoLoaded && !videoError ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <source src={profile.media.heroDesktopVideo} type="video/mp4" />
              </video>
            )}

            {/* Desktop Asymmetric Gradient Scrim:
                Protects left text area without darkening the right action */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0D0E]/95 via-[#0B0D0E]/60 via-45% to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D0E] via-transparent to-[#0B0D0E]/40" />
          </div>
        )}

        {/* MOBILE & PORTRAIT TABLET (9:16 Aspect Ratio) */}
        {isMobileDevice && (
          <div className="relative w-full h-full">
            {/* Fallback & Preload Poster Image */}
            <img
              src={profile.media.mobilePoster}
              alt="Treinador acompanhando execução de exercício no estúdio"
              referrerPolicy="no-referrer"
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${
                videoLoaded && !videoError ? 'opacity-0' : 'opacity-100'
              }`}
            />

            {!prefersReducedMotion && (
              <video
                ref={mobileVideoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={profile.media.mobilePoster}
                onLoadedData={() => setVideoLoaded(true)}
                onError={handleVideoError}
                className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${
                  videoLoaded && !videoError ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <source src={profile.media.heroMobileVideo} type="video/mp4" />
              </video>
            )}

            {/* Mobile Contrast Scrim:
                Keeps top and middle completely clear and open so the video action and coach are totally visible.
                Only applies a controlled dark gradient at the very bottom where the compact texts sit. */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D0E] via-[#0B0D0E]/80 via-35% to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B0D0E]/60 via-transparent via-15% to-transparent" />
          </div>
        )}
      </div>

      {/* 2. TOP SPACER (Keeps clear space under sticky header) */}
      <div className="relative z-10 pt-16 sm:pt-20 shrink-0" />

      {/* 3. HERO CONTENT AREA (DESKTOP ON LEFT / MOBILE IN CONTROLLED BOTTOM ANCHOR) */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full flex-1 flex flex-col justify-end lg:justify-center pb-4 sm:pb-8">
        <div className="max-w-2xl text-left w-full">
          {/* Subtle Label / Credential (Never overflows or cuts off on mobile) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-[10px] sm:text-xs md:text-sm font-semibold tracking-wider uppercase text-[#CCFF00] mb-2 sm:mb-3 max-w-full"
          >
            <span className="w-2 h-0.5 bg-[#CCFF00] shrink-0" />
            <span className="sm:hidden tracking-normal">Atendimento Individualizado</span>
            <span className="hidden sm:inline">{profile.hero.badge}</span>
          </motion.div>

          {/* Main Headline: Compact & balanced on mobile so it never clips or obscures video */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F5F4F0] leading-[1.12] sm:leading-[1.08] mb-2 sm:mb-4 text-balance break-words"
          >
            <span className="hidden sm:inline">{profile.hero.headline}{' '}</span>
            <span className="sm:hidden">Treinamento individualizado </span>
            <span className="text-[#CCFF00] sm:block sm:mt-1">
              com rigor biomecânico.
            </span>
          </motion.h1>

          {/* Persuasive Supporting Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-xs sm:text-base md:text-lg text-[#9E9C96] leading-relaxed max-w-xl mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-none break-words"
          >
            {profile.hero.subheadline}
          </motion.p>

          {/* Action CTAs: Protected with pr-16 on mobile to avoid overlapping floating WhatsApp button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-4 w-full pr-16 sm:pr-0"
          >
            {/* Primary Action Button */}
            <a
              href={primaryWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3.5 text-xs sm:text-sm md:text-base font-bold text-black bg-[#CCFF00] hover:bg-[#B5E600] rounded-xl transition-all shadow-lg hover:shadow-[#CCFF00]/20 active:scale-[0.98] whitespace-nowrap"
            >
              <span>{profile.hero.primaryCtaText}</span>
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>

            {/* Secondary Anchor to Methodology */}
            <a
              href="#metodologia"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm md:text-base font-medium text-[#9E9C96] hover:text-[#CCFF00] transition-colors py-1 sm:py-0 whitespace-nowrap"
            >
              <span>Conhecer a Metodologia</span>
              <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* 4. BOTTOM BAR: KEY METRICS STRIP (Fills exactly 100dvh without vertical scroll or overflow) */}
      <div className="relative z-10 w-full border-t border-[#24292E]/60 bg-[#0B0D0E]/80 backdrop-blur-sm pb-safe shrink-0">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-2 sm:py-3 flex items-center justify-between gap-4 text-xs text-[#9E9C96] pr-16 sm:pr-8">
          <div className="flex items-center gap-2 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] shrink-0" />
            <span className="font-medium text-[#F5F4F0] truncate">{profile.name}</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">{profile.cref}</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <span>Presencial em {profile.city}</span>
            <span>·</span>
            <span>Consultoria Online em todo o Brasil</span>
          </div>

          <a
            href="#sobre"
            className="hidden sm:inline-flex items-center gap-1.5 hover:text-[#CCFF00] transition-colors shrink-0 text-[11px] sm:text-xs"
          >
            <span>Conhecer método</span>
            <ArrowDown className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
};
