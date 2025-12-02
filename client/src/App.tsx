import { Navbar } from './components/Navbar'; // Rimosso 'React'
import { HeroSection } from './components/HeroSection';
import { ProductGrid } from './components/ProductGrid';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';

export function App() {
    return <div className="min-h-screen bg-dark text-white">
        <Navbar />
        <main>
            <HeroSection />
            <ProductGrid />
            <AboutSection />
        </main>
        <Footer />
    </div>;
}