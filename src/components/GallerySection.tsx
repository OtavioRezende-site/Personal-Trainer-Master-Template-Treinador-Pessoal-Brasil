import React from 'react';
import { motion } from 'motion/react';
import { Camera } from 'lucide-react';
import { TrainerProfile } from '../data/trainer';
import { getAssetUrl } from '../utils/assets';

interface GallerySectionProps {
  profile: TrainerProfile;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ profile }) => {
  const imageAssets = [
    getAssetUrl('images/trainer-cable-setup.jpg'),
    getAssetUrl('images/client-squat.jpg'),
    getAssetUrl('images/battle-ropes.jpg'),
    getAssetUrl('images/trainer-walk.jpg'),
  ];

  return (
    <section className="py-20 md:py-28 bg-[#121517] text-[#F5F4F0] border-t border-[#24292E]/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-wider uppercase text-[#CCFF00] mb-3">
              <span className="w-2 h-0.5 bg-[#CCFF00]" />
              <span>{profile.gallery.label}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#F5F4F0] text-balance">
              {profile.gallery.headline}
            </h2>
          </div>
          <p className="text-sm text-[#9E9C96] max-w-md">
            {profile.gallery.subheadline}
          </p>
        </motion.div>

        {/* Asymmetrical Editorial Gallery Grid with Staggered Motion */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {profile.gallery.items.map((item, idx) => {
            const isWide = idx === 0 || idx === 3;
            const imgSrc = imageAssets[idx % imageAssets.length];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`relative rounded-3xl overflow-hidden border border-[#24292E] hover:border-[#CCFF00]/40 bg-[#0B0D0E] group shadow-xl transition-colors ${
                  isWide ? 'md:col-span-7' : 'md:col-span-5'
                }`}
              >
                <div className="aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
                  <img
                    src={imgSrc}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Overlay Card Details */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D0E] via-[#0B0D0E]/40 to-transparent opacity-90 p-6 flex flex-col justify-end">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#CCFF00] uppercase tracking-wider mb-1">
                    <Camera className="w-3.5 h-3.5" />
                    <span>{item.category}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#F5F4F0]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#9E9C96] mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
