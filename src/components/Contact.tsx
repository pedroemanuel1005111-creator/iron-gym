import { MapPin, Phone, MessageCircle } from 'lucide-react';
import { useInView } from '../hooks/useInView';

export default function Contact() {
  const { ref, inView } = useInView();

  return (
    <section id="contato" className="py-20 md:py-28 bg-iron-dark relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-iron-red/5 rounded-full blur-3xl"></div>

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-iron-red font-oswald text-sm tracking-[0.3em] uppercase">Fale conosco</span>
          <h2 className="font-oswald text-4xl md:text-5xl lg:text-6xl font-bold mt-2 mb-6">
            ENTRE EM <span className="text-gradient">CONTATO</span>
          </h2>
          <div className="w-20 h-1 bg-iron-red mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Contact Info */}
          <div className={`space-y-6 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-white/5 shadow-2xl shadow-black/30 h-[300px] md:h-[350px]">
              <iframe
                src="https://www.google.com/maps?q=-9.4879739,-35.8155839&hl=pt-BR&z=17&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(0.9)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização Iron Gym"
              ></iframe>
            </div>

            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-iron-gray/40 rounded-2xl p-6 border border-white/5 hover:border-iron-red/30 transition-all group">
                <div className="w-12 h-12 rounded-xl red-gradient flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <MapPin size={20} className="text-white" />
                </div>
                <h4 className="font-oswald text-base font-bold text-white mb-1 uppercase tracking-wider">Endereço</h4>
                <a 
                  href="https://www.google.com/maps/place/Iron+Gym+Ltda/@-9.4879739,-35.8181588,17z/data=!3m1!4b1!4m6!3m5!1s0x701370723c3b6a9:0xc1a7295ba01f711a!8m2!3d-9.4879739!4d-35.8155839!16s%2Fg%2F11k54_bjdm?hl=pt-BR&entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 text-sm leading-relaxed hover:text-iron-red transition-colors block"
                >
                  Pref. Antônio Lins de Souza<br />
                  Rio Largo – AL
                </a>
              </div>

              <div className="bg-iron-gray/40 rounded-2xl p-6 border border-white/5 hover:border-iron-red/30 transition-all group">
                <div className="w-12 h-12 rounded-xl red-gradient flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Phone size={20} className="text-white" />
                </div>
                <h4 className="font-oswald text-base font-bold text-white mb-1 uppercase tracking-wider">Telefone</h4>
                <a href="tel:08281058300" className="text-gray-400 text-sm hover:text-iron-red transition-colors">
                  82 8105-8300
                </a>
              </div>
            </div>

            {/* Instagram Card */}
            <a
              href="https://www.instagram.com/irongym_rl/"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-iron-gray/40 rounded-2xl p-6 border border-white/5 hover:border-pink-500/40 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-pink-500/20">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-oswald text-base font-bold text-white uppercase tracking-wider mb-1">Instagram</h4>
                  <p className="text-gray-400 text-sm group-hover:text-pink-400 transition-colors truncate">
                    @irongym_rl
                  </p>
                </div>
                <span className="text-gray-500 text-xs hidden sm:inline group-hover:text-pink-400 transition-colors">Seguir →</span>
              </div>
            </a>
          </div>

          {/* CTA Side */}
          <div className={`transition-all duration-700 delay-400 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-iron-gray/40 rounded-2xl border border-white/5 p-8 md:p-10">
              <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-full red-gradient flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                  <MessageCircle size={32} className="text-white" />
                </div>
                <h3 className="font-oswald text-2xl md:text-3xl font-bold text-white mb-3 uppercase tracking-wider">
                  Fale pelo WhatsApp
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Tire suas dúvidas, conheça nossos planos e agende sua visita diretamente pelo WhatsApp. Atendimento rápido e personalizado!
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="https://wa.me/558281058300?text=Olá! Gostaria de saber mais sobre os planos da Iron Gym."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full red-gradient text-white font-oswald text-lg tracking-wider px-8 py-4 rounded-xl hover:scale-[1.02] transition-all duration-300 uppercase font-semibold shadow-lg shadow-iron-red/20"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Enviar Mensagem
                </a>

                <a
                  href="tel:08281058300"
                  className="flex items-center justify-center gap-3 w-full border-2 border-white/10 text-white font-oswald text-lg tracking-wider px-8 py-4 rounded-xl hover:border-iron-red hover:text-iron-red transition-all duration-300 uppercase font-semibold"
                >
                  <Phone size={20} />
                  Ligar Agora
                </a>
              </div>

              <p className="text-center text-gray-500 text-xs mt-6">
                Respondemos em até 30 minutos durante o horário de funcionamento.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
