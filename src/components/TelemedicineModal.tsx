
import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Video, Phone, MessageSquare, Calendar, Clock, Activity, Heart, Thermometer, Wifi } from 'lucide-react';

interface TelemedicineModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TelemedicineModal = ({ open, onOpenChange }: TelemedicineModalProps) => {
  const [activeTab, setActiveTab] = useState<'consultas' | 'video' | 'monitoreo'>('consultas');
  const [isVideoActive, setIsVideoActive] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const scheduledCalls = [
    {
      time: "14:00",
      client: "Juan Pérez",
      pet: "Max",
      type: "Seguimiento post-cirugía",
      status: "programada"
    },
    {
      time: "16:30",
      client: "María García",
      pet: "Luna",
      type: "Consulta de comportamiento",
      status: "en-curso"
    }
  ];

  const iotDevices = [
    {
      petName: "Max",
      deviceType: "Collar Inteligente",
      status: "Conectado",
      heartRate: 95,
      temperature: 38.2,
      activity: 85,
      lastUpdate: "Hace 2 min"
    },
    {
      petName: "Luna",
      deviceType: "Cama Sensorial",
      status: "Conectado",
      heartRate: 88,
      temperature: 37.9,
      activity: 62,
      lastUpdate: "Hace 1 min"
    }
  ];

  const startVideoCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      setIsVideoActive(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const endVideoCall = () => {
    if (localVideoRef.current?.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setIsVideoActive(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en-curso':
        return 'bg-green-100 text-green-800';
      case 'programada':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getDeviceStatusColor = (status: string) => {
    return status === 'Conectado' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getVitalColor = (type: string, value: number) => {
    if (type === 'heartRate') {
      return value > 100 ? 'text-red-600' : value > 80 ? 'text-yellow-600' : 'text-green-600';
    }
    if (type === 'temperature') {
      return value > 39 ? 'text-red-600' : value > 38.5 ? 'text-yellow-600' : 'text-green-600';
    }
    return 'text-blue-600';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Video className="w-5 h-5" />
            <span>Telemedicina Avanzada</span>
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="consultas">Consultas</TabsTrigger>
            <TabsTrigger value="video">Video Llamadas</TabsTrigger>
            <TabsTrigger value="monitoreo">Monitoreo IoT</TabsTrigger>
          </TabsList>

          <TabsContent value="consultas" className="space-y-6">
            {/* Acciones rápidas */}
            <div className="grid grid-cols-2 gap-4">
              <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-gray-700 hover:bg-gray-800" onClick={startVideoCall}>
                <Video className="w-6 h-6" />
                <span>Iniciar Videollamada</span>
              </Button>
              <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-gray-800 hover:bg-black">
                <Calendar className="w-6 h-6" />
                <span>Programar Consulta</span>
              </Button>
            </div>

            {/* Consultas programadas */}
            <div className="space-y-4">
              <h3 className="font-semibold">Consultas de Hoy</h3>
              <div className="space-y-3">
                {scheduledCalls.map((call, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <p className="font-medium">{call.time}</p>
                          <Badge className={getStatusColor(call.status)}>
                            {call.status === 'en-curso' ? 'En Curso' : 'Programada'}
                          </Badge>
                        </div>
                        <p className="text-sm">
                          <strong>{call.client}</strong> - {call.pet}
                        </p>
                        <p className="text-sm text-gray-600">{call.type}</p>
                      </div>
                      <div className="flex space-x-2">
                        {call.status === 'en-curso' ? (
                          <Button size="sm" className="bg-gray-700 hover:bg-gray-800" onClick={() => setActiveTab('video')}>
                            <Video className="w-4 h-4 mr-1" />
                            Unirse
                          </Button>
                        ) : (
                          <>
                            <Button variant="outline" size="sm">
                              <Phone className="w-4 h-4 mr-1" />
                              Llamar
                            </Button>
                            <Button variant="outline" size="sm">
                              <MessageSquare className="w-4 h-4 mr-1" />
                              Chat
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Programar nueva consulta */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              <h3 className="font-semibold">Programar Nueva Teleconsulta</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="clientSelect">Cliente</Label>
                  <select id="clientSelect" className="w-full p-2 border border-gray-300 rounded-md bg-white">
                    <option value="">Seleccionar cliente...</option>
                    <option value="juan">Juan Pérez</option>
                    <option value="maria">María García</option>
                    <option value="carlos">Carlos Mendoza</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="consultType">Tipo de Consulta</Label>
                  <select id="consultType" className="w-full p-2 border border-gray-300 rounded-md bg-white">
                    <option value="">Seleccionar...</option>
                    <option value="seguimiento">Seguimiento</option>
                    <option value="comportamiento">Comportamiento</option>
                    <option value="nutricion">Nutrición</option>
                    <option value="general">Consulta General</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="consultDate">Fecha</Label>
                  <Input id="consultDate" type="date" />
                </div>
                <div>
                  <Label htmlFor="consultTime">Hora</Label>
                  <Input id="consultTime" type="time" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="consultNotes">Motivo de la Consulta</Label>
                <textarea 
                  id="consultNotes" 
                  className="w-full p-2 border border-gray-300 rounded-md bg-white" 
                  rows={3}
                  placeholder="Describir el motivo de la teleconsulta..."
                />
              </div>
              
              <Button className="w-full bg-gray-800 hover:bg-black">
                Programar Teleconsulta
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="video" className="space-y-6">
            <div className="bg-black rounded-lg overflow-hidden">
              <div className="grid grid-cols-2 gap-4 p-4">
                {/* Video Local */}
                <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
                  <video
                    ref={localVideoRef}
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                    Tú (Dra. María)
                  </div>
                </div>

                {/* Video Remoto */}
                <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
                  <video
                    ref={remoteVideoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                    Juan Pérez
                  </div>
                  {!isVideoActive && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                      <div className="text-center text-white">
                        <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>En espera de conexión...</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Controles de Video */}
              <div className="flex justify-center space-x-4 p-4">
                {!isVideoActive ? (
                  <Button onClick={startVideoCall} className="bg-green-600 hover:bg-green-700">
                    <Video className="w-4 h-4 mr-2" />
                    Iniciar Video
                  </Button>
                ) : (
                  <>
                    <Button onClick={endVideoCall} className="bg-red-600 hover:bg-red-700">
                      Finalizar Llamada
                    </Button>
                    <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Chat
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Información de la Consulta Actual */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-4">Información de la Consulta</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Cliente</p>
                  <p className="font-medium">Juan Pérez</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Mascota</p>
                  <p className="font-medium">Max - Golden Retriever</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tipo de Consulta</p>
                  <p className="font-medium">Seguimiento post-cirugía</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Duración</p>
                  <p className="font-medium">15:23 min</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="monitoreo" className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Dispositivos IoT Conectados</h3>
              
              {iotDevices.map((device, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-medium text-lg">{device.petName}</h4>
                      <p className="text-sm text-gray-600">{device.deviceType}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={getDeviceStatusColor(device.status)}>
                        <Wifi className="w-3 h-3 mr-1" />
                        {device.status}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">{device.lastUpdate}</p>
                    </div>
                  </div>

                  {/* Métricas Vitales */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Heart className={`w-6 h-6 mx-auto mb-2 ${getVitalColor('heartRate', device.heartRate)}`} />
                      <p className={`text-lg font-semibold ${getVitalColor('heartRate', device.heartRate)}`}>
                        {device.heartRate}
                      </p>
                      <p className="text-xs text-gray-600">BPM</p>
                    </div>
                    
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Thermometer className={`w-6 h-6 mx-auto mb-2 ${getVitalColor('temperature', device.temperature)}`} />
                      <p className={`text-lg font-semibold ${getVitalColor('temperature', device.temperature)}`}>
                        {device.temperature}°C
                      </p>
                      <p className="text-xs text-gray-600">Temperatura</p>
                    </div>
                    
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Activity className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                      <p className="text-lg font-semibold text-blue-600">
                        {device.activity}%
                      </p>
                      <p className="text-xs text-gray-600">Actividad</p>
                    </div>
                  </div>

                  {/* Alertas */}
                  {device.heartRate > 100 && (
                    <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 rounded">
                      <p className="text-sm text-red-800">
                        ⚠️ Frecuencia cardíaca elevada - Monitorear de cerca
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Configuración de Alertas IoT */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-4">Configuración de Alertas</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Frecuencia Cardíaca Alta</p>
                    <p className="text-sm text-gray-600">Alertar cuando &gt; 110 BPM</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Temperatura Elevada</p>
                    <p className="text-sm text-gray-600">Alertar cuando &gt; 39°C</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Baja Actividad</p>
                    <p className="text-sm text-gray-600">Alertar cuando &lt; 30%</p>
                  </div>
                  <input type="checkbox" className="rounded border-gray-300" />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Estadísticas */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-4">Estadísticas del Mes</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">34</p>
              <p className="text-sm text-gray-600">Teleconsultas</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-700">97%</p>
              <p className="text-sm text-gray-600">Satisfacción</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-600">42min</p>
              <p className="text-sm text-gray-600">Duración Prom.</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
          <Button className="bg-gray-800 hover:bg-black">
            Ver Historial Completo
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TelemedicineModal;
