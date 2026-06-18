import { Crown, Calendar, Check, Star, Dumbbell, Shield, Zap, TrendingUp } from 'lucide-react';
import type { PlanType, User } from '../hooks/useAuth';

interface MyPlanProps {
  user: User;
}

const planDetails: Record<Exclude<PlanType, null>, { price: string; period: string; color: string; features: string[]; icon: any }> = {
  Mensal: {
    price: 'R$ 89,90',
    period: '/mês',
    color: 'from-gray-700 to-gray-900',
    features: ['Acesso à musculação', 'Acesso ao cardio', 'Avaliação física inicial', 'Acompanhamento básico', 'Horário livre'],
    icon: Dumbbell,
  },
  Trimestral: {
    price: 'R$ 79,90',
    period: '/mês',
    color: 'from-iron-red to-red-800',
    features: ['Acesso à musculação', 'Acesso ao cardio', 'Avaliação física mensal', 'Acompanhamento personalizado', 'Aulas de funcional', 'Armário exclusivo', 'Desconto em suplementos'],
    icon: TrendingUp,
  },
  Semestral: {
    price: 'R$ 69,90',
    period: '/mês',
    color: 'from-amber-700 to-amber-900',
    features: ['Acesso TOTAL à academia', 'Avaliação física mensal', 'Acompanhamento personalizado', 'Todas as modalidades', 'Armário exclusivo', 'Personal Trainer 1x/semana', 'Nutricionista parceiro'],
    icon: Crown,
  },
};

export default function MyPlan({ user }: MyPlanProps) {
  const plan = user.plan;
  if (!plan) {
    return (
      <div className="text-center p-8 bg-iron-dark/60 rounded-2xl border border-white/5">
        <p className="text-gray-400">Você ainda não possui um plano ativo.</p>
      </div>
    );
  }

  const details = planDetails[plan];
  const registeredDate = new Date(user.registeredAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <section id="meu-plano" className="py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-iron-dark via-iron-gray/50 to-iron-dark"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-iron-red font-oswald text-sm tracking-[0.3em] uppercase flex items-center justify-center gap-2">
            <Crown size={14} fill="currentColor" /> Área do Aluno
          </span>
          <h2 className="font-oswald text-4xl md:text-5xl lg:text-6xl font-bold mt-2 mb-4">
            SEU <span className="text-gradient">PLANO ATIVO</span>
          </h2>
          <div className="w-20 h-1 bg-iron-red mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Welcome Card */}
          <div className="bg-iron-dark/60 rounded-2xl border border-white/5 p-6 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full red-gradient flex items-center justify-center text-white font-oswald text-xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wider">Bem-vindo de volta,</p>
                <h3 className="text-white font-oswald text-2xl font-bold">{user.name}</h3>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                <Calendar size={18} className="text-iron-red" />
                <div>
                  <p className="text-gray-500 text-xs">Membro desde</p>
                  <p className="text-white text-sm font-medium capitalize">{registeredDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                <Shield size={18} className="text-iron-red" />
                <div>
                  <p className="text-gray-500 text-xs">Email</p>
                  <p className="text-white text-sm font-medium">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                <Zap size={18} className="text-iron-red" />
                <div>
                  <p className="text-gray-500 text-xs">Status</p>
                  <p className="text-green-400 text-sm font-medium flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    Ativo
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Plan Card */}
          <div className="lg:col-span-2 relative rounded-2xl overflow-hidden border-2 border-iron-red/50 shadow-2xl shadow-iron-red/10">
            <div className={`absolute inset-0 bg-gradient-to-br ${details.color} opacity-20`}></div>

            <div className="relative p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 red-gradient px-3 py-1 rounded-full mb-3">
                    <Star size={12} className="text-white" fill="currentColor" />
                    <span className="text-white text-xs font-bold font-oswald tracking-wider">PLANO ATIVO</span>
                  </div>
                  <h3 className="font-oswald text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">
                    Plano {plan}
                  </h3>
                </div>
                <div className="text-right">
                  <details.icon size={48} className="text-iron-red mx-auto mb-2" />
                  <p className="text-gray-400 text-xs uppercase tracking-wider">Valor</p>
                  <p className="font-oswald text-3xl font-bold text-white">{details.price}</p>
                  <p className="text-gray-400 text-sm">{details.period}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mt-6">
                {details.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 bg-white/5 rounded-lg">
                    <div className="w-6 h-6 rounded-full red-gradient flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-white" />
                    </div>
                    <span className="text-gray-200 text-sm">{feat}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-gray-400 text-xs">Precisa mudar seu plano?</p>
                  <p className="text-white text-sm">Fale conosco pelo WhatsApp</p>
                </div>
                <a
                  href={`https://wa.me/558281058300?text=${encodeURIComponent(`Olá! Sou ${user.name} (plano ${plan}) e gostaria de mais informações sobre meu plano.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="red-gradient text-white font-oswald text-sm tracking-wider px-6 py-3 rounded-xl uppercase font-semibold hover:scale-105 transition-all flex items-center gap-2"
                >
                  <Zap size={16} />
                  Trocar Plano
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
