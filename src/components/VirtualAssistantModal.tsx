
import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Bot, MessageSquare, Calendar, Phone, Clock, CheckCircle, AlertCircle, Mic, Send } from 'lucide-react';

interface VirtualAssistantModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  message: string;
  timestamp: Date;
  type?: 'text' | 'appointment' | 'reminder' | 'action';
  data?: any;
}

const VirtualAssistantModal = ({ open, onOpenChange }: VirtualAssistantModalProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'assistant',
      message: '¡Hola Dra. María! Soy tu asistente virtual. Puedo ayudarte a agendar citas, enviar recordatorios, buscar pacientes y más. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const automatedTasks = [
    {
      id: 1,
      title: 'Recordatorios de Citas',
      description: 'Enviados automáticamente 1 día antes',
      status: 'Activo',
      lastRun: '2024-11-15 08:00',
      nextRun: '2024-11-16 08:00'
    },
    {
      id: 2,
      title: 'Seguimiento Post-Consulta',
      description: 'Check-up automático 3 días después',
      status: 'Activo',
      lastRun: '2024-11-14 15:30',
      nextRun: '2024-11-17 15:30'
    },
    {
      id: 3,
      title: 'Alertas de Vacunación',
      description: 'Recordatorio 2 semanas antes del vencimiento',
      status: 'Pausado',
      lastRun: '2024-11-10 12:00',
      nextRun: 'Pausado'
    }
  ];

  const quickActions = [
    { label: 'Agendar nueva cita', action: 'schedule' },
    { label: 'Buscar paciente', action: 'search' },
    { label: 'Ver citas de hoy', action: 'today' },
    { label: 'Enviar recordatorio', action: 'reminder' },
    { label: 'Generar reporte', action: 'report' }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const processUserMessage = async (message: string) => {
    setIsProcessing(true);
    
    // Simular procesamiento de IA
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    let response: ChatMessage;
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('cita') || lowerMessage.includes('agendar')) {
      response = {
        id: Date.now().toString(),
        sender: 'assistant',
        message: 'Perfecto, puedo ayudarte a agendar una cita. ¿Para qué mascota y cuándo te gustaría programarla?',
        timestamp: new Date(),
        type: 'appointment',
        data: {
          suggestedDates: ['2024-11-16', '2024-11-17', '2024-11-18'],
          availableTimes: ['09:00', '10:30', '14:00', '16:30']
        }
      };
    } else if (lowerMessage.includes('buscar') || lowerMessage.includes('paciente')) {
      response = {
        id: Date.now().toString(),
        sender: 'assistant',
        message: 'Claro, ¿qué paciente estás buscando? Puedes decirme el nombre de la mascota o del propietario.',
        timestamp: new Date(),
        type: 'text'
      };
    } else if (lowerMessage.includes('hoy') || lowerMessage.includes('agenda')) {
      response = {
        id: Date.now().toString(),
        sender: 'assistant',
        message: 'Tienes 5 citas programadas para hoy:\n• 09:00 - Max (Juan Pérez) - Consulta general\n• 10:30 - Luna (María García) - Vacunación\n• 14:00 - Rocky (Carlos Mendoza) - Revisión\n• 15:30 - Mimi (Ana López) - Seguimiento\n• 17:00 - Toby (Pedro Silva) - Primera consulta',
        timestamp: new Date(),
        type: 'text'
      };
    } else if (lowerMessage.includes('recordatorio')) {
      response = {
        id: Date.now().toString(),
        sender: 'assistant',
        message: 'He enviado recordatorios automáticos a todos los pacientes con citas para mañana. ¿Te gustaría programar algún recordatorio específico?',
        timestamp: new Date(),
        type: 'reminder'
      };
    } else {
      response = {
        id: Date.now().toString(),
        sender: 'assistant',
        message: 'Entiendo tu solicitud. Puedo ayudarte con agendar citas, buscar pacientes, enviar recordatorios, generar reportes y más. ¿Podrías ser más específico sobre lo que necesitas?',
        timestamp: new Date(),
        type: 'text'
      };
    }
    
    setMessages(prev => [...prev, response]);
    setIsProcessing(false);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: inputMessage,
      timestamp: new Date(),
      type: 'text'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    
    await processUserMessage(inputMessage);
  };

  const handleQuickAction = async (action: string) => {
    const actionMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: quickActions.find(a => a.action === action)?.label || action,
      timestamp: new Date(),
      type: 'action'
    };
    
    setMessages(prev => [...prev, actionMessage]);
    await processUserMessage(action);
  };

  const startVoiceRecognition = () => {
    setIsListening(true);
    // Simular reconocimiento de voz
    setTimeout(() => {
      setIsListening(false);
      setInputMessage('Agendar nueva cita para Max');
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    return status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Bot className="w-5 h-5" />
            <span>Asistente Virtual IA</span>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Chat Interface */}
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4 h-96 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-gray-700 text-white'
                        : 'bg-white border border-gray-200'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.sender === 'assistant' && (
                        <Bot className="w-4 h-4 mt-0.5 text-gray-600" />
                      )}
                      <div>
                        <p className="text-sm whitespace-pre-line">{message.message}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>

                    {/* Datos específicos del tipo de mensaje */}
                    {message.type === 'appointment' && message.data && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs text-gray-600 mb-2">Horarios disponibles:</p>
                        <div className="flex flex-wrap gap-1">
                          {message.data.availableTimes.map((time: string) => (
                            <Badge key={time} variant="outline" className="text-xs">
                              {time}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isProcessing && (
                <div className="flex justify-start mb-4">
                  <div className="bg-white border border-gray-200 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4 text-gray-600" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="flex space-x-2">
              <div className="flex-1 relative">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Escribe tu mensaje o pregunta..."
                  className="pr-12"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={startVoiceRecognition}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${
                    isListening ? 'text-red-500' : 'text-gray-400'
                  }`}
                >
                  <Mic className="w-4 h-4" />
                </Button>
              </div>
              <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Acciones Rápidas:</p>
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action) => (
                  <Button
                    key={action.action}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickAction(action.action)}
                    className="text-xs"
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Automatization Panel */}
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-4">Tareas Automatizadas</h3>
              <div className="space-y-3">
                {automatedTasks.map((task) => (
                  <div key={task.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">{task.title}</h4>
                      <Badge className={getStatusColor(task.status)}>
                        {task.status === 'Activo' ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <AlertCircle className="w-3 h-3 mr-1" />
                        )}
                        {task.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">{task.description}</p>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-gray-500">Última ejecución:</p>
                        <p className="font-medium">{task.lastRun}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Próxima ejecución:</p>
                        <p className="font-medium">{task.nextRun}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3 text-blue-900">📊 Insights de IA</h3>
              <div className="space-y-2 text-sm text-blue-800">
                <p>• Pico de citas: Martes y Jueves 10-12h</p>
                <p>• Tasa de no-show reducida 15% con recordatorios</p>
                <p>• Consultas más comunes: Vacunación (35%)</p>
                <p>• Tiempo promedio por cita: 23 minutos</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Estadísticas Hoy</h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-gray-800">5</p>
                  <p className="text-xs text-gray-600">Citas Restantes</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">12</p>
                  <p className="text-xs text-gray-600">Tareas Completadas</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">3</p>
                  <p className="text-xs text-gray-600">Recordatorios Enviados</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-600">98%</p>
                  <p className="text-xs text-gray-600">Eficiencia IA</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
          <Button className="bg-gray-800 hover:bg-black">
            Configurar Automatizaciones
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VirtualAssistantModal;
