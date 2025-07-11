
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { User, Clock, FileText } from 'lucide-react';

interface PatientsAttendedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PatientsAttendedModal = ({ open, onOpenChange }: PatientsAttendedModalProps) => {
  const attendedPatients = [
    {
      time: "08:30",
      petName: "Max",
      ownerName: "Juan Pérez",
      service: "Consulta General",
      status: "Completado",
      notes: "Control rutinario, estado excelente"
    },
    {
      time: "09:15",
      petName: "Luna",
      ownerName: "María García",
      service: "Vacunación",
      status: "Completado",
      notes: "Vacuna antirrábica aplicada"
    },
    {
      time: "10:00",
      petName: "Rocky",
      ownerName: "Carlos Mendoza",
      service: "Desparasitación",
      status: "Completado",
      notes: "Tratamiento completo administrado"
    },
    {
      time: "10:45",
      petName: "Bella",
      ownerName: "Ana López",
      service: "Cirugía Menor",
      status: "Completado",
      notes: "Esterilización exitosa"
    },
    {
      time: "11:30",
      petName: "Thor",
      ownerName: "Pedro Silva",
      service: "Consulta General",
      status: "Completado",
      notes: "Tratamiento dermatológico"
    },
    {
      time: "12:15",
      petName: "Mimi",
      ownerName: "Laura Castillo",
      service: "Control Dental",
      status: "Completado",
      notes: "Limpieza dental realizada"
    },
    {
      time: "14:00",
      petName: "Simba",
      ownerName: "Roberto Vega",
      service: "Radiografía",
      status: "Completado",
      notes: "Fractura sanando correctamente"
    },
    {
      time: "14:45",
      petName: "Coco",
      ownerName: "Isabel Moreno",
      service: "Consulta General",
      status: "Completado",
      notes: "Chequeo post-operatorio"
    },
    {
      time: "15:30",
      petName: "Nala",
      ownerName: "Miguel Torres",
      service: "Vacunación",
      status: "Completado",
      notes: "Refuerzo de vacunas"
    },
    {
      time: "16:15",
      petName: "Buddy",
      ownerName: "Carmen Ruiz",
      service: "Emergencia",
      status: "Completado",
      notes: "Intoxicación alimentaria tratada"
    }
  ];

  const getStatusColor = (status: string) => {
    return "bg-green-100 text-green-800";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Pacientes Atendidos Hoy - {new Date().toLocaleDateString('es-ES')}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Total: <span className="font-semibold text-gray-900">{attendedPatients.length} pacientes</span>
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Hora</TableHead>
                <TableHead>Mascota</TableHead>
                <TableHead>Propietario</TableHead>
                <TableHead>Servicio</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Observaciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendedPatients.map((patient, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span>{patient.time}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{patient.petName}</TableCell>
                  <TableCell>{patient.ownerName}</TableCell>
                  <TableCell>{patient.service}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(patient.status)}>
                      {patient.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600 max-w-xs">
                    {patient.notes}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PatientsAttendedModal;
