import { PlusIcon } from 'lucide-react';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}


export const ProductCard = ({
                              name,
                              price,
                              image,
                              category
                            }: Product) => {
  return <div className="bg-darkAccent rounded-sm overflow-hidden transition-transform duration-500 hover:translate-y-[-8px] group">
    <div className="relative overflow-hidden h-60">
      <img src={image}
           alt={name}
           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
           onError={(e) => {
             const target = e.target as HTMLImageElement;
             target.onerror = null; // Previene loop infiniti
             target.src = 'https://placehold.co/600x400/333333/FFFFFF?text=Image+Non+Disponibile';
           }}
      />
      <div className="absolute top-4 left-4">
          <span className="text-xs uppercase tracking-wider bg-gold/90 text-dark px-3 py-1 rounded-full">
            {category}
          </span>
      </div>
    </div>
    <div className="p-5">
      <h3 className="font-serif text-lg text-white mb-1">{name}</h3>
      <div className="flex justify-between items-center mt-4">
        <p className="text-gold font-medium text-xl">{price.toFixed(2)} €</p>
        <button
            className="bg-dark/50 border border-gold hover:bg-gold text-gold hover:text-dark p-2 rounded-full transition-all duration-300 shadow-lg"
            aria-label={`Aggiungi ${name} al carrello`}
        >
          <PlusIcon size={18} />
        </button>
      </div>
    </div>
  </div>;
};