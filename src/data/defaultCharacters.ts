
import frontellaAvatar from '@/assets/avatars/front.webp'; 
import bitgrunAvatar from '@/assets/avatars/back.webp';
import pixariaAvatar from '@/assets/avatars/uxui.webp';
import stackiaAvatar from '@/assets/avatars/fullstack.webp';
import bugariaAvatar from '@/assets/avatars/qa.webp';
import appliaAvatar from '@/assets/avatars/mobile.webp';

export const characters = [
  {
    path: '/Flexbela',
    name: 'Flexbela Sigilopíxel',
    avatar: frontellaAvatar,
    role: 'Frontend Developer',
    class: 'Pícara (Rogue)',
    description: 'Experta en interfaces y experiencias de usuario. Sigilosa con el CSS y letal con JavaScript.',
    accentColor: 'from-emerald-500/20 to-teal-500/20',
    borderColor: 'hover:border-emerald-500'
  },
  {
    path: '/Query',
    name: 'Query Forjaendpoints',
    avatar: bitgrunAvatar,
    role: 'Backend Developer',
    class: 'Bárbara',
    description: 'Forjadora de APIs robustas y bases de datos inquebrantables. Su furia escala con los requests.',
    accentColor: 'from-orange-500/20 to-red-500/20',
    borderColor: 'hover:border-orange-500'
  },
  {
    path: '/Usabella',
    name: 'Usabella Encantaflujos',
    avatar: pixariaAvatar,
    role: 'UX/UI Designer',
    class: 'Hechicera (Sorcerer)',
    description: 'Maestra del prototipado y la usabilidad. Convierte ideas en interfaces mágicas.',
    accentColor: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'hover:border-purple-500'
  },
  {
    path: '/Stackia',
    name: 'Stackia Rastreacódigo',
    avatar: stackiaAvatar,
    role: 'Full-Stack Developer',
    class: 'Exploradora (Ranger)',
    description: 'Navegante del stack completo. Rastrea bugs desde la UI hasta la base de datos.',
    accentColor: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'hover:border-blue-500'
  },
  {
    path: '/Testina',
    name: 'Testina OjoFino',
    avatar: bugariaAvatar,
    role: 'QA / Test Engineer',
    class: 'Monja (Monk)',
    description: 'Guardiana de la calidad. Encuentra bugs con precisión monástica y disciplina inquebrantable.',
    accentColor: 'from-amber-500/20 to-yellow-500/20',
    borderColor: 'hover:border-amber-500'
  },
  {
    path: '/Applia',
    name: 'Applia Toquesuave',
    avatar: appliaAvatar,
    role: 'Mobile Developer',
    class: 'Exploradora (Ranger)',
    description: 'Exploradora de ecosistemas móviles. Domina iOS, Android y frameworks cross-platform.',
    accentColor: 'from-lime-500/20 to-green-500/20',
    borderColor: 'hover:border-lime-500'
  },
];