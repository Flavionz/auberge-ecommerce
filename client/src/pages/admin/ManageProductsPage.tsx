import { AdminLayout } from '../../components/admin/AdminLayout';
import { Edit, Trash2, Plus } from 'lucide-react';
import { Link } from 'react-router-dom'; // Usiamo Link per la navigazione interna

// Dati fittizi per la tabella prodotti (Da sostituire con il fetching API reale)
const mockProducts = [
    { id: 1, name: 'Jambon Ibérique', category: 'Charcuterie', price: 89.90, stock: 12 },
    { id: 2, name: 'Manchego Affiné DOP', category: 'Fromage', price: 24.50, stock: 5 },
    { id: 3, name: "Huile d'Olive V.E.", category: 'Huiles', price: 18.90, stock: 45 },
    { id: 4, name: 'Vin Rouge Tinto Crianza', category: 'Vins', price: 0, stock: 0 },
    { id: 5, name: 'Miele di Castagno Bio', category: 'Dolci', price: 9.50, stock: 21 },
];

export const ManageProductsPage = () => {

    // TODO: Implementare il fetching dei dati reali usando useState e useEffect
    // const [products, setProducts] = useState<Product[]>([]);

    // Funzione fittizia per l'eliminazione
    const handleDelete = (id: number, name: string) => {
        // Al posto di un alert, in React useremmo un modal custom per confermare l'azione
        console.log(`Richiesta di eliminazione per il prodotto ID: ${id} (${name})`);
        // NOTA: Usare un modal UI al posto di window.alert in ambiente Canvas
        alert(`Confermi l'eliminazione di ${name}? (Simulazione)`);
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-3">
                    <h2 className="text-3xl font-serif text-gray-800">Gestione Prodotti</h2>
                    {/* Pulsante per aggiungere rapidamente un prodotto */}
                    <Link to="/admin/add-product" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-black bg-gold hover:bg-yellow-600 transition-colors">
                        <Plus size={18} className="mr-2" />
                        Aggiungi Prodotto
                    </Link>
                </div>

                {/* Tabella dei Prodotti */}
                <div className="bg-white p-6 rounded-lg shadow-xl overflow-x-auto border border-gray-100">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prezzo (€)</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Azioni</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {mockProducts.map((product) => (
                            <tr key={product.id} className={product.stock === 0 ? 'bg-red-50/50' : 'hover:bg-gray-50'}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.price.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {product.stock > 0 ? product.stock : 'Esaurito'}
                                        </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                    <Link
                                        // TODO: Collegare alla rotta di modifica reale: /admin/products/edit/:id
                                        to={`/admin/products/edit/${product.id}`}
                                        className="text-gold hover:text-yellow-600 p-1 rounded-md hover:bg-yellow-50 transition-colors"
                                        aria-label={`Modifica ${product.name}`}
                                    >
                                        <Edit size={16} />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(product.id, product.name)}
                                        className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50 transition-colors"
                                        aria-label={`Elimina ${product.name}`}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </AdminLayout>
    );
};