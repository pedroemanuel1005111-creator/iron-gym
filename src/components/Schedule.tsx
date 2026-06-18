import { Clock, AlertCircle } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const schedule = [
  { day: 'Segunda-feira', hours: '05:00 – 10:00 / 12:00 – 22:00', isOpen: true },
  { day: 'Terça-feira', hours: '05:00 – 10:00 / 12:00 – 22:00', isOpen: true },
  { day: 'Quarta-feira', hours: '05:00 – 10:00 / 12:00 – 22:00', isOpen: true },
  { day: 'Quinta-feira', hours: '05:00 – 10:00 / 12:00 – 22:00', isOpen: true },
  { day: 'Sexta-feira', hours: '05:00 – 10:00 / 12:00 – 22:00', isOpen: true },
  { day: 'Sábado', hours: '07:00 – 12:00', isOpen: true },
  { day: 'Domingo', hours: 'Fechado', isOpen: false },
];

function getCurrentDayIndex(): number {
  const day = new Date().getDay();
  // JS: 0=Sun, 1=Mon... we need: 0=Mon, 1=Tue...
  return day === 0 ? 6 : day - 1;
}

export default function Schedule() {
  const { ref, inView } = useInView();
  const today = getCurrentDayIndex();

  return (
    <section id="horarios" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-iron-dark via-iron-gray to-iron-dark"></div>
      
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-iron-red font-oswald text-sm tracking-[0.3em] uppercase">Quando estamos abertos</span>
          <h2 className="font-oswald text-4xl md:text-5xl lg:text-6xl font-bold mt-2 mb-6">
            HORÁRIOS DE <span className="text-gradient">FUNCIONAMENTO</span>
          </h2>
          <div className="w-20 h-1 bg-iron-red mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Schedule Table */}
          <div className={`lg:col-span-3 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="bg-iron-dark/60 backdrop-blur-sm rounded-2xl border border-white/5 overflow-hidden shadow-2xl shadow-black/30">
              <div className="red-gradient p-5">
                <div className="flex items-center gap-3">
                  <Clock size={24} className="text-white" />
                  <h3 className="font-oswald text-xl font-bold text-white tracking-wider uppercase">
                    Horários da Semana
                  </h3>
                </div>
              </div>
              
              <div className="divide-y divide-white/5">
                {schedule.map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between px-6 py-4 transition-all duration-300 ${
                      i === today
                        ? 'bg-iron-red/10 border-l-4 border-iron-red'
                        : 'hover:bg-white/[0.02] border-l-4 border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${
                          item.isOpen ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      ></div>
                      <span className={`font-medium text-sm md:text-base ${
                        i === today ? 'text-white font-semibold' : 'text-gray-300'
                      }`}>
                        {item.day}
                        {i === today && (
                          <span className="ml-2 text-xs text-iron-red font-oswald tracking-wider">(HOJE)</span>
                        )}
                      </span>
                    </div>
                    <span className={`text-sm md:text-base font-mono ${
                      item.isOpen ? 'text-gray-300' : 'text-red-400'
                    }`}>
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Side Info */}
          <div className={`lg:col-span-2 space-y-6 transition-all duration-700 delay-400 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {/* Current Status Card */}
            <div className="bg-iron-dark/60 backdrop-blur-sm rounded-2xl border border-white/5 p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-3 h-3 rounded-full animate-pulse ${schedule[today].isOpen ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="font-oswald text-lg font-bold text-white uppercase tracking-wider">
                  {schedule[today].isOpen ? 'Aberto Agora' : 'Fechado'}
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                {schedule[today].isOpen
                  ? `Hoje é ${schedule[today].day.toLowerCase()}. Funcionamos das ${schedule[today].hours.toLowerCase()}.`
                  : 'Estamos fechados hoje. Volte amanhã!'}
              </p>
            </div>

            {/* Notice */}
            <div className="bg-iron-red/10 border border-iron-red/20 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <AlertCircle size={20} className="text-iron-red mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white text-sm mb-1">Atenção</p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Os horários podem sofrer alterações em feriados. Entre em contato para confirmar.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-iron-dark/60 backdrop-blur-sm rounded-2xl border border-white/5 p-6 text-center">
              <p className="text-gray-400 text-sm mb-4">Ficou com alguma dúvida sobre os horários?</p>
              <a
                href="https://wa.me/558281058300?text=Olá! Gostaria de confirmar os horários de funcionamento."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 red-gradient text-white font-oswald text-sm tracking-wider px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300 uppercase font-semibold"
              >
                Confirme pelo WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
