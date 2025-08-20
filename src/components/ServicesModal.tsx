
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Stethoscope, Search, Calendar, Clock, DollarSign, User, Package, Phone, Scissors, Heart, Shield, Truck } from 'lucide-react';

interface ServicesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ServicesModal = ({ open, onOpenChange }: ServicesModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const services = [
    // Consultas & Diagnóstico
    {
      id: 1,
      category: 'Consultas & Diagnóstico',
      name: 'Consulta General',
      description: 'Examen físico completo y evaluación general',
      price: 25.00,
      duration: 30,
      icon: Stethoscope
    },
    {
      id: 2,
      category: 'Consultas & Diagnóstico',
      name: 'Consulta Especializada',
      description: 'Consulta con veterinario especialista',
      price: 45.00,
      duration: 45,
      icon: User
    },
    {
      id: 3,
      category: 'Consultas & Diagnóstico',
      name: 'Diagnóstico por Imágenes (Rayos X)',
      description: 'Radiografías digitales de alta resolución',
      price: 60.00,
      duration: 20,
      icon: Package
    },
    {
      id: 4,
      category: 'Consultas & Diagnóstico',
      name: 'Análisis de Laboratorio',
      description: 'Exámenes de sangre, orina y otros fluidos',
      price: 35.00,
      duration: 15,
      icon: Package
    },
    {
      id: 5,
      category: 'Consultas & Diagnóstico',
      name: 'Teleconsulta con IA',
      description: 'Consulta remota con asistencia de inteligencia artificial',
      price: 20.00,
      duration: 25,
      icon: Phone
    },
    
    // Tratamientos
    {
      id: 6,
      category: 'Tratamientos',
      name: 'Vacunación',
      description: 'Aplicación de vacunas según calendario',
      price: 30.00,
      duration: 15,
      icon: Shield
    },
    {
      id: 7,
      category: 'Tratamientos',
      name: 'Desparasitación',
      description: 'Tratamiento antiparasitario interno y externo',
      price: 20.00,
      duration: 15,
      icon: Package
    },
    {
      id: 8,
      category: 'Tratamientos',
      name: 'Cirugía Menor',
      description: 'Procedimientos quirúrgicos ambulatorios',
      price: 150.00,
      duration: 60,
      icon: Package
    },
    {
      id: 9,
      category: 'Tratamientos',
      name: 'Cirugía Mayor',
      description: 'Procedimientos quirúrgicos complejos',
      price: 400.00,
      duration: 120,
      icon: Package
    },
    {
      id: 10,
      category: 'Tratamientos',
      name: 'Tratamiento Odontológico',
      description: 'Limpieza dental y tratamientos bucales',
      price: 80.00,
      duration: 45,
      icon: Package
    },
    {
      id: 11,
      category: 'Tratamientos',
      name: 'Medicina Preventiva',
      description: 'Programas de prevención y bienestar',
      price: 40.00,
      duration: 30,
      icon: Heart
    },
    
    // Servicios Adicionales
    {
      id: 12,
      category: 'Servicios Adicionales',
      name: 'Peluquería y Estética',
      description: 'Baño, corte y cuidado estético',
      price: 25.00,
      duration: 60,
      icon: Scissors
    },
    {
      id: 13,
      category: 'Servicios Adicionales',
      name: 'Hospedaje Temporal',
      description: 'Cuidado y alojamiento de mascotas (por día)',
      price: 35.00,
      duration: 1440, // 24 horas
      icon: Heart
    },
    {
      id: 14,
      category: 'Servicios Adicionales',
      name: 'Emergencias 24/7',
      description: 'Atención de urgencias fuera de horario',
      price: 100.00,
      duration: 45,
      icon: Phone
    },
    {
      id: 15,
      category: 'Servicios Adicionales',
      name: 'Delivery de Medicamentos',
      description: 'Entrega a domicilio de medicamentos',
      price: 10.00,
      duration: 30,
      icon: Truck
    }
  ];

  const categories = ['all', 'Consultas & Diagnóstico', 'Tratamientos', 'Servicios Adicionales'];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleScheduleService = (serviceId: number) => {
    // Aquí se abriría el modal de nueva cita con el servicio preseleccionado
    console.log(`Programar servicio ${serviceId}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Stethoscope className="w-5 h-5" />
            <span>Servicios Veterinarios</span>
          </DialogTitle>
        </DialogHeader>
        
        {/* Buscador y filtros */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar servicios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md bg-white text-sm"
            >
              <option value="all">Todas las categorías</option>
              {categories.slice(1).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Lista de servicios */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredServices.map((service) => (
            <div key={service.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <service.icon className="w-5 h-5 text-gray-600" />
                    <h3 className="font-semibold text-gray-900">{service.name}</h3>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {service.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4" />
                      <span>${service.price.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>
                        {service.duration >= 1440 
                          ? `${Math.floor(service.duration / 1440)} día${Math.floor(service.duration / 1440) > 1 ? 's' : ''}`
                          : `${service.duration} min`
                        }
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleScheduleService(service.id)}
                    className="flex items-center space-x-1"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Agendar</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          {filteredServices.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No se encontraron servicios que coincidan con tu búsqueda
            </div>
          )}
        </div>
        
        {/* Información adicional */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Información Importante</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Todos los precios incluyen IVA</li>
            <li>• Los servicios de emergencia tienen recargo del 50%</li>
            <li>• Consulte por descuentos en paquetes de servicios</li>
            <li>• Aceptamos efectivo, tarjetas y transferencias</li>
          </ul>
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
          <Button className="bg-gray-800 hover:bg-black">
            Ver Paquetes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServicesModal;
