import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboardIcon, PlusCircleIcon, PackageIcon, LogOutIcon } from 'lucide-react';
export const AdminSidebar = () => {
  const location = useLocation();
  const navItems = [{
    path: '/admin/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboardIcon
  }, {
    path: '/admin/add-product',
    label: 'Ajouter un Produit',
    icon: PlusCircleIcon
  }, {
    path: '/admin/products',
    label: 'Liste des Produits',
    icon: PackageIcon
  }];
  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logout clicked');
  };
  return <aside className="w-64 bg-darkAccent border-r border-gray-800 min-h-screen flex flex-col">
      {/* Admin Logo */}
      <div className="p-6 border-b border-gray-800">
        <Link to="/" className="block">
          <h2 className="font-serif text-xl text-white">Auberge Espagnol</h2>
          <p className="text-xs text-gray-500 mt-1">Administration</p>
        </Link>
      </div>
      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map(item => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return <li key={item.path}>
                <Link to={item.path} className={`flex items-center space-x-3 px-4 py-3 rounded-sm transition-all duration-300 ${isActive ? 'bg-gold/20 text-gold border-l-2 border-gold' : 'text-gray-400 hover:text-white hover:bg-dark/50'}`}>
                  <Icon size={18} />
                  <span className="text-sm">{item.label}</span>
                </Link>
              </li>;
        })}
        </ul>
      </nav>
      {/* Logout Button */}
      <div className="p-4 border-t border-gray-800">
        <button onClick={handleLogout} className="flex items-center space-x-3 px-4 py-3 w-full text-gray-400 hover:text-white hover:bg-dark/50 rounded-sm transition-all duration-300">
          <LogOutIcon size={18} />
          <span className="text-sm">Déconnexion</span>
        </button>
      </div>
    </aside>;
};