
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Phone, MapPin } from 'lucide-react';

interface ScheduledAppointmentsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ScheduledAppointmentsModal = ({ open, onOpenChange }: ScheduledAppointmentsModalProps) => {
  const scheduledAppointments = [
    {
      time: "17:00",
      petName: "Whiskers",
      ownerName: "Patricia Morales",
      phone: "099-456-7890",
      service: "Consulta General",
      status: "confirmado",
      notes: "Primera consulta - gato persa"
    },
    {
      time: "17:30",
      petName: "Duke",
      ownerName: "Fernando Ruiz",
      phone: "098-765-4321",
      service: "Vacunación",
      status: "pendiente",
      notes: "Vacunas pendientes desde marzo"
    },
    {
      time: "18:00",
      petName: "Kira",
      ownerName: "Sandra Jiménez",
      phone: "097-123-4567",
      service: "Control Post-operatorio",
      status: "confirmado",
      notes: "Revisión cirugía de la semana pasada"
    },
    {
      time: "18:30",
      petName: "Oscar",
      ownerName: "Daniel Herrera",
      phone: "096-234-5678",
      service: "Emergencia",
      status: "urgente",
      notes: "Problema respiratorio"
    },
    {
      time: "19:00",
      petName: "Lola",
      ownerName: "Gabriela Vásquez",
      phone: "095-345-6789",
      service: "Consulta General",
      status: "confirmado",
      notes: "Control de peso y alimentación"
    },
    {
      time: "19:30",
      petName: "Rex",
      ownerName: "Andrés Castro",
      phone: "094-456-7890",
      service: "Desparasitación",
      status: "pendiente",
      notes: "Tratamiento completo requerido"
    },
    {
      time: "20:00",
      petName: "Mia",
      ownerName: "Claudia Paredes",
      phone: "093-567-8901",
      service: "Control Dental",
      status: "confirmado",
      notes: "Limpieza dental programada"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmado':
        return 'bg-green-100 text-green-800';
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'urgente':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmado':
        return 'Confirmado';
      case 'pendiente':
        return 'Pendiente';
      case 'urgente':
        return 'Urgente';
      default:
        return status;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Citas Programadas - {new Date().toLocaleDateString('es-ES')}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Total: <span className="font-semibold text-gray-900">{scheduledAppointments.length} citas programadas</span>
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Ver Calendario
              </Button>
              <Button size="sm" className="bg-gray-800 hover:bg-black">
                Nueva Cita
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {scheduledAppointments.map((appointment, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="font-semibold text-gray-900">{appointment.time}</span>
                      </div>
                      <Badge className={getStatusColor(appointment.status)}>
                        {getStatusText(appointment.status)}
                      </Badge>
                      {appointment.status === 'urgente' && (
                        <span className="text-red-600 font-medium">¡URGENTE!</span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <p className="font-medium text-gray-900">
                          {appointment.petName} - {appointment.ownerName}
                        </p>
                        <p className="text-sm text-gray-600">{appointment.service}</p>
                        <p className="text-xs text-gray-500 mt-1">{appointment.notes}</p>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Phone className="w-3 h-3 text-gray-400" />
                          <span className="text-sm text-gray-600">{appointment.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Phone className="w-3 h-3 mr-1" />
                      Llamar
                    </Button>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduledAppointmentsModal;
