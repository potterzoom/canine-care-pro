
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileText, Upload } from 'lucide-react';

interface NewMedicalHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewMedicalHistoryModal = ({ open, onOpenChange }: NewMedicalHistoryModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Nueva Historia Clínica</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Información básica */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="petName">Nombre de la Mascota</Label>
              <Input id="petName" placeholder="Ej: Max" />
            </div>
            <div>
              <Label htmlFor="species">Especie</Label>
              <select id="species" className="w-full p-2 border border-gray-300 rounded-md bg-white">
                <option value="">Seleccionar...</option>
                <option value="perro">Perro</option>
                <option value="gato">Gato</option>
                <option value="ave">Ave</option>
                <option value="otro">Otro</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="breed">Raza</Label>
              <Input id="breed" placeholder="Ej: Golden Retriever" />
            </div>
            <div>
              <Label htmlFor="age">Edad</Label>
              <Input id="age" placeholder="Ej: 3 años" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="weight">Peso (kg)</Label>
              <Input id="weight" type="number" placeholder="Ej: 25" />
            </div>
            <div>
              <Label htmlFor="gender">Sexo</Label>
              <select id="gender" className="w-full p-2 border border-gray-300 rounded-md bg-white">
                <option value="">Seleccionar...</option>
                <option value="macho">Macho</option>
                <option value="hembra">Hembra</option>
              </select>
            </div>
          </div>

          {/* Información del dueño */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <h3 className="font-semibold">Información del Dueño</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ownerName">Nombre Completo</Label>
                <Input id="ownerName" placeholder="Ej: Juan Pérez" />
              </div>
              <div>
                <Label htmlFor="ownerPhone">Teléfono</Label>
                <Input id="ownerPhone" placeholder="Ej: 0999123456" />
              </div>
            </div>
            <div>
              <Label htmlFor="ownerEmail">Email</Label>
              <Input id="ownerEmail" type="email" placeholder="Ej: juan@email.com" />
            </div>
            <div>
              <Label htmlFor="ownerAddress">Dirección</Label>
              <Input id="ownerAddress" placeholder="Ej: Av. Principal 123" />
            </div>
          </div>

          {/* Información médica */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="allergies">Alergias Conocidas</Label>
              <textarea 
                id="allergies" 
                className="w-full p-2 border border-gray-300 rounded-md bg-white" 
                rows={2}
                placeholder="Describir alergias si las tiene..."
              />
            </div>
            
            <div>
              <Label htmlFor="medicalHistory">Historial Médico Previo</Label>
              <textarea 
                id="medicalHistory" 
                className="w-full p-2 border border-gray-300 rounded-md bg-white" 
                rows={3}
                placeholder="Cirugías, enfermedades previas, tratamientos..."
              />
            </div>

            <div>
              <Label htmlFor="currentMedication">Medicación Actual</Label>
              <textarea 
                id="currentMedication" 
                className="w-full p-2 border border-gray-300 rounded-md bg-white" 
                rows={2}
                placeholder="Medicamentos que está tomando actualmente..."
              />
            </div>
          </div>

          {/* Subir archivos */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
            <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-600 mb-2">Subir documentos o imágenes</p>
            <Button variant="outline" size="sm">
              Seleccionar Archivos
            </Button>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button className="bg-gray-800 hover:bg-black">
            Crear Historia Clínica
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewMedicalHistoryModal;
