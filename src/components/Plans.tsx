import { Check, Star, Send, Sparkles } from 'lucide-react';
import { useInView } from '../hooks/useInView';

interface PlansProps {
  userName?: string;
}

const plans = [
  {
    name: 'Mensal',
    price: 'R$ 89,90',
    period: '/mês',
    highlight: false,
    features: [
      'Acesso à musculação',
      'Acesso ao cardio',
      'Avaliação física inicial',
      'Acompanhamento básico',
      'Horário livre',
    ],
    description: 'Perfeito para quem está começando.',
  },
  {
    name: 'Trimestral',
    price: 'R$ 79,90',
    period: '/mês',
    highlight: true,
    badge: 'MAIS POPULAR',
    features: [
      'Acesso à musculação',
      'Acesso ao cardio',
      'Avaliação física mensal',
      'Acompanhamento personalizado',
      'Aulas de funcional',
      'Armário exclusivo',
      'Desconto em suplementos',
    ],
    description: 'O plano ideal para resultados consistentes.',
  },
  {
    name: 'Semestral',
    price: 'R$ 69,90',
    period: '/mês',
    highlight: false,
    features: [
      'Acesso TOTAL à academia',
      'Avaliação física mensal',
      'Acompanhamento personalizado',
      'Todas as modalidades',
      'Armário exclusivo',
      'Personal Trainer 1x/semana',
      'Nutricionista parceiro',
    ],
    description: 'Compromisso total com sua transformação.',
  },
];

function buildWhatsAppMessage(planName: string, planPrice: string, features: string[], userName: string | undefined) {
  const greeting = userName ? `Olá! Sou *${userName}* e tenho interesse no plano ${planName} da Iron Gym.` : `Olá! Tenho interesse no plano ${planName} da Iron Gym.`;
  const featureList = features.map((f) => `✅ ${f}`).join('\n');
  const message = `${greeting}

*Plano:* ${planName}
*Valor:* ${planPrice}/mês

*Benefícios incluídos:*
${featureList}

Gostaria de mais informações sobre como aderir. Pode me ajudar?

💪 Iron Gym Ltda`;
  return encodeURIComponent(message);
}

export default function Plans({ userName }: PlansProps) {
  const { ref, inView } = useInView();

  return (
    <section id="planos" className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-iron-gray via-iron-dark to-iron-gray"></div>

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-iron-red font-oswald text-sm tracking-[0.3em] uppercase flex items-center justify-center gap-2">
            <Sparkles size={14} /> Invista em você <Sparkles size={14} />
          </span>
          <h2 className="font-oswald text-4xl md:text-5xl lg:text-6xl font-bold mt-2 mb-6">
            NOSSOS <span className="text-gradient">PLANOS</span>
          </h2>
          <div className="w-20 h-1 bg-iron-red mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
            Escolha o plano ideal para o seu objetivo. Clique em "Quero este plano" e envie uma mensagem automática para o WhatsApp.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => {
            const message = buildWhatsAppMessage(plan.name, plan.price, plan.features, userName);
            return (
              <div
                key={i}
                className={`relative rounded-3xl p-8 transition-all duration-700 ${
                  plan.highlight
                    ? 'bg-gradient-to-b from-iron-red/20 to-iron-dark border-2 border-iron-red/50 shadow-2xl shadow-iron-red/20 md:scale-105 md:-translate-y-4'
                    : 'bg-iron-dark/60 border border-white/5 hover:border-iron-red/30 hover:-translate-y-2'
                } ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 150 + 200}ms` }}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 red-gradient text-white text-xs font-bold px-4 py-1.5 rounded-full font-oswald tracking-wider shadow-lg shadow-iron-red/30">
                      <Star size={12} fill="currentColor" />
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="font-oswald text-2xl font-bold text-white mb-2 uppercase tracking-wider">
                    {plan.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl md:text-5xl font-oswald font-bold text-white">{plan.price.split(',')[0]}</span>
                    <span className="text-2xl font-oswald font-bold text-iron-red">,{plan.price.split(',')[1]}</span>
                    <span className="text-gray-500 text-sm ml-1">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full red-gradient flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={12} className="text-white" />
                      </div>
                      <span className="text-gray-300 text-sm">{feat}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={`https://wa.me/558281058300?text=${message}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center font-oswald text-sm tracking-wider px-6 py-4 rounded-xl uppercase font-semibold transition-all duration-300 hover:scale-[1.03] flex items-center justify-center gap-2 ${
                    plan.highlight
                      ? 'red-gradient text-white shadow-lg shadow-iron-red/30'
                      : 'border-2 border-iron-red/50 text-iron-red hover:bg-iron-red hover:text-white'
                  }`}
                >
                  <Send size={16} />
                  Quero este plano
                </a>
              </div>
            );
          })}
        </div>

        {/* Note */}
        <p className="text-center text-gray-500 text-xs mt-10 max-w-xl mx-auto">
          Ao clicar em "Quero este plano", você será direcionado ao WhatsApp com uma mensagem automática contendo os detalhes do plano escolhido.
        </p>
      </div>
    </section>
  );
}
