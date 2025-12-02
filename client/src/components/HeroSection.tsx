import { Link } from 'react-router-dom';

// L'immagine è ora referenziata da /hero-charcuterie.jpg, che punta a client/public.
// Questo è l'approccio corretto in fase di sviluppo per gli asset nella cartella 'public'.
const HERO_IMAGE_URL = '/hero-charcuterie.jpg';

export const HeroSection = () => {
    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">

            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                {/* Overlay con colore scuro e opacità: bg-dark/70 */}
                <div className="absolute inset-0 bg-dark/70 z-10"></div>

                {/* Immagine di sfondo aggiornata con l'asset locale */}
                <img
                    src={HERO_IMAGE_URL}
                    alt="Authentic Spanish Charcuterie and Cheese Board"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content (Simulando container-custom con max-w-7xl mx-auto) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 flex flex-col items-center text-center">
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-6">
                    L'Excellence des{' '}
                    {/* text-gold */}
                    <span className="text-gold italic">saveurs espagnoles</span>
                </h1>
                <p className="text-gray-300 text-lg md:text-xl max-w-2xl mb-10 font-light">
                    Une sélection authentique de produits ibériques directement chez vous.
                </p>

                {/* Pulsante Primary: bg-gold */}
                <Link
                    to="/boutique"
                    className="px-8 py-3 bg-gold text-black font-bold uppercase tracking-wider rounded-sm shadow-lg transition-transform hover:scale-[1.03] duration-300"
                >
                    Découvrez nos produits
                </Link>
            </div>

            {/* Decorative element */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                {/* Gradiente Oro: from-gold/0 to-gold/80 */}
                <div
                    className="w-0.5 h-16 bg-gradient-to-b from-gold/0 to-gold/80"
                ></div>
            </div>
        </section>
    );
};