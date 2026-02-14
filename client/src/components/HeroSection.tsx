import { Link } from 'react-router-dom';

export const HeroSection = () => {
    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Background Image with Dark Overlay */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url(/hero-charcuterie.jpg)',
                        filter: 'brightness(0.4)'
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-6">
                    L'Excellence des{' '}
                    <span className="text-gold italic">saveurs espagnoles</span>
                </h1>
                <p className="text-gray-300 text-lg md:text-xl max-w-2xl mb-10 font-light">
                    Une sélection authentique de produits ibériques directement chez vous.
                </p>

                <Link
                    to="/boutique"
                    className="px-8 py-3 bg-gold text-black font-bold uppercase tracking-wider rounded-sm shadow-lg transition-transform hover:scale-105 duration-300"
                >
                    Découvrez nos produits
                </Link>
            </div>

            {/* Decorative Golden Line */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="w-0.5 h-16 bg-gradient-to-b from-gold/0 to-gold/80"></div>
            </div>
        </section>
    );
};