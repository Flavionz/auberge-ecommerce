import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Navbar } from '../../components/Navbar';
import { CartContext } from '../../contexts/CartContext';

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string | null;
  category: {
    name: string;
  };
}

export const BoutiquePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | number>('all');

  const { addToCart } = useContext(CartContext);

  const API_URL = 'http://localhost:3000/api';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await axios.get(`${API_URL}/products`);
        setProducts(productsResponse.data);

        const categoriesResponse = await axios.get(`${API_URL}/categories`);
        setCategories(categoriesResponse.data);

      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter(product => {
    if (selectedCategory === 'all') {
      return true;
    }

    const selectedCategoryObject = categories.find(c => c.id === selectedCategory);

    if (selectedCategoryObject) {
      return product.category.name === selectedCategoryObject.name;
    }

    return false;
  });

  const handleCategorySelect = (categoryId: string | number) => {
    setSelectedCategory(categoryId);
  };

  const getCategoryClass = (categoryId: string | number) => {
    const isActive = selectedCategory === categoryId;
    return `block w-full text-left py-2 px-3 rounded-sm transition-all duration-300 font-sans ${
        isActive
            ? 'bg-[#Cca43b]/20 text-[#Cca43b] border-l-2 border-[#Cca43b]'
            : 'text-gray-400 hover:text-white hover:bg-[#1E1B18]'
    }`;
  };

  const sidebarCategories = [
    { id: 'all', name: 'Tous', label: 'Tous' },
    ...categories.map(c => ({ id: c.id, name: c.name, label: c.name }))
  ];

  return (
      <div className="min-h-screen bg-[#1E1B18] text-white">
        <Navbar />

        <div className="pt-24 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">
                Notre Boutique
              </h1>
              <div className="w-20 h-0.5 bg-[#Cca43b] mx-auto mb-4"></div>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Découvrez notre sélection de produits espagnols d'exception
              </p>
            </div>

            {isLoading ? (
                <div className="text-center text-xl animate-pulse text-[#Cca43b] h-64">
                  Chargement des délices...
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-8">
                  <aside className="lg:w-64 flex-shrink-0">
                    <div className="bg-[#2C2C2C] p-6 rounded-sm sticky top-24">
                      <h3 className="font-serif text-xl text-white mb-6">
                        Catégories
                      </h3>

                      <nav className="space-y-3">
                        {sidebarCategories.map(category => (
                            <button
                                key={category.id}
                                onClick={() => handleCategorySelect(category.id)}
                                className={getCategoryClass(category.id)}
                            >
                              {category.label}
                            </button>
                        ))}
                      </nav>

                      <div className="mt-8 pt-6 border-t border-gray-700">
                        <p className="text-sm text-gray-500">
                          {filteredProducts.length} produit
                          {filteredProducts.length !== 1 ? 's' : ''}
                          {' '}affiché(s)
                        </p>
                      </div>
                    </div>
                  </aside>

                  <main className="flex-1">
                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-20">
                          <p className="text-gray-500 text-lg">
                            Aucun produit dans cette catégorie
                          </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {filteredProducts.map((product) => (
                              <div
                                  key={product.id}
                                  className="bg-[#2C2C2C] rounded-lg overflow-hidden shadow-lg border border-transparent hover:border-[#Cca43b] transition-all duration-300"
                              >
                                <div className="h-48 overflow-hidden relative">
                                  <div className="absolute top-2 left-2 bg-[#Cca43b] text-[#1E1B18] text-xs font-bold px-2 py-0.5 rounded z-10 uppercase">
                                    {product.category?.name || 'Gourmet'}
                                  </div>

                                  <img
                                      src={product.image || "https://placehold.co/400x300/1E1B18/Cca43b?text=Image+Manquante"}
                                      alt={product.name}
                                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                  />
                                </div>

                                <div className="p-4">
                                  <h3 className="text-lg font-bold mb-1 font-serif text-white">
                                    {product.name}
                                  </h3>

                                  <div className="flex justify-between items-center mb-4">
                                    <p className="text-gray-400 text-sm line-clamp-2" title={product.description}>
                                      {product.description.length > 50
                                          ? product.description.substring(0, 50) + '...'
                                          : product.description}
                                    </p>
                                    <span className="text-xl font-serif text-[#Cca43b] font-bold">
                              {product.price.toFixed(2)} €
                            </span>
                                  </div>

                                  <button
                                      onClick={() => addToCart(product)}
                                      className="w-full py-2 border border-[#Cca43b] text-[#Cca43b] hover:bg-[#Cca43b] hover:text-black transition-colors rounded uppercase text-xs tracking-wider font-bold"
                                  >
                                    Ajouter au Panier
                                  </button>
                                </div>
                              </div>
                          ))}
                        </div>
                    )}
                  </main>
                </div>
            )}
          </div>
        </div>
      </div>
  );
};