
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, User, Phone } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  phone: string;
  petName: string;
  petSpecies: string;
}

interface ClientSearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClientSelect: (client: Client) => void;
  title: string;
}

const ClientSearchModal = ({ open, onOpenChange, onClientSelect, title }: ClientSearchModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Datos de ejemplo de clientes
  const clients: Client[] = [
    { id: '1', name: 'Juan Pérez', phone: '0999123456', petName: 'Max', petSpecies: 'Perro' },
    { id: '2', name: 'María García', phone: '0987654321', petName: 'Luna', petSpecies: 'Gato' },
    { id: '3', name: 'Carlos Mendoza', phone: '0998765432', petName: 'Rocky', petSpecies: 'Perro' },
    { id: '4', name: 'Ana López', phone: '0976543210', petName: 'Buddy', petSpecies: 'Perro' },
    { id: '5', name: 'Pedro Silva', phone: '0965432109', petName: 'Whiskers', petSpecies: 'Gato' },
    { id: '6', name: 'Laura Rodríguez', phone: '0954321098', petName: 'Bella', petSpecies: 'Perro' },
  ];

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );

  const handleSelectClient = (client: Client) => {
    onClientSelect(client);
    onOpenChange(false);
    setSearchTerm('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Search className="w-5 h-5" />
            <span>{title}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Buscador */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Buscar por nombre, mascota o teléfono..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Lista de clientes */}
          <div className="max-h-60 overflow-y-auto space-y-2">
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <div
                  key={client.id}
                  onClick={() => handleSelectClient(client)}
                  className="p-3 border rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <User className="w-8 h-8 bg-green-100 text-green-600 rounded-full p-2" />
                    <div className="flex-1">
                      <p className="font-medium">{client.name}</p>
                      <p className="text-sm text-slate-600">
                        {client.petName} • {client.petSpecies}
                      </p>
                      <p className="text-sm text-slate-500 flex items-center space-x-1">
                        <Phone className="w-3 h-3" />
                        <span>{client.phone}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-500">
                <Search className="w-12 h-12 mx-auto mb-2 text-slate-400" />
                <p>No se encontraron clientes</p>
                <p className="text-sm">Intenta con otro término de búsqueda</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClientSearchModal;
