import React, { useState } from 'react';
import Header from '../components/Header';
import StatsCard from '../components/StatsCard';
import AppointmentCard from '../components/AppointmentCard';
import PatientCard from '../components/PatientCard';
import InventoryItem from '../components/InventoryItem';
import AlertsModal from '../components/AlertsModal';
import ConfigModal from '../components/ConfigModal';
import NewAppointmentModal from '../components/NewAppointmentModal';
import PatientHistoryModal from '../components/PatientHistoryModal';
import ContactModal from '../components/ContactModal';
import { Calendar, User, Bell, Plus, Settings, FileText, Phone } from 'lucide-react';

const Index = () => {
  // Estados para controlar los modales
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [configOpen, setConfigOpen] = useState(false);
  const [newAppointmentOpen, setNewAppointmentOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  // Datos de ejemplo
  const todayStats = [
    {
      title: "Ingresos Hoy",
      value: "$850",
      change: "+12% vs ayer",
      icon: Calendar,
      trend: "up" as const,
      color: "green" as const
    },
    {
      title: "Pacientes Atendidos",
      value: "23",
      change: "+5 vs ayer",
      icon: User,
      trend: "up" as const,
      color: "blue" as const
    },
    {
      title: "Citas Pendientes",
      value: "8",
      change: "Para hoy",
      icon: Calendar,
      trend: "neutral" as const,
      color: "purple" as const
    },
    {
      title: "Alertas",
      value: "3",
      change: "Stock bajo",
      icon: Bell,
      trend: "down" as const,
      color: "orange" as const
    }
  ];

  const todayAppointments = [
    {
      time: "09:00",
      petName: "Max",
      ownerName: "Juan Pérez",
      type: "Consulta General",
      status: "confirmed" as const
    },
    {
      time: "10:30",
      petName: "Luna",
      ownerName: "María García",
      type: "Vacunación",
      status: "pending" as const,
      urgent: true
    },
    {
      time: "14:00",
      petName: "Rocky",
      ownerName: "Carlos Mendoza",
      type: "Cirugía Menor",
      status: "confirmed" as const
    }
  ];

  const recentPatients = [
    {
      name: "Buddy",
      species: "Perro",
      breed: "Golden Retriever",
      age: "3 años",
      owner: "Ana López",
      lastVisit: "15 Nov 2024",
      nextVaccine: "15 Dic 2024"
    },
    {
      name: "Whiskers",
      species: "Gato",
      breed: "Persa",
      age: "2 años",
      owner: "Pedro Silva",
      lastVisit: "12 Nov 2024",
      nextVaccine: "10 Ene 2025",
      urgent: true
    }
  ];

  const lowStockItems = [
    {
      name: "Amoxicilina 500mg",
      category: "Antibióticos",
      stock: 5,
      minStock: 20,
      expiryDate: "Mar 2025",
      price: 12.50
    },
    {
      name: "Vacuna Rabia",
      category: "Vacunas",
      stock: 3,
      minStock: 15,
      expiryDate: "Jun 2025",
      price: 25.00
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Bienvenida */}
        <div className="mb-8 animate-slide-up">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Bienvenida, Dra. María 👋
          </h2>
          <p className="text-slate-600">
            Aquí tienes un resumen de tu día. Tienes 8 citas programadas.
          </p>
        </div>

        {/* Botones de acceso rápido a modales */}
        <div className="mb-8 flex flex-wrap gap-4">
          <button 
            onClick={() => setAlertsOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span>Ver Alertas</span>
          </button>
          
          <button 
            onClick={() => setNewAppointmentOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Cita</span>
          </button>
          
          <button 
            onClick={() => setHistoryOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>Ver Historia</span>
          </button>
          
          <button 
            onClick={() => setContactOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>Contactar</span>
          </button>
          
          <button 
            onClick={() => setConfigOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-500 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span>Configuración</span>
          </button>
        </div>

        {/* Estadísticas del día */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {todayStats.map((stat, index) => (
            <div key={index} onClick={() => stat.title === "Alertas" && setAlertsOpen(true)} className={stat.title === "Alertas" ? "cursor-pointer" : ""}>
              <StatsCard {...stat} />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Citas de hoy */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-800">Citas de Hoy</h3>
                <button 
                  onClick={() => setNewAppointmentOpen(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nueva Cita</span>
                </button>
              </div>
              
              <div className="space-y-4">
                {todayAppointments.map((appointment, index) => (
                  <AppointmentCard key={index} {...appointment} />
                ))}
              </div>
            </div>

            {/* Pacientes Recientes */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-6">Pacientes Recientes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentPatients.map((patient, index) => (
                  <PatientCard key={index} {...patient} />
                ))}
              </div>
            </div>
          </div>

          {/* Panel lateral */}
          <div className="space-y-6">
            {/* Alertas de Stock */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-800">Alertas de Stock</h3>
                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                  {lowStockItems.length} alertas
                </span>
              </div>
              
              <div className="space-y-4">
                {lowStockItems.map((item, index) => (
                  <InventoryItem key={index} {...item} />
                ))}
              </div>
            </div>

            {/* Accesos Rápidos */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-6">Accesos Rápidos</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => setHistoryOpen(true)}
                  className="w-full flex items-center space-x-3 p-3 text-left hover:bg-slate-50 rounded-lg transition-colors"
                >
                  <span className="text-xl">📋</span>
                  <div>
                    <p className="font-medium text-slate-800">Nueva Historia Clínica</p>
                    <p className="text-sm text-slate-500">Registrar nuevo paciente</p>
                  </div>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-slate-50 rounded-lg transition-colors">
                  <span className="text-xl">💉</span>
                  <div>
                    <p className="font-medium text-slate-800">Control de Vacunas</p>
                    <p className="text-sm text-slate-500">Revisar calendario</p>
                  </div>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-slate-50 rounded-lg transition-colors">
                  <span className="text-xl">📄</span>
                  <div>
                    <p className="font-medium text-slate-800">Facturación</p>
                    <p className="text-sm text-slate-500">Generar facturas</p>
                  </div>
                </button>
                
                <button 
                  onClick={() => setContactOpen(true)}
                  className="w-full flex items-center space-x-3 p-3 text-left hover:bg-slate-50 rounded-lg transition-colors"
                >
                  <span className="text-xl">📱</span>
                  <div>
                    <p className="font-medium text-slate-800">Teleconsulta</p>
                    <p className="text-sm text-slate-500">Consultas remotas</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modales */}
      <AlertsModal open={alertsOpen} onOpenChange={setAlertsOpen} />
      <ConfigModal open={configOpen} onOpenChange={setConfigOpen} />
      <NewAppointmentModal open={newAppointmentOpen} onOpenChange={setNewAppointmentOpen} />
      <PatientHistoryModal open={historyOpen} onOpenChange={setHistoryOpen} />
      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </div>
  );
};

export default Index;
