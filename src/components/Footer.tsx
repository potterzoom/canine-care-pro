
import React from 'react';
import { Heart, Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Calendar, FileText, Users, Package, Shield, BarChart3 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo y descripción mejorada */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">VetSoft EC</h3>
                <p className="text-sm text-gray-400">Sistema Veterinario Inteligente</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Plataforma integral de gestión veterinaria con IA integrada para el cuidado 
              profesional de mascotas. Optimizamos tu clínica con tecnología avanzada.
            </p>
            <div className="flex items-center space-x-2 text-gray-300">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-sm">Transformando el cuidado animal desde 2020</span>
            </div>
          </div>

          {/* Información de contacto completa */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-300 font-medium">+593 99 123 4567</p>
                  <p className="text-xs text-gray-500">Emergencias 24/7 disponibles</p>
                  <p className="text-xs text-gray-500">WhatsApp IA integrado</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-300 font-medium">info@vetsoftec.com</p>
                  <p className="text-xs text-gray-500">Soporte técnico</p>
                  <p className="text-xs text-gray-500">consultas@vetsoftec.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-300 font-medium">Av. Principal 123, Edificio VetCenter</p>
                  <p className="text-xs text-gray-500">Quito, Pichincha - Ecuador</p>
                  <p className="text-xs text-gray-500">Zona Norte, Sector La Carolina</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-300 font-medium">Horarios de Atención:</p>
                  <p className="text-xs text-gray-500">Lun-Vie: 8:00-18:00</p>
                  <p className="text-xs text-gray-500">Sáb: 8:00-14:00 | Dom: Emergencias</p>
                </div>
              </div>
            </div>
          </div>

          {/* Servicios veterinarios completos */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Servicios Veterinarios</h4>
            <div className="grid grid-cols-1 gap-2">
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-gray-300">Consultas & Diagnóstico</h5>
                <ul className="space-y-1 text-xs text-gray-400">
                  <li>• Consultas generales y especializadas</li>
                  <li>• Diagnóstico por imágenes (Rayos X)</li>
                  <li>• Análisis de laboratorio completos</li>
                  <li>• Teleconsultas con IA</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-gray-300">Tratamientos</h5>
                <ul className="space-y-1 text-xs text-gray-400">
                  <li>• Vacunación y desparasitación</li>
                  <li>• Cirugías menores y mayores</li>
                  <li>• Tratamientos odontológicos</li>
                  <li>• Medicina preventiva</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-gray-300">Servicios Adicionales</h5>
                <ul className="space-y-1 text-xs text-gray-400">
                  <li>• Peluquería y estética</li>
                  <li>• Hospedaje temporal</li>
                  <li>• Emergencias 24/7</li>
                  <li>• Delivery de medicamentos</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Enlaces rápidos y redes sociales */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Enlaces Rápidos</h4>
            <div className="grid grid-cols-1 gap-3">
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-gray-300">Portal del Cliente</h5>
                <ul className="space-y-1">
                  <li><a href="#" className="text-xs text-gray-400 hover:text-white transition-colors flex items-center space-x-1"><Calendar className="w-3 h-3" /><span>Agendar Cita Online</span></a></li>
                  <li><a href="#" className="text-xs text-gray-400 hover:text-white transition-colors flex items-center space-x-1"><FileText className="w-3 h-3" /><span>Historias Clínicas</span></a></li>
                  <li><a href="#" className="text-xs text-gray-400 hover:text-white transition-colors flex items-center space-x-1"><Package className="w-3 h-3" /><span>Resultados de Laboratorio</span></a></li>
                </ul>
              </div>
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-gray-300">Información</h5>
                <ul className="space-y-1">
                  <li><a href="#" className="text-xs text-gray-400 hover:text-white transition-colors">Políticas de Privacidad</a></li>
                  <li><a href="#" className="text-xs text-gray-400 hover:text-white transition-colors">Términos de Servicio</a></li>
                  <li><a href="#" className="text-xs text-gray-400 hover:text-white transition-colors">Preguntas Frecuentes</a></li>
                  <li><a href="#" className="text-xs text-gray-400 hover:text-white transition-colors">API Documentación</a></li>
                </ul>
              </div>
            </div>
            
            {/* Redes Sociales mejoradas */}
            <div className="pt-4">
              <h5 className="text-sm font-semibold mb-3">Síguenos en Redes</h5>
              <div className="flex space-x-3 mb-3">
                <a href="#" className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-gradient-to-br from-pink-600 to-purple-600 rounded-full flex items-center justify-center hover:from-pink-700 hover:to-purple-700 transition-all transform hover:scale-105">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center hover:from-blue-500 hover:to-blue-600 transition-all transform hover:scale-105">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
              <p className="text-xs text-gray-500">Comparte momentos especiales con #VetSoftEC</p>
            </div>
          </div>
        </div>

        {/* Sección de Recomendaciones de Mejora */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Recomendaciones de Mejora por Sección
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div className="bg-gray-800 rounded-lg p-4">
                <h5 className="font-medium text-gray-200 mb-2 flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Dashboard Principal
                </h5>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Gráficos de tendencias avanzados</li>
                  <li>• Notificaciones push inteligentes</li>
                  <li>• Dashboard personalizable</li>
                </ul>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <h5 className="font-medium text-gray-200 mb-2 flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Gestión de Pacientes
                </h5>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Historiales médicos detallados</li>
                  <li>• App móvil para propietarios</li>
                  <li>• Integración con laboratorios</li>
                </ul>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <h5 className="font-medium text-gray-200 mb-2 flex items-center">
                  <Package className="w-4 h-4 mr-2" />
                  Inventario y Stock
                </h5>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Predicción de demanda con IA</li>
                  <li>• Pedidos automáticos inteligentes</li>
                  <li>• Reportes de rotación avanzados</li>
                </ul>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <h5 className="font-medium text-gray-200 mb-2 flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Comunicación
                </h5>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Campañas de email marketing</li>
                  <li>• SMS recordatorios automáticos</li>
                  <li>• WhatsApp IA mejorado</li>
                </ul>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <h5 className="font-medium text-gray-200 mb-2 flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  Seguridad
                </h5>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Autenticación de dos factores</li>
                  <li>• Respaldos automáticos diarios</li>
                  <li>• Encriptación de datos médicos</li>
                </ul>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <h5 className="font-medium text-gray-200 mb-2 flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Reportes
                </h5>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Dashboard financiero avanzado</li>
                  <li>• Métricas de satisfacción</li>
                  <li>• KPIs de productividad</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright y enlaces legales mejorados */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-400">
                © 2024 VetSoft EC. Todos los derechos reservados.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Sistema desarrollado con IA avanzada para transformar la medicina veterinaria
              </p>
            </div>
            <div className="flex items-center space-x-6 text-xs text-gray-500">
              <a href="#" className="hover:text-gray-300 transition-colors">Privacidad</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Términos</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Soporte 24/7</a>
              <a href="#" className="hover:text-gray-300 transition-colors">API Docs</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Desarrolladores</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
