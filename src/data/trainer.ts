/**
 * CONFIGURAÇÃO CENTRALIZADA DO PERSONAL TRAINER (MASTER TEMPLATE)
 * 
 * Este arquivo isola 100% dos dados do treinador da camada visual.
 * Para personalizar para um novo cliente, basta atualizar este arquivo
 * ou alternar o perfil ativo.
 */

export interface TrainerService {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  recommendedFor: string;
  badge?: string;
  ctaText?: string;
}

export interface MethodologyStep {
  step: string;
  title: string;
  summary: string;
  details: string;
}

export interface Differentiator {
  title: string;
  description: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  description: string;
  aspect: 'square' | 'wide' | 'tall';
}

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  focus: string;
  quote: string;
  verifiedLabel: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TrainerProfile {
  // Identificação e Marca
  id: string;
  isDemoProfile: boolean;
  name: string;
  brandName: string;
  title: string;
  cref: string; // Conselho Regional de Educação Física
  city: string;
  state: string;
  regionsServed: string[];

  // Hero Copy
  hero: {
    badge: string;
    headline: string;
    headlineAccent: string;
    subheadline: string;
    primaryCtaText: string;
    secondaryCtaText: string;
  };

  // Vídeos & Mídia
  media: {
    heroDesktopVideo: string;
    heroMobileVideo: string;
    desktopPoster: string;
    mobilePoster: string;
    trainerPortrait: string;
    trainingScene: string;
  };

  // Contato & WhatsApp
  contact: {
    whatsappNumber: string; // Formato E.164 sem o '+' (ex: 5511999998888)
    whatsappDisplay: string;
    email: string;
    instagramHandle: string;
    instagramUrl: string;
    primaryMessage: string;
    consultationMessage: string;
  };

  // Sobre o Treinador
  about: {
    label: string;
    headline: string;
    bioParagraphs: string[];
    philosophy: string;
    credentials: string[];
    stats: {
      number: string;
      label: string;
    }[];
  };

  // Treinamento Personalizado (Destaque Conceitual)
  personalizedTraining: {
    label: string;
    headline: string;
    lead: string;
    pillars: {
      title: string;
      description: string;
    }[];
  };

  // Serviços Oferecidos
  services: TrainerService[];

  // Metodologia em Etapas
  methodology: {
    label: string;
    headline: string;
    subheadline: string;
    steps: MethodologyStep[];
  };

  // Diferenciais
  differentiators: {
    label: string;
    headline: string;
    items: Differentiator[];
  };

  // Galeria de Rotina & Ambiente
  gallery: {
    label: string;
    headline: string;
    subheadline: string;
    items: GalleryItem[];
  };

  // Depoimentos e Resultados (Opcional / Controlado por visibilidade)
  testimonials: {
    label: string;
    headline: string;
    subheadline: string;
    disclaimer: string;
    items: TestimonialItem[];
  };

  // Localização & Área de Atendimento
  location: {
    label: string;
    headline: string;
    description: string;
    primaryZone: string;
    serviceFormats: string[];
    partnerGyms: string[];
  };

  // Perguntas Frequentes (FAQ)
  faq: {
    label: string;
    headline: string;
    subheadline: string;
    items: FAQItem[];
  };

  // Chamada Final (Final CTA)
  finalCta: {
    headline: string;
    subheadline: string;
    ctaText: string;
    supportNote: string;
  };

  // Chaves de controle de visibilidade das seções
  sectionVisibility: {
    hero: boolean;
    about: boolean;
    personalizedTraining: boolean;
    services: boolean;
    methodology: boolean;
    differentiators: boolean;
    gallery: boolean;
    testimonials: boolean;
    location: boolean;
    faq: boolean;
    finalCta: boolean;
  };
}

/**
 * Função utilitária para gerar links diretos de WhatsApp com mensagem codificada
 */
export function buildWhatsAppUrl(phoneNumber: string, message: string): string {
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}

/**
 * PERFIL DEMONSTRATIVO MASTER
 * Estruturado com naturalidade profissional brasileira, pronto para produção.
 */
export const defaultTrainerProfile: TrainerProfile = {
  id: 'personal-trainer-template',
  isDemoProfile: true,
  name: 'Personal Trainer',
  brandName: 'Personal Trainer · Performance & Saúde',
  title: 'Especialista em Biomecânica e Treinamento de Força',
  cref: 'CREF Regularizado · Registro Ativo',
  city: 'Rio de Janeiro',
  state: 'RJ',
  regionsServed: [
    'Leblon',
    'Ipanema',
    'Barra da Tijuca',
    'São Conrado',
    'Jardim Botânico',
    'Atendimento em condomínios e estúdios parceiros'
  ],

  hero: {
    badge: 'Atendimento Individualizado · Presencial & Consultoria',
    headline: 'Treinamento de alta precisão desenhado para a sua rotina.',
    headlineAccent: 'Resultados duradouros com rigor biomecânico.',
    subheadline: 'Metodologia individualizada que respeita sua biomecânica, tempo e objetivos reais.',
    primaryCtaText: 'Agendar Consulta Inicial',
    secondaryCtaText: 'Conhecer a Metodologia'
  },

  media: {
    // Caminhos exatos dos vídeos cinematográficos
    heroDesktopVideo: '/videos/hero-desktop.mp4',
    heroMobileVideo: '/videos/hero-mobile.mp4',
    desktopPoster: '/images/hero-desktop-poster.jpg',
    mobilePoster: '/images/hero-mobile-poster.jpg',
    trainerPortrait: '/images/trainer-coaching-profile.jpg',
    trainingScene: '/images/trainer-walk.jpg',
  },

  contact: {
    whatsappNumber: '5521999998888',
    whatsappDisplay: '(21) 99999-8888',
    email: 'contato@personaltrainer.com.br',
    instagramHandle: '@personaltrainer',
    instagramUrl: 'https://instagram.com',
    primaryMessage: 'Olá! Vim pelo site e gostaria de agendar uma conversa sobre o treinamento individualizado no Rio de Janeiro.',
    consultationMessage: 'Olá! Gostaria de entender como funciona a avaliação inicial e os horários disponíveis para treino no Rio de Janeiro.'
  },

  about: {
    label: 'Sobre o Treinador',
    headline: 'Ciência aplicada ao movimento humano e longevidade ativa.',
    bioParagraphs: [
      'Minha trajetória no treinamento físico começou com uma convicção clara: o corpo humano responde melhor à precisão do que ao excesso. Com mais de uma década dedicada à preparação física e reabilitação funcional, desenvolvi um método focado na anatomia e nas demandas reais de cada pessoa.',
      'Acredito que treinar com qualidade não significa exaustão desmedida, mas sim executar o estímulo correto na amplitude segura, garantindo progresso sustentável sem comprometer articulações ou sobrecarregar a coluna.',
      'Trabalho com executivos, profissionais liberais e pessoas que buscam alta performance na vida diária, aliando ganho de massa magra, perda de gordura e disposição física inabalável.'
    ],
    philosophy: 'A consistência só acontece quando o treino cabe na sua vida real e não gera dores articulares indesejadas.',
    credentials: [
      'Graduação em Educação Física (Bacharelado pleno)',
      'Especialização em Fisiologia do Exercício e Biomecânica Aplicada',
      'Certificação em Avaliação de Padrões de Movimento Funcional',
      'Atualização contínua em Periodização de Força e Hipertrofia'
    ],
    stats: [
      { number: '12+', label: 'Anos de atuação no treinamento individualizado' },
      { number: '100%', label: 'Prescrição personalizada baseada em avaliação prévia' },
      { number: '0', label: 'Planilhas prontas ou fichas padronizadas' }
    ]
  },

  personalizedTraining: {
    label: 'O Valor da Individualização',
    headline: 'Por que treinos padronizados falham a médio e longo prazo?',
    lead: 'Cada indivíduo possui proporções ósseas distintas, histórico único de lesões, rotina de sono e níveis de estresse diferentes. Copiar fichas de treino da internet gera estagnação e risco articular.',
    pillars: [
      {
        title: 'Análise de Alavancas & Biomecânica',
        description: 'Ajustamos a pegada, base de apoio e ângulo de cada máquina para favorecer a sua mecânica específica, maximizando ativação muscular e eliminando sobrecargas nocivas.'
      },
      {
        title: 'Periodização Adaptativa',
        description: 'Cargas, séries e volume são calibrados semanalmente de acordo com a sua recuperação real, permitindo evolução constante sem esgotamento do sistema nervoso central.'
      },
      {
        title: 'Alinhamento com sua Rotina',
        description: 'Sessões inteligentes de 50 a 60 minutos planejadas para quem tem agenda exigente e precisa de máxima eficiência temporal.'
      },
      {
        title: 'Foco na Longevidade Ativa',
        description: 'Construir força, estabilidade e capacidade cardiorrespiratória para você viver com autonomia e vigor hoje e nas próximas décadas.'
      }
    ]
  },

  services: [
    {
      id: 'presencial',
      title: 'Personal Training Presencial',
      tagline: 'Supervisão exclusiva 1 a 1 em São Paulo',
      description: 'Acompanhamento minucioso de cada repetição, correção postural em tempo real, controle rigoroso de cadência e intervalo de descanso.',
      features: [
        'Atendimento em estúdios parceiros selecionados ou na academia do seu condomínio',
        'Controle milimétrico da técnica e segurança biomecânica em todos os exercícios',
        'Ajustes de carga e progressão a cada série conforme sua resposta motora',
        'Pontualidade, discrição e ambiente propício ao foco'
      ],
      recommendedFor: 'Ideal para quem valoriza orientação presencial direta, máxima precisão técnica e compromisso firme na agenda.',
      badge: 'Atendimento Premium 1 a 1',
      ctaText: 'Consultar Disponibilidade de Horários'
    },
    {
      id: 'online',
      title: 'Consultoria & Assessoria Remota',
      tagline: 'Metodologia sob medida para treinar onde você estiver',
      description: 'Prescrição individualizada entregue via aplicativo dedicado com demonstrações em vídeo e suporte direto via WhatsApp para tirar dúvidas.',
      features: [
        'Análise prévia da estrutura da sua academia atual (aparelhos disponíveis)',
        'Envio periódico de vídeos de execução para análise técnica e feedback detalhado',
        'Ajustes quinzenais de planilha conforme sua evolução e resposta ao treino',
        'Acesso direto ao treinador pelo WhatsApp para suporte prático'
      ],
      recommendedFor: 'Perfeito para quem viaja frequentemente, mora em outras cidades ou prefere treinar com autonomia tendo uma orientação profissional sólida.',
      badge: 'Flexibilidade Total',
      ctaText: 'Iniciar Consultoria Online'
    },
    {
      id: 'reabilitacao',
      title: 'Transição & Fortalecimento Seguro',
      tagline: 'Retorno seguro às atividades após lesões ou longas pausas',
      description: 'Programa focado em estabilidade articular, alívio de compensações posturais e fortalecimento de grupos musculares estabilizadores.',
      features: [
        'Trabalho integrado com seu médico ou fisioterapeuta de confiança',
        'Seleção cirúrgica de exercícios sem impacto negativo na região vulnerável',
        'Desenvolvimento gradual de força nos membros estabilizadores',
        'Recuperação da confiança motora e eliminação do receio de se exercitar'
      ],
      recommendedFor: 'Recomendado para quem sente incômodos frequentes na lombar, ombros ou joelhos e deseja treinar sem dor.',
      badge: 'Saúde Articular & Força',
      ctaText: 'Conversar sobre meu Histórico'
    }
  ],

  methodology: {
    label: 'Como Funciona o Processo',
    headline: 'Do primeiro contato à conquista dos seus marcos físicos.',
    subheadline: 'Um caminho linear, claro e fundamentado em avaliações contínuas, sem suposições.',
    steps: [
      {
        step: '01',
        title: 'Contato & Diagnóstico Inicial',
        summary: 'Conversa direta para compreender suas metas, rotina e necessidades.',
        details: 'Alinhamos expectativas de horários, locais de preferência e objetivos principais (hipertrofia, emagrecimento, recondicionamento ou alívio de tensões).'
      },
      {
        step: '02',
        title: 'Anamnese & Avaliação Biomecânica',
        summary: 'Mapeamento detalhado de mobilidade, postura e histórico de saúde.',
        details: 'Identificamos encurtamentos, assimetrias de força e histórico de lesões para saber exatamente quais exercícios são ideais e quais devem ser adaptados.'
      },
      {
        step: '03',
        title: 'Planejamento e Prescrição Sob Medida',
        summary: 'Estruturação da periodização com volume e intensidade adequados.',
        details: 'Montagem de microciclos de treinamento com seleção precisa de exercícios, ordem de execução e parâmetros de carga respeitando sua frequência semanal.'
      },
      {
        step: '04',
        title: 'Execução com Feedback em Tempo Real',
        summary: 'Aulas e treinos guiados com rigor técnico absoluto.',
        details: 'Cada movimento é monitorado para garantir amplitude correta, cadência controlada e respiração sincronizada, protegendo sua integridade física.'
      },
      {
        step: '05',
        title: 'Reavaliação Contínua & Ajustes Progressivos',
        summary: 'Monitoramento sistemático para evitar platôs de rendimento.',
        details: 'Análise de métricas reais de força, resistência e medidas a cada ciclo, recalculando sobrecargas para manter seu corpo em constante evolução.'
      }
    ]
  },

  differentiators: {
    label: 'Nossos Diferenciais',
    headline: 'O que diferencia um acompanhamento de alto nível?',
    items: [
      {
        title: 'Atenção 100% Exclusiva na Sessão',
        description: 'Sem distrações com smartphone ou outros alunos durante a sua aula. Seu horário é integralmente dedicado ao seu rendimento e segurança.'
      },
      {
        title: 'Embasamento em Evidências Científicas',
        description: 'Nada de modismos passageiros ou exercícios perigosos inventados para redes sociais. Cada série cumpre um propósito fisiológico comprovado.'
      },
      {
        title: 'Comunicação Ágil e Acessível',
        description: 'Canal aberto direto pelo WhatsApp para orientações, dúvidas pontuais de rotina e ajustes de agenda com flexibilidade profissional.'
      },
      {
        title: 'Integração de Saúde e Bem-Estar',
        description: 'Orientação preventiva para qualidade do sono, hidratação e constância na rotina, potencializando os ganhos obtidos durante os treinos.'
      }
    ]
  },

  gallery: {
    label: 'Ambiente & Treinamento',
    headline: 'Infraestrutura moderna e foco total em movimento.',
    subheadline: 'Registros autênticos do cotidiano de sessões práticas e acompanhamento individualizado.',
    items: [
      {
        id: 'gal-1',
        title: 'Ajuste de Cabos e Cargas',
        category: 'Precisão Biomecânica',
        description: 'Calibração milimétrica de roldanas e tensão contínua nos exercícios resistidos.',
        aspect: 'wide'
      },
      {
        id: 'gal-2',
        title: 'Movimentos com Kettlebell',
        category: 'Força Funcional',
        description: 'Controle de core, postura ereta e estabilidade articular em agachamentos dinâmicos.',
        aspect: 'square'
      },
      {
        id: 'gal-3',
        title: 'Condicionamento & Cordas Navais',
        category: 'Potência & Resistência',
        description: 'Estímulo metabólico de alta intensidade e baixo impacto para as articulações.',
        aspect: 'tall'
      },
      {
        id: 'gal-4',
        title: 'Estúdio Privativo no Rio de Janeiro',
        category: 'Ambiente Exclusivo',
        description: 'Espaço planejado para treinamento focado, sem filas de aparelhos ou ruídos excessivos.',
        aspect: 'wide'
      }
    ]
  },

  // Seção de Depoimentos transparente (Demonstração / Pronta para clientes reais)
  testimonials: {
    label: 'Relatos de Alunos',
    headline: 'A experiência de quem transformou a relação com o treino.',
    subheadline: 'Depoimentos de demonstração ilustrando o formato de apresentação para clientes autorizados.',
    disclaimer: 'Os relatos abaixo são demonstrativos para exibição do layout. Esta seção pode ser ocultada ou populada exclusivamente com avaliações reais e autorizadas.',
    items: [
      {
        id: 'dep-1',
        author: 'Camila Mendonça',
        role: 'Advogada Corporativa',
        focus: 'Condicionamento e alívio de dor lombar',
        quote: 'Por trabalhar horas sentada, sentia dores constantes nas costas. O acompanhamento individualizado adaptou cada exercício respeitando meu limite e hoje treino sem dor e com muito mais energia no dia a dia.',
        verifiedLabel: 'Aluna Presencial · 1 ano'
      },
      {
        id: 'dep-2',
        author: 'Roberto Alencar',
        role: 'Empresário',
        focus: 'Hipertrofia e rotina de viagens',
        quote: 'Minha rotina é muito imprevisível com viagens frequentes. A combinação de treinos presenciais com a consultoria remota me deu a disciplina que eu nunca tinha conseguido manter.',
        verifiedLabel: 'Aluno Híbrido · 2 anos'
      },
      {
        id: 'dep-3',
        author: 'Juliana Prado',
        role: 'Médica Cirurgiã',
        focus: 'Fortalecimento postural e resistência',
        quote: 'A atenção com a postura e a cadência das repetições é impecável. A sensação de segurança para pegar cargas maiores sem risco de lesão faz toda a diferença.',
        verifiedLabel: 'Aluna Presencial · 8 meses'
      }
    ]
  },

  location: {
    label: 'Onde Atendemos',
    headline: 'Locais de atendimento no Rio de Janeiro e alcance digital.',
    description: 'Atendimento presencial focado nas principais regiões nobres do Rio de Janeiro e consultoria personalizada para alunos em todo o território nacional.',
    primaryZone: 'Rio de Janeiro - RJ (Zona Sul e Barra da Tijuca)',
    serviceFormats: [
      'Academias residenciais em condomínios (Leblon, Ipanema, Barra da Tijuca, São Conrado, Jardim Botânico)',
      'Estúdios parceiros selecionados com estrutura de ponta',
      'Consultoria online com suporte completo para qualquer cidade do Brasil e exterior'
    ],
    partnerGyms: [
      'Estúdios de Treinamento Privativo no Leblon e Ipanema',
      'Academias Boutique na região da Barra da Tijuca',
      'Espaços Fitness em Condomínios Residenciais de Alto Padrão'
    ]
  },

  faq: {
    label: 'Dúvidas Frequentes',
    headline: 'Tudo o que você precisa saber antes de começar.',
    subheadline: 'Transparência total sobre formatos, avaliação inicial e agendamento.',
    items: [
      {
        question: 'Como funciona a primeira conversa ou consulta inicial?',
        answer: 'O primeiro contato é realizado pelo WhatsApp ou chamada de áudio sem custo. Conversamos sobre seu objetivo atual, rotina semanal, histórico de lesões e disponibilidade de horários. A partir dessa conversa, agendamos a sessão de avaliação presencial ou a anamnese detalhada para o treino online.'
      },
      {
        question: 'Preciso já ter experiência com musculação para treinar com você?',
        answer: 'Absolutamente não. A metodologia é desenhada especificamente para atender desde iniciantes absolutos — ensinando cada padrão motor com paciência e didática — até praticantes avançados que necessitam de refinamento técnico e quebra de estagnação.'
      },
      {
        question: 'Onde são realizadas as aulas presenciais?',
        answer: 'As aulas presenciais ocorrem principalmente na academia do seu condomínio (levando conveniência e otimização de tempo) ou em estúdios privativos parceiros localizados nos bairros Jardins, Itaim Bibi, Vila Nova Conceição e Pinheiros.'
      },
      {
        question: 'Qual a diferença entre o atendimento presencial e a consultoria online?',
        answer: 'No presencial, estou ao seu lado durante toda a sessão corrigindo postura e manuseando as cargas. Na consultoria online, você recebe a prescrição completa no aplicativo, grava suas execuções e recebe meu feedback minucioso em vídeo/áudio pelo WhatsApp, com atualizações quinzenais.'
      },
      {
        question: 'Como são combinados os horários e reagendamentos?',
        answer: 'Os horários são fixados na agenda semanal para garantir regularidade. Em casos de imprevistos ou viagens de trabalho, alinhamos reagendamentos com antecedência mínima acordada, preservando a continuidade dos seus estímulos de treino.'
      },
      {
        question: 'É necessário apresentar atestado médico antes de iniciar?',
        answer: 'Sim, a segurança vem em primeiro lugar. Solicitamos uma liberação médica atualizada e aplicamos um questionário de prontidão física (PAR-Q) antes da primeira sessão com carga.'
      }
    ]
  },

  finalCta: {
    headline: 'Pronto para treinar com o foco e a atenção que você merece?',
    subheadline: 'Dê o primeiro passo rumo a uma rotina de treino sustentável, sem dores e com resultados reais. Fale diretamente com o treinador pelo WhatsApp.',
    ctaText: 'Falar Diretamente pelo WhatsApp',
    supportNote: 'Resposta em até algumas horas em dias úteis. Sem intermediários.'
  },

  // Chaves de controle de visibilidade das seções
  sectionVisibility: {
    hero: true,
    about: true,
    personalizedTraining: true,
    services: true,
    methodology: true,
    differentiators: true,
    gallery: true,
    testimonials: true, // Pode ser alterado para false com 1 clique
    location: true,
    faq: true,
    finalCta: true
  }
};
