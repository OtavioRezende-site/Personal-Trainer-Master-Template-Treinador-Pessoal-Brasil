import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, MessageCircle } from 'lucide-react';
import { TrainerProfile, buildWhatsAppUrl } from '../data/trainer';

interface HeaderProps {
  profile: TrainerProfile;
  isSimulatedMobile?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ profile, isSimulatedMobile }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll cleanly when menu is open without breaking touch events
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Sobre o Treinador', href: '#sobre' },
    { label: 'Individualização', href: '#individualizacao' },
    { label: 'Formatos de Atendimento', href: '#servicos' },
    { label: 'Metodologia', href: '#metodologia' },
    { label: 'Dúvidas Frequentes', href: '#duvidas' },
  ];

  const primaryWhatsAppUrl = buildWhatsAppUrl(
    profile.contact.whatsappNumber,
    profile.contact.primaryMessage
  );

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-[70] transition-all duration-300 ${
          isSimulatedMobile ? 'max-w-md mx-auto top-7' : 'top-0'
        } ${
          isScrolled
            ? 'bg-[#0B0D0E]/95 backdrop-blur-md border-b border-[#24292E]/80 py-3 shadow-2xl'
            : 'bg-gradient-to-b from-[#0B0D0E]/80 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-4">
          {/* Logo / Wordmark */}
          <a
            href="#"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setMobileMenuOpen(false);
            }}
            className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-[#F5F4F0] hover:text-[#CCFF00] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span>{profile.name}</span>
            <span className="text-[#CCFF00] font-mono text-xs opacity-80 hidden sm:inline">
              · {profile.cref.split(' ')[0]}
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#9E9C96]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#CCFF00] transition-colors whitespace-nowrap shrink-0"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={primaryWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-semibold text-black bg-[#CCFF00] hover:bg-[#B5E600] rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-md shadow-[#CCFF00]/10"
            >
              <span>Agendar Consulta</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            {/* Mobile Menu Toggle Button: Active and clickable in all sections */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              className="lg:hidden p-2.5 -mr-1 text-[#F5F4F0] hover:text-[#CCFF00] bg-[#121517]/90 border border-[#24292E] rounded-xl transition-all active:scale-95 touch-manipulation cursor-pointer shadow-md"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#CCFF00]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Menu Drawer with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`fixed inset-0 z-[80] bg-[#0B0D0E] flex flex-col justify-between p-6 sm:p-8 overflow-y-auto ${
              isSimulatedMobile ? 'max-w-md mx-auto' : ''
            }`}
          >
            {/* Top Bar inside Drawer */}
            <div className="flex items-center justify-between pb-6 border-b border-[#24292E]">
              <span className="text-base font-bold text-[#F5F4F0] flex items-center gap-2">
                <span>{profile.name}</span>
                <span className="text-[#CCFF00] text-xs font-mono">· Menu</span>
              </span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Fechar menu"
                className="p-2.5 text-[#F5F4F0] hover:text-[#CCFF00] bg-[#181C1E] border border-[#24292E] rounded-xl active:scale-95 transition-all touch-manipulation cursor-pointer"
              >
                <X className="w-5 h-5 text-[#CCFF00]" />
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col gap-2 my-auto py-8">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: idx * 0.05 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xl font-bold text-[#F5F4F0] hover:text-[#CCFF00] py-3.5 border-b border-[#24292E]/40 transition-colors flex items-center justify-between active:text-[#CCFF00]"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-5 h-5 text-[#9E9C96]" />
                </motion.a>
              ))}
            </nav>

            {/* Bottom Drawer CTA */}
            <div className="pt-6 border-t border-[#24292E]">
              <a
                href={primaryWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2.5 w-full py-4 text-sm font-bold text-black bg-[#CCFF00] hover:bg-[#B5E600] rounded-xl transition-all shadow-lg active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Iniciar Conversa no WhatsApp</span>
              </a>
              <p className="text-center text-xs text-[#9E9C96] mt-4 font-mono">
                {profile.city} · {profile.state} · {profile.cref}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
