import { InstagramIcon, FacebookIcon, TwitterIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
      <footer className="bg-dark py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div>
              <h3 className="font-serif text-xl text-gold mb-4">
                L'Auberge Espagnole
              </h3>
              <p className="text-gray-400 text-sm">
                L'excellence des produits espagnols, livrés chez vous.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                contact@auberge-espagnol.fr
              </p>
            </div>

            <div>
              <h4 className="text-white text-sm uppercase tracking-wider mb-4">
                Informations
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/mentions" className="text-gray-400 text-sm hover:text-gold transition-colors">
                    Mentions Légales
                  </Link>
                </li>
                <li>
                  <Link to="/cgv" className="text-gray-400 text-sm hover:text-gold transition-colors">
                    Conditions Générales de Vente
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-400 text-sm hover:text-gold transition-colors">
                    Politique de Confidentialité
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-sm uppercase tracking-wider mb-4">
                Suivez-nous
              </h4>
              <div className="flex space-x-4">
                <a href="https://instagram.com" aria-label="Instagram" className="text-gray-400 hover:text-gold transition-colors">
                  <InstagramIcon size={20} />
                </a>
                <a href="https://facebook.com" aria-label="Facebook" className="text-gray-400 hover:text-gold transition-colors">
                  <FacebookIcon size={20} />
                </a>
                <a href="https://twitter.com" aria-label="Twitter" className="text-gray-400 hover:text-gold transition-colors">
                  <TwitterIcon size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-500 text-xs">
              &copy; {new Date().getFullYear()} L'Auberge Espagnole made by Flavio Terenzi. Tous droits
              réservés.
            </p>
          </div>
        </div>
      </footer>
  );
};