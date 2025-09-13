
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone, MessageSquare, User, Send, Bot, AlertTriangle, ShoppingCart, Clock, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contactName?: string;
  contactPhone?: string;
}

interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
  priority?: 'urgent' | 'normal' | 'info';
}

const ContactModal = ({ open, onOpenChange, contactName = "Juan Pérez", contactPhone = "0999123456" }: ContactModalProps) => {
  const { toast } = useToast();
  const [customMessage, setCustomMessage] = useState(`Hola ${contactName}, me comunico desde VetSoft respecto a su mascota.`);
  const [aiMessage, setAiMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      content: '¡Hola Dra. María! Soy tu asistente de IA. Te ayudo a monitorear alertas urgentes, compras necesarias y el estado general de la clínica. ¿En qué puedo ayudarte?',
      timestamp: '10:30',
      priority: 'info'
    },
    {
      id: 2,
      type: 'ai',
      content: '⚠️ ALERTA URGENTE: Stock crítico de Amoxicilina 500mg (solo 5 unidades). Se recomienda realizar pedido inmediato.',
      timestamp: '10:32',
      priority: 'urgent'
    },
    {
      id: 3,
      type: 'ai',
      content: '🛒 COMPRA RECOMENDADA: Vacuna Antirrábica está por debajo del stock mínimo (12 unidades vs 25 mínimo). Considera realizar pedido.',
      timestamp: '10:35',
      priority: 'normal'
    }
  ]);

  const handleCall = () => {
    window.open(`tel:${contactPhone}`, '_self');
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(customMessage);
    window.open(`https://wa.me/${contactPhone.replace(/\D/g, '')}?text=${message}`, '_blank');
  };

  const sendAIMessage = () => {
    if (!aiMessage.trim()) return;

    const newUserMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: aiMessage,
      timestamp: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMessage]);

    // Simular respuesta de IA
    setTimeout(() => {
      const aiResponse = generateAIResponse(aiMessage);
      const newAIMessage: Message = {
        id: messages.length + 2,
        type: 'ai',
        content: aiResponse.content,
        timestamp: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        priority: aiResponse.priority
      };
      setMessages(prev => [...prev, newAIMessage]);
    }, 1000);

    setAiMessage('');
    
    toast({
      title: "Mensaje enviado",
      description: "La IA está procesando tu consulta...",
    });
  };

  const generateAIResponse = (userMessage: string): { content: string; priority: 'urgent' | 'normal' | 'info' } => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('stock') || msg.includes('inventario')) {
      return {
        content: '📊 REPORTE DE STOCK:\n\n🔴 CRÍTICO:\n- Amoxicilina 500mg: 5 unidades\n- Jeringas 5ml: 45 unidades\n\n🟡 BAJO:\n- Vacuna Antirrábica: 12 unidades\n- Meloxicam 15mg: 8 unidades\n\n¿Necesitas que genere una orden de compra?',
        priority: 'urgent'
      };
    }
    
    if (msg.includes('urgente') || msg.includes('emergencia')) {
      return {
        content: '🚨 ALERTAS URGENTES ACTIVAS:\n\n1. Stock crítico de medicamentos esenciales\n2. Luna (gato) - Vacuna vencida, requiere atención\n3. Cita de cirugía en 30 minutos - Max\n\n¿Qué situación requiere atención inmediata?',
        priority: 'urgent'
      };
    }
    
    if (msg.includes('compra') || msg.includes('pedido')) {
      return {
        content: '🛒 LISTA DE COMPRAS RECOMENDADA:\n\n💊 FARMACIA:\n- Amoxicilina 500mg (50 unidades)\n- Meloxicam 15mg (25 unidades)\n\n💉 VACUNAS:\n- Vacuna Antirrábica (30 dosis)\n- Vacuna Múltiple Canina (25 dosis)\n\n🧰 MATERIAL:\n- Jeringas 5ml (200 unidades)\n\nTotal estimado: $1,250. ¿Confirmo el pedido?',
        priority: 'normal'
      };
    }
    
    if (msg.includes('citas') || msg.includes('agenda')) {
      return {
        content: '📅 RESUMEN DE CITAS HOY:\n\n✅ Completadas: 15\n⏳ Pendientes: 8\n🔴 Urgentes: 2\n\nPróxima cita: 14:00 - Rocky (Cirugía Menor)\n\n¿Necesitas modificar alguna cita?',
        priority: 'info'
      };
    }
    
    return {
      content: 'Entendido. Te ayudo a monitorear la clínica. Puedes consultarme sobre:\n\n📊 Estado del stock\n🚨 Alertas urgentes\n🛒 Recomendaciones de compra\n📅 Estado de citas\n💰 Reportes financieros\n\n¿Qué información necesitas?',
      priority: 'info'
    };
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'normal':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'info':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityIcon = (priority?: string) => {
    switch (priority) {
      case 'urgent':
        return <AlertTriangle className="w-4 h-4" />;
      case 'normal':
        return <ShoppingCart className="w-4 h-4" />;
      case 'info':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5" />
            <span>Centro de Comunicación</span>
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="contact" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="contact">Contactar Cliente</TabsTrigger>
            <TabsTrigger value="ai">Asistente IA</TabsTrigger>
          </TabsList>
          
          <TabsContent value="contact" className="space-y-6">
            {/* Información del contacto */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <User className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full p-2" />
                <div>
                  <p className="font-medium">{contactName}</p>
                  <p className="text-sm text-gray-600">{contactPhone}</p>
                </div>
              </div>
            </div>

            {/* Opciones de contacto */}
            <div className="grid grid-cols-2 gap-3">
              <Button 
                onClick={handleCall} 
                className="flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-800"
              >
                <Phone className="w-4 h-4" />
                <span>Llamar Ahora</span>
              </Button>
              
              <Button 
                onClick={handleWhatsApp}
                className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Enviar WhatsApp</span>
              </Button>
            </div>

            {/* Mensaje personalizado */}
            <div className="space-y-2">
              <Label htmlFor="customMessage">Mensaje Personalizado</Label>
              <Textarea 
                id="customMessage"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                rows={4}
                placeholder="Escribir mensaje personalizado..."
              />
            </div>
          </TabsContent>
          
          <TabsContent value="ai" className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <Bot className="w-3 h-3 mr-1" />
                IA En línea
              </Badge>
            </div>

            {/* Chat Container */}
            <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-gray-50 rounded-lg h-[400px]">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    msg.type === 'user' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-white border border-gray-200 shadow-sm'
                  }`}>
                    {msg.type === 'ai' && msg.priority && (
                      <div className="flex items-center space-x-1 mb-2">
                        {getPriorityIcon(msg.priority)}
                        <Badge className={getPriorityColor(msg.priority)}>
                          {msg.priority === 'urgent' ? 'Urgente' : 
                           msg.priority === 'normal' ? 'Normal' : 'Info'}
                        </Badge>
                      </div>
                    )}
                    <div className="whitespace-pre-line text-sm">
                      {msg.content}
                    </div>
                    <div className={`text-xs mt-2 ${
                      msg.type === 'user' ? 'text-green-100' : 'text-gray-500'
                    }`}>
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="flex space-x-2">
              <Textarea
                value={aiMessage}
                onChange={(e) => setAiMessage(e.target.value)}
                placeholder="Escribe tu mensaje... (ej: 'estado del stock', 'alertas urgentes', 'compras necesarias')"
                className="flex-1 min-h-[60px] resize-none"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendAIMessage();
                  }
                }}
              />
              <Button 
                onClick={sendAIMessage}
                disabled={!aiMessage.trim()}
                className="bg-green-600 hover:bg-green-700 self-end"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setAiMessage('¿Cuál es el estado actual del stock?')}
              >
                📊 Estado Stock
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setAiMessage('¿Hay alertas urgentes?')}
              >
                🚨 Alertas
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setAiMessage('¿Qué necesito comprar?')}
              >
                🛒 Compras
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setAiMessage('Resumen de citas de hoy')}
              >
                📅 Citas
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
