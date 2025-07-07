
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, Package, Calendar, AlertTriangle, Search, Filter, Clock, User, Syringe, FileText } from 'lucide-react';

interface AlertsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AlertsModal = ({ open, onOpenChange }: AlertsModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const alerts = [
    {
      id: 1,
      type: 'stock',
      category: 'Inventario',
      title: 'Stock Bajo',
      message: 'Amoxicilina 500mg - Solo quedan 5 unidades',
      time: '2 min ago',
      icon: Package,
      urgent: true
    },
    {
      id: 2,
      type: 'appointment',
      category: 'Citas',
      title: 'Cita Próxima',
      message: 'Max - Consulta general en 30 minutos',
      time: '5 min ago',
      icon: Calendar,
      urgent: false
    },
    {
      id: 3,
      type: 'vaccine',
      category: 'Vacunas',
      title: 'Vacuna Vencida',
      message: 'Luna necesita refuerzo de rabia',
      time: '1 hora ago',
      icon: Syringe,
      urgent: true
    },
    {
      id: 4,
      type: 'payment',
      category: 'Pagos',
      title: 'Pago Pendiente',
      message: 'Factura #1234 - Juan Pérez - $85.50',
      time: '2 horas ago',
      icon: FileText,
      urgent: false
    },
    {
      id: 5,
      type: 'patient',
      category: 'Pacientes',
      title: 'Seguimiento Requerido',
      message: 'Rocky necesita revisión post-cirugía',
      time: '3 horas ago',
      icon: User,
      urgent: true
    },
    {
      id: 6,
      type: 'system',
      category: 'Sistema',
      title: 'Respaldo Completado',
      message: 'Respaldo automático realizado exitosamente',
      time: '6 horas ago',
      icon: Clock,
      urgent: false
    }
  ];

  const categories = ['all', 'Inventario', 'Citas', 'Vacunas', 'Pagos', 'Pacientes', 'Sistema'];

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || alert.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span>Centro de Alertas</span>
          </DialogTitle>
        </DialogHeader>
        
        {/* Buscador y filtros */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar alertas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
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
        
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredAlerts.map((alert) => (
            <Alert key={alert.id} className={`${alert.urgent ? 'border-gray-400 bg-gray-100' : 'border-gray-300 bg-gray-50'}`}>
              <alert.icon className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-sm">{alert.title}</p>
                      <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">
                        {alert.category}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{alert.time}</span>
                  </div>
                  <p className="text-sm text-gray-600">{alert.message}</p>
                </div>
              </AlertDescription>
            </Alert>
          ))}
          
          {filteredAlerts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No se encontraron alertas que coincidan con tu búsqueda
            </div>
          )}
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
          <Button className="bg-gray-800 hover:bg-black">
            Marcar Todo Leído
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AlertsModal;
