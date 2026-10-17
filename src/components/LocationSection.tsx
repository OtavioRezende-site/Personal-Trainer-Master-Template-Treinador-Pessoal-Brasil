import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Building, Globe, ExternalLink } from 'lucide-react';
import { TrainerProfile } from '../data/trainer';

interface LocationSectionProps {
  profile: TrainerProfile;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ profile }) => {
  return (
    <section className="py-20 md:py-28 bg-[#121517] text-[#F5F4F0] border-t border-[#24292E]/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Info with Motion */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-wider uppercase text-[#CCFF00] mb-3">
              <span className="w-2 h-0.5 bg-[#CCFF00]" />
              <span>{profile.location.label}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#F5F4F0] mb-4 text-balance">
              {profile.location.headline}
            </h2>
            <p className="text-sm sm:text-base text-[#9E9C96] leading-relaxed mb-6">
              {profile.location.description}
            </p>

            {/* Bairros atendidos */}
            <div className="mb-6">
              <span className="text-xs font-mono uppercase text-[#CCFF00] tracking-wider block mb-3">
                Regiões de Atendimento Presencial:
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                {profile.regionsServed.map((region, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-[#0B0D0E] border border-[#24292E] text-[#F5F4F0]"
                  >
                    {region}
                  </span>
                ))}
              </div>
            </div>

            {/* Formatos */}
            <div className="space-y-3 pt-6 border-t border-[#24292E] mb-6">
              <div className="flex items-start gap-3 text-xs sm:text-sm text-[#9E9C96]">
                <Building className="w-4 h-4 text-[#CCFF00] shrink-0 mt-0.5" />
                <span>Atendimento exclusivo em condomínios residenciais e estúdios privativos parceiros.</span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-[#9E9C96]">
                <Globe className="w-4 h-4 text-[#CCFF00] shrink-0 mt-0.5" />
                <span>Consultoria online e periodização com suporte ativo para alunos em todo o Brasil.</span>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=Rio+de+Janeiro+RJ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#CCFF00] hover:underline"
            >
              <span>Abrir localização no Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </motion.div>

          {/* Right: Embedded Interactive Google Maps with Motion Scale */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="relative rounded-3xl overflow-hidden border border-[#24292E] hover:border-[#38414A] bg-[#0B0D0E] shadow-2xl flex flex-col transition-colors">
              {/* Google Maps Header Bar */}
              <div className="bg-[#181C1E] px-5 py-3 border-b border-[#24292E] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-[#F5F4F0]">
                  <MapPin className="w-4 h-4 text-[#CCFF00]" />
                  <span className="font-semibold">{profile.city} · {profile.state}</span>
                  <span className="text-[#9E9C96] hidden sm:inline">(Zona Sul & Barra da Tijuca)</span>
                </div>
                <span className="text-[11px] font-mono text-[#CCFF00]">Atendimento Presencial</span>
              </div>

              {/* Responsive Google Maps Iframe */}
              <div className="relative w-full h-[380px] sm:h-[420px] bg-[#0B0D0E]">
                <iframe
                  title="Mapa de Atendimento Google Maps Rio de Janeiro"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117565.3789476346!2d-43.32743849185799!3d-22.981883196294715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x997f58a6a00a9d%3A0x3f251d85272f76f7!2sRio%20de%20Janeiro%20-%20RJ!5e0!3m2!1spt-BR!2sbr!4v1710000000000!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    filter: 'invert(90%) hue-rotate(180deg) contrast(1.1) brightness(0.95)',
                  }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              {/* Bottom Card Summary */}
              <div className="bg-[#121517] px-6 py-3.5 border-t border-[#24292E] flex flex-wrap items-center justify-between gap-3 text-xs text-[#9E9C96]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]" />
                  <span>Leblon, Ipanema, Barra da Tijuca, São Conrado, Jardim Botânico</span>
                </div>
                <span className="font-mono text-[#CCFF00]">Horários sob agendamento</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
