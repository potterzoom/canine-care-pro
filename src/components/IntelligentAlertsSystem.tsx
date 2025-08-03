
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Clock, Heart, Pill, Calendar, Bell, Settings } from 'lucide-react';

interface AlertRule {
  id: string;
  name: string;
  condition: string;
  action: string;
  priority: 'alta' | 'media' | 'baja';
  enabled: boolean;
  category: 'salud' | 'vacunacion' | 'medicacion' | 'seguimiento';
}

interface SmartAlert {
  id: string;
  ruleId: string;
  petName: string;
  message: string;
  priority: 'alta' | 'media' | 'baja';
  category: 'salud' | 'vacunacion' | 'medicacion' | 'seguimiento';
  timestamp: Date;
  read: boolean;
  actionRequired: boolean;
}

const IntelligentAlertsSystem = () => {
  const [alertRules] = useState<AlertRule[]>([
    {
      id: '1',
      name: 'Vacunación Pendiente',
      condition: 'ultima_vacunacion > 365 días',
      action: 'Notificar y programar cita',
      priority: 'alta',
      enabled: true,
      category: 'vacunacion'
    },
    {
      id: '2',
      name: 'Control de Peso',
      condition: 'peso > rango_normal + 20%',
      action: 'Recomendar plan nutricional',
      priority: 'media',
      enabled: true,
      category: 'salud'
    },
    {
      id: '3',
      name: 'Medicación Pendiente',
      condition: 'medicacion_vencida',
      action: 'Alerta al veterinario',
      priority: 'alta',
      enabled: true,
      category: 'medicacion'
    }
  ]);

  const [smartAlerts] = useState<SmartAlert[]>([
    {
      id: '1',
      ruleId: '1',
      petName: 'Max',
      message: 'Vacunación antirrábica vencida hace 45 días. Programar cita urgente.',
      priority: 'alta',
      category: 'vacunacion',
      timestamp: new Date('2024-11-20T09:00:00'),
      read: false,
      actionRequired: true
    },
    {
      id: '2',
      ruleId: '2',
      petName: 'Luna',
      message: 'Peso actual: 28kg (22% sobre peso ideal). Considerar plan nutricional.',
      priority: 'media',
      category: 'salud',
      timestamp: new Date('2024-11-19T14:30:00'),
      read: false,
      actionRequired: true
    },
    {
      id: '3',
      ruleId: '3',
      petName: 'Rocky',
      message: 'Antibiótico prescrito terminó hace 3 días. Evaluar evolución.',
      priority: 'media',
      category: 'medicacion',
      timestamp: new Date('2024-11-18T11:15:00'),
      read: true,
      actionRequired: false
    }
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta': return 'bg-red-100 text-red-800 border-red-200';
      case 'media': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'baja': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'salud': return <Heart className="w-4 h-4" />;
      case 'vacunacion': return <Pill className="w-4 h-4" />;
      case 'medicacion': return <Pill className="w-4 h-4" />;
      case 'seguimiento': return <Clock className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const unreadAlerts = smartAlerts.filter(alert => !alert.read);
  const highPriorityAlerts = smartAlerts.filter(alert => alert.priority === 'alta');
  const actionRequiredAlerts = smartAlerts.filter(alert => alert.actionRequired);

  return (
    <div className="space-y-6">
      {/* Dashboard de Alertas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Alertas</p>
                <p className="text-2xl font-bold text-gray-900">{smartAlerts.length}</p>
              </div>
              <Bell className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">No Leídas</p>
                <p className="text-2xl font-bold text-orange-600">{unreadAlerts.length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Alta Prioridad</p>
                <p className="text-2xl font-bold text-red-600">{highPriorityAlerts.length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Acción Requerida</p>
                <p className="text-2xl font-bold text-purple-600">{actionRequiredAlerts.length}</p>
              </div>
              <Settings className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Alertas Inteligentes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5" />
            <span>Alertas Inteligentes Activas</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {smartAlerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`border rounded-lg p-4 ${!alert.read ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-2">
                    {getCategoryIcon(alert.category)}
                    <span className="font-semibold text-gray-900">{alert.petName}</span>
                    <Badge className={getPriorityColor(alert.priority)}>
                      {alert.priority.toUpperCase()}
                    </Badge>
                    {alert.actionRequired && (
                      <Badge className="bg-purple-100 text-purple-800">
                        Acción Requerida
                      </Badge>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">
                    {alert.timestamp.toLocaleDateString('es-ES')} {alert.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-gray-700 mb-3">{alert.message}</p>
                <div className="flex space-x-2">
                  {alert.actionRequired && (
                    <>
                      <Button size="sm" className="bg-gray-800 hover:bg-black">
                        Programar Cita
                      </Button>
                      <Button size="sm" variant="outline">
                        Ver Historia
                      </Button>
                    </>
                  )}
                  <Button size="sm" variant="outline">
                    Marcar como Leído
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Configuración de Reglas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Reglas de Alertas Configuradas</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alertRules.map((rule) => (
              <div key={rule.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium">{rule.name}</span>
                    <Badge className={getPriorityColor(rule.priority)}>
                      {rule.priority}
                    </Badge>
                    {rule.enabled ? (
                      <Badge className="bg-green-100 text-green-800">Activa</Badge>
                    ) : (
                      <Badge className="bg-gray-100 text-gray-800">Inactiva</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{rule.condition} → {rule.action}</p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    Editar
                  </Button>
                  <Button size="sm" variant="outline">
                    {rule.enabled ? 'Desactivar' : 'Activar'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntelligentAlertsSystem;
