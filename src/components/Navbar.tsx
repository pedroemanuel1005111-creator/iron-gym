import { useState, useEffect } from 'react';
import { Menu, X, Phone, User, LogOut } from 'lucide-react';

interface NavbarProps {
  userName?: string;
  onLogout?: () => void;
}

export default function Navbar({ userName, onLogout }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Meu Plano', href: '#meu-plano' },
    { label: 'Meus Treinos', href: '#meus-treinos' },
    { label: 'Modalidades', href: '#modalidades' },
    { label: 'Planos', href: '#planos' },
    { label: 'Horários', href: '#horarios' },
    { label: 'Contato', href: '#contato' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-iron-dark/95 backdrop-blur-md shadow-lg shadow-black/30 border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-3">
            <img
              src="/images/iron-gym-logo.png"
              alt="Iron Gym Logo"
              className="h-12 md:h-14 w-auto object-contain"
              style={{ mixBlendMode: 'lighten' }}
            />
            <span className="font-oswald text-2xl md:text-3xl font-bold tracking-wider text-white hidden sm:inline">
              IRON<span className="text-iron-red"> GYM</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-inter text-sm font-medium text-gray-300 hover:text-iron-red transition-colors duration-200 tracking-wide uppercase"
              >
                {link.label}
              </a>
            ))}

            {userName && (
              <div className="flex items-center gap-2 border-l border-white/10 pl-4">
                <div className="w-8 h-8 rounded-full red-gradient flex items-center justify-center">
                  <User size={14} className="text-white" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-xs text-gray-400">Olá,</span>
                  <span className="text-sm font-semibold text-white truncate max-w-[120px]">{userName}</span>
                </div>
                {onLogout && (
                  <button
                    onClick={onLogout}
                    className="ml-2 text-gray-500 hover:text-iron-red transition-colors"
                    title="Sair"
                  >
                    <LogOut size={16} />
                  </button>
                )}
              </div>
            )}

            <a
              href="https://wa.me/558281058300"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-iron-red hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 hover:scale-105"
            >
              <Phone size={16} />
              WhatsApp
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-iron-dark/98 backdrop-blur-md border-t border-white/5 px-4 py-4 space-y-1">
          {userName && (
            <div className="flex items-center gap-3 p-3 bg-iron-red/10 border border-iron-red/20 rounded-xl mb-2">
              <div className="w-10 h-10 rounded-full red-gradient flex items-center justify-center">
                <User size={18} className="text-white" />
              </div>
              <div className="flex-1">
                <span className="text-xs text-gray-400">Olá,</span>
                <p className="text-sm font-semibold text-white">{userName}</p>
              </div>
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="text-gray-500 hover:text-iron-red transition-colors"
                >
                  <LogOut size={18} />
                </button>
              )}
            </div>
          )}
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-3 px-4 text-gray-300 hover:text-iron-red hover:bg-white/5 rounded-lg font-medium text-sm uppercase tracking-wide transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/558281058300"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-iron-red hover:bg-red-700 text-white px-5 py-3 rounded-lg font-semibold text-sm transition-all mt-3"
          >
            <Phone size={16} />
            Fale pelo WhatsApp
          </a>
        </div>
      </div>
    </nav>
  );
}
