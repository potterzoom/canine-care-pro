import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { User, Calendar, FileText, Search, Filter, Clock, Stethoscope, Syringe, AlertTriangle, Heart, Pill, Activity, TrendingUp } from 'lucide-react';
import HealthDataVisualization from './HealthDataVisualization';
import IntelligentAlertsSystem from './IntelligentAlertsSystem';

interface PatientHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patientName?: string;
}

const PatientHistoryModal = ({ open, onOpenChange, patientName = "Max" }: PatientHistoryModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Queries de búsqueda rápida
  const quickSearchQueries = [
    { label: 'Últimas vacunas', query: 'vacuna', icon: Syringe, color: 'bg-green-100 text-green-800' },
    { label: 'Emergencias', query: 'emergencia', icon: AlertTriangle, color: 'bg-red-100 text-red-800' },
    { label: 'Cirugías', query: 'cirugía', icon: Activity, color: 'bg-blue-100 text-blue-800' },
    { label: 'Medicamentos', query: 'antibiótico', icon: Pill, color: 'bg-purple-100 text-purple-800' },
    { label: 'Consultas generales', query: 'consulta general', icon: Stethoscope, color: 'bg-gray-100 text-gray-800' },
    { label: 'Problemas cardíacos', query: 'corazón', icon: Heart, color: 'bg-pink-100 text-pink-800' },
    { label: 'Últimos 30 días', query: '2024-11', icon: Clock, color: 'bg-yellow-100 text-yellow-800' },
    { label: 'Tratamientos activos', query: 'tratamiento', icon: FileText, color: 'bg-indigo-100 text-indigo-800' }
  ];

  // Filtros por categoría
  const categoryFilters = [
    { id: 'all', label: 'Todos', count: 15 },
    { id: 'consultas', label: 'Consultas', count: 8 },
    { id: 'vacunas', label: 'Vacunas', count: 4 },
    { id: 'emergencias', label: 'Emergencias', count: 2 },
    { id: 'cirugias', label: 'Cirugías', count: 1 }
  ];

  const historyEntries = [
    {
      date: '2024-11-15',
      type: 'Consulta General',
      doctor: 'Dra. María González',
      diagnosis: 'Revisión rutinaria - Estado saludable',
      treatment: 'Ninguno requerido',
      notes: 'Peso: 25kg. Vacunas al día. Próxima revisión en 6 meses.',
      category: 'consultas',
      urgency: 'normal',
      cost: '$45.00'
    },
    {
      date: '2024-10-20',
      type: 'Vacunación',
      doctor: 'Dr. Carlos Mendoza',
      diagnosis: 'Vacuna antirrábica anual',
      treatment: 'Vacuna aplicada correctamente',
      notes: 'Próxima dosis: 20 Oct 2025. Sin reacciones adversas.',
      category: 'vacunas',
      urgency: 'normal',
      cost: '$30.00'
    },
    {
      date: '2024-09-10',
      type: 'Emergencia',
      doctor: 'Dra. María González',
      diagnosis: 'Gastroenteritis leve por cambio de dieta',
      treatment: 'Antibióticos (Amoxicilina) y dieta blanda por 7 días',
      notes: 'Recuperación completa en 5 días. Evitar cambios bruscos de alimentación.',
      category: 'emergencias',
      urgency: 'alta',
      cost: '$120.00'
    },
    {
      date: '2024-08-15',
      type: 'Cirugía Menor',
      doctor: 'Dr. Luis Ramírez',
      diagnosis: 'Extracción de quiste sebáceo en pata trasera',
      treatment: 'Cirugía ambulatoria exitosa, puntos removidos',
      notes: 'Cicatrización perfecta. Control postoperatorio completado.',
      category: 'cirugias',
      urgency: 'normal',
      cost: '$250.00'
    },
    {
      date: '2024-07-22',
      type: 'Control Odontológico',
      doctor: 'Dra. Ana Torres',
      diagnosis: 'Limpieza dental profesional',
      treatment: 'Profilaxis dental completa',
      notes: 'Excelente estado dental. Próxima limpieza en 12 meses.',
      category: 'consultas',
      urgency: 'normal',
      cost: '$80.00'
    }
  ];

  // Filtrar entradas basado en búsqueda y filtro seleccionado
  const filteredEntries = historyEntries.filter(entry => {
    const matchesSearch = searchQuery === '' || 
      entry.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.treatment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.date.includes(searchQuery);
    
    const matchesFilter = selectedFilter === 'all' || entry.category === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const handleQuickSearch = (query: string) => {
    setSearchQuery(query);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'alta': return 'bg-red-100 text-red-800 border-red-200';
      case 'media': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getTotalCost = () => {
    return filteredEntries.reduce((total, entry) => {
      return total + parseFloat(entry.cost.replace('$', ''));
    }, 0).toFixed(2);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Historia Clínica Completa - {patientName}</span>
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="history" className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="history">Historial Médico</TabsTrigger>
            <TabsTrigger value="health-data">Datos de Salud</TabsTrigger>
            <TabsTrigger value="alerts">Alertas IA</TabsTrigger>
            <TabsTrigger value="stats">Estadísticas</TabsTrigger>
            <TabsTrigger value="documents">Documentos</TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="flex-1 overflow-y-auto space-y-6">
            {/* Información del paciente */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3 flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Información del Paciente</span>
              </h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div><strong>Nombre:</strong> {patientName}</div>
                <div><strong>Especie:</strong> Perro</div>
                <div><strong>Raza:</strong> Golden Retriever</div>
                <div><strong>Edad:</strong> 3 años</div>
                <div><strong>Peso:</strong> 25 kg</div>
                <div><strong>Sexo:</strong> Macho</div>
                <div><strong>Dueño:</strong> Juan Pérez</div>
                <div><strong>Teléfono:</strong> +58 414-123-4567</div>
                <div><strong>Última visita:</strong> 15 Nov 2024</div>
              </div>
            </div>

            {/* Búsqueda y filtros */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar en historial médico..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setSearchQuery('')}
                  size="sm"
                >
                  Limpiar
                </Button>
              </div>

              {/* Queries de búsqueda rápida */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Búsquedas rápidas:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {quickSearchQueries.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickSearch(item.query)}
                      className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium transition-colors hover:opacity-80 ${item.color}`}
                    >
                      <item.icon className="w-3 h-3" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Filtros por categoría */}
              <div className="flex items-center space-x-2">
                {categoryFilters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      selectedFilter === filter.id
                        ? 'bg-gray-800 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {filter.label} ({filter.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Resultados de búsqueda */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Historial de Consultas ({filteredEntries.length} registros)</span>
                </h3>
                {searchQuery && (
                  <Badge variant="outline" className="text-xs">
                    Mostrando resultados para: "{searchQuery}"
                  </Badge>
                )}
              </div>
              
              {filteredEntries.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No se encontraron registros que coincidan con la búsqueda</p>
                </div>
              ) : (
                filteredEntries.map((entry, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <div className="font-medium text-gray-900">{entry.type}</div>
                          <Badge className={`text-xs ${getUrgencyColor(entry.urgency)}`}>
                            {entry.urgency === 'alta' ? 'Urgente' : 'Normal'}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600">{entry.date} • {entry.doctor}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-green-600">{entry.cost}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <strong className="text-gray-700">Diagnóstico:</strong>
                        <p className="mt-1">{entry.diagnosis}</p>
                      </div>
                      <div>
                        <strong className="text-gray-700">Tratamiento:</strong>
                        <p className="mt-1">{entry.treatment}</p>
                      </div>
                      <div>
                        <strong className="text-gray-700">Notas:</strong>
                        <p className="mt-1">{entry.notes}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="health-data" className="flex-1 overflow-y-auto">
            <HealthDataVisualization />
          </TabsContent>

          <TabsContent value="alerts" className="flex-1 overflow-y-auto">
            <IntelligentAlertsSystem />
          </TabsContent>

          <TabsContent value="stats" className="flex-1 overflow-y-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Total de Consultas</h4>
                <p className="text-2xl font-bold text-blue-600">{historyEntries.length}</p>
                <p className="text-sm text-blue-700">En los últimos 12 meses</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Gasto Total</h4>
                <p className="text-2xl font-bold text-green-600">${getTotalCost()}</p>
                <p className="text-sm text-green-700">Inversión en salud</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">Próximas Citas</h4>
                <p className="text-2xl font-bold text-purple-600">2</p>
                <p className="text-sm text-purple-700">Vacuna y control</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="flex-1 overflow-y-auto space-y-4">
            <div className="text-center py-8 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Documentos médicos y certificados aparecerán aquí</p>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm text-gray-600">
            Total mostrado: {filteredEntries.length} registros • Costo: ${getTotalCost()}
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cerrar
            </Button>
            <Button className="bg-gray-800 hover:bg-black">
              Exportar Historia
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Imprimir
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PatientHistoryModal;
