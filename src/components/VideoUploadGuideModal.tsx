import React, { useState, useEffect } from 'react';
import { X, Video, CheckCircle2, AlertCircle, Copy, Check, Sliders, Smartphone, Monitor } from 'lucide-react';
import { TrainerProfile } from '../data/trainer';

interface VideoUploadGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: TrainerProfile;
  onUpdateProfile: (updated: TrainerProfile) => void;
  isSimulatedMobile: boolean;
  onToggleSimulatedMobile: () => void;
}

export const VideoUploadGuideModal: React.FC<VideoUploadGuideModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
  isSimulatedMobile,
  onToggleSimulatedMobile,
}) => {
  const [activeTab, setActiveTab] = useState<'video' | 'profile' | 'code'>('video');
  const [desktopVideoStatus, setDesktopVideoStatus] = useState<'checking' | 'found' | 'missing'>('checking');
  const [mobileVideoStatus, setMobileVideoStatus] = useState<'checking' | 'found' | 'missing'>('checking');
  const [copiedCode, setCopiedCode] = useState(false);

  // Editable fields state
  const [trainerName, setTrainerName] = useState(profile.name);
  const [trainerCref, setTrainerCref] = useState(profile.cref);
  const [trainerTitle, setTrainerTitle] = useState(profile.title);
  const [trainerPhone, setTrainerPhone] = useState(profile.contact.whatsappNumber);
  const [showTestimonials, setShowTestimonials] = useState(profile.sectionVisibility.testimonials);

  // Check if video files exist via fetch HEAD
  useEffect(() => {
    if (!isOpen) return;

    fetch(profile.media.heroDesktopVideo, { method: 'HEAD' })
      .then((res) => {
        setDesktopVideoStatus(res.ok ? 'found' : 'missing');
      })
      .catch(() => setDesktopVideoStatus('missing'));

    fetch(profile.media.heroMobileVideo, { method: 'HEAD' })
      .then((res) => {
        setMobileVideoStatus(res.ok ? 'found' : 'missing');
      })
      .catch(() => setMobileVideoStatus('missing'));
  }, [isOpen, profile.media.heroDesktopVideo, profile.media.heroMobileVideo]);

  if (!isOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: TrainerProfile = {
      ...profile,
      name: trainerName,
      brandName: `${trainerName} · Performance & Saúde`,
      cref: trainerCref,
      title: trainerTitle,
      contact: {
        ...profile.contact,
        whatsappNumber: trainerPhone,
        whatsappDisplay: trainerPhone.replace(/^55(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3'),
      },
      sectionVisibility: {
        ...profile.sectionVisibility,
        testimonials: showTestimonials,
      },
    };
    onUpdateProfile(updated);
    setActiveTab('video');
  };

  const copyConfigSnippet = () => {
    const jsonStr = JSON.stringify(profile, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#121517] border border-[#24292E] rounded-3xl shadow-2xl text-[#F5F4F0] p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#24292E]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#CCFF00]/10 border border-[#CCFF00]/20 flex items-center justify-center text-[#CCFF00]">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#F5F4F0]">
                Central de Mídia & Master Template
              </h3>
              <p className="text-xs text-[#9E9C96]">
                Integração dos vídeos hero e personalização ágil para novos clientes
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Fechar painel"
            className="p-2 text-[#9E9C96] hover:text-[#F5F4F0] rounded-lg hover:bg-[#181C1E] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 my-6 p-1 bg-[#0B0D0E] rounded-xl border border-[#24292E]">
          <button
            onClick={() => setActiveTab('video')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'video'
                ? 'bg-[#181C1E] text-[#CCFF00] shadow-sm'
                : 'text-[#9E9C96] hover:text-[#F5F4F0]'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Status dos Vídeos Hero</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'profile'
                ? 'bg-[#181C1E] text-[#CCFF00] shadow-sm'
                : 'text-[#9E9C96] hover:text-[#F5F4F0]'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Editar Dados do Treinador</span>
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'code'
                ? 'bg-[#181C1E] text-[#CCFF00] shadow-sm'
                : 'text-[#9E9C96] hover:text-[#F5F4F0]'
            }`}
          >
            <Copy className="w-4 h-4" />
            <span>Exportar JSON do Cliente</span>
          </button>
        </div>

        {/* TAB 1: VIDEO STATUS & UPLOAD INSTRUCTIONS */}
        {activeTab === 'video' && (
          <div className="space-y-6">
            {/* Live Video Status Check */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Desktop 16:9 */}
              <div className="p-4 rounded-2xl bg-[#0B0D0E] border border-[#24292E]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-[#CCFF00]">1. DESKTOP (16:9)</span>
                  {desktopVideoStatus === 'found' ? (
                    <span className="inline-flex items-center gap-1 text-xs text-[#CCFF00]">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Arquivo Ativo
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-amber-400">
                      <AlertCircle className="w-3.5 h-3.5" /> Poster de Fallback Ativo
                    </span>
                  )}
                </div>
                <p className="text-sm font-semibold text-[#F5F4F0] font-mono">
                  public/videos/hero-desktop.mp4
                </p>
                <p className="text-xs text-[#9E9C96] mt-2">
                  Exibido em telas acima de 1024px e tablets em orientação paisagem.
                </p>
              </div>

              {/* Mobile 9:16 */}
              <div className="p-4 rounded-2xl bg-[#0B0D0E] border border-[#24292E]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-[#CCFF00]">2. MOBILE (9:16)</span>
                  {mobileVideoStatus === 'found' ? (
                    <span className="inline-flex items-center gap-1 text-xs text-[#CCFF00]">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Arquivo Ativo
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-amber-400">
                      <AlertCircle className="w-3.5 h-3.5" /> Poster de Fallback Ativo
                    </span>
                  )}
                </div>
                <p className="text-sm font-semibold text-[#F5F4F0] font-mono">
                  public/videos/hero-mobile.mp4
                </p>
                <p className="text-xs text-[#9E9C96] mt-2">
                  Exibido em smartphones e tablets em modo retrato.
                </p>
              </div>
            </div>

            {/* Clear Transparent Notice */}
            <div className="p-5 rounded-2xl bg-[#181C1E] border border-[#24292E]">
              <h4 className="text-sm font-bold text-[#F5F4F0] mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#CCFF00]" />
                <span>Como adicionar os dois vídeos cinematográficos ao projeto:</span>
              </h4>
              <p className="text-xs sm:text-sm text-[#9E9C96] leading-relaxed mb-4">
                O código está 100% preparado e com os ouvintes e fallbacks cinematográficos ativos.
                Para que os arquivos <code className="text-[#CCFF00]">hero-desktop.mp4</code> e <code className="text-[#CCFF00]">hero-mobile.mp4</code> sejam reproduzidos, copie os dois vídeos para o diretório <code className="text-[#F5F4F0] bg-black px-1.5 py-0.5 rounded">public/videos/</code>:
              </p>

              <div className="bg-[#0B0D0E] p-4 rounded-xl border border-[#24292E] font-mono text-xs text-[#F5F4F0] overflow-x-auto">
                <p className="text-[#9E9C96]">// 1. Crie o diretório se ainda não existir (já criado):</p>
                <p className="text-[#CCFF00]">mkdir -p public/videos</p>
                <p className="text-[#9E9C96] mt-2">// 2. Copie os seus 2 arquivos de vídeo:</p>
                <p>cp /caminho/do/seu/hero-desktop.mp4 public/videos/hero-desktop.mp4</p>
                <p>cp /caminho/do/seu/hero-mobile.mp4 public/videos/hero-mobile.mp4</p>
              </div>

              <p className="text-xs text-[#9E9C96] mt-3">
                Assim que os arquivos forem posicionados em <code className="text-[#F5F4F0]">public/videos/</code>, o navegador iniciará imediatamente a reprodução contínua (autoplay muted loop playsinline) sem necessidade de alterar nenhuma linha de código!
              </p>
            </div>

            {/* Viewport Simulation Trigger for Testing */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#0B0D0E] border border-[#24292E]">
              <div>
                <span className="text-xs font-bold text-[#F5F4F0] block">
                  Simulador de Enquadramento (Desktop vs Mobile)
                </span>
                <span className="text-xs text-[#9E9C96]">
                  Alterne entre a composição horizontal 16:9 e vertical 9:16 para testar a legibilidade dos textos.
                </span>
              </div>
              <button
                onClick={onToggleSimulatedMobile}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#CCFF00] text-black hover:bg-[#B5E600] flex items-center gap-2 shrink-0 transition-colors"
              >
                {isSimulatedMobile ? (
                  <>
                    <Monitor className="w-3.5 h-3.5" />
                    <span>Voltar para Desktop</span>
                  </>
                ) : (
                  <>
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Simular Mobile</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: EDIT TRAINER PROFILE */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="text-xs font-mono uppercase text-[#9E9C96] block mb-1">
                Nome do Personal Trainer
              </label>
              <input
                type="text"
                value={trainerName}
                onChange={(e) => setTrainerName(e.target.value)}
                className="w-full bg-[#0B0D0E] border border-[#24292E] rounded-xl px-4 py-2.5 text-sm text-[#F5F4F0] focus:border-[#CCFF00] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-[#9E9C96] block mb-1">
                Registro CREF
              </label>
              <input
                type="text"
                value={trainerCref}
                onChange={(e) => setTrainerCref(e.target.value)}
                className="w-full bg-[#0B0D0E] border border-[#24292E] rounded-xl px-4 py-2.5 text-sm text-[#F5F4F0] focus:border-[#CCFF00] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-[#9E9C96] block mb-1">
                Título Profissional / Posicionamento
              </label>
              <input
                type="text"
                value={trainerTitle}
                onChange={(e) => setTrainerTitle(e.target.value)}
                className="w-full bg-[#0B0D0E] border border-[#24292E] rounded-xl px-4 py-2.5 text-sm text-[#F5F4F0] focus:border-[#CCFF00] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-[#9E9C96] block mb-1">
                WhatsApp (apenas números com DDD)
              </label>
              <input
                type="text"
                value={trainerPhone}
                onChange={(e) => setTrainerPhone(e.target.value)}
                className="w-full bg-[#0B0D0E] border border-[#24292E] rounded-xl px-4 py-2.5 text-sm text-[#F5F4F0] focus:border-[#CCFF00] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="showTestimonialsToggle"
                checked={showTestimonials}
                onChange={(e) => setShowTestimonials(e.target.checked)}
                className="w-4 h-4 accent-[#CCFF00] rounded"
              />
              <label htmlFor="showTestimonialsToggle" className="text-xs sm:text-sm text-[#F5F4F0] cursor-pointer">
                Exibir Seção de Depoimentos (desmarque se o cliente ainda não tiver relatos autorizados)
              </label>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-[#9E9C96] hover:text-[#F5F4F0]"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-bold text-black bg-[#CCFF00] hover:bg-[#B5E600] rounded-xl transition-colors"
              >
                Salvar e Atualizar Página
              </button>
            </div>
          </form>
        )}

        {/* TAB 3: EXPORT JSON */}
        {activeTab === 'code' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs text-[#9E9C96]">
                Copie o objeto de configuração para salvar no repositório em <code className="text-[#CCFF00]">src/data/trainer.ts</code>:
              </p>
              <button
                onClick={copyConfigSnippet}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#CCFF00] text-black hover:bg-[#B5E600] flex items-center gap-1.5"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copiado!' : 'Copiar Configuração'}</span>
              </button>
            </div>

            <pre className="bg-[#0B0D0E] p-4 rounded-2xl border border-[#24292E] font-mono text-xs text-[#9E9C96] overflow-x-auto max-h-[350px]">
              {JSON.stringify(profile, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
