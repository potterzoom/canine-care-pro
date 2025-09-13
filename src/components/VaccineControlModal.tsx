
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Syringe, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';

interface VaccineControlModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const VaccineControlModal = ({ open, onOpenChange }: VaccineControlModalProps) => {
  const vaccineSchedule = [
    {
      patient: "Max",
      vaccine: "Antirrábica",
      dueDate: "2024-12-15",
      status: "pendiente",
      owner: "Juan Pérez"
    },
    {
      patient: "Luna",
      vaccine: "Múltiple (DHPP)",
      dueDate: "2024-11-25",
      status: "vencida",
      owner: "María García"
    },
    {
      patient: "Buddy",
      vaccine: "Antirrábica",
      dueDate: "2024-12-01",
      status: "aplicada",
      owner: "Ana López"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'aplicada':
        return <CheckCircle className="w-4 h-4 text-gray-700" />;
      case 'vencida':
        return <AlertTriangle className="w-4 h-4 text-gray-800" />;
      default:
        return <Calendar className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aplicada':
        return 'bg-gray-100 border-gray-300 text-gray-800';
      case 'vencida':
        return 'bg-gray-200 border-gray-400 text-gray-900';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Syringe className="w-5 h-5" />
            <span>Control de Vacunas</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Filtros */}
          <div className="flex space-x-4">
            <div>
              <Label htmlFor="filterDate">Filtrar por fecha</Label>
              <Input id="filterDate" type="date" />
            </div>
            <div>
              <Label htmlFor="filterStatus">Estado</Label>
              <select id="filterStatus" className="w-full p-2 border border-gray-300 rounded-md bg-white">
                <option value="">Todos</option>
                <option value="pendiente">Pendientes</option>
                <option value="vencida">Vencidas</option>
                <option value="aplicada">Aplicadas</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button className="bg-gray-800 hover:bg-black">Filtrar</Button>
            </div>
          </div>

          {/* Calendario de vacunas */}
          <div className="space-y-4">
            <h3 className="font-semibold">Calendario de Vacunación</h3>
            <div className="grid gap-4">
              {vaccineSchedule.map((item, index) => (
                <div key={index} className={`border rounded-lg p-4 ${getStatusColor(item.status)}`}>
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(item.status)}
                        <p className="font-medium">{item.patient}</p>
                        <span className="text-sm opacity-75">({item.owner})</span>
                      </div>
                      <p className="text-sm">
                        <strong>Vacuna:</strong> {item.vaccine}
                      </p>
                      <p className="text-sm">
                        <strong>Fecha:</strong> {item.dueDate}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      {item.status === 'pendiente' && (
                        <Button size="sm" className="bg-gray-700 hover:bg-gray-800">
                          Marcar Aplicada
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        Contactar Dueño
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Registrar nueva vacuna */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <h3 className="font-semibold">Registrar Nueva Vacuna</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="patientSelect">Paciente</Label>
                <select id="patientSelect" className="w-full p-2 border border-gray-300 rounded-md bg-white">
                  <option value="">Seleccionar paciente...</option>
                  <option value="max">Max</option>
                  <option value="luna">Luna</option>
                  <option value="buddy">Buddy</option>
                </select>
              </div>
              <div>
                <Label htmlFor="vaccineType">Tipo de Vacuna</Label>
                <select id="vaccineType" className="w-full p-2 border border-gray-300 rounded-md bg-white">
                  <option value="">Seleccionar...</option>
                  <option value="rabies">Antirrábica</option>
                  <option value="dhpp">Múltiple (DHPP)</option>
                  <option value="bordetella">Bordetella</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="applicationDate">Fecha de Aplicación</Label>
                <Input id="applicationDate" type="date" />
              </div>
              <div>
                <Label htmlFor="nextDose">Próxima Dosis</Label>
                <Input id="nextDose" type="date" />
              </div>
            </div>
            <div>
              <Label htmlFor="vaccineNotes">Notas</Label>
              <textarea 
                id="vaccineNotes" 
                className="w-full p-2 border border-gray-300 rounded-md bg-white" 
                rows={2}
                placeholder="Observaciones sobre la vacuna..."
              />
            </div>
            <Button className="w-full bg-gray-800 hover:bg-black">
              Registrar Vacuna
            </Button>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
          <Button className="bg-gray-800 hover:bg-black">
            Exportar Calendario
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VaccineControlModal;
