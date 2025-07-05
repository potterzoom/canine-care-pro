
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { User, Calendar, FileText } from 'lucide-react';

interface PatientHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patientName?: string;
}

const PatientHistoryModal = ({ open, onOpenChange, patientName = "Max" }: PatientHistoryModalProps) => {
  const historyEntries = [
    {
      date: '2024-11-15',
      type: 'Consulta General',
      doctor: 'Dra. María González',
      diagnosis: 'Revisión rutinaria - Estado saludable',
      treatment: 'Ninguno requerido',
      notes: 'Peso: 25kg. Vacunas al día.'
    },
    {
      date: '2024-10-20',
      type: 'Vacunación',
      doctor: 'Dr. Carlos Mendoza',
      diagnosis: 'Vacuna antirrábica',
      treatment: 'Vacuna aplicada',
      notes: 'Próxima dosis: 20 Oct 2025'
    },
    {
      date: '2024-09-10',
      type: 'Emergencia',
      doctor: 'Dra. María González',
      diagnosis: 'Gastroenteritis leve',
      treatment: 'Antibióticos y dieta blanda',
      notes: 'Recuperación completa en 5 días'
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Historia Clínica - {patientName}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Información del paciente */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Información del Paciente</span>
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><strong>Nombre:</strong> {patientName}</div>
              <div><strong>Especie:</strong> Perro</div>
              <div><strong>Raza:</strong> Golden Retriever</div>
              <div><strong>Edad:</strong> 3 años</div>
              <div><strong>Peso:</strong> 25 kg</div>
              <div><strong>Dueño:</strong> Juan Pérez</div>
            </div>
          </div>

          {/* Historial de consultas */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Historial de Consultas</span>
            </h3>
            
            {historyEntries.map((entry, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="font-medium text-gray-700">{entry.type}</div>
                    <div className="text-sm text-gray-600">{entry.date} • {entry.doctor}</div>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Diagnóstico:</strong> {entry.diagnosis}
                  </div>
                  <div>
                    <strong>Tratamiento:</strong> {entry.treatment}
                  </div>
                  <div>
                    <strong>Notas:</strong> {entry.notes}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
          <Button className="bg-gray-800 hover:bg-black">
            Imprimir Historia
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PatientHistoryModal;
