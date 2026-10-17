===================================================================
VÍDEOS CINEMATOGRÁFICOS DO HERO (MASTER TEMPLATE PERSONAL TRAINER)
===================================================================

Este diretório está configurado para receber os dois vídeos de alta definição
já produzidos especificamente para este website:

1. VÍDEO HORIZONTAL PARA COMPUTADORES E TELAS LARGAS (16:9)
   - Nome exato do arquivo: hero-desktop.mp4
   - Resolução sugerida: 1920x1080 (16:9)
   - Uso: Layouts Desktop (acima de 1024px) e tablets em orientação paisagem.
   - Posição da ação principal: À direita (o texto e CTAs ficam na esquerda).

2. VÍDEO VERTICAL PARA SMARTPHONES E TELAS MÓVEIS (9:16)
   - Nome exato do arquivo: hero-mobile.mp4
   - Resolução sugerida: 1080x1920 (9:16)
   - Uso: Layouts Mobile (abaixo de 768px) e tablets em orientação retrato.
   - Posição da ação principal: Centralizada no terço superior/médio
     (o texto e CTAs ficam protegidos no gradiente do terço inferior).

COMO ADICIONAR OS ARQUIVOS:
Simplesmente copie os dois arquivos para esta pasta:
   cp /caminho/do/seu/hero-desktop.mp4 public/videos/hero-desktop.mp4
   cp /caminho/do/seu/hero-mobile.mp4 public/videos/hero-mobile.mp4

O código em `src/components/CinematicVideoHero.tsx` já possui:
- Detecção automática de proporção de tela e orientação.
- Autoplay muted loop playsinline sem controles visíveis.
- Preload e fallback suave sem quebra de layout (zero CLS).
- Suporte a prefers-reduced-motion.
- Gradientes assimétricos otimizados para legibilidade total.
===================================================================
