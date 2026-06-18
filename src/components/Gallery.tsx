import { useInView } from '../hooks/useInView';

const images = [
  {
    src: 'https://images.pexels.com/photos/2204196/pexels-photo-2204196.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
    alt: 'Treino de musculação',
    label: 'Musculação',
  },
  {
    src: 'https://images.pexels.com/photos/16513601/pexels-photo-16513601.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
    alt: 'Equipamentos da academia',
    label: 'Equipamentos',
  },
  {
    src: 'https://images.pexels.com/photos/5327451/pexels-photo-5327451.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
    alt: 'Pesos e halteres',
    label: 'Pesos Livres',
  },
  {
    src: 'https://images.pexels.com/photos/29703809/pexels-photo-29703809.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
    alt: 'Área de treino',
    label: 'Área de Treino',
  },
];

export default function Gallery() {
  const { ref, inView } = useInView();

  return (
    <section className="py-20 md:py-28 bg-iron-dark relative overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-iron-red font-oswald text-sm tracking-[0.3em] uppercase">Nossa estrutura</span>
          <h2 className="font-oswald text-4xl md:text-5xl lg:text-6xl font-bold mt-2 mb-6">
            AMBIENTE <span className="text-gradient">COMPLETO</span>
          </h2>
          <div className="w-20 h-1 bg-iron-red mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
            Conheça nossa estrutura moderna e preparada para o seu melhor treino.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <div
              key={i}
              className={`group relative rounded-2xl overflow-hidden aspect-[4/5] transition-all duration-700 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${i * 150 + 200}ms` }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <p className="font-oswald text-lg font-bold text-white tracking-wider uppercase">
                  {img.label}
                </p>
                <div className="w-10 h-0.5 bg-iron-red mt-2 group-hover:w-16 transition-all duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
