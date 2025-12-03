import { Program, Institution, User } from '@/store/useAppStore'

export const mockPrograms: Program[] = [
  {
    id: '1',
    title: 'Bootcamp Full Stack JavaScript',
    description: 'Programa intensivo de 6 meses para formação de desenvolvedores full stack com foco em JavaScript, React, Node.js e banco de dados.',
    institution: 'Digital Innovation One',
    institutionId: '1',
    category: 'Desenvolvimento Web',
    level: 'iniciante',
    duration: '6 meses',
    format: 'online',
    startDate: '2024-03-01',
    endDate: '2024-08-31',
    applicationDeadline: '2024-02-15',
    requirements: [
      'Conhecimento básico de lógica de programação',
      'Ensino médio completo',
      'Disponibilidade de 8h/dia',
      'Computador com internet estável'
    ],
    benefits: [
      'Certificado reconhecido pelo mercado',
      'Mentoria individual',
      'Projetos práticos',
      'Auxílio para colocação no mercado'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400',
    isActive: true
  },
  {
    id: '2',
    title: 'Especialização em Data Science',
    description: 'Curso avançado em ciência de dados com Python, machine learning e análise de big data.',
    institution: 'Universidade Federal do Rio de Janeiro',
    institutionId: '2',
    category: 'Data Science',
    level: 'intermediario',
    duration: '12 meses',
    format: 'hibrido',
    startDate: '2024-04-01',
    endDate: '2025-03-31',
    applicationDeadline: '2024-03-15',
    requirements: [
      'Graduação em áreas relacionadas',
      'Conhecimento em Python',
      'Conhecimento em estatística',
      'Experiência com análise de dados'
    ],
    benefits: [
      'Certificado de especialização',
      'Acesso a laboratórios',
      'Projetos com empresas parceiras',
      'Rede de networking'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
    isActive: true
  },
  {
    id: '3',
    title: 'Formação em Segurança da Informação',
    description: 'Programa completo para formação de profissionais em cybersecurity e segurança da informação.',
    institution: 'Instituto de Tecnologia',
    institutionId: '3',
    category: 'Segurança',
    level: 'avancado',
    duration: '8 meses',
    format: 'presencial',
    startDate: '2024-05-01',
    endDate: '2024-12-31',
    applicationDeadline: '2024-04-20',
    requirements: [
      'Experiência em TI',
      'Conhecimento em redes',
      'Conhecimento em sistemas operacionais',
      'Inglês intermediário'
    ],
    benefits: [
      'Certificação internacional',
      'Laboratório de segurança',
      'Simulações de ataques',
      'Colocação em empresas parceiras'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400',
    isActive: true
  },
  {
    id: '4',
    title: 'Curso de UX/UI Design',
    description: 'Formação completa em design de experiência do usuário e interface, com foco em metodologias ágeis.',
    institution: 'Design Academy',
    institutionId: '4',
    category: 'Design',
    level: 'iniciante',
    duration: '4 meses',
    format: 'online',
    startDate: '2024-06-01',
    endDate: '2024-09-30',
    applicationDeadline: '2024-05-15',
    requirements: [
      'Ensino médio completo',
      'Conhecimento básico de design',
      'Ferramentas de design (Figma, Adobe)',
      'Portfolio básico'
    ],
    benefits: [
      'Certificado profissional',
      'Mentoria com designers sênior',
      'Projetos reais',
      'Acesso a comunidade exclusiva'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
    isActive: true
  },
  {
    id: '5',
    title: 'Programa de Desenvolvimento Mobile',
    description: 'Especialização em desenvolvimento de aplicativos móveis para iOS e Android usando tecnologias modernas.',
    institution: 'Tech Institute',
    institutionId: '5',
    category: 'Desenvolvimento Mobile',
    level: 'intermediario',
    duration: '10 meses',
    format: 'hibrido',
    startDate: '2024-07-01',
    endDate: '2025-04-30',
    applicationDeadline: '2024-06-15',
    requirements: [
      'Conhecimento em programação',
      'Experiência com desenvolvimento',
      'Conhecimento em APIs',
      'Dispositivos móveis para teste'
    ],
    benefits: [
      'Certificação técnica',
      'Acesso a dispositivos de teste',
      'Publicação na App Store',
      'Suporte para freelancing'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400',
    isActive: true
  },
  {
    id: '6',
    title: 'Formação em DevOps',
    description: 'Curso completo em DevOps, CI/CD, containers e automação de infraestrutura.',
    institution: 'Cloud Academy',
    institutionId: '6',
    category: 'DevOps',
    level: 'avancado',
    duration: '6 meses',
    format: 'online',
    startDate: '2024-08-01',
    endDate: '2025-01-31',
    applicationDeadline: '2024-07-15',
    requirements: [
      'Experiência em desenvolvimento',
      'Conhecimento em Linux',
      'Conhecimento em redes',
      'Experiência com cloud'
    ],
    benefits: [
      'Certificações AWS/Azure',
      'Laboratório cloud',
      'Projetos práticos',
      'Mentoria técnica'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400',
    isActive: true
  }
]

export const mockInstitutions: Institution[] = [
  {
    id: '1',
    name: 'Digital Innovation One',
    description: 'Maior plataforma brasileira de educação em tecnologia, com foco em formação prática e inserção no mercado.',
    website: 'https://dio.me',
    logoUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=100',
    programsCount: 3
  },
  {
    id: '2',
    name: 'Universidade Federal do Rio de Janeiro',
    description: 'Instituição pública de ensino superior com tradição em pesquisa e inovação tecnológica.',
    website: 'https://ufrj.br',
    logoUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=100',
    programsCount: 2
  },
  {
    id: '3',
    name: 'Instituto de Tecnologia',
    description: 'Centro de excelência em tecnologia e inovação, oferecendo cursos especializados e certificações.',
    website: 'https://institutotech.edu.br',
    logoUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100',
    programsCount: 1
  },
  {
    id: '4',
    name: 'Design Academy',
    description: 'Escola especializada em design digital, UX/UI e inovação em produtos digitais.',
    website: 'https://designacademy.com.br',
    logoUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=100',
    programsCount: 1
  },
  {
    id: '5',
    name: 'Tech Institute',
    description: 'Instituto de tecnologia focado em desenvolvimento de software e inovação digital.',
    website: 'https://techinstitute.edu.br',
    logoUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=100',
    programsCount: 1
  },
  {
    id: '6',
    name: 'Cloud Academy',
    description: 'Academia especializada em tecnologias cloud, DevOps e arquitetura de sistemas distribuídos.',
    website: 'https://cloudacademy.edu.br',
    logoUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100',
    programsCount: 1
  }
]

export const mockUser: User = {
  id: '1',
  name: 'João Silva',
  email: 'joao@email.com',
  interests: ['Desenvolvimento Web', 'Data Science', 'UX/UI Design'],
  level: 'iniciante'
}

export const categories = [
  'Desenvolvimento Web',
  'Data Science',
  'Segurança',
  'Design',
  'Desenvolvimento Mobile',
  'DevOps',
  'Inteligência Artificial',
  'Blockchain',
  'Cloud Computing',
  'IoT'
]

export const levels = [
  { value: 'iniciante', label: 'Iniciante' },
  { value: 'intermediario', label: 'Intermediário' },
  { value: 'avancado', label: 'Avançado' }
]

export const formats = [
  { value: 'presencial', label: 'Presencial' },
  { value: 'online', label: 'Online' },
  { value: 'hibrido', label: 'Híbrido' }
]
