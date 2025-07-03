
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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
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
          
          <div>
            <Label htmlFor="petName">Nombre de la Mascota</Label>
            <Input id="petName" placeholder="Ej: Max" />
          </div>
          
          <div>
            <Label htmlFor="ownerName">Nombre del Dueño</Label>
            <Input id="ownerName" placeholder="Ej: Juan Pérez" />
          </div>
          
          <div>
            <Label htmlFor="ownerPhone">Teléfono</Label>
            <Input id="ownerPhone" placeholder="Ej: 0999123456" />
          </div>
          
          <div>
            <Label htmlFor="appointmentType">Tipo de Consulta</Label>
            <select id="appointmentType" className="w-full p-2 border rounded-md">
              <option value="">Seleccionar...</option>
              <option value="general">Consulta General</option>
              <option value="vaccination">Vacunación</option>
              <option value="surgery">Cirugía</option>
              <option value="emergency">Emergencia</option>
            </select>
          </div>
          
          <div>
            <Label htmlFor="notes">Notas</Label>
            <textarea 
              id="notes" 
              className="w-full p-2 border rounded-md" 
              rows={3}
              placeholder="Observaciones adicionales..."
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="urgent" className="rounded" />
            <Label htmlFor="urgent">Marcar como urgente</Label>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button>
            Agendar Cita
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewAppointmentModal;
