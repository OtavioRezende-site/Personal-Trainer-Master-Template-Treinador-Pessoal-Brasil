import React from 'react';
import { ArrowUp, Instagram, Mail, MessageCircle, Settings } from 'lucide-react';
import { TrainerProfile, buildWhatsAppUrl } from '../data/trainer';

interface FooterProps {
  profile: TrainerProfile;
  onOpenVideoGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onOpenVideoGuide }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsAppUrl = buildWhatsAppUrl(
    profile.contact.whatsappNumber,
    profile.contact.primaryMessage
  );

  return (
    <footer className="bg-[#0B0D0E] text-[#9E9C96] border-t border-[#24292E] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#24292E]/60">
          {/* Brand & Professional Info */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <a href="#" className="text-xl font-bold text-[#F5F4F0] block mb-2">
                {profile.name}
              </a>
              <p className="text-xs font-mono text-[#CCFF00] mb-4">
                {profile.cref}
              </p>
              <p className="text-xs sm:text-sm text-[#9E9C96] leading-relaxed max-w-sm">
                Atendimento presencial individualizado e consultoria remota fundamentada em biomecânica aplicada e longevidade ativa.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={onOpenVideoGuide}
                className="inline-flex items-center gap-1.5 text-xs text-[#F5F4F0] hover:text-[#CCFF00] bg-[#181C1E] border border-[#24292E] px-3 py-1.5 rounded-lg transition-colors"
                title="Configurações do Master Template e Mídias"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Configurar Mídia & Vídeos</span>
              </button>
            </div>
          </div>

          {/* Site Navigation */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#F5F4F0] mb-4">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#sobre" className="hover:text-[#CCFF00] transition-colors">
                  Sobre o Treinador
                </a>
              </li>
              <li>
                <a href="#individualizacao" className="hover:text-[#CCFF00] transition-colors">
                  O Método
                </a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-[#CCFF00] transition-colors">
                  Serviços Oferecidos
                </a>
              </li>
              <li>
                <a href="#metodologia" className="hover:text-[#CCFF00] transition-colors">
                  Processo & Etapas
                </a>
              </li>
              <li>
                <a href="#duvidas" className="hover:text-[#CCFF00] transition-colors">
                  Perguntas Frequentes
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Channels */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#F5F4F0] mb-4">
              Canais Diretos
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li>
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-[#F5F4F0] hover:text-[#CCFF00] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#CCFF00]" />
                  <span>WhatsApp: {profile.contact.whatsappDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={profile.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 hover:text-[#CCFF00] transition-colors"
                >
                  <Instagram className="w-4 h-4 text-[#CCFF00]" />
                  <span>{profile.contact.instagramHandle}</span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-2.5 text-[#9E9C96]">
                  <Mail className="w-4 h-4 text-[#CCFF00]" />
                  <span>{profile.contact.email}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} {profile.brandName}. Todos os direitos reservados.</p>
          <p className="text-[#6D6B65]">
            Template Master desenvolvido para Personal Trainers de Alta Performance.
          </p>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-[#9E9C96] hover:text-[#CCFF00] transition-colors"
            aria-label="Voltar ao topo da página"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
