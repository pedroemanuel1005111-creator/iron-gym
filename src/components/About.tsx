import { Dumbbell, Users, Award, HeartPulse } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const stats = [
  { icon: Dumbbell, value: '100+', label: 'Equipamentos' },
  { icon: Users, value: '500+', label: 'Alunos Ativos' },
  { icon: Award, value: '5+', label: 'Anos de Experiência' },
  { icon: HeartPulse, value: '10+', label: 'Modalidades' },
];

export default function About() {
  const { ref, inView } = useInView();

  return (
    <section id="sobre" className="py-20 md:py-28 bg-iron-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-iron-red/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-iron-red/3 rounded-full blur-3xl"></div>

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-iron-red font-oswald text-sm tracking-[0.3em] uppercase">Conheça a</span>
          <h2 className="font-oswald text-4xl md:text-5xl lg:text-6xl font-bold mt-2 mb-6">
            IRON <span className="text-gradient">GYM</span>
          </h2>
          <div className="w-20 h-1 bg-iron-red mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className={`transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-iron-red/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <img
                src="https://images.pexels.com/photos/3916766/pexels-photo-3916766.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200"
                alt="Interior da Iron Gym"
                className="relative rounded-2xl w-full h-[400px] md:h-[500px] object-cover shadow-2xl shadow-black/50"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-iron-dark/90 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <p className="font-oswald text-xl font-semibold text-white">Iron Gym Ltda</p>
                <p className="text-gray-400 text-sm">Referência em musculação em Rio Largo – AL</p>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className={`transition-all duration-700 delay-400 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <h3 className="font-oswald text-2xl md:text-3xl font-bold mb-6 text-white">
              Sua evolução começa <span className="text-iron-red">aqui</span>
            </h3>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6">
              A <strong className="text-white">Iron Gym</strong> é mais do que uma academia — é um espaço de
              transformação. Localizada em Rio Largo, Alagoas, oferecemos um ambiente completo com
              equipamentos de última geração, profissionais qualificados e uma estrutura pensada
              para quem leva a sério seus objetivos.
            </p>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8">
              Seja para ganhar massa muscular, emagrecer, melhorar o condicionamento físico ou
              simplesmente cuidar da saúde, aqui você encontra tudo o que precisa. Venha fazer
              parte da família Iron Gym!
            </p>

            <a
              href="https://wa.me/558281058300?text=Olá! Gostaria de agendar uma visita à Iron Gym."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 red-gradient text-white font-oswald text-base tracking-wider px-8 py-3.5 rounded-lg hover:scale-105 transition-all duration-300 uppercase font-semibold"
            >
              Agende uma visita
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 transition-all duration-700 delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 bg-iron-gray/50 rounded-2xl border border-white/5 hover:border-iron-red/30 transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl red-gradient mb-4 group-hover:scale-110 transition-transform">
                <stat.icon size={24} className="text-white" />
              </div>
              <p className="font-oswald text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
