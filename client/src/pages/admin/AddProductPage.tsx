import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { AdminLayout } from '../../components/admin/AdminLayout';

interface ProductFormData {
  name: string;
  description: string;
  price: string;
  stock: string;
  categoryId: string;
}

interface Category {
  id: number;
  name: string;
}

const API_URL = 'http://localhost:3000/api';

export const AddProductPage: React.FC = () => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: '',
    stock: '',
    categoryId: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setStatusMessage(null);
    setIsError(false);

    axios.get(`${API_URL}/categories`)
        .then(response => {
          setCategories(response.data);
          if (response.data.length > 0) {
            setFormData(prev => ({ ...prev, categoryId: String(response.data[0].id) }));
          }
        })
        .catch(error => {
          console.error("Failed to load categories:", error);
          setStatusMessage("Erreur de connexion au serveur pour les catégories.");
          setIsError(true);
        });
  }, []);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setImageFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.jpg'] },
    maxFiles: 1
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage("Chargement en cours...");
    setIsError(false);

    if (!formData.name || !formData.price || !formData.categoryId) {
      setStatusMessage("Veuillez remplir tous les champs obligatoires.");
      setIsError(true);
      return;
    }

    const formPayload = new FormData();
    formPayload.append('name', formData.name);
    formPayload.append('description', formData.description);
    formPayload.append('price', formData.price);
    formPayload.append('stock', formData.stock);
    formPayload.append('categoryId', formData.categoryId);

    if (imageFile) {
      formPayload.append('image', imageFile);
    }

    try {
      const response = await axios.post(`${API_URL}/products`, formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      setStatusMessage(`Produit "${response.data.name}" publié avec succès!`);
      setIsError(false);

      setFormData({
        name: '',
        description: '',
        price: '',
        stock: '',
        categoryId: String(categories[0]?.id || '')
      });
      setImageFile(null);

    } catch (error) {
      console.error("Product upload failed:", error);
      setIsError(true);
      setStatusMessage("Erreur lors de la publication. Le serveur a retourné une erreur.");
    }
  };

  return (
      <AdminLayout>
        <div className="max-w-4xl mx-auto p-8 rounded-lg bg-white shadow-xl border border-gray-200">
          <h2 className="text-3xl font-serif text-gray-800 mb-6 border-b border-gray-300 pb-2">
            Ajouter un Produit
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du produit *
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ex: Jambon Ibérique"
                    required
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded text-gray-900 placeholder-gray-500 focus:border-gold focus:ring-gold"
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Prix (€) *
                </label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Ex: 89.90"
                    step="0.01"
                    required
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded text-gray-900 placeholder-gray-500 focus:border-gold focus:ring-gold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
                  Catégorie *
                </label>
                <select
                    id="categoryId"
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded text-gray-900 focus:border-gold focus:ring-gold cursor-pointer"
                    disabled={categories.length === 0}
                >
                  {categories.length === 0 ? (
                      <option value="">Chargement des catégories...</option>
                  ) : (
                      categories.map(cat => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                      ))
                  )}
                </select>
              </div>

              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                  Stock/Quantité
                </label>
                <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="Ex: 10"
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded text-gray-900 placeholder-gray-500 focus:border-gold focus:ring-gold"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Description détaillée du produit..."
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded text-gray-900 placeholder-gray-500 focus:border-gold focus:ring-gold"
              />
            </div>

            <div className="pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image du produit (JPG, PNG)
              </label>
              <div
                  {...getRootProps()}
                  className={`p-10 border-2 border-dashed rounded-lg transition-colors cursor-pointer text-center ${
                      isDragActive ? 'border-gold bg-yellow-50' : 'border-gray-400 hover:border-gold'
                  }`}
              >
                <input {...getInputProps()} />
                {imageFile ? (
                    <div className="flex flex-col items-center">
                      <p className="text-gold font-bold">Image sélectionnée:</p>
                      <p className="text-sm italic text-gray-600">{imageFile.name}</p>
                      <img
                          src={URL.createObjectURL(imageFile)}
                          alt="Preview"
                          className="mt-4 max-h-24 object-contain rounded shadow-md"
                      />
                    </div>
                ) : isDragActive ? (
                    <p className="text-lg text-gray-800">Déposez l'image ici...</p>
                ) : (
                    <p className="text-lg text-gray-500">
                      Glissez-déposez l'image ou cliquez pour sélectionner
                    </p>
                )}
              </div>
            </div>

            {statusMessage && (
                <div className={`p-3 rounded text-center font-semibold ${
                    isError ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}>
                  {statusMessage}
                </div>
            )}

            <button
                type="submit"
                className="w-full py-3 bg-gold text-black font-bold uppercase rounded shadow-lg hover:bg-yellow-600 transition-colors"
            >
              Publier le produit
            </button>
          </form>
        </div>
      </AdminLayout>
  );
};