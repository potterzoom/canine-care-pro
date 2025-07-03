
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Bell, Package, Calendar, AlertTriangle } from 'lucide-react';

interface AlertsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AlertsModal = ({ open, onOpenChange }: AlertsModalProps) => {
  const alerts = [
    {
      id: 1,
      type: 'stock',
      title: 'Stock Bajo',
      message: 'Amoxicilina 500mg - Solo quedan 5 unidades',
      time: '2 min ago',
      icon: Package,
      urgent: true
    },
    {
      id: 2,
      type: 'appointment',
      title: 'Cita Próxima',
      message: 'Max - Consulta general en 30 minutos',
      time: '5 min ago',
      icon: Calendar,
      urgent: false
    },
    {
      id: 3,
      type: 'vaccine',
      title: 'Vacuna Vencida',
      message: 'Luna necesita refuerzo de rabia',
      time: '1 hora ago',
      icon: AlertTriangle,
      urgent: true
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span>Alertas</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {alerts.map((alert) => (
            <Alert key={alert.id} className={`${alert.urgent ? 'border-red-200 bg-red-50' : 'border-blue-200 bg-blue-50'}`}>
              <alert.icon className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-sm">{alert.title}</p>
                    <span className="text-xs text-slate-500">{alert.time}</span>
                  </div>
                  <p className="text-sm text-slate-600">{alert.message}</p>
                </div>
              </AlertDescription>
            </Alert>
          ))}
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
          <Button>
            Marcar Todo Leído
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AlertsModal;
