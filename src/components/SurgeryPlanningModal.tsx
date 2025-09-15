import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, Scissors, Clock, User, AlertTriangle, FileText, Plus, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface SurgeryPlanningModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface SurgeryAppointment {
  id: string;
  patientName: string;
  ownerName: string;
  surgeryType: string;
  date: Date;
  time: string;
  status: 'programada' | 'confirmada' | 'en_proceso' | 'completada' | 'cancelada';
  priority: 'baja' | 'media' | 'alta' | 'urgente';
  estimatedDuration: string;
  preOpNotes: string;
}

const SurgeryPlanningModal = ({ open, onOpenChange }: SurgeryPlanningModalProps) => {
  const [activeTab, setActiveTab] = useState<'planning' | 'scheduled' | 'control'>('planning');
  
  // Estados para nueva cirugía
  const [newSurgery, setNewSurgery] = useState({
    patientName: '',
    ownerName: '',
    ownerPhone: '',
    surgeryType: '',
    date: undefined as Date | undefined,
    time: '',
    estimatedDuration: '',
    priority: 'media' as 'baja' | 'media' | 'alta' | 'urgente',
    preOpNotes: '',
    postOpInstructions: '',
    anesthesiaType: '',
    materials: [] as string[],
    assistants: [] as string[]
  });

  const [newMaterial, setNewMaterial] = useState('');
  const [newAssistant, setNewAssistant] = useState('');

  // Cirugías programadas (mock data)
  const [scheduledSurgeries] = useState<SurgeryAppointment[]>([
    {
      id: '1',
      patientName: 'Max',
      ownerName: 'Juan Pérez',
      surgeryType: 'Castración',
      date: new Date(2024, 11, 20),
      time: '09:00',
      status: 'confirmada',
      priority: 'media',
      estimatedDuration: '45 min',
      preOpNotes: 'Paciente en ayunas 12h. Sin medicamentos previos.'
    },
    {
      id: '2',
      patientName: 'Luna',
      ownerName: 'María García',
      surgeryType: 'Cirugía de hernia umbilical',
      date: new Date(2024, 11, 21),
      time: '10:30',
      status: 'programada',
      priority: 'alta',
      estimatedDuration: '90 min',
      preOpNotes: 'Hernía de tamaño mediano. Revisar análisis pre-quirúrgicos.'
    }
  ]);

  const surgeryTypes = [
    'Castración/Esterilización',
    'Cirugía de hernia',
    'Extracción dental',
    'Remoción de tumores',
    'Cirugía ortopédica',
    'Cirugía de emergencia',
    'Cesárea',
    'Cirugía abdominal',
    'Cirugía ocular',
    'Otra (especificar)'
  ];

  const anesthesiaTypes = [
    'Anestesia general inhalatoria',
    'Anestesia general inyectable',
    'Sedación + anestesia local',
    'Anestesia local únicamente'
  ];

  const commonMaterials = [
    'Suturas absorbibles',
    'Suturas no absorbibles',
    'Gasas estériles',
    'Antiséptico',
    'Antibiótico profiláctico',
    'Analgésicos',
    'Vendajes',
    'Equipo de intubación'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'programada': return 'bg-blue-100 text-blue-800';
      case 'confirmada': return 'bg-green-100 text-green-800';
      case 'en_proceso': return 'bg-yellow-100 text-yellow-800';
      case 'completada': return 'bg-gray-100 text-gray-800';
      case 'cancelada': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'baja': return 'bg-green-100 text-green-800';
      case 'media': return 'bg-blue-100 text-blue-800';
      case 'alta': return 'bg-orange-100 text-orange-800';
      case 'urgente': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const addMaterial = () => {
    if (newMaterial.trim() && !newSurgery.materials.includes(newMaterial.trim())) {
      setNewSurgery({
        ...newSurgery,
        materials: [...newSurgery.materials, newMaterial.trim()]
      });
      setNewMaterial('');
    }
  };

  const removeMaterial = (material: string) => {
    setNewSurgery({
      ...newSurgery,
      materials: newSurgery.materials.filter(m => m !== material)
    });
  };

  const addAssistant = () => {
    if (newAssistant.trim() && !newSurgery.assistants.includes(newAssistant.trim())) {
      setNewSurgery({
        ...newSurgery,
        assistants: [...newSurgery.assistants, newAssistant.trim()]
      });
      setNewAssistant('');
    }
  };

  const removeAssistant = (assistant: string) => {
    setNewSurgery({
      ...newSurgery,
      assistants: newSurgery.assistants.filter(a => a !== assistant)
    });
  };

  const scheduleSurgery = () => {
    console.log('Programando cirugía:', newSurgery);
    // Aquí se procesaría la programación
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Scissors className="w-5 h-5" />
            Planificación y Control de Cirugías
          </DialogTitle>
        </DialogHeader>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('planning')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'planning'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Nueva Cirugía
          </button>
          <button
            onClick={() => setActiveTab('scheduled')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'scheduled'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Cirugías Programadas
          </button>
          <button
            onClick={() => setActiveTab('control')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'control'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Control Post-Operatorio
          </button>
        </div>

        {/* Content */}
        <div className="mt-4">
          {activeTab === 'planning' && (
            <div className="space-y-6">
              {/* Datos del Paciente */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Datos del Paciente
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="patient-name">Nombre de la Mascota *</Label>
                    <Input
                      id="patient-name"
                      value={newSurgery.patientName}
                      onChange={(e) => setNewSurgery({ ...newSurgery, patientName: e.target.value })}
                      placeholder="Nombre del paciente"
                    />
                  </div>
                  <div>
                    <Label htmlFor="owner-name">Nombre del Propietario *</Label>
                    <Input
                      id="owner-name"
                      value={newSurgery.ownerName}
                      onChange={(e) => setNewSurgery({ ...newSurgery, ownerName: e.target.value })}
                      placeholder="Nombre del propietario"
                    />
                  </div>
                  <div>
                    <Label htmlFor="owner-phone">Teléfono</Label>
                    <Input
                      id="owner-phone"
                      value={newSurgery.ownerPhone}
                      onChange={(e) => setNewSurgery({ ...newSurgery, ownerPhone: e.target.value })}
                      placeholder="0999999999"
                    />
                  </div>
                </div>
              </div>

              {/* Detalles de la Cirugía */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Scissors className="w-4 h-4" />
                  Detalles de la Cirugía
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label>Tipo de Cirugía *</Label>
                    <Select 
                      value={newSurgery.surgeryType} 
                      onValueChange={(value) => setNewSurgery({ ...newSurgery, surgeryType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar..." />
                      </SelectTrigger>
                      <SelectContent>
                        {surgeryTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Fecha Programada *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newSurgery.date ? format(newSurgery.date, "dd 'de' MMMM, yyyy", { locale: es }) : "Seleccionar fecha"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={newSurgery.date}
                          onSelect={(date) => setNewSurgery({ ...newSurgery, date })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label htmlFor="time">Hora *</Label>
                    <Input
                      id="time"
                      type="time"
                      value={newSurgery.time}
                      onChange={(e) => setNewSurgery({ ...newSurgery, time: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="duration">Duración Estimada</Label>
                    <Input
                      id="duration"
                      value={newSurgery.estimatedDuration}
                      onChange={(e) => setNewSurgery({ ...newSurgery, estimatedDuration: e.target.value })}
                      placeholder="60 min"
                    />
                  </div>

                  <div>
                    <Label>Prioridad</Label>
                    <Select 
                      value={newSurgery.priority} 
                      onValueChange={(value: 'baja' | 'media' | 'alta' | 'urgente') => 
                        setNewSurgery({ ...newSurgery, priority: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baja">Baja</SelectItem>
                        <SelectItem value="media">Media</SelectItem>
                        <SelectItem value="alta">Alta</SelectItem>
                        <SelectItem value="urgente">Urgente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Tipo de Anestesia</Label>
                    <Select 
                      value={newSurgery.anesthesiaType} 
                      onValueChange={(value) => setNewSurgery({ ...newSurgery, anesthesiaType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar..." />
                      </SelectTrigger>
                      <SelectContent>
                        {anesthesiaTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Materiales y Asistentes */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Materiales */}
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Materiales Necesarios</h3>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        value={newMaterial}
                        onChange={(e) => setNewMaterial(e.target.value)}
                        placeholder="Agregar material..."
                        onKeyPress={(e) => e.key === 'Enter' && addMaterial()}
                      />
                      <Button onClick={addMaterial} size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Materiales Comunes:</Label>
                      <div className="flex flex-wrap gap-2">
                        {commonMaterials.map((material) => (
                          <Button
                            key={material}
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              if (!newSurgery.materials.includes(material)) {
                                setNewSurgery({
                                  ...newSurgery,
                                  materials: [...newSurgery.materials, material]
                                });
                              }
                            }}
                            className="text-xs"
                          >
                            + {material}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Seleccionados:</Label>
                      <div className="flex flex-wrap gap-2">
                        {newSurgery.materials.map((material) => (
                          <Badge key={material} variant="secondary" className="flex items-center gap-1">
                            {material}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeMaterial(material)}
                              className="h-auto p-0 ml-1"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Asistentes */}
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Equipo Asistente</h3>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        value={newAssistant}
                        onChange={(e) => setNewAssistant(e.target.value)}
                        placeholder="Nombre del asistente..."
                        onKeyPress={(e) => e.key === 'Enter' && addAssistant()}
                      />
                      <Button onClick={addAssistant} size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label>Asignados:</Label>
                      <div className="space-y-1">
                        {newSurgery.assistants.map((assistant) => (
                          <div key={assistant} className="flex items-center justify-between bg-white p-2 rounded border">
                            <span>{assistant}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeAssistant(assistant)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notas */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="pre-op-notes">Notas Pre-Operatorias</Label>
                  <Textarea
                    id="pre-op-notes"
                    value={newSurgery.preOpNotes}
                    onChange={(e) => setNewSurgery({ ...newSurgery, preOpNotes: e.target.value })}
                    placeholder="Preparación especial, ayunas, medicamentos, alergias..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="post-op-instructions">Instrucciones Post-Operatorias</Label>
                  <Textarea
                    id="post-op-instructions"
                    value={newSurgery.postOpInstructions}
                    onChange={(e) => setNewSurgery({ ...newSurgery, postOpInstructions: e.target.value })}
                    placeholder="Cuidados posteriores, medicamentos, seguimiento..."
                    rows={3}
                  />
                </div>
              </div>

              {/* Botones */}
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Cancelar
                </Button>
                <Button onClick={scheduleSurgery}>
                  Programar Cirugía
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'scheduled' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Cirugías Programadas</h3>
                <Badge variant="secondary">{scheduledSurgeries.length} cirugías</Badge>
              </div>

              {scheduledSurgeries.map((surgery) => (
                <div key={surgery.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div>
                        <h4 className="font-medium">{surgery.patientName}</h4>
                        <p className="text-sm text-gray-600">Propietario: {surgery.ownerName}</p>
                      </div>
                      <Badge className={getPriorityColor(surgery.priority)}>
                        {surgery.priority.toUpperCase()}
                      </Badge>
                    </div>
                    <Badge className={getStatusColor(surgery.status)}>
                      {surgery.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Cirugía:</span> {surgery.surgeryType}
                    </div>
                    <div>
                      <span className="font-medium">Fecha:</span> {format(surgery.date, "dd/MM/yyyy", { locale: es })}
                    </div>
                    <div>
                      <span className="font-medium">Hora:</span> {surgery.time} ({surgery.estimatedDuration})
                    </div>
                  </div>

                  {surgery.preOpNotes && (
                    <div className="bg-gray-50 p-3 rounded text-sm">
                      <span className="font-medium">Notas:</span> {surgery.preOpNotes}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Editar</Button>
                    <Button size="sm" variant="outline">Confirmar</Button>
                    <Button size="sm" variant="outline">Reprogramar</Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'control' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Control Post-Operatorio</h3>
              <div className="text-center text-gray-500 py-8">
                <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>Control de seguimiento post-operatorio</p>
                <p className="text-sm">Registra la evolución de los pacientes después de cirugía</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SurgeryPlanningModal;