import { useState, useEffect } from 'react';
import { ProductCard, Product } from './ProductCard';


const fetchFeaturedProducts = async (): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));


  return [
    {
      id: 1,
      name: 'Jambon Ibérique Pata Negra',
      price: 89.9,
      image: 'https://placehold.co/400x300/6A5C45/FFF?text=Pata+Negra', // Placeholder temporaneo
      category: 'Charcuterie'
    },
    {
      id: 2,
      name: 'Manchego Affiné 12 Mois',
      price: 24.5,
      image: 'https://placehold.co/400x300/A08F6B/FFF?text=Manchego', // Placeholder temporaneo
      category: 'Fromage'
    },
    {
      id: 3,
      name: "Huile d'Olive Extra Vierge",
      price: 18.9,
      image: 'https://placehold.co/400x300/4D774E/FFF?text=Olio+EVO', // Placeholder temporaneo
      category: 'Huiles'
    },
    {
      id: 4,
      name: 'Vin Rouge Ribera del Duero',
      price: 32.75,
      image: 'https://placehold.co/400x300/581845/FFF?text=Ribera+del+Duero', // Placeholder temporaneo
      category: 'Vins'
    }
  ];
};

export const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchFeaturedProducts(); // Chiama la tua funzione reale
        setProducts(data);
      } catch (err) {
        console.error("Errore durante il fetching dei prodotti in evidenza:", err);
        setError("Non è stato possibile caricare i prodotti in evidenza.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <section className="py-20 bg-dark">
      <div className="container-custom text-center text-white/70">
        <h2 className="section-title">Nos Incontournables</h2>
        <p className="mt-8">Caricamento dei prodotti in corso...</p>
        {/* Aggiungi un semplice spinner Tailwind CSS se desideri */}
      </div>
    </section>;
  }

  if (error) {
    return <section className="py-20 bg-dark">
      <div className="container-custom text-center text-red-400">
        <h2 className="section-title">Nos Incontournables</h2>
        <p className="mt-8">{error}</p>
      </div>
    </section>;
  }

  if (products.length === 0) {
    return <section className="py-20 bg-dark">
      <div className="container-custom text-center text-white/70">
        <h2 className="section-title">Nos Incontournables</h2>
        <p className="mt-8">Nessun prodotto in evidenza disponibile al momento.</p>
      </div>
    </section>;
  }

  return <section className="py-20 bg-dark">
    <div className="container-custom">
      <h2 className="section-title">Nos Incontournables</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {products.map(product => (
            <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  </section>;
};