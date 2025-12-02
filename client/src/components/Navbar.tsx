import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCartIcon, UserIcon, MenuIcon, XIcon } from 'lucide-react';
export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const isActive = (path: string) => location.pathname === path;
  return <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-dark/95 backdrop-blur-sm py-3 shadow-md' : 'bg-transparent py-5'}`}>
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-serif text-xl md:text-2xl text-white">
         L'Auberge Espagnole
        </Link>
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`nav-link ${isActive('/') ? 'border-b border-gold pb-1' : ''}`}>
            Accueil
          </Link>
          <Link to="/boutique" className={`nav-link ${isActive('/boutique') ? 'border-b border-gold pb-1' : ''}`}>
            Boutique
          </Link>
          <a href="#about" className="nav-link">
            Notre Histoire
          </a>
        </div>
        {/* Cart & Account */}
        <div className="hidden md:flex items-center space-x-6">
          <button className="text-gray-300 hover:text-gold transition-colors">
            <ShoppingCartIcon size={20} />
          </button>
          <Link to="/login" className="flex items-center space-x-2 text-gray-300 hover:text-gold transition-colors">
            <UserIcon size={20} />
            <span className="text-sm tracking-wider">Compte</span>
          </Link>
        </div>
        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>
      {/* Mobile Menu */}
      {mobileMenuOpen && <div className="md:hidden bg-darkAccent absolute top-full left-0 right-0 py-4 px-4 shadow-lg">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="nav-link py-2 border-b border-gray-700" onClick={() => setMobileMenuOpen(false)}>
              Accueil
            </Link>
            <Link to="/boutique" className="nav-link py-2 border-b border-gray-700" onClick={() => setMobileMenuOpen(false)}>
              Boutique
            </Link>
            <a href="#about" className="nav-link py-2 border-b border-gray-700" onClick={() => setMobileMenuOpen(false)}>
              Notre Histoire
            </a>
            <div className="flex items-center justify-between pt-2">
              <button className="flex items-center space-x-2 text-gray-300">
                <ShoppingCartIcon size={20} />
                <span className="text-sm">Panier</span>
              </button>
              <Link to="/login" className="flex items-center space-x-2 text-gray-300" onClick={() => setMobileMenuOpen(false)}>
                <UserIcon size={20} />
                <span className="text-sm">Compte</span>
              </Link>
            </div>
          </div>
        </div>}
    </nav>;
};