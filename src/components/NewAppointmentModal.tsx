
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, Upload, FileText, Image, X } from 'lucide-react';

interface NewAppointmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewAppointmentModal = ({ open, onOpenChange }: NewAppointmentModalProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const consultationTypes = [
    { value: 'general', label: 'Consulta General' },
    { value: 'vaccination', label: 'Vacunación' },
    { value: 'surgery', label: 'Cirugía' },
    { value: 'emergency', label: 'Emergencia' },
    { value: 'specialized', label: 'Consulta Especializada' },
    { value: 'imaging', label: 'Diagnóstico por Imágenes' },
    { value: 'laboratory', label: 'Análisis de Laboratorio' },
    { value: 'telemedicine', label: 'Teleconsulta' },
    { value: 'deworming', label: 'Desparasitación' },
    { value: 'dental', label: 'Tratamiento Odontológico' },
    { value: 'preventive', label: 'Medicina Preventiva' },
    { value: 'grooming', label: 'Peluquería y Estética' },
    { value: 'hospitalization', label: 'Hospedaje Temporal' },
    { value: 'followup', label: 'Seguimiento Post-Tratamiento' },
    { value: 'behavior', label: 'Consulta de Comportamiento' },
    { value: 'nutrition', label: 'Consulta Nutricional' }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files).filter(file => {
        const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
        return validTypes.includes(file.type) && file.size <= 10 * 1024 * 1024; // 10MB limit
      });
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (file: File) => {
    if (file.type === 'application/pdf') {
      return <FileText className="w-4 h-4 text-red-500" />;
    }
    return <Image className="w-4 h-4 text-blue-500" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Nueva Cita</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Fecha</Label>
              <Input id="date" type="date" />
            </div>
            <div>
              <Label htmlFor="time">Hora</Label>
              <Input id="time" type="time" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="petName">Nombre de la Mascota</Label>
              <Input id="petName" placeholder="Ej: Max" />
            </div>
            <div>
              <Label htmlFor="species">Especie</Label>
              <select id="species" className="w-full p-2 border border-gray-300 rounded-md bg-white">
                <option value="">Seleccionar...</option>
                <option value="dog">Perro</option>
                <option value="cat">Gato</option>
                <option value="bird">Ave</option>
                <option value="rabbit">Conejo</option>
                <option value="hamster">Hámster</option>
                <option value="other">Otro</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="ownerName">Nombre del Dueño</Label>
              <Input id="ownerName" placeholder="Ej: Juan Pérez" />
            </div>
            <div>
              <Label htmlFor="ownerPhone">Teléfono</Label>
              <Input id="ownerPhone" placeholder="Ej: 0999123456" />
            </div>
          </div>
          
          <div>
            <Label htmlFor="ownerEmail">Email del Dueño</Label>
            <Input id="ownerEmail" type="email" placeholder="Ej: juan@email.com" />
          </div>
          
          <div>
            <Label htmlFor="appointmentType">Tipo de Consulta</Label>
            <select id="appointmentType" className="w-full p-2 border border-gray-300 rounded-md bg-white">
              <option value="">Seleccionar...</option>
              {consultationTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <Label htmlFor="reason">Motivo de la Consulta</Label>
            <textarea 
              id="reason" 
              className="w-full p-2 border border-gray-300 rounded-md bg-white" 
              rows={3}
              placeholder="Describir síntomas o motivo de la consulta..."
            />
          </div>

          {/* File Upload Section */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <Label htmlFor="fileUpload" className="cursor-pointer">
                <span className="text-sm font-medium text-gray-700 hover:text-gray-900">
                  Subir Documentos Médicos
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  PDFs, JPG, PNG (máx. 10MB cada uno)
                </p>
                <p className="text-xs text-gray-500">
                  Exámenes, radiografías, historiales médicos, etc.
                </p>
              </Label>
              <Input
                id="fileUpload"
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                className="mt-3"
                onClick={() => document.getElementById('fileUpload')?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                Seleccionar Archivos
              </Button>
            </div>

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Archivos Adjuntos:</h4>
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-white p-3 rounded-md border">
                    <div className="flex items-center space-x-3">
                      {getFileIcon(file)}
                      <div>
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div>
            <Label htmlFor="notes">Notas Adicionales</Label>
            <textarea 
              id="notes" 
              className="w-full p-2 border border-gray-300 rounded-md bg-white" 
              rows={2}
              placeholder="Observaciones adicionales..."
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="urgent" className="rounded border-gray-300" />
              <Label htmlFor="urgent">Marcar como urgente</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="reminder" className="rounded border-gray-300" />
              <Label htmlFor="reminder">Enviar recordatorio</Label>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="newClient" className="rounded border-gray-300" />
            <Label htmlFor="newClient">Cliente nuevo (crear perfil)</Label>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button className="bg-gray-800 hover:bg-black">
            Agendar Cita
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewAppointmentModal;
