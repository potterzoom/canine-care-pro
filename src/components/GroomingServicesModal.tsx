import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Scissors, Bath, Volume2, CalendarIcon, Clock, User, Receipt, Package } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface GroomingServicesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface GroomingService {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  duration: number; // en minutos
  category: 'baño' | 'corte' | 'limpieza' | 'especial';
  icon: React.ComponentType<{ className?: string }>;
}

interface GroomingAppointment {
  id: string;
  patientName: string;
  breed: string;
  ownerName: string;
  phone: string;
  services: string[];
  date: Date;
  time: string;
  notes: string;
  totalPrice: number;
  status: 'programado' | 'en_proceso' | 'completado';
}

const GroomingServicesModal = ({ open, onOpenChange }: GroomingServicesModalProps) => {
  const [activeTab, setActiveTab] = useState<'services' | 'appointment' | 'history'>('services');
  
  // Servicios disponibles
  const groomingServices: GroomingService[] = [
    {
      id: 'baño_basico',
      name: 'Baño Básico',
      description: 'Baño con champú especial, secado y desenredado',
      basePrice: 15.00,
      duration: 45,
      category: 'baño',
      icon: Bath
    },
    {
      id: 'baño_premium',
      name: 'Baño Premium',
      description: 'Baño con champú medicado, acondicionador y tratamiento especial',
      basePrice: 25.00,
      duration: 60,
      category: 'baño',
      icon: Bath
    },
    {
      id: 'corte_higienico',
      name: 'Corte Higiénico',
      description: 'Corte de pelo en zonas íntimas y patas',
      basePrice: 10.00,
      duration: 20,
      category: 'corte',
      icon: Scissors
    },
    {
      id: 'corte_completo',
      name: 'Corte Completo',
      description: 'Corte de pelo completo según raza o preferencia',
      basePrice: 20.00,
      duration: 40,
      category: 'corte',
      icon: Scissors
    },
    {
      id: 'corte_uñas',
      name: 'Corte de Uñas',
      description: 'Recorte profesional de uñas con lima',
      basePrice: 8.00,
      duration: 15,
      category: 'limpieza',
      icon: Scissors
    },
    {
      id: 'limpieza_oidos',
      name: 'Limpieza de Oídos',
      description: 'Limpieza profunda y revisión auricular',
      basePrice: 12.00,
      duration: 20,
      category: 'limpieza',
      icon: Volume2
    },
    {
      id: 'paquete_completo',
      name: 'Paquete Completo Pet Friends',
      description: 'Baño, corte, uñas, oídos y perfume',
      basePrice: 45.00,
      duration: 90,
      category: 'especial',
      icon: Package
    }
  ];

  // Estados para nueva cita
  const [newAppointment, setNewAppointment] = useState({
    patientName: '',
    breed: '',
    size: '',
    ownerName: '',
    phone: '',
    email: '',
    selectedServices: [] as string[],
    date: undefined as Date | undefined,
    time: '',
    notes: '',
    specialRequests: ''
  });

  // Historial de citas (mock data)
  const [appointmentHistory] = useState<GroomingAppointment[]>([
    {
      id: '1',
      patientName: 'Fluffy',
      breed: 'Poodle',
      ownerName: 'Ana Martínez',
      phone: '0999123456',
      services: ['Paquete Completo Pet Friends'],
      date: new Date(2024, 11, 18),
      time: '10:00',
      notes: 'Perro muy tranquilo, le gusta el agua tibia',
      totalPrice: 45.00,
      status: 'completado'
    },
    {
      id: '2',
      patientName: 'Rex',
      breed: 'Golden Retriever',
      ownerName: 'Carlos López',
      phone: '0998765432',
      services: ['Baño Premium', 'Corte de Uñas'],
      date: new Date(2024, 11, 19),
      time: '14:30',
      notes: 'Pelo muy enredado, usar acondicionador extra',
      totalPrice: 33.00,
      status: 'completado'
    }
  ]);

  const sizePriceMultiplier = {
    'pequeño': 1.0,
    'mediano': 1.2,
    'grande': 1.5,
    'extra_grande': 1.8
  };

  const toggleService = (serviceId: string) => {
    const services = newAppointment.selectedServices;
    if (services.includes(serviceId)) {
      setNewAppointment({
        ...newAppointment,
        selectedServices: services.filter(id => id !== serviceId)
      });
    } else {
      setNewAppointment({
        ...newAppointment,
        selectedServices: [...services, serviceId]
      });
    }
  };

  const calculateTotal = () => {
    let total = 0;
    const multiplier = sizePriceMultiplier[newAppointment.size as keyof typeof sizePriceMultiplier] || 1.0;
    
    newAppointment.selectedServices.forEach(serviceId => {
      const service = groomingServices.find(s => s.id === serviceId);
      if (service) {
        total += service.basePrice * multiplier;
      }
    });
    
    return total;
  };

  const calculateDuration = () => {
    let totalDuration = 0;
    newAppointment.selectedServices.forEach(serviceId => {
      const service = groomingServices.find(s => s.id === serviceId);
      if (service) {
        totalDuration += service.duration;
      }
    });
    return totalDuration;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'programado': return 'bg-blue-100 text-blue-800';
      case 'en_proceso': return 'bg-yellow-100 text-yellow-800';
      case 'completado': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const scheduleAppointment = () => {
    console.log('Programando cita de grooming:', {
      ...newAppointment,
      totalPrice: calculateTotal(),
      estimatedDuration: calculateDuration()
    });
    // Aquí se procesaría la cita
    onOpenChange(false);
  };

  const generateInvoice = (appointment: GroomingAppointment) => {
    console.log('Generando factura para:', appointment);
    // Aquí se generaría la factura
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Scissors className="w-5 h-5" />
            Pet Friends - Servicios de Grooming
          </DialogTitle>
        </DialogHeader>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'services'
                ? 'border-b-2 border-pink-500 text-pink-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Servicios Disponibles
          </button>
          <button
            onClick={() => setActiveTab('appointment')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'appointment'
                ? 'border-b-2 border-pink-500 text-pink-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Nueva Cita
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'history'
                ? 'border-b-2 border-pink-500 text-pink-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Historial
          </button>
        </div>

        {/* Content */}
        <div className="mt-4">
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-pink-600 mb-2">
                  🐾 Pet Friends - Servicios de Grooming Premium 🐾
                </h3>
                <p className="text-gray-600">
                  Cuidado especializado para el bienestar y belleza de tu mascota
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groomingServices.map((service) => (
                  <Card key={service.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <service.icon className="w-5 h-5 text-pink-500" />
                        {service.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-gray-600">{service.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-semibold text-green-600">
                          ${service.basePrice.toFixed(2)}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          {service.duration} min
                        </div>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={
                          service.category === 'baño' ? 'bg-blue-100 text-blue-800' :
                          service.category === 'corte' ? 'bg-orange-100 text-orange-800' :
                          service.category === 'limpieza' ? 'bg-green-100 text-green-800' :
                          'bg-purple-100 text-purple-800'
                        }
                      >
                        {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="bg-pink-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">💡 Información Importante:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Los precios varían según el tamaño de la mascota</li>
                  <li>• Se recomienda agendar con 24h de anticipación</li>
                  <li>• Incluye productos de alta calidad y seguros</li>
                  <li>• Personal capacitado en manejo de mascotas</li>
                  <li>• Ambiente relajante y libre de estrés</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'appointment' && (
            <div className="space-y-6">
              {/* Datos del Cliente */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Datos del Cliente
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="owner-name">Nombre del Propietario *</Label>
                    <Input
                      id="owner-name"
                      value={newAppointment.ownerName}
                      onChange={(e) => setNewAppointment({ ...newAppointment, ownerName: e.target.value })}
                      placeholder="Nombre completo"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Teléfono *</Label>
                    <Input
                      id="phone"
                      value={newAppointment.phone}
                      onChange={(e) => setNewAppointment({ ...newAppointment, phone: e.target.value })}
                      placeholder="0999999999"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newAppointment.email}
                      onChange={(e) => setNewAppointment({ ...newAppointment, email: e.target.value })}
                      placeholder="cliente@email.com"
                    />
                  </div>
                </div>
              </div>

              {/* Datos de la Mascota */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Datos de la Mascota</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="pet-name">Nombre de la Mascota *</Label>
                    <Input
                      id="pet-name"
                      value={newAppointment.patientName}
                      onChange={(e) => setNewAppointment({ ...newAppointment, patientName: e.target.value })}
                      placeholder="Nombre de la mascota"
                    />
                  </div>
                  <div>
                    <Label>Raza</Label>
                    <Input
                      value={newAppointment.breed}
                      onChange={(e) => setNewAppointment({ ...newAppointment, breed: e.target.value })}
                      placeholder="Ej: Labrador, Poodle, Mestizo"
                    />
                  </div>
                  <div>
                    <Label>Tamaño *</Label>
                    <Select 
                      value={newAppointment.size} 
                      onValueChange={(value) => setNewAppointment({ ...newAppointment, size: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pequeño">Pequeño (hasta 10kg)</SelectItem>
                        <SelectItem value="mediano">Mediano (10-25kg)</SelectItem>
                        <SelectItem value="grande">Grande (25-40kg)</SelectItem>
                        <SelectItem value="extra_grande">Extra Grande (+40kg)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Selección de Servicios */}
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Servicios Solicitados</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {groomingServices.map((service) => {
                    const isSelected = newAppointment.selectedServices.includes(service.id);
                    const multiplier = sizePriceMultiplier[newAppointment.size as keyof typeof sizePriceMultiplier] || 1.0;
                    const adjustedPrice = service.basePrice * multiplier;
                    
                    return (
                      <div 
                        key={service.id} 
                        className={`flex items-center space-x-3 p-3 rounded border cursor-pointer transition-colors ${
                          isSelected ? 'bg-pink-100 border-pink-300' : 'bg-white border-gray-200 hover:bg-gray-50'
                        }`}
                        onClick={() => toggleService(service.id)}
                      >
                        <Checkbox checked={isSelected} />
                        <service.icon className="w-4 h-4 text-pink-500" />
                        <div className="flex-1">
                          <div className="font-medium text-sm">{service.name}</div>
                          <div className="text-xs text-gray-500">{service.duration} min</div>
                        </div>
                        <div className="font-semibold text-green-600">
                          ${adjustedPrice.toFixed(2)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Programación */}
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  Programación
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Fecha *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newAppointment.date ? format(newAppointment.date, "dd 'de' MMMM, yyyy", { locale: es }) : "Seleccionar fecha"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={newAppointment.date}
                          onSelect={(date) => setNewAppointment({ ...newAppointment, date })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label htmlFor="time">Hora *</Label>
                    <Input
                      id="time"
                      type="time"
                      value={newAppointment.time}
                      onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Notas */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="notes">Notas Especiales</Label>
                  <Textarea
                    id="notes"
                    value={newAppointment.notes}
                    onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                    placeholder="Temperamento de la mascota, preferencias especiales, alergias..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="special-requests">Solicitudes Especiales</Label>
                  <Textarea
                    id="special-requests"
                    value={newAppointment.specialRequests}
                    onChange={(e) => setNewAppointment({ ...newAppointment, specialRequests: e.target.value })}
                    placeholder="Estilo de corte específico, productos especiales..."
                    rows={2}
                  />
                </div>
              </div>

              {/* Resumen */}
              {newAppointment.selectedServices.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Resumen de la Cita</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Servicios seleccionados:</span>
                      <span>{newAppointment.selectedServices.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duración estimada:</span>
                      <span>{calculateDuration()} minutos</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total:</span>
                      <span className="text-green-600">${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Botones */}
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Cancelar
                </Button>
                <Button 
                  onClick={scheduleAppointment}
                  disabled={!newAppointment.ownerName || !newAppointment.patientName || !newAppointment.size || newAppointment.selectedServices.length === 0}
                >
                  Programar Cita
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Historial de Servicios</h3>
                <Badge variant="secondary">{appointmentHistory.length} servicios completados</Badge>
              </div>

              {appointmentHistory.map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div>
                          <h4 className="font-medium">{appointment.patientName}</h4>
                          <p className="text-sm text-gray-600">{appointment.breed} - {appointment.ownerName}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                        <div className="text-lg font-semibold text-green-600 mt-1">
                          ${appointment.totalPrice.toFixed(2)}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                      <div>
                        <span className="font-medium">Fecha:</span> {format(appointment.date, "dd/MM/yyyy", { locale: es })}
                      </div>
                      <div>
                        <span className="font-medium">Hora:</span> {appointment.time}
                      </div>
                      <div>
                        <span className="font-medium">Teléfono:</span> {appointment.phone}
                      </div>
                    </div>

                    <div className="mb-3">
                      <span className="font-medium text-sm">Servicios:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {appointment.services.map((service, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {appointment.notes && (
                      <div className="bg-gray-50 p-3 rounded text-sm mb-3">
                        <span className="font-medium">Notas:</span> {appointment.notes}
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Ver Detalles</Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => generateInvoice(appointment)}
                        className="flex items-center gap-1"
                      >
                        <Receipt className="w-3 h-3" />
                        Factura
                      </Button>
                      <Button size="sm" variant="outline">Reprogramar</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GroomingServicesModal;