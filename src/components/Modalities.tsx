import { Dumbbell, HeartPulse, Zap, Flame, PersonStanding, Bike } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const modalities = [
  {
    icon: Dumbbell,
    title: 'Musculação',
    description: 'Treinamento de força com equipamentos de alta qualidade e acompanhamento profissional.',
  },
  {
    icon: HeartPulse,
    title: 'Cardio',
    description: 'Esteiras, bicicletas e elípticos de última geração para melhorar seu condicionamento.',
  },
  {
    icon: Zap,
    title: 'Funcional',
    description: 'Treinos dinâmicos que trabalham o corpo todo com movimentos naturais do dia a dia.',
  },
  {
    icon: Flame,
    title: 'HIIT',
    description: 'Treinamento intervalado de alta intensidade para queima máxima de calorias.',
  },
  {
    icon: PersonStanding,
    title: 'Alongamento',
    description: 'Sessões de flexibilidade e mobilidade para prevenir lesões e melhorar a postura.',
  },
  {
    icon: Bike,
    title: 'Spinning',
    description: 'Aulas energéticas de ciclismo indoor com música motivacional e muita energia.',
  },
];

export default function Modalities() {
  const { ref, inView } = useInView();

  return (
    <section id="modalidades" className="py-20 md:py-28 bg-iron-dark relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}></div>

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-iron-red font-oswald text-sm tracking-[0.3em] uppercase">O que oferecemos</span>
          <h2 className="font-oswald text-4xl md:text-5xl lg:text-6xl font-bold mt-2 mb-6">
            NOSSAS <span className="text-gradient">MODALIDADES</span>
          </h2>
          <div className="w-20 h-1 bg-iron-red mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
            Oferecemos diversas modalidades para atender todos os objetivos e níveis de condicionamento.
          </p>
        </div>

        {/* Modalities Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {modalities.map((mod, i) => (
            <div
              key={i}
              className={`group p-8 bg-iron-gray/40 rounded-2xl border border-white/5 hover:border-iron-red/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-iron-red/10 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${i * 100 + 200}ms` }}
            >
              <div className="w-16 h-16 rounded-2xl red-gradient flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <mod.icon size={28} className="text-white" />
              </div>
              <h3 className="font-oswald text-xl font-bold text-white mb-3 group-hover:text-iron-red transition-colors">
                {mod.title}
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                {mod.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
