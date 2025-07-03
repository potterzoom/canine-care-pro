
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Video, Phone, MessageSquare, Calendar, Clock } from 'lucide-react';

interface TelemedicineModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TelemedicineModal = ({ open, onOpenChange }: TelemedicineModalProps) => {
  const scheduledCalls = [
    {
      time: "14:00",
      client: "Juan Pérez",
      pet: "Max",
      type: "Seguimiento post-cirugía",
      status: "programada"
    },
    {
      time: "16:30",
      client: "María García",
      pet: "Luna",
      type: "Consulta de comportamiento",
      status: "en-curso"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en-curso':
        return 'bg-green-100 text-green-800';
      case 'programada':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Video className="w-5 h-5" />
            <span>Telemedicina</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Acciones rápidas */}
          <div className="grid grid-cols-2 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-green-600 hover:bg-green-700">
              <Video className="w-6 h-6" />
              <span>Iniciar Videollamada</span>
            </Button>
            <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-blue-600 hover:bg-blue-700">
              <Calendar className="w-6 h-6" />
              <span>Programar Consulta</span>
            </Button>
          </div>

          {/* Consultas programadas */}
          <div className="space-y-4">
            <h3 className="font-semibold">Consultas de Hoy</h3>
            <div className="space-y-3">
              {scheduledCalls.map((call, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <p className="font-medium">{call.time}</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(call.status)}`}>
                          {call.status === 'en-curso' ? 'En Curso' : 'Programada'}
                        </span>
                      </div>
                      <p className="text-sm">
                        <strong>{call.client}</strong> - {call.pet}
                      </p>
                      <p className="text-sm text-slate-600">{call.type}</p>
                    </div>
                    <div className="flex space-x-2">
                      {call.status === 'en-curso' ? (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <Video className="w-4 h-4 mr-1" />
                          Unirse
                        </Button>
                      ) : (
                        <>
                          <Button variant="outline" size="sm">
                            <Phone className="w-4 h-4 mr-1" />
                            Llamar
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Chat
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Programar nueva consulta */}
          <div className="bg-slate-50 p-4 rounded-lg space-y-4">
            <h3 className="font-semibold">Programar Nueva Teleconsulta</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="clientSelect">Cliente</Label>
                <select id="clientSelect" className="w-full p-2 border rounded-md">
                  <option value="">Seleccionar cliente...</option>
                  <option value="juan">Juan Pérez</option>
                  <option value="maria">María García</option>
                  <option value="carlos">Carlos Mendoza</option>
                </select>
              </div>
              <div>
                <Label htmlFor="consultType">Tipo de Consulta</Label>
                <select id="consultType" className="w-full p-2 border rounded-md">
                  <option value="">Seleccionar...</option>
                  <option value="seguimiento">Seguimiento</option>
                  <option value="comportamiento">Comportamiento</option>
                  <option value="nutricion">Nutrición</option>
                  <option value="general">Consulta General</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="consultDate">Fecha</Label>
                <Input id="consultDate" type="date" />
              </div>
              <div>
                <Label htmlFor="consultTime">Hora</Label>
                <Input id="consultTime" type="time" />
              </div>
            </div>
            
            <div>
              <Label htmlFor="consultNotes">Motivo de la Consulta</Label>
              <textarea 
                id="consultNotes" 
                className="w-full p-2 border rounded-md" 
                rows={3}
                placeholder="Describir el motivo de la teleconsulta..."
              />
            </div>
            
            <Button className="w-full">
              Programar Teleconsulta
            </Button>
          </div>

          {/* Estadísticas */}
          <div className="bg-slate-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-4">Estadísticas del Mes</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">24</p>
                <p className="text-sm text-slate-600">Teleconsultas</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">95%</p>
                <p className="text-sm text-slate-600">Satisfacción</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">48min</p>
                <p className="text-sm text-slate-600">Duración Prom.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
          <Button>
            Ver Historial
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TelemedicineModal;
