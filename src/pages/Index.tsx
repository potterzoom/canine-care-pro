
import React from 'react';
import Header from '../components/Header';
import StatsCard from '../components/StatsCard';
import AppointmentCard from '../components/AppointmentCard';
import PatientCard from '../components/PatientCard';
import InventoryItem from '../components/InventoryItem';
import { Calendar, User, Bell, Plus } from 'lucide-react';

const Index = () => {
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

        {/* Estadísticas del día */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {todayStats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Citas de hoy */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-800">Citas de Hoy</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
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
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-slate-50 rounded-lg transition-colors">
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
                
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-slate-50 rounded-lg transition-colors">
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
    </div>
  );
};

export default Index;
