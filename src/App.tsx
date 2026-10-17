/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { defaultTrainerProfile, TrainerProfile, buildWhatsAppUrl } from './data/trainer';
import { Header } from './components/Header';
import { CinematicVideoHero } from './components/CinematicVideoHero';
import { AboutSection } from './components/AboutSection';
import { PersonalizedTrainingSection } from './components/PersonalizedTrainingSection';
import { ServicesSection } from './components/ServicesSection';
import { MethodologySection } from './components/MethodologySection';
import { DifferentiatorsSection } from './components/DifferentiatorsSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { LocationSection } from './components/LocationSection';
import { FAQSection } from './components/FAQSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { VideoUploadGuideModal } from './components/VideoUploadGuideModal';

export default function App() {
  const [profile, setProfile] = useState<TrainerProfile>(defaultTrainerProfile);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [isSimulatedMobile, setIsSimulatedMobile] = useState(false);

  const floatingWhatsAppUrl = buildWhatsAppUrl(
    profile.contact.whatsappNumber,
    profile.contact.primaryMessage
  );

  return (
    <div className={`min-h-screen bg-[#0B0D0E] text-[#F5F4F0] antialiased ${isSimulatedMobile ? 'max-w-md mx-auto border-x border-[#24292E] shadow-2xl' : ''}`}>
      {/* Simulation Banner when testing mobile viewport on desktop */}
      {isSimulatedMobile && (
        <aside aria-label="Simulador de visualização mobile" className="sticky top-0 z-[60] bg-[#CCFF00] text-black text-xs font-bold py-1.5 px-4 flex items-center justify-between">
          <span>Modo Simulação: Visualização Smartphone (9:16)</span>
          <button
            onClick={() => setIsSimulatedMobile(false)}
            className="underline hover:opacity-80"
          >
            Sair
          </button>
        </aside>
      )}

      {/* SECTION 1: HEADER */}
      <Header profile={profile} isSimulatedMobile={isSimulatedMobile} />

      {/* MAIN CONTENT */}
      <main>
        {/* SECTION 2: CINEMATIC VIDEO HERO */}
        {profile.sectionVisibility.hero && (
          <CinematicVideoHero
            profile={profile}
            onOpenVideoGuide={() => setVideoModalOpen(true)}
          />
        )}

        {/* SECTION 3: ABOUT THE PERSONAL TRAINER */}
        {profile.sectionVisibility.about && (
          <AboutSection profile={profile} />
        )}

        {/* SECTION 4: PERSONALIZED TRAINING */}
        {profile.sectionVisibility.personalizedTraining && (
          <PersonalizedTrainingSection profile={profile} />
        )}

        {/* SECTION 5: SERVICES */}
        {profile.sectionVisibility.services && (
          <ServicesSection profile={profile} />
        )}

        {/* SECTION 6: METHODOLOGY */}
        {profile.sectionVisibility.methodology && (
          <MethodologySection profile={profile} />
        )}

        {/* SECTION 7: DIFFERENTIATORS */}
        {profile.sectionVisibility.differentiators && (
          <DifferentiatorsSection profile={profile} />
        )}

        {/* SECTION 8: PROFESSIONAL GALLERY */}
        {profile.sectionVisibility.gallery && (
          <GallerySection profile={profile} />
        )}

        {/* SECTION 9: TESTIMONIALS AND RESULTS */}
        {profile.sectionVisibility.testimonials && (
          <TestimonialsSection profile={profile} />
        )}

        {/* SECTION 10: LOCATION AND SERVICE AREA */}
        {profile.sectionVisibility.location && (
          <LocationSection profile={profile} />
        )}

        {/* SECTION 11: FAQ */}
        {profile.sectionVisibility.faq && (
          <FAQSection profile={profile} />
        )}

        {/* SECTION 12: FINAL CONVERSION */}
        {profile.sectionVisibility.finalCta && (
          <FinalCtaSection profile={profile} />
        )}
      </main>

      {/* SECTION 13: FOOTER */}
      <Footer
        profile={profile}
        onOpenVideoGuide={() => setVideoModalOpen(true)}
      />

      {/* FLOATING WHATSAPP CTA FOR INSTANT CONVERSION */}
      <a
        href={floatingWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com o Personal Trainer no WhatsApp"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#CCFF00] hover:bg-[#B5E600] text-black flex items-center justify-center shadow-2xl shadow-[#CCFF00]/40 transition-all hover:scale-110 active:scale-95 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
      >
        <span className="absolute inset-0 rounded-full bg-[#CCFF00] opacity-25 animate-ping -z-10 pointer-events-none" />
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
        <span className="sr-only">WhatsApp</span>
        {/* Subtle tooltip on hover */}
        <span className="absolute right-16 px-3 py-1.5 rounded-lg bg-[#181C1E] text-[#F5F4F0] text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-[#24292E] pointer-events-none shadow-lg hidden sm:inline-block">
          Conversar no WhatsApp
        </span>
      </a>

      {/* VIDEO STATUS & TEMPLATE CONFIGURATION MODAL */}
      <VideoUploadGuideModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        profile={profile}
        onUpdateProfile={(updated) => setProfile(updated)}
        isSimulatedMobile={isSimulatedMobile}
        onToggleSimulatedMobile={() => setIsSimulatedMobile(!isSimulatedMobile)}
      />
    </div>
  );
}
