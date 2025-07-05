
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Phone, MessageSquare, User } from 'lucide-react';

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contactName?: string;
  contactPhone?: string;
}

const ContactModal = ({ open, onOpenChange, contactName = "Juan Pérez", contactPhone = "0999123456" }: ContactModalProps) => {
  const handleCall = () => {
    window.open(`tel:${contactPhone}`, '_self');
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hola ${contactName}, me comunico desde VetSoft respecto a su mascota.`);
    window.open(`https://wa.me/${contactPhone.replace(/\D/g, '')}?text=${message}`, '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Phone className="w-5 h-5" />
            <span>Contactar Cliente</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
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
          <div className="space-y-3">
            <Button 
              onClick={handleCall} 
              className="w-full flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-800"
            >
              <Phone className="w-4 h-4" />
              <span>Llamar Ahora</span>
            </Button>
            
            <Button 
              onClick={handleWhatsApp}
              className="w-full flex items-center justify-center space-x-2 bg-gray-800 hover:bg-black"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Enviar WhatsApp</span>
            </Button>
          </div>

          {/* Mensaje personalizado */}
          <div className="space-y-2">
            <Label htmlFor="customMessage">Mensaje Personalizado</Label>
            <textarea 
              id="customMessage"
              className="w-full p-2 border border-gray-300 rounded-md bg-white" 
              rows={3}
              placeholder="Escribir mensaje personalizado..."
              defaultValue={`Hola ${contactName}, me comunico desde VetSoft respecto a su mascota.`}
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
          <Button className="bg-gray-800 hover:bg-black">
            Enviar Mensaje
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
