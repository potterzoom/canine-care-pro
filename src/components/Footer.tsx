
import React from 'react';
import { Heart, Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">VetSoft EC</h3>
                <p className="text-sm text-gray-400">Sistema Veterinario</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Sistema integral de gestión veterinaria para el cuidado profesional 
              de mascotas con tecnología avanzada y atención personalizada.
            </p>
            <div className="flex items-center space-x-2 text-gray-300">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-sm">Cuidando mascotas desde 2020</span>
            </div>
          </div>

          {/* Contacto */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-300">+593 99 123 4567</p>
                  <p className="text-xs text-gray-500">Emergencias 24/7</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-300">info@vetsoftec.com</p>
                  <p className="text-xs text-gray-500">Consultas online</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-300">Av. Principal 123</p>
                  <p className="text-xs text-gray-500">Quito, Ecuador</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-300">Lun-Vie: 8:00-18:00</p>
                  <p className="text-xs text-gray-500">Sáb: 8:00-14:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Servicios */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Servicios</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Consultas Generales</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Vacunación</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Cirugías</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Emergencias</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Laboratorio</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Teleconsultas</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Peluquería</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Hospedaje</a></li>
            </ul>
          </div>

          {/* Enlaces Rápidos */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Agendar Cita</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Portal del Cliente</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Historias Clínicas</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Resultados Lab</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Políticas</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Términos de Uso</a></li>
            </ul>
            
            {/* Redes Sociales */}
            <div className="pt-4">
              <h5 className="text-sm font-semibold mb-3">Síguenos</h5>
              <div className="flex space-x-3">
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Línea divisoria y copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-400">
                © 2024 VetSoft EC. Todos los derechos reservados.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Sistema desarrollado con tecnología avanzada para veterinarias
              </p>
            </div>
            <div className="flex items-center space-x-6 text-xs text-gray-500">
              <a href="#" className="hover:text-gray-300 transition-colors">Privacidad</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Términos</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Soporte</a>
              <a href="#" className="hover:text-gray-300 transition-colors">API</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
