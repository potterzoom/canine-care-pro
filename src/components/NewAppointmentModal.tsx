
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from 'lucide-react';

interface NewAppointmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewAppointmentModal = ({ open, onOpenChange }: NewAppointmentModalProps) => {
  const consultationTypes = [
    { value: 'general', label: 'Consulta General' },
    { value: 'vaccination', label: 'Vacunación' },
    { value: 'surgery', label: 'Cirugía' },
    { value: 'emergency', label: 'Emergencia' },
    { value: 'specialized', label: 'Consulta Especializada' },
    { value: 'imaging', label: 'Diagnóstico por Imágenes' },
    { value: 'laboratory', label: 'Análisis de Laboratorio' },
    { value: 'telemedicine', label: 'Teleconsulta' },
    { value: 'deworming', label: 'Desparasitación' },
    { value: 'dental', label: 'Tratamiento Odontológico' },
    { value: 'preventive', label: 'Medicina Preventiva' },
    { value: 'grooming', label: 'Peluquería y Estética' },
    { value: 'hospitalization', label: 'Hospedaje Temporal' },
    { value: 'followup', label: 'Seguimiento Post-Tratamiento' },
    { value: 'behavior', label: 'Consulta de Comportamiento' },
    { value: 'nutrition', label: 'Consulta Nutricional' }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Nueva Cita</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Fecha</Label>
              <Input id="date" type="date" />
            </div>
            <div>
              <Label htmlFor="time">Hora</Label>
              <Input id="time" type="time" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="petName">Nombre de la Mascota</Label>
              <Input id="petName" placeholder="Ej: Max" />
            </div>
            <div>
              <Label htmlFor="species">Especie</Label>
              <select id="species" className="w-full p-2 border border-gray-300 rounded-md bg-white">
                <option value="">Seleccionar...</option>
                <option value="dog">Perro</option>
                <option value="cat">Gato</option>
                <option value="bird">Ave</option>
                <option value="rabbit">Conejo</option>
                <option value="hamster">Hámster</option>
                <option value="other">Otro</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="ownerName">Nombre del Dueño</Label>
              <Input id="ownerName" placeholder="Ej: Juan Pérez" />
            </div>
            <div>
              <Label htmlFor="ownerPhone">Teléfono</Label>
              <Input id="ownerPhone" placeholder="Ej: 0999123456" />
            </div>
          </div>
          
          <div>
            <Label htmlFor="ownerEmail">Email del Dueño</Label>
            <Input id="ownerEmail" type="email" placeholder="Ej: juan@email.com" />
          </div>
          
          <div>
            <Label htmlFor="appointmentType">Tipo de Consulta</Label>
            <select id="appointmentType" className="w-full p-2 border border-gray-300 rounded-md bg-white">
              <option value="">Seleccionar...</option>
              {consultationTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <Label htmlFor="reason">Motivo de la Consulta</Label>
            <textarea 
              id="reason" 
              className="w-full p-2 border border-gray-300 rounded-md bg-white" 
              rows={3}
              placeholder="Describir síntomas o motivo de la consulta..."
            />
          </div>
          
          <div>
            <Label htmlFor="notes">Notas Adicionales</Label>
            <textarea 
              id="notes" 
              className="w-full p-2 border border-gray-300 rounded-md bg-white" 
              rows={2}
              placeholder="Observaciones adicionales..."
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="urgent" className="rounded border-gray-300" />
              <Label htmlFor="urgent">Marcar como urgente</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="reminder" className="rounded border-gray-300" />
              <Label htmlFor="reminder">Enviar recordatorio</Label>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="newClient" className="rounded border-gray-300" />
            <Label htmlFor="newClient">Cliente nuevo (crear perfil)</Label>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button className="bg-gray-800 hover:bg-black">
            Agendar Cita
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewAppointmentModal;
