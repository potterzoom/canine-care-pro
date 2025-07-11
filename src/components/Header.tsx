
import React from 'react';
import { Bell, User, Search, Settings, MessageSquare, Shield } from 'lucide-react';

interface HeaderProps {
  onAlertsClick?: () => void;
  onConfigClick?: () => void;
  onWhatsAppClick?: () => void;
  onUserManagementClick?: () => void;
  onUserProfileClick?: () => void;
}

const Header = ({ onAlertsClick, onConfigClick, onWhatsAppClick, onUserManagementClick, onUserProfileClick }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo y título */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-black rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">V</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">VetSoft EC</h1>
            <p className="text-sm text-gray-500">Sistema Veterinario</p>
          </div>
        </div>

        {/* Barra de búsqueda */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar pacientes, citas..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Acciones del usuario */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={onAlertsClick}
            className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-black rounded-full"></span>
          </button>
          
          <button 
            onClick={onWhatsAppClick}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <MessageSquare className="w-5 h-5" />
          </button>
          
          <button 
            onClick={onConfigClick}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
            <button 
              onClick={onUserProfileClick}
              className="text-right hidden sm:block hover:bg-gray-50 p-2 rounded-lg transition-colors"
            >
              <p className="text-sm font-medium text-gray-900">Dra. María González</p>
              <p className="text-xs text-gray-500">Veterinaria Senior</p>
            </button>
            <button 
              onClick={onUserManagementClick}
              className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center hover:from-gray-700 hover:to-gray-900 transition-colors"
            >
              <User className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
