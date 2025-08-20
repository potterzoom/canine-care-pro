
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Lock, Eye, AlertTriangle, Clock, User, FileText, Activity, Download, Filter } from 'lucide-react';

interface SecurityAuditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SecurityAuditModal = ({ open, onOpenChange }: SecurityAuditModalProps) => {
  const [activeTab, setActiveTab] = useState<'logs' | 'security' | 'compliance'>('logs');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const auditLogs = [
    {
      id: 1,
      timestamp: '2024-11-15 14:23:45',
      user: 'Dra. María González',
      action: 'LOGIN',
      resource: 'Sistema',
      ip: '192.168.1.100',
      status: 'Exitoso',
      details: 'Inicio de sesión desde navegador Chrome'
    },
    {
      id: 2,
      timestamp: '2024-11-15 14:20:12',
      user: 'Dr. Carlos Mendoza',
      action: 'VIEW_PATIENT',
      resource: 'Historial Médico - Max (ID: 123)',
      ip: '192.168.1.105',
      status: 'Exitoso',
      details: 'Acceso a historial médico completo'
    },
    {
      id: 3,
      timestamp: '2024-11-15 14:18:33',
      user: 'Ana López',
      action: 'UPDATE_APPOINTMENT',
      resource: 'Cita ID: 456',
      ip: '192.168.1.102',
      status: 'Exitoso',
      details: 'Modificación de hora de cita'
    },
    {
      id: 4,
      timestamp: '2024-11-15 14:15:22',
      user: 'Sistema',
      action: 'BACKUP',
      resource: 'Base de Datos',
      ip: 'localhost',
      status: 'Exitoso',
      details: 'Backup automático completado'
    },
    {
      id: 5,
      timestamp: '2024-11-15 14:10:55',
      user: 'Usuario Desconocido',
      action: 'LOGIN_ATTEMPT',
      resource: 'Sistema',
      ip: '203.0.113.45',
      status: 'Fallido',
      details: 'Intento de acceso con credenciales incorrectas'
    }
  ];

  const securityMetrics = [
    {
      title: 'Intentos de Acceso Fallidos',
      value: 3,
      change: '-50% vs ayer',
      status: 'good',
      icon: Shield
    },
    {
      title: 'Sesiones Activas',
      value: 5,
      change: 'Normal',
      status: 'normal',
      icon: User
    },
    {
      title: 'Datos Cifrados',
      value: '100%',
      change: 'Completo',
      status: 'excellent',
      icon: Lock
    },
    {
      title: 'Último Backup',
      value: '1 hora',
      change: 'Automático',
      status: 'good',
      icon: Clock
    }
  ];

  const complianceChecks = [
    {
      standard: 'HIPAA (Adaptado Veterinario)',
      status: 'Compliant',
      lastAudit: '2024-10-15',
      nextAudit: '2024-12-15',
      score: 98,
      issues: 0
    },
    {
      standard: 'GDPR - Protección de Datos',
      status: 'Compliant',
      lastAudit: '2024-10-20',
      nextAudit: '2024-12-20',
      score: 95,
      issues: 1
    },
    {
      standard: 'ISO 27001 - Seguridad',
      status: 'Partial',
      lastAudit: '2024-09-30',
      nextAudit: '2024-11-30',
      score: 87,
      issues: 3
    },
    {
      standard: 'Normativa Local Veterinaria',
      status: 'Compliant',
      lastAudit: '2024-11-01',
      nextAudit: '2025-01-01',
      score: 100,
      issues: 0
    }
  ];

  const securityPolicies = [
    {
      name: 'Contraseñas Seguras',
      description: 'Mínimo 12 caracteres, mayúsculas, minúsculas, números y símbolos',
      status: 'Activo',
      level: 'Alto',
      lastUpdated: '2024-10-15'
    },
    {
      name: 'Autenticación Multifactor',
      description: 'Verificación en dos pasos obligatoria para administradores',
      status: 'Activo',
      level: 'Crítico',
      lastUpdated: '2024-11-01'
    },
    {
      name: 'Cifrado de Base de Datos',
      description: 'AES-256 para datos sensibles y historiales médicos',
      status: 'Activo',
      level: 'Crítico',
      lastUpdated: '2024-09-20'
    },
    {
      name: 'Sesiones Automáticas',
      description: 'Cierre automático después de 30 minutos de inactividad',
      status: 'Activo',
      level: 'Medio',
      lastUpdated: '2024-10-30'
    },
    {
      name: 'Backups Automáticos',
      description: 'Respaldo diario con cifrado y almacenamiento externo',
      status: 'Activo',
      level: 'Alto',
      lastUpdated: '2024-11-10'
    },
    {
      name: 'Logs de Auditoría',
      description: 'Registro detallado de todas las acciones del sistema',
      status: 'Activo',
      level: 'Alto',
      lastUpdated: '2024-11-05'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Exitoso':
      case 'Compliant':
      case 'Activo':
        return 'bg-green-100 text-green-800';
      case 'Fallido':
      case 'Crítico':
        return 'bg-red-100 text-red-800';
      case 'Partial':
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Crítico':
        return 'bg-red-100 text-red-800';
      case 'Alto':
        return 'bg-orange-100 text-orange-800';
      case 'Medio':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMetricStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'text-green-600';
      case 'good':
        return 'text-blue-600';
      case 'normal':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  const filteredLogs = auditLogs.filter(log => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'failed') return log.status === 'Fallido';
    if (selectedFilter === 'security') return log.action.includes('LOGIN');
    return true;
  });

  const exportLogs = () => {
    console.log('Exportando logs de auditoría...');
    // Aquí iría la lógica de exportación
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Seguridad y Auditoría</span>
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="logs">Logs de Auditoría</TabsTrigger>
            <TabsTrigger value="security">Seguridad</TabsTrigger>
            <TabsTrigger value="compliance">Cumplimiento</TabsTrigger>
          </TabsList>

          <TabsContent value="logs" className="space-y-6">
            {/* Métricas de Seguridad */}
            <div className="grid grid-cols-4 gap-4">
              {securityMetrics.map((metric, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <metric.icon className={`w-5 h-5 ${getMetricStatusColor(metric.status)}`} />
                    <Badge className={getStatusColor(metric.status)}>
                      {metric.status === 'excellent' ? 'Excelente' : 
                       metric.status === 'good' ? 'Bueno' : 'Normal'}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{metric.title}</h3>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <p className="text-xs text-gray-500">{metric.change}</p>
                </div>
              ))}
            </div>

            {/* Filtros y Exportación */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Filter className="w-4 h-4 text-gray-600" />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                >
                  <option value="all">Todos los eventos</option>
                  <option value="failed">Solo fallidos</option>
                  <option value="security">Eventos de seguridad</option>
                </select>
              </div>
              
              <Button onClick={exportLogs} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exportar Logs
              </Button>
            </div>

            {/* Tabla de Logs */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Timestamp
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Usuario
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Acción
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Recurso
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        IP
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {log.timestamp}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {log.user}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {log.action}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                          {log.resource}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={getStatusColor(log.status)}>
                            {log.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {log.ip}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            {/* Políticas de Seguridad */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Políticas de Seguridad Activas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {securityPolicies.map((policy, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{policy.name}</h4>
                      <div className="flex space-x-2">
                        <Badge className={getLevelColor(policy.level)}>
                          {policy.level}
                        </Badge>
                        <Badge className={getStatusColor(policy.status)}>
                          {policy.status}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{policy.description}</p>
                    <p className="text-xs text-gray-500">
                      Actualizado: {policy.lastUpdated}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Configuración de Seguridad */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-4">Configuración Avanzada de Seguridad</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Registro Detallado de Actividad</p>
                    <p className="text-sm text-gray-600">Monitorear todas las acciones del sistema</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Alertas de Seguridad en Tiempo Real</p>
                    <p className="text-sm text-gray-600">Notificar intentos de acceso sospechosos</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Cifrado de Comunicaciones</p>
                    <p className="text-sm text-gray-600">TLS 1.3 para todas las conexiones</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Backup Automático Diario</p>
                    <p className="text-sm text-gray-600">Respaldo cifrado de datos críticos</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Monitoreo de Integridad de Archivos</p>
                    <p className="text-sm text-gray-600">Detectar modificaciones no autorizadas</p>
                  </div>
                  <input type="checkbox" className="rounded border-gray-300" />
                </div>
              </div>
            </div>

            {/* Alertas de Seguridad Recientes */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Alerta de Seguridad
                  </h3>
                  <p className="mt-1 text-sm text-yellow-700">
                    Se detectaron 3 intentos de acceso fallidos desde IP: 203.0.113.45 en las últimas 2 horas.
                    La IP ha sido bloqueada automáticamente por 24 horas.
                  </p>
                  <p className="mt-2 text-xs text-yellow-600">
                    15 Nov 2024, 14:10:55
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            {/* Estándares de Cumplimiento */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Estándares de Cumplimiento</h3>
              <div className="space-y-4">
                {complianceChecks.map((standard, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-lg">{standard.standard}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(standard.status)}>
                          {standard.status === 'Compliant' ? 'Cumple' : 'Parcial'}
                        </Badge>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600">{standard.score}%</p>
                          <p className="text-xs text-gray-500">Puntuación</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-600">Última Auditoría</p>
                        <p className="font-medium">{standard.lastAudit}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Próxima Auditoría</p>
                        <p className="font-medium">{standard.nextAudit}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Problemas Pendientes</p>
                        <p className={`font-medium ${standard.issues === 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {standard.issues}
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        className={`h-2 rounded-full ${
                          standard.score >= 95 ? 'bg-green-600' :
                          standard.score >= 80 ? 'bg-yellow-600' : 'bg-red-600'
                        }`}
                        style={{ width: `${standard.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reporte de Cumplimiento */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-3">📊 Reporte de Cumplimiento General</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">95%</p>
                  <p className="text-sm text-blue-800">Cumplimiento General</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">4/4</p>
                  <p className="text-sm text-blue-800">Estándares Evaluados</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-blue-800">
                <p>• ✅ Protección de datos médicos: Excelente</p>
                <p>• ✅ Control de acceso: Implementado</p>
                <p>• ✅ Cifrado de datos: AES-256 activo</p>
                <p>• ⚠️ Documentación de procesos: Mejorar</p>
              </div>
              
              <Button className="mt-4 bg-blue-600 hover:bg-blue-700" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Generar Reporte Completo
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
          <Button className="bg-gray-800 hover:bg-black">
            Configurar Políticas
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SecurityAuditModal;
