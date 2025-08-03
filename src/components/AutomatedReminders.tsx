
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Bell, Calendar, MessageSquare, Mail, Phone, Clock, Settings } from 'lucide-react';

interface Reminder {
  id: string;
  type: 'vacunacion' | 'medicacion' | 'control' | 'seguimiento';
  petName: string;
  ownerName: string;
  message: string;
  scheduledDate: Date;
  channels: ('sms' | 'email' | 'push' | 'call')[];
  status: 'pendiente' | 'enviado' | 'entregado' | 'fallido';
  priority: 'alta' | 'media' | 'baja';
}

interface ReminderRule {
  id: string;
  name: string;
  trigger: string;
  template: string;
  channels: ('sms' | 'email' | 'push' | 'call')[];
  enabled: boolean;
  frequency: string;
}

const AutomatedReminders = () => {
  const [reminders] = useState<Reminder[]>([
    {
      id: '1',
      type: 'vacunacion',
      petName: 'Max',
      ownerName: 'Juan Pérez',
      message: 'Recordatorio: Vacunación anual de Max programada para mañana a las 10:00 AM',
      scheduledDate: new Date('2024-11-21T08:00:00'),
      channels: ['sms', 'email'],
      status: 'pendiente',
      priority: 'alta'
    },
    {
      id: '2',
      type: 'medicacion',
      petName: 'Luna',
      ownerName: 'María García',
      message: 'Es hora de administrar el antibiótico a Luna. Dosis: 1 tableta cada 12 horas',
      scheduledDate: new Date('2024-11-20T20:00:00'),
      channels: ['push', 'sms'],
      status: 'enviado',
      priority: 'alta'
    },
    {
      id: '3',
      type: 'control',
      petName: 'Rocky',
      ownerName: 'Carlos Mendoza',
      message: 'Control post-cirugía de Rocky programado para el viernes. Confirmar asistencia.',
      scheduledDate: new Date('2024-11-22T09:00:00'),
      channels: ['email', 'call'],
      status: 'entregado',
      priority: 'media'
    }
  ]);

  const [reminderRules] = useState<ReminderRule[]>([
    {
      id: '1',
      name: 'Recordatorio de Vacunación',
      trigger: '7 días antes de vencimiento',
      template: 'Su mascota {{pet_name}} necesita vacunación. Programe su cita.',
      channels: ['email', 'sms'],
      enabled: true,
      frequency: 'Semanal hasta completar'
    },
    {
      id: '2',
      name: 'Medicación Diaria',
      trigger: 'Horario de medicación',
      template: 'Administrar {{medication}} a {{pet_name}} - {{dosage}}',
      channels: ['push', 'sms'],
      enabled: true,
      frequency: 'Según prescripción'
    },
    {
      id: '3',
      name: 'Confirmación de Cita',
      trigger: '24 horas antes',
      template: 'Confirme la cita de {{pet_name}} mañana a las {{time}}',
      channels: ['sms', 'call'],
      enabled: true,
      frequency: 'Una vez'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendiente': return 'bg-yellow-100 text-yellow-800';
      case 'enviado': return 'bg-blue-100 text-blue-800';
      case 'entregado': return 'bg-green-100 text-green-800';
      case 'fallido': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta': return 'bg-red-100 text-red-800';
      case 'media': return 'bg-yellow-100 text-yellow-800';
      case 'baja': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'sms': return <MessageSquare className="w-3 h-3" />;
      case 'email': return <Mail className="w-3 h-3" />;
      case 'push': return <Bell className="w-3 h-3" />;
      case 'call': return <Phone className="w-3 h-3" />;
      default: return <Bell className="w-3 h-3" />;
    }
  };

  const pendingReminders = reminders.filter(r => r.status === 'pendiente');
  const sentToday = reminders.filter(r => 
    r.status === 'enviado' && 
    new Date(r.scheduledDate).toDateString() === new Date().toDateString()
  );

  return (
    <div className="space-y-6">
      {/* Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pendientes</p>
                <p className="text-2xl font-bold text-orange-600">{pendingReminders.length}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Enviados Hoy</p>
                <p className="text-2xl font-bold text-blue-600">{sentToday.length}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Reglas Activas</p>
                <p className="text-2xl font-bold text-green-600">{reminderRules.filter(r => r.enabled).length}</p>
              </div>
              <Settings className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tasa Entrega</p>
                <p className="text-2xl font-bold text-purple-600">94%</p>
              </div>
              <Bell className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Recordatorios */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span>Recordatorios Programados</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reminders.map((reminder) => (
              <div key={reminder.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{reminder.petName}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-700">{reminder.ownerName}</span>
                      <Badge className={getPriorityColor(reminder.priority)}>
                        {reminder.priority.toUpperCase()}
                      </Badge>
                      <Badge className={getStatusColor(reminder.status)}>
                        {reminder.status.charAt(0).toUpperCase() + reminder.status.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {reminder.scheduledDate.toLocaleString('es-ES')}
                    </p>
                  </div>
                  <div className="flex space-x-1">
                    {reminder.channels.map((channel, index) => (
                      <div key={index} className="p-1 bg-gray-100 rounded">
                        {getChannelIcon(channel)}
                      </div>
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-800">{reminder.message}</p>
                
                <div className="flex space-x-2">
                  {reminder.status === 'pendiente' && (
                    <Button size="sm" className="bg-gray-800 hover:bg-black">
                      Enviar Ahora
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    Editar
                  </Button>
                  <Button size="sm" variant="outline">
                    Cancelar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reglas de Recordatorios */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Reglas de Recordatorios</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reminderRules.map((rule) => (
              <div key={rule.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="font-medium">{rule.name}</span>
                    <Switch checked={rule.enabled} />
                    {rule.enabled ? (
                      <Badge className="bg-green-100 text-green-800">Activa</Badge>
                    ) : (
                      <Badge className="bg-gray-100 text-gray-800">Inactiva</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Disparador:</strong> {rule.trigger}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Frecuencia:</strong> {rule.frequency}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Canales:</strong> {rule.channels.join(', ')}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    Editar
                  </Button>
                  <Button size="sm" variant="outline">
                    Probar
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t">
            <Button className="bg-gray-800 hover:bg-black">
              + Crear Nueva Regla
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutomatedReminders;
