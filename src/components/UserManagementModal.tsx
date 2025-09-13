
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Shield, Lock, Eye, EyeOff, AlertTriangle } from 'lucide-react';

interface UserManagementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UserManagementModal = ({ open, onOpenChange }: UserManagementModalProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'users' | 'security'>('users');

  const users = [
    {
      id: 1,
      name: 'Dra. María González',
      email: 'maria@vetsoft.com',
      role: 'Administrador',
      status: 'Activo',
      lastLogin: '2024-01-15 14:30'
    },
    {
      id: 2,
      name: 'Dr. Carlos Mendoza',
      email: 'carlos@vetsoft.com',
      role: 'Veterinario',
      status: 'Activo',
      lastLogin: '2024-01-15 10:15'
    },
    {
      id: 3,
      name: 'Ana López',
      email: 'ana@vetsoft.com',
      role: 'Asistente',
      status: 'Inactivo',
      lastLogin: '2024-01-10 16:45'
    }
  ];

  const securityPolicies = [
    {
      title: 'Contraseñas Seguras',
      description: 'Mínimo 8 caracteres, mayúsculas, minúsculas y números',
      status: 'Activo',
      level: 'Alto'
    },
    {
      title: 'Autenticación de Dos Factores',
      description: 'Verificación adicional por SMS o email',
      status: 'Pendiente',
      level: 'Crítico'
    },
    {
      title: 'Sesiones Automáticas',
      description: 'Cierre automático después de 30 minutos de inactividad',
      status: 'Activo',
      level: 'Medio'
    },
    {
      title: 'Encriptación de Datos',
      description: 'Protección de información médica sensible',
      status: 'Activo',
      level: 'Crítico'
    }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Administrador':
        return 'bg-red-100 text-red-800';
      case 'Veterinario':
        return 'bg-blue-100 text-blue-800';
      case 'Asistente':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activo':
        return 'bg-green-100 text-green-800';
      case 'Inactivo':
        return 'bg-gray-100 text-gray-800';
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Gestión de Usuarios y Seguridad</span>
          </DialogTitle>
        </DialogHeader>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
          <button
            onClick={() => setActiveTab('users')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'users'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <UserPlus className="w-4 h-4 inline mr-2" />
            Usuarios
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'security'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Lock className="w-4 h-4 inline mr-2" />
            Ciberseguridad
          </button>
        </div>

        {activeTab === 'users' ? (
          <div className="space-y-6">
            {/* Nuevo Usuario */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-4">Agregar Nuevo Usuario</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="newName">Nombre Completo</Label>
                  <Input id="newName" placeholder="Dr. Juan Pérez" />
                </div>
                <div>
                  <Label htmlFor="newEmail">Email</Label>
                  <Input id="newEmail" type="email" placeholder="juan@vetsoft.com" />
                </div>
                <div>
                  <Label htmlFor="newRole">Rol</Label>
                  <select id="newRole" className="w-full p-2 border border-gray-300 rounded-md">
                    <option>Seleccionar rol</option>
                    <option>Administrador</option>
                    <option>Veterinario</option>
                    <option>Asistente</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="newPassword">Contraseña Temporal</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Contraseña segura"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
              <Button className="mt-4 bg-gray-800 hover:bg-black">
                <UserPlus className="w-4 h-4 mr-2" />
                Crear Usuario
              </Button>
            </div>

            {/* Lista de Usuarios */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Usuarios Existentes</h4>
              <div className="space-y-3">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="font-medium text-gray-600">{user.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <p className="text-xs text-gray-400">Último acceso: {user.lastLogin}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                      <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                      <Button variant="outline" size="sm">Editar</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Políticas de Seguridad */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-yellow-600" />
                Políticas de Ciberseguridad
              </h4>
              <div className="space-y-4">
                {securityPolicies.map((policy, index) => (
                  <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900">{policy.title}</h5>
                      <div className="flex space-x-2">
                        <Badge className={getLevelColor(policy.level)}>{policy.level}</Badge>
                        <Badge className={getStatusColor(policy.status)}>{policy.status}</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{policy.description}</p>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Configurar</Button>
                      {policy.status === 'Pendiente' && (
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">Activar</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Configuración Avanzada */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-4">Configuración Avanzada</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Registro de Actividad</p>
                    <p className="text-sm text-gray-600">Monitorear todas las acciones del sistema</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Alertas de Seguridad</p>
                    <p className="text-sm text-gray-600">Notificar intentos de acceso sospechosos</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Respaldo Automático</p>
                    <p className="text-sm text-gray-600">Backup diario de datos críticos</p>
                  </div>
                  <input type="checkbox" className="rounded border-gray-300" />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
          <Button className="bg-gray-800 hover:bg-black">
            Guardar Cambios
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserManagementModal;
