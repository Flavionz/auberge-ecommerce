import { HeroSection } from '../components/HeroSection';
import { ProductGrid } from '../components/ProductGrid';
import { AboutSection } from '../components/AboutSection';

export const HomePage = () => {
    return (
        <>
            <HeroSection />
            <ProductGrid />
            <AboutSection />
        </>
    );
};