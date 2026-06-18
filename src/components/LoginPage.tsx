import { useState, FormEvent } from 'react';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, Check, Gift } from 'lucide-react';
import type { PlanType } from '../hooks/useAuth';

interface LoginPageProps {
  onRegister: (name: string, email: string, password: string, plan: PlanType) => { success: boolean; message: string };
  onLogin: (email: string, password: string) => { success: boolean; message: string };
}

const planOptions = [
  {
    id: 'Mensal' as PlanType,
    name: 'Mensal',
    price: 'R$ 89,90',
    period: '/mês',
    features: ['Musculação', 'Cardio', 'Avaliação inicial'],
    color: 'from-gray-700 to-gray-900',
  },
  {
    id: 'Trimestral' as PlanType,
    name: 'Trimestral',
    price: 'R$ 79,90',
    period: '/mês',
    features: ['Tudo do Mensal', 'Funcional', 'Armário'],
    highlight: true,
    color: 'from-iron-red to-red-800',
  },
  {
    id: 'Semestral' as PlanType,
    name: 'Semestral',
    price: 'R$ 69,90',
    period: '/mês',
    features: ['Tudo incluso', 'Personal', 'Nutricionista'],
    color: 'from-amber-700 to-amber-900',
  },
];

function getPlanFeatures(plan: Exclude<PlanType, null>): string[] {
  const details: Record<Exclude<PlanType, null>, string[]> = {
    Mensal: ['Acesso à musculação', 'Acesso ao cardio', 'Avaliação física inicial', 'Acompanhamento básico', 'Horário livre'],
    Trimestral: ['Acesso à musculação', 'Acesso ao cardio', 'Avaliação física mensal', 'Acompanhamento personalizado', 'Aulas de funcional', 'Armário exclusivo', 'Desconto em suplementos'],
    Semestral: ['Acesso TOTAL à academia', 'Avaliação física mensal', 'Acompanhamento personalizado', 'Todas as modalidades', 'Armário exclusivo', 'Personal Trainer 1x/semana', 'Nutricionista parceiro'],
  };
  return details[plan];
}

function buildWhatsAppMessage(name: string, email: string, plan: Exclude<PlanType, null>) {
  const features = getPlanFeatures(plan).map((f) => `✅ ${f}`).join('\n');
  const price = planOptions.find((p) => p.id === plan)!;
  const message = `*🔴 NOVO CADASTRO - IRON GYM*\n\nOlá! Sou *${name}* e acabei de me cadastrar na Iron Gym!\n\n*Dados do cadastro:*\n👤 Nome: ${name}\n📧 Email: ${email}\n\n*Plano escolhido:* ${plan}\n💰 Valor: ${price.price}${price.period}\n\n*Benefícios incluídos:*\n${features}\n\nGostaria de confirmar a adesão e finalizar a matrícula. Aguardo retorno!\n\n💪 Iron Gym Ltda`;
  return encodeURIComponent(message);
}

export default function LoginPage({ onRegister, onLogin }: LoginPageProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [step, setStep] = useState<'form' | 'plan'>('form');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<PlanType>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'register') {
      if (!name.trim()) return setError('Por favor, informe seu nome.');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError('Informe um email válido.');
      if (password.length < 4) return setError('A senha deve ter pelo menos 4 caracteres.');
      if (password !== confirmPassword) return setError('As senhas não coincidem.');
      setStep('plan');
      return;
    }

    if (!email || !password) return setError('Preencha todos os campos.');

    setLoading(true);
    setTimeout(() => {
      const result = onLogin(email, password);
      if (!result.success) {
        setError(result.message);
        setLoading(false);
      }
    }, 800);
  };

  const confirmPlan = () => {
    if (!selectedPlan) return setError('Selecione um plano para continuar.');
    setError('');
    setLoading(true);

    const result = onRegister(name, email, password, selectedPlan);
    if (!result.success) {
      setError(result.message);
      setLoading(false);
      setStep('form');
      return;
    }

    // Redirect to WhatsApp with automatic message
    const whatsappMessage = buildWhatsAppMessage(name.trim(), email.trim(), selectedPlan);
    const whatsappUrl = `https://wa.me/558281058300?text=${whatsappMessage}`;

    // Open WhatsApp in a new tab after a small delay
    setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }, 500);
  };

  const backToForm = () => {
    setStep('form');
    setError('');
  };

  return (
    <div className="min-h-screen bg-iron-dark flex items-center justify-center relative overflow-hidden px-4 py-8">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/4162451/pexels-photo-4162451.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1920"
          alt="Iron Gym"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-iron-dark/90 to-black/95"></div>
      </div>

      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-iron-red/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-iron-red/5 rounded-full blur-3xl"></div>

      {/* Card */}
      <div className="relative w-full max-w-md animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src="/images/iron-gym-logo.png"
            alt="Iron Gym Logo"
            className="w-32 h-32 mx-auto object-contain mb-4 drop-shadow-2xl"
            style={{ mixBlendMode: 'lighten' }}
          />
          <h1 className="font-oswald text-4xl md:text-5xl font-bold tracking-wider">
            IRON<span className="text-gradient"> GYM</span>
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            {mode === 'login'
              ? 'Entre na sua conta para continuar'
              : step === 'plan'
              ? 'Escolha seu plano ideal'
              : 'Crie sua conta e escolha seu plano'}
          </p>
        </div>

        {/* Mode Toggle */}
        {step === 'form' && (
          <div className="flex bg-iron-gray/50 rounded-xl p-1 mb-6 border border-white/5">
            <button
              onClick={() => { setMode('login'); setError(''); }}
              className={`flex-1 py-2.5 rounded-lg font-oswald text-sm uppercase tracking-wider font-semibold transition-all duration-300 ${
                mode === 'login' ? 'red-gradient text-white shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              Entrar
            </button>
            <button
              onClick={() => { setMode('register'); setError(''); setStep('form'); }}
              className={`flex-1 py-2.5 rounded-lg font-oswald text-sm uppercase tracking-wider font-semibold transition-all duration-300 ${
                mode === 'register' ? 'red-gradient text-white shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              Cadastrar
            </button>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-iron-dark/80 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/5 shadow-2xl">
          {step === 'form' && (
            <>
              {mode === 'register' && (
                <div className="mb-4">
                  <label className="block text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">Nome</label>
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Seu nome completo"
                      className="w-full bg-iron-gray/50 border border-white/5 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-iron-red/50 focus:ring-2 focus:ring-iron-red/20 transition-all"
                    />
                  </div>
                </div>
              )}

              <div className="mb-4">
                <label className="block text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">Email</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="voce@email.com"
                    className="w-full bg-iron-gray/50 border border-white/5 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-iron-red/50 focus:ring-2 focus:ring-iron-red/20 transition-all"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">Senha</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-iron-gray/50 border border-white/5 rounded-xl pl-12 pr-12 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-iron-red/50 focus:ring-2 focus:ring-iron-red/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-iron-red transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {mode === 'register' && (
                <div className="mb-4">
                  <label className="block text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">Confirmar Senha</label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-iron-gray/50 border border-white/5 rounded-xl pl-12 pr-12 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-iron-red/50 focus:ring-2 focus:ring-iron-red/20 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-iron-red transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              )}

              {mode === 'login' && (
                <div className="flex justify-end mb-4">
                  <button type="button" className="text-iron-red text-xs hover:underline">
                    Esqueceu sua senha?
                  </button>
                </div>
              )}
            </>
          )}

          {/* Plan Selection Step */}
          {step === 'plan' && mode === 'register' && (
            <div className="animate-fade-in-up">
              <div className="mb-6 flex items-center gap-2">
                <Gift size={20} className="text-iron-red" />
                <p className="text-white font-oswald text-base tracking-wider uppercase">Selecione seu plano</p>
              </div>

              <div className="space-y-3 mb-6">
                {planOptions.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPlan(p.id)}
                    className={`w-full text-left rounded-xl p-4 border-2 transition-all duration-300 relative ${
                      selectedPlan === p.id
                        ? 'border-iron-red bg-iron-red/10'
                        : 'border-white/5 bg-iron-gray/30 hover:border-white/20'
                    }`}
                  >
                    {p.highlight && (
                      <span className="absolute top-2 right-2 bg-iron-red text-white text-[10px] font-bold px-2 py-0.5 rounded font-oswald tracking-wider">
                        POPULAR
                      </span>
                    )}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-oswald text-base font-bold text-white uppercase tracking-wider">{p.name}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{p.features.join(' • ')}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-oswald text-lg font-bold text-white">{p.price}</p>
                        <p className="text-gray-500 text-xs">{p.period}</p>
                      </div>
                    </div>
                    {selectedPlan === p.id && (
                      <div className="absolute top-3 left-3">
                        <div className="w-6 h-6 rounded-full red-gradient flex items-center justify-center">
                          <Check size={14} className="text-white" />
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <p className="text-xs text-gray-500 mb-4 text-center">
                💬 Ao confirmar, você será direcionado ao WhatsApp para finalizar sua matrícula.
              </p>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={backToForm}
                  className="flex-1 border-2 border-white/10 text-white font-oswald text-sm tracking-wider py-3.5 rounded-xl uppercase font-semibold hover:border-iron-red transition-all"
                >
                  Voltar
                </button>
                <button
                  type="button"
                  onClick={confirmPlan}
                  disabled={loading || !selectedPlan}
                  className="flex-1 red-gradient text-white font-oswald text-sm tracking-wider py-3.5 rounded-xl uppercase font-semibold hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      Confirmar & WhatsApp
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 'form' && (
            <>
              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full red-gradient text-white font-oswald text-base tracking-wider py-3.5 rounded-xl uppercase font-semibold hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    {mode === 'login' ? 'Entrando...' : 'Próximo...'}
                  </>
                ) : (
                  <>
                    {mode === 'login' ? 'Entrar' : 'Próximo'}
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              <p className="text-center text-gray-500 text-xs mt-6">
                Ao continuar, você concorda com os Termos de Uso e Política de Privacidade.
              </p>
            </>
          )}
        </form>

        <p className="text-center text-gray-600 text-xs mt-6">
          © {new Date().getFullYear()} Iron Gym Ltda. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
