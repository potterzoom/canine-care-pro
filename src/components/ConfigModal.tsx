
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings, User, Bell, Calendar } from 'lucide-react';

interface ConfigModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ConfigModal = ({ open, onOpenChange }: ConfigModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Configuración</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Perfil */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <Label className="font-medium">Perfil</Label>
            </div>
            <div className="space-y-2">
              <div>
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" defaultValue="Dra. María González" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" defaultValue="maria@vetsoft.com" />
              </div>
            </div>
          </div>

          {/* Notificaciones */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Bell className="w-4 h-4" />
              <Label className="font-medium">Notificaciones</Label>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="stockAlerts">Alertas de stock</Label>
                <input type="checkbox" id="stockAlerts" defaultChecked className="rounded border-gray-300" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="appointmentReminders">Recordatorios de citas</Label>
                <input type="checkbox" id="appointmentReminders" defaultChecked className="rounded border-gray-300" />
              </div>
            </div>
          </div>

          {/* Horarios */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <Label className="font-medium">Horarios</Label>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="startTime">Hora inicio</Label>
                <Input id="startTime" type="time" defaultValue="08:00" />
              </div>
              <div>
                <Label htmlFor="endTime">Hora fin</Label>
                <Input id="endTime" type="time" defaultValue="18:00" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button className="bg-gray-800 hover:bg-black">
            Guardar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfigModal;
