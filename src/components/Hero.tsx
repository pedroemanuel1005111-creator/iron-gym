import { ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/4162451/pexels-photo-4162451.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1920"
          alt="Iron Gym"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-iron-dark"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
          <img
            src="/images/iron-gym-logo.png"
            alt="Iron Gym Logo"
            className="w-44 h-44 md:w-56 md:h-56 mx-auto object-contain mb-4 drop-shadow-2xl"
            style={{ mixBlendMode: 'lighten' }}
          />
        </div>

        <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <div className="inline-block mb-6">
            <span className="text-iron-red font-oswald text-sm md:text-base tracking-[0.3em] uppercase border border-iron-red/30 px-4 py-2 rounded-full">
              Academia de Musculação & Fitness
            </span>
          </div>
        </div>

        <h1
          className="font-oswald text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight animate-fade-in-up opacity-0"
          style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
        >
          <span className="text-white">IRON</span>{' '}
          <span className="text-gradient">GYM</span>
        </h1>

        <p
          className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-4 font-light animate-fade-in-up opacity-0"
          style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
        >
          Transforme seu corpo, supere seus limites. A melhor academia de Rio Largo está esperando por você.
        </p>

        <a
          href="https://www.google.com/maps/place/Iron+Gym+Ltda/@-9.4879739,-35.8181588,17z/data=!3m1!4b1!4m6!3m5!1s0x701370723c3b6a9:0xc1a7295ba01f711a!8m2!3d-9.4879739!4d-35.8155839!16s%2Fg%2F11k54_bjdm?hl=pt-BR&entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-iron-red text-sm md:text-base mb-10 animate-fade-in-up opacity-0 flex items-center justify-center gap-2 transition-colors"
          style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}
        >
          📍 Pref. Antônio Lins de Souza, Rio Largo – AL
        </a>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up opacity-0"
          style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
        >
          <a
            href="https://wa.me/558281058300?text=Olá! Gostaria de saber mais sobre os planos da Iron Gym."
            target="_blank"
            rel="noopener noreferrer"
            className="red-gradient text-white font-oswald text-lg tracking-wider px-10 py-4 rounded-lg hover:scale-105 transition-all duration-300 animate-pulse-glow uppercase font-semibold"
          >
            Comece Agora
          </a>
          <a
            href="#sobre"
            className="border-2 border-white/20 text-white font-oswald text-lg tracking-wider px-10 py-4 rounded-lg hover:border-iron-red hover:text-iron-red transition-all duration-300 uppercase font-semibold"
          >
            Saiba Mais
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#sobre" className="text-white/50 hover:text-iron-red transition-colors">
          <ChevronDown size={32} />
        </a>
      </div>

      {/* Side decorative elements */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-32 bg-gradient-to-b from-transparent via-iron-red to-transparent hidden lg:block"></div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-32 bg-gradient-to-b from-transparent via-iron-red to-transparent hidden lg:block"></div>
    </section>
  );
}
