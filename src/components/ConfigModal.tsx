
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings, User, Bell, Calendar, Shield, Database, MessageSquare, Palette, Clock, Printer } from 'lucide-react';

interface ConfigModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ConfigModal = ({ open, onOpenChange }: ConfigModalProps) => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'notifications', label: 'Notificaciones', icon: Bell },
    { id: 'schedule', label: 'Horarios', icon: Calendar },
    { id: 'security', label: 'Seguridad', icon: Shield },
    { id: 'system', label: 'Sistema', icon: Database },
    { id: 'communication', label: 'Comunicación', icon: MessageSquare },
    { id: 'appearance', label: 'Apariencia', icon: Palette }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nombre Completo</Label>
              <Input id="name" defaultValue="Dra. María González" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue="maria@vetsoft.com" />
            </div>
            <div>
              <Label htmlFor="phone">Teléfono</Label>
              <Input id="phone" defaultValue="+593 99 123 4567" />
            </div>
            <div>
              <Label htmlFor="specialty">Especialidad</Label>
              <Input id="specialty" defaultValue="Veterinaria General" />
            </div>
            <div>
              <Label htmlFor="license">Número de Licencia</Label>
              <Input id="license" defaultValue="VET-EC-2024-001" />
            </div>
          </div>
        );
      
      case 'notifications':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="stockAlerts">Alertas de stock bajo</Label>
              <input type="checkbox" id="stockAlerts" defaultChecked className="rounded border-gray-300" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="appointmentReminders">Recordatorios de citas</Label>
              <input type="checkbox" id="appointmentReminders" defaultChecked className="rounded border-gray-300" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="vaccineAlerts">Alertas de vacunas</Label>
              <input type="checkbox" id="vaccineAlerts" defaultChecked className="rounded border-gray-300" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="paymentReminders">Recordatorios de pago</Label>
              <input type="checkbox" id="paymentReminders" defaultChecked className="rounded border-gray-300" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="emergencyAlerts">Alertas de emergencia</Label>
              <input type="checkbox" id="emergencyAlerts" defaultChecked className="rounded border-gray-300" />
            </div>
            <div>
              <Label htmlFor="notificationSound">Sonido de notificación</Label>
              <select id="notificationSound" className="w-full p-2 border border-gray-300 rounded-md bg-white">
                <option value="default">Predeterminado</option>
                <option value="chime">Campana</option>
                <option value="beep">Beep</option>
                <option value="silent">Silencioso</option>
              </select>
            </div>
          </div>
        );
      
      case 'schedule':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startTime">Hora de inicio</Label>
                <Input id="startTime" type="time" defaultValue="08:00" />
              </div>
              <div>
                <Label htmlFor="endTime">Hora de fin</Label>
                <Input id="endTime" type="time" defaultValue="18:00" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lunchStart">Inicio almuerzo</Label>
                <Input id="lunchStart" type="time" defaultValue="12:00" />
              </div>
              <div>
                <Label htmlFor="lunchEnd">Fin almuerzo</Label>
                <Input id="lunchEnd" type="time" defaultValue="13:00" />
              </div>
            </div>
            <div>
              <Label htmlFor="appointmentDuration">Duración de citas (minutos)</Label>
              <select id="appointmentDuration" className="w-full p-2 border border-gray-300 rounded-md bg-white">
                <option value="15">15 minutos</option>
                <option value="30" selected>30 minutos</option>
                <option value="45">45 minutos</option>
                <option value="60">60 minutos</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Días laborables</Label>
              {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map(day => (
                <div key={day} className="flex items-center justify-between">
                  <Label htmlFor={day.toLowerCase()}>{day}</Label>
                  <input 
                    type="checkbox" 
                    id={day.toLowerCase()} 
                    defaultChecked={day !== 'Domingo'} 
                    className="rounded border-gray-300" 
                  />
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'security':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">Contraseña Actual</Label>
              <Input id="currentPassword" type="password" />
            </div>
            <div>
              <Label htmlFor="newPassword">Nueva Contraseña</Label>
              <Input id="newPassword" type="password" />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
              <Input id="confirmPassword" type="password" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="twoFactor">Autenticación de dos factores</Label>
              <input type="checkbox" id="twoFactor" className="rounded border-gray-300" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="autoLogout">Cerrar sesión automático (30 min)</Label>
              <input type="checkbox" id="autoLogout" defaultChecked className="rounded border-gray-300" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="loginNotifications">Notificar inicios de sesión</Label>
              <input type="checkbox" id="loginNotifications" defaultChecked className="rounded border-gray-300" />
            </div>
            <div>
              <Label htmlFor="backupFrequency">Frecuencia de respaldo</Label>
              <select id="backupFrequency" className="w-full p-2 border border-gray-300 rounded-md bg-white">
                <option value="daily" selected>Diario</option>
                <option value="weekly">Semanal</option>
                <option value="monthly">Mensual</option>
              </select>
            </div>
          </div>
        );
      
      case 'system':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="language">Idioma</Label>
              <select id="language" className="w-full p-2 border border-gray-300 rounded-md bg-white">
                <option value="es" selected>Español</option>
                <option value="en">English</option>
              </select>
            </div>
            <div>
              <Label htmlFor="timezone">Zona Horaria</Label>
              <select id="timezone" className="w-full p-2 border border-gray-300 rounded-md bg-white">
                <option value="America/Guayaquil" selected>Ecuador (GMT-5)</option>
                <option value="America/Bogota">Colombia (GMT-5)</option>
                <option value="America/Lima">Perú (GMT-5)</option>
              </select>
            </div>
            <div>
              <Label htmlFor="currency">Moneda</Label>
              <select id="currency" className="w-full p-2 border border-gray-300 rounded-md bg-white">
                <option value="USD" selected>Dólar Estadounidense ($)</option>
                <option value="EUR">Euro (€)</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="autoUpdates">Actualizaciones automáticas</Label>
              <input type="checkbox" id="autoUpdates" defaultChecked className="rounded border-gray-300" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="dataSync">Sincronización en la nube</Label>
              <input type="checkbox" id="dataSync" defaultChecked className="rounded border-gray-300" />
            </div>
          </div>
        );
      
      case 'communication':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="emailProvider">Proveedor de Email</Label>
              <select id="emailProvider" className="w-full p-2 border border-gray-300 rounded-md bg-white">
                <option value="gmail">Gmail</option>
                <option value="outlook">Outlook</option>
                <option value="yahoo">Yahoo</option>
              </select>
            </div>
            <div>
              <Label htmlFor="smsProvider">Proveedor de SMS</Label>
              <select id="smsProvider" className="w-full p-2 border border-gray-300 rounded-md bg-white">
                <option value="twilio">Twilio</option>
                <option value="local">Proveedor Local</option>
              </select>
            </div>
            <div>
              <Label htmlFor="whatsappNumber">Número WhatsApp Business</Label>
              <Input id="whatsappNumber" defaultValue="+593 99 123 4567" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="autoReminders">Recordatorios automáticos</Label>
              <input type="checkbox" id="autoReminders" defaultChecked className="rounded border-gray-300" />
            </div>
            <div>
              <Label htmlFor="reminderTime">Tiempo de recordatorio (horas antes)</Label>
              <select id="reminderTime" className="w-full p-2 border border-gray-300 rounded-md bg-white">
                <option value="24" selected>24 horas</option>
                <option value="12">12 horas</option>
                <option value="6">6 horas</option>
                <option value="2">2 horas</option>
              </select>
            </div>
          </div>
        );
      
      case 'appearance':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="theme">Tema</Label>
              <select id="theme" className="w-full p-2 border border-gray-300 rounded-md bg-white">
                <option value="light" selected>Claro</option>
                <option value="dark">Oscuro</option>
                <option value="auto">Automático</option>
              </select>
            </div>
            <div>
              <Label htmlFor="fontSize">Tamaño de fuente</Label>
              <select id="fontSize" className="w-full p-2 border border-gray-300 rounded-md bg-white">
                <option value="small">Pequeño</option>
                <option value="medium" selected>Mediano</option>
                <option value="large">Grande</option>
              </select>
            </div>
            <div>
              <Label htmlFor="colorScheme">Esquema de colores</Label>
              <select id="colorScheme" className="w-full p-2 border border-gray-300 rounded-md bg-white">
                <option value="default" selected>Predeterminado</option>
                <option value="blue">Azul</option>
                <option value="green">Verde</option>
                <option value="purple">Morado</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="compactMode">Modo compacto</Label>
              <input type="checkbox" id="compactMode" className="rounded border-gray-300" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="animations">Animaciones</Label>
              <input type="checkbox" id="animations" defaultChecked className="rounded border-gray-300" />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Configuración del Sistema</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex">
          {/* Sidebar con tabs */}
          <div className="w-48 mr-6 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-2 px-3 py-2 text-left text-sm rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
          
          {/* Contenido del tab activo */}
          <div className="flex-1">
            {renderTabContent()}
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button className="bg-gray-800 hover:bg-black">
            Guardar Configuración
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfigModal;
