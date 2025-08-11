
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bell, AlertTriangle, Calendar, Package, Heart, Clock } from 'lucide-react';
import IntelligentAlertsSystem from './IntelligentAlertsSystem';
import AutomatedReminders from './AutomatedReminders';

interface AlertsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AlertsModal = ({ open, onOpenChange }: AlertsModalProps) => {
  const [alerts] = useState([
    {
      type: 'urgent',
      title: 'Stock Crítico - Vacuna Antirrábica',
      message: 'Solo quedan 2 dosis en inventario',
      time: '10:30 AM',
      icon: Package
    },
    {
      type: 'appointment',
      title: 'Cita Urgente - Luna (María García)',
      message: 'Reagendar cita cancelada para emergencia',
      time: '09:15 AM',
      icon: Calendar
    },
    {
      type: 'medical',
      title: 'Seguimiento Post-Cirugía - Rocky',
      message: 'Control programado para hoy',
      time: '08:45 AM',
      icon: Heart
    }
  ]);

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'urgent':
        return 'border-l-red-500 bg-red-50';
      case 'appointment':
        return 'border-l-blue-500 bg-blue-50';
      case 'medical':
        return 'border-l-green-500 bg-green-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getAlertBadgeColor = (type: string) => {
    switch (type) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'appointment':
        return 'bg-blue-100 text-blue-800';
      case 'medical':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl h-[90vh] p-0">
        <div className="flex flex-col h-full">
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Sistema de Alertas Inteligentes</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-6">
                <Tabs defaultValue="alerts" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="alerts">Alertas Básicas</TabsTrigger>
                    <TabsTrigger value="intelligent">Alertas IA</TabsTrigger>
                    <TabsTrigger value="reminders">Recordatorios</TabsTrigger>
                  </TabsList>

                  <TabsContent value="alerts" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                          <h3 className="font-semibold text-red-900">Alertas Urgentes</h3>
                        </div>
                        <p className="text-2xl font-bold text-red-700">2</p>
                        <p className="text-sm text-red-600">Requieren atención inmediata</p>
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <Calendar className="w-5 h-5 text-blue-600" />
                          <h3 className="font-semibold text-blue-900">Citas Pendientes</h3>
                        </div>
                        <p className="text-2xl font-bold text-blue-700">3</p>
                        <p className="text-sm text-blue-600">Para gestionar hoy</p>
                      </div>
                      
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <Heart className="w-5 h-5 text-green-600" />
                          <h3 className="font-semibold text-green-900">Seguimientos</h3>
                        </div>
                        <p className="text-2xl font-bold text-green-700">4</p>
                        <p className="text-sm text-green-600">Controles programados</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold mb-4">Alertas Activas</h3>
                      {alerts.map((alert, index) => (
                        <div key={index} className={`border-l-4 p-4 rounded-r-lg ${getAlertColor(alert.type)}`}>
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              <alert.icon className="w-5 h-5 mt-1 flex-shrink-0" />
                              <div>
                                <div className="flex items-center space-x-2 mb-1">
                                  <h4 className="font-medium text-gray-900">{alert.title}</h4>
                                  <Badge className={`text-xs ${getAlertBadgeColor(alert.type)}`}>
                                    {alert.type === 'urgent' ? 'Urgente' : 
                                     alert.type === 'appointment' ? 'Cita' : 'Médico'}
                                  </Badge>
                                </div>
                                <p className="text-gray-700">{alert.message}</p>
                                <p className="text-sm text-gray-500 mt-1">{alert.time}</p>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" className="bg-gray-800 hover:bg-black">
                                Resolver
                              </Button>
                              <Button size="sm" variant="outline">
                                Posponer
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="intelligent">
                    <IntelligentAlertsSystem />
                  </TabsContent>

                  <TabsContent value="reminders">
                    <AutomatedReminders />
                  </TabsContent>
                </Tabs>
              </div>
            </ScrollArea>
          </div>
          
          <div className="px-6 py-4 border-t bg-white">
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cerrar
              </Button>
              <Button className="bg-gray-800 hover:bg-black">
                Configurar Notificaciones
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AlertsModal;
