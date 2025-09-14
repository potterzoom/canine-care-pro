
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Calendar, Upload, FileText, Image, X, AlertTriangle, Shield, User, Heart, Phone, Mail, Camera, Eye } from 'lucide-react';

interface NewAppointmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewAppointmentModal = ({ open, onOpenChange }: NewAppointmentModalProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isWildAnimal, setIsWildAnimal] = useState(false);
  const [formData, setFormData] = useState({
    // Datos de la cita
    date: '',
    time: '',
    appointmentType: '',
    veterinarian: '',
    
    // Datos de la mascota
    petName: '',
    species: '',
    breed: '',
    gender: '',
    birthDate: '',
    weight: '',
    age: { years: '', months: '' },
    
    // Datos del dueño
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
    ownerAddress: '',
    ownerCedula: '',
    
    // Historial médico
    allergies: '',
    medications: '',
    lastVaccination: '',
    isVaccinationUpToDate: false,
    preexistingConditions: '',
    
    // Detalles de la consulta
    reason: '',
    symptoms: '',
    notes: '',
    
    // Configuraciones
    isUrgent: false,
    sendReminder: false,
    isNewClient: false,
    preferredNotification: 'email',
    acceptTerms: false,
    
    // UPMA (Animales Silvestres)
    upmaData: {
      permitNumber: '',
      captureLocation: '',
      captureDate: '',
      reportingAuthority: '',
      wildlifeSpecies: '',
      condition: '',
      rehabilitationGoal: ''
    }
  });

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
    { value: 'nutrition', label: 'Consulta Nutricional' },
    { value: 'wildlife', label: 'Fauna Silvestre (UPMA)' }
  ];

  const species = [
    { value: 'dog', label: 'Perro' },
    { value: 'cat', label: 'Gato' },
    { value: 'bird', label: 'Ave' },
    { value: 'rabbit', label: 'Conejo' },
    { value: 'hamster', label: 'Hámster' },
    { value: 'guinea-pig', label: 'Cuy' },
    { value: 'ferret', label: 'Hurón' },
    { value: 'reptile', label: 'Reptil' },
    { value: 'fish', label: 'Pez' },
    { value: 'wildlife', label: 'Fauna Silvestre' },
    { value: 'other', label: 'Otro' }
  ];

  const wildlifeSpecies = [
    { value: 'deer', label: 'Venado' },
    { value: 'sloth', label: 'Perezoso' },
    { value: 'monkey', label: 'Mono' },
    { value: 'bird-of-prey', label: 'Ave Rapaz' },
    { value: 'parrot', label: 'Loro/Guacamayo' },
    { value: 'iguana', label: 'Iguana' },
    { value: 'snake', label: 'Serpiente' },
    { value: 'turtle', label: 'Tortuga' },
    { value: 'other-wildlife', label: 'Otra Fauna Silvestre' }
  ];

  const veterinarians = [
    { value: 'dr-martinez', label: 'Dr. Carlos Martínez' },
    { value: 'dra-lopez', label: 'Dra. Ana López' },
    { value: 'dr-garcia', label: 'Dr. Roberto García' },
    { value: 'dra-rodriguez', label: 'Dra. María Rodríguez' },
    { value: 'dr-wildlife', label: 'Dr. Especialista en Fauna Silvestre' }
  ];

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setIsUploading(true);
      setUploadProgress(0);
      
      const newFiles = Array.from(files).filter(file => {
        const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
        return validTypes.includes(file.type) && file.size <= 10 * 1024 * 1024; // 10MB limit
      });
      
      // Simular progreso de carga
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i);
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      
      setUploadedFiles(prev => [...prev, ...newFiles]);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const validateEmail = (email: string) => {
    const ecuadorianEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return ecuadorianEmailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const ecuadorianPhoneRegex = /^(\+593|0)[0-9]{9}$/;
    return ecuadorianPhoneRegex.test(phone);
  };

  const validateCedula = (cedula: string) => {
    if (cedula.length !== 10) return false;
    const digits = cedula.split('').map(Number);
    const checkDigit = digits[9];
    let sum = 0;
    
    for (let i = 0; i < 9; i++) {
      let digit = digits[i];
      if (i % 2 === 0) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
    }
    
    const calculatedCheckDigit = (10 - (sum % 10)) % 10;
    return calculatedCheckDigit === checkDigit;
  };

  const handleInputChange = (field: string, value: any) => {
    if (field.startsWith('upmaData.')) {
      const upmaField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        upmaData: {
          ...prev.upmaData,
          [upmaField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
    
    // Activar modo fauna silvestre si se selecciona
    if (field === 'appointmentType' && value === 'wildlife') {
      setIsWildAnimal(true);
    } else if (field === 'appointmentType' && value !== 'wildlife') {
      setIsWildAnimal(false);
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

  const previewFile = (file: File) => {
    setSelectedFile(file);
  };

  const isFormValid = () => {
    const requiredFields = [
      formData.date,
      formData.time,
      formData.petName,
      formData.species,
      formData.ownerName,
      formData.ownerPhone,
      formData.ownerEmail,
      formData.appointmentType
    ];
    
    const emailValid = validateEmail(formData.ownerEmail);
    const phoneValid = validatePhone(formData.ownerPhone);
    
    return requiredFields.every(field => field.trim() !== '') && emailValid && phoneValid && formData.acceptTerms;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Nueva Cita Veterinaria</span>
            {isWildAnimal && (
              <Badge variant="secondary" className="ml-2">
                <Shield className="w-3 h-3 mr-1" />
                UPMA - Fauna Silvestre
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[calc(90vh-120px)] pr-4">
          <div className="space-y-6">
            
            {/* Sección 1: Datos de la Cita */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Información de la Cita
                </CardTitle>
                <CardDescription>Fecha, hora y tipo de consulta</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="date" className="text-sm font-medium">
                      Fecha <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="date" 
                      type="date" 
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className={!formData.date ? 'border-red-300' : ''}
                    />
                  </div>
                  <div>
                    <Label htmlFor="time" className="text-sm font-medium">
                      Hora <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="time" 
                      type="time" 
                      value={formData.time}
                      onChange={(e) => handleInputChange('time', e.target.value)}
                      className={!formData.time ? 'border-red-300' : ''}
                    />
                  </div>
                  <div>
                    <Label htmlFor="veterinarian" className="text-sm font-medium">
                      Veterinario Preferido
                    </Label>
                    <Select value={formData.veterinarian} onValueChange={(value) => handleInputChange('veterinarian', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar veterinario" />
                      </SelectTrigger>
                      <SelectContent>
                        {veterinarians.map(vet => (
                          <SelectItem key={vet.value} value={vet.value}>{vet.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="appointmentType" className="text-sm font-medium">
                    Tipo de Consulta <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.appointmentType} onValueChange={(value) => handleInputChange('appointmentType', value)}>
                    <SelectTrigger className={!formData.appointmentType ? 'border-red-300' : ''}>
                      <SelectValue placeholder="Seleccionar tipo de consulta" />
                    </SelectTrigger>
                    <SelectContent>
                      {consultationTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Sección 2: Datos de la Mascota */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Información de la Mascota
                </CardTitle>
                <CardDescription>Datos básicos y características del animal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="petName" className="text-sm font-medium">
                      Nombre <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="petName" 
                      placeholder="Ej: Max, Luna" 
                      value={formData.petName}
                      onChange={(e) => handleInputChange('petName', e.target.value)}
                      className={!formData.petName ? 'border-red-300' : ''}
                    />
                  </div>
                  <div>
                    <Label htmlFor="species" className="text-sm font-medium">
                      Especie <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.species} onValueChange={(value) => handleInputChange('species', value)}>
                      <SelectTrigger className={!formData.species ? 'border-red-300' : ''}>
                        <SelectValue placeholder="Seleccionar especie" />
                      </SelectTrigger>
                      <SelectContent>
                        {species.map(spec => (
                          <SelectItem key={spec.value} value={spec.value}>{spec.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="breed" className="text-sm font-medium">Raza</Label>
                    <Input 
                      id="breed" 
                      placeholder="Ej: Labrador, Persa" 
                      value={formData.breed}
                      onChange={(e) => handleInputChange('breed', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="gender" className="text-sm font-medium">Género</Label>
                    <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Macho</SelectItem>
                        <SelectItem value="female">Hembra</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="birthDate" className="text-sm font-medium">Fecha de Nacimiento</Label>
                    <Input 
                      id="birthDate" 
                      type="date" 
                      value={formData.birthDate}
                      onChange={(e) => handleInputChange('birthDate', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="weight" className="text-sm font-medium">Peso (kg)</Label>
                    <Input 
                      id="weight" 
                      type="number" 
                      step="0.1" 
                      placeholder="Ej: 15.5" 
                      value={formData.weight}
                      onChange={(e) => handleInputChange('weight', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Edad Aproximada</Label>
                    <div className="flex gap-2">
                      <Input 
                        type="number" 
                        placeholder="Años" 
                        value={formData.age.years}
                        onChange={(e) => handleInputChange('age', { ...formData.age, years: e.target.value })}
                      />
                      <Input 
                        type="number" 
                        placeholder="Meses" 
                        value={formData.age.months}
                        onChange={(e) => handleInputChange('age', { ...formData.age, months: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sección 3: Datos del Propietario */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Información del Propietario
                </CardTitle>
                <CardDescription>Datos de contacto y ubicación</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ownerName" className="text-sm font-medium">
                      Nombre Completo <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="ownerName" 
                      placeholder="Ej: Juan Carlos Pérez" 
                      value={formData.ownerName}
                      onChange={(e) => handleInputChange('ownerName', e.target.value)}
                      className={!formData.ownerName ? 'border-red-300' : ''}
                    />
                  </div>
                  <div>
                    <Label htmlFor="ownerCedula" className="text-sm font-medium">Cédula de Identidad</Label>
                    <Input 
                      id="ownerCedula" 
                      placeholder="Ej: 1234567890" 
                      value={formData.ownerCedula}
                      onChange={(e) => handleInputChange('ownerCedula', e.target.value)}
                      className={formData.ownerCedula && !validateCedula(formData.ownerCedula) ? 'border-red-300' : ''}
                    />
                    {formData.ownerCedula && !validateCedula(formData.ownerCedula) && (
                      <p className="text-xs text-red-500 mt-1">Cédula inválida</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ownerPhone" className="text-sm font-medium">
                      Teléfono <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <Input 
                        id="ownerPhone" 
                        placeholder="Ej: 0999123456 o +593999123456" 
                        value={formData.ownerPhone}
                        onChange={(e) => handleInputChange('ownerPhone', e.target.value)}
                        className={!formData.ownerPhone || !validatePhone(formData.ownerPhone) ? 'border-red-300' : ''}
                      />
                    </div>
                    {formData.ownerPhone && !validatePhone(formData.ownerPhone) && (
                      <p className="text-xs text-red-500 mt-1">Formato: 0999123456 o +593999123456</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="ownerEmail" className="text-sm font-medium">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <Input 
                        id="ownerEmail" 
                        type="email" 
                        placeholder="Ej: juan@email.com" 
                        value={formData.ownerEmail}
                        onChange={(e) => handleInputChange('ownerEmail', e.target.value)}
                        className={!formData.ownerEmail || !validateEmail(formData.ownerEmail) ? 'border-red-300' : ''}
                      />
                    </div>
                    {formData.ownerEmail && !validateEmail(formData.ownerEmail) && (
                      <p className="text-xs text-red-500 mt-1">Email inválido</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="ownerAddress" className="text-sm font-medium">Dirección</Label>
                  <Textarea 
                    id="ownerAddress" 
                    placeholder="Dirección completa..." 
                    value={formData.ownerAddress}
                    onChange={(e) => handleInputChange('ownerAddress', e.target.value)}
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">Notificaciones Preferidas</Label>
                  <Select value={formData.preferredNotification} onValueChange={(value) => handleInputChange('preferredNotification', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="all">Todas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Sección UPMA - Solo para fauna silvestre */}
            {isWildAnimal && (
              <Card className="border-amber-200 bg-amber-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-amber-800">
                    <Shield className="w-4 h-4" />
                    Datos UPMA - Fauna Silvestre
                  </CardTitle>
                  <CardDescription className="text-amber-700">
                    Información requerida para el manejo de animales silvestres
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="permitNumber" className="text-sm font-medium">Número de Permiso</Label>
                      <Input 
                        id="permitNumber" 
                        placeholder="Ej: UPMA-2024-001" 
                        value={formData.upmaData.permitNumber}
                        onChange={(e) => handleInputChange('upmaData.permitNumber', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="reportingAuthority" className="text-sm font-medium">Autoridad que Reporta</Label>
                      <Input 
                        id="reportingAuthority" 
                        placeholder="Ej: Policía Nacional" 
                        value={formData.upmaData.reportingAuthority}
                        onChange={(e) => handleInputChange('upmaData.reportingAuthority', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="captureLocation" className="text-sm font-medium">Lugar de Captura/Rescate</Label>
                      <Input 
                        id="captureLocation" 
                        placeholder="Ej: Bosque Protector La Esperanza" 
                        value={formData.upmaData.captureLocation}
                        onChange={(e) => handleInputChange('upmaData.captureLocation', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="captureDate" className="text-sm font-medium">Fecha de Captura/Rescate</Label>
                      <Input 
                        id="captureDate" 
                        type="date" 
                        value={formData.upmaData.captureDate}
                        onChange={(e) => handleInputChange('upmaData.captureDate', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="wildlifeSpecies" className="text-sm font-medium">Especie de Fauna Silvestre</Label>
                    <Select value={formData.upmaData.wildlifeSpecies} onValueChange={(value) => handleInputChange('upmaData.wildlifeSpecies', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar especie silvestre" />
                      </SelectTrigger>
                      <SelectContent>
                        {wildlifeSpecies.map(spec => (
                          <SelectItem key={spec.value} value={spec.value}>{spec.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="condition" className="text-sm font-medium">Estado/Condición</Label>
                      <Select value={formData.upmaData.condition} onValueChange={(value) => handleInputChange('upmaData.condition', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar condición" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="injured">Herido</SelectItem>
                          <SelectItem value="sick">Enfermo</SelectItem>
                          <SelectItem value="orphaned">Huérfano</SelectItem>
                          <SelectItem value="healthy">Saludable</SelectItem>
                          <SelectItem value="stressed">Estresado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="rehabilitationGoal" className="text-sm font-medium">Objetivo de Rehabilitación</Label>
                      <Select value={formData.upmaData.rehabilitationGoal} onValueChange={(value) => handleInputChange('upmaData.rehabilitationGoal', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar objetivo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="release">Liberación</SelectItem>
                          <SelectItem value="captivity">Mantenimiento en Cautiverio</SelectItem>
                          <SelectItem value="education">Educación/Exhibición</SelectItem>
                          <SelectItem value="breeding">Reproducción</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Sección 4: Historial Médico */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Historial Médico
                </CardTitle>
                <CardDescription>Información sobre salud y tratamientos previos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="allergies" className="text-sm font-medium">Alergias Conocidas</Label>
                    <Textarea 
                      id="allergies" 
                      placeholder="Ej: Alérgico a penicilina..." 
                      value={formData.allergies}
                      onChange={(e) => handleInputChange('allergies', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="medications" className="text-sm font-medium">Medicamentos Actuales</Label>
                    <Textarea 
                      id="medications" 
                      placeholder="Ej: Antibiótico cada 8 horas..." 
                      value={formData.medications}
                      onChange={(e) => handleInputChange('medications', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="preexistingConditions" className="text-sm font-medium">Condiciones Médicas Preexistentes</Label>
                  <Textarea 
                    id="preexistingConditions" 
                    placeholder="Ej: Diabetes, displasia de cadera..." 
                    value={formData.preexistingConditions}
                    onChange={(e) => handleInputChange('preexistingConditions', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="lastVaccination" className="text-sm font-medium">Última Vacunación</Label>
                    <Input 
                      id="lastVaccination" 
                      type="date" 
                      value={formData.lastVaccination}
                      onChange={(e) => handleInputChange('lastVaccination', e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-2 pt-6">
                    <Checkbox 
                      id="isVaccinationUpToDate" 
                      checked={formData.isVaccinationUpToDate}
                      onCheckedChange={(checked) => handleInputChange('isVaccinationUpToDate', checked)}
                    />
                    <Label htmlFor="isVaccinationUpToDate" className="text-sm">
                      Vacunación al día
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sección 5: Detalles de la Consulta */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Detalles de la Consulta
                </CardTitle>
                <CardDescription>Motivo y síntomas de la visita</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="reason" className="text-sm font-medium">
                    Motivo Principal de la Consulta <span className="text-red-500">*</span>
                  </Label>
                  <Textarea 
                    id="reason" 
                    placeholder="Describir el motivo principal de la consulta..." 
                    value={formData.reason}
                    onChange={(e) => handleInputChange('reason', e.target.value)}
                    className={!formData.reason ? 'border-red-300' : ''}
                  />
                </div>

                <div>
                  <Label htmlFor="symptoms" className="text-sm font-medium">Síntomas Observados</Label>
                  <Textarea 
                    id="symptoms" 
                    placeholder="Ej: Vómitos, diarrea, pérdida de apetito..." 
                    value={formData.symptoms}
                    onChange={(e) => handleInputChange('symptoms', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="notes" className="text-sm font-medium">Notas Adicionales</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Cualquier información adicional relevante..." 
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Sección 6: Documentos Médicos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Documentos Médicos
                </CardTitle>
                <CardDescription>Subir exámenes, radiografías y historiales</CardDescription>
              </CardHeader>
              <CardContent>
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
                    <div className="flex justify-center gap-2 mt-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('fileUpload')?.click()}
                        disabled={isUploading}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Seleccionar Archivos
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {/* Función para activar cámara */}}
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Escanear con Cámara
                      </Button>
                    </div>

                    {isUploading && (
                      <div className="mt-4">
                        <Progress value={uploadProgress} className="w-full" />
                        <p className="text-xs text-gray-500 mt-1">Subiendo archivos... {uploadProgress}%</p>
                      </div>
                    )}
                  </div>

                  {/* Lista de archivos subidos */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-6 space-y-2">
                      <h4 className="text-sm font-medium text-gray-700">Archivos Adjuntos ({uploadedFiles.length}):</h4>
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-white p-3 rounded-md border">
                          <div className="flex items-center space-x-3">
                            {getFileIcon(file)}
                            <div>
                              <p className="text-sm font-medium text-gray-900">{file.name}</p>
                              <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => previewFile(file)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
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
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Sección 7: Configuraciones */}
            <Card>
              <CardHeader>
                <CardTitle>Configuraciones de la Cita</CardTitle>
                <CardDescription>Opciones adicionales y preferencias</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="isUrgent" 
                      checked={formData.isUrgent}
                      onCheckedChange={(checked) => handleInputChange('isUrgent', checked)}
                    />
                    <Label htmlFor="isUrgent" className="text-sm">
                      <span className="font-medium">Marcar como urgente</span>
                      <p className="text-xs text-gray-500">Prioridad alta en la agenda</p>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="sendReminder" 
                      checked={formData.sendReminder}
                      onCheckedChange={(checked) => handleInputChange('sendReminder', checked)}
                    />
                    <Label htmlFor="sendReminder" className="text-sm">
                      <span className="font-medium">Enviar recordatorio</span>
                      <p className="text-xs text-gray-500">24h antes de la cita</p>
                    </Label>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="isNewClient" 
                    checked={formData.isNewClient}
                    onCheckedChange={(checked) => handleInputChange('isNewClient', checked)}
                  />
                  <Label htmlFor="isNewClient" className="text-sm">
                    <span className="font-medium">Cliente nuevo</span>
                    <p className="text-xs text-gray-500">Crear nuevo perfil en el sistema</p>
                  </Label>
                </div>

                <Separator />

                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="acceptTerms" 
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => handleInputChange('acceptTerms', checked)}
                  />
                  <Label htmlFor="acceptTerms" className="text-sm">
                    <span className="font-medium">Acepto los términos y condiciones <span className="text-red-500">*</span></span>
                    <p className="text-xs text-gray-500">
                      Acepto el tratamiento de datos personales y doy consentimiento para el tratamiento veterinario.
                    </p>
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
        
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm text-gray-500">
            * Campos obligatorios
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button 
              className="bg-primary hover:bg-primary/90"
              disabled={!isFormValid()}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Agendar Cita
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewAppointmentModal;
