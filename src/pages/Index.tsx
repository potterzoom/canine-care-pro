
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StatsCard from '../components/StatsCard';
import AppointmentCard from '../components/AppointmentCard';
import PatientCard from '../components/PatientCard';
import InventoryItem from '../components/InventoryItem';
import AlertsModal from '../components/AlertsModal';
import ConfigModal from '../components/ConfigModal';
import NewAppointmentModal from '../components/NewAppointmentModal';
import PatientHistoryModal from '../components/PatientHistoryModal';
import ContactModal from '../components/ContactModal';
import NewMedicalHistoryModal from '../components/NewMedicalHistoryModal';
import VaccineControlModal from '../components/VaccineControlModal';
import BillingModal from '../components/BillingModal';
import TelemedicineModal from '../components/TelemedicineModal';
import ClientSearchModal from '../components/ClientSearchModal';
import StockModal from '../components/StockModal';
import UserManagementModal from '../components/UserManagementModal';
import ServicesModal from '../components/ServicesModal';
import { Calendar, User, Bell, Plus, Settings, FileText, Phone, Syringe, Receipt, Video, Package, Stethoscope, DollarSign, Clock } from 'lucide-react';

const Index = () => {
  // Estados para controlar los modales
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [configOpen, setConfigOpen] = useState(false);
  const [newAppointmentOpen, setNewAppointmentOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [newMedicalHistoryOpen, setNewMedicalHistoryOpen] = useState(false);
  const [vaccineControlOpen, setVaccineControlOpen] = useState(false);
  const [billingOpen, setBillingOpen] = useState(false);
  const [telemedicineOpen, setTelemedicineOpen] = useState(false);
  const [stockOpen, setStockOpen] = useState(false);
  const [userManagementOpen, setUserManagementOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  
  // Estados para el buscador de clientes
  const [clientSearchOpen, setClientSearchOpen] = useState(false);
  const [searchAction, setSearchAction] = useState<'history' | 'contact'>('history');
  const [selectedClient, setSelectedClient] = useState<any>(null);

  const todayStats = [
    {
      title: "Ingresos Hoy",
      value: "$2,450",
      change: "+18% vs ayer ($2,075)",
      icon: DollarSign,
      trend: "up" as const,
      color: "green" as const
    },
    {
      title: "Pacientes Atendidos",
      value: "17",
      change: "+3 vs ayer (14)",
      icon: User,
      trend: "up" as const,
      color: "blue" as const
    },
    {
      title: "Citas Programadas",
      value: "12",
      change: "Restantes para hoy",
      icon: Calendar,
      trend: "neutral" as const,
      color: "purple" as const
    },
    {
      title: "Alertas Activas",
      value: "5",
      change: "2 urgentes, 3 stock bajo",
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

  const handleSearchHistory = () => {
    setSearchAction('history');
    setClientSearchOpen(true);
  };

  const handleSearchContact = () => {
    setSearchAction('contact');
    setClientSearchOpen(true);
  };

  const handleClientSelect = (client: any) => {
    setSelectedClient(client);
    if (searchAction === 'history') {
      setHistoryOpen(true);
    } else {
      setContactOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        onAlertsClick={() => setAlertsOpen(true)}
        onConfigClick={() => setConfigOpen(true)}
        onUserManagementClick={() => setUserManagementOpen(true)}
      />
      
      <main className="flex-1 max-w-7xl mx-auto px-6 py-8">
        {/* Bienvenida */}
        <div className="mb-8 animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Bienvenida, Dra. María 👋
          </h2>
          <p className="text-gray-600">
            Tu asistente de IA está listo para ayudarte con alertas, inventario, comunicaciones y más. ¡Optimiza tu día con tecnología inteligente!
          </p>
        </div>

        {/* Botones de acceso rápido a modales */}
        <div className="mb-8 flex flex-wrap gap-4">
          <button 
            onClick={() => setAlertsOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-black text-white rounded-lg transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span>Ver Alertas</span>
          </button>
          
          <button 
            onClick={() => setNewAppointmentOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Cita</span>
          </button>
          
          <button 
            onClick={handleSearchHistory}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>Ver Historia</span>
          </button>
          
          <button 
            onClick={handleSearchContact}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>Comunicación IA</span>
          </button>
          
          <button 
            onClick={() => setServicesOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-black text-white rounded-lg transition-colors"
          >
            <Stethoscope className="w-4 h-4" />
            <span>Servicios</span>
          </button>
          
          <button 
            onClick={() => setStockOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg transition-colors"
          >
            <Package className="w-4 h-4" />
            <span>Stock</span>
          </button>
          
          <button 
            onClick={() => setConfigOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-900 hover:bg-black text-white rounded-lg transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span>Configuración</span>
          </button>
        </div>

        {/* Estadísticas del día */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {todayStats.map((stat, index) => (
            <div key={index} onClick={() => stat.title === "Alertas Activas" && setAlertsOpen(true)} className={stat.title === "Alertas Activas" ? "cursor-pointer" : ""}>
              <StatsCard {...stat} />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Citas de hoy */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Citas de Hoy</h3>
                <button 
                  onClick={() => setNewAppointmentOpen(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-black text-white rounded-lg transition-colors"
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
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Pacientes Recientes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentPatients.map((patient, index) => (
                  <PatientCard 
                    key={index} 
                    {...patient} 
                    onViewHistory={() => setHistoryOpen(true)}
                    onContact={() => setContactOpen(true)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Panel lateral */}
          <div className="space-y-6">
            {/* Alertas de Stock */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Alertas de Stock</h3>
                <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
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
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Accesos Rápidos</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => setNewMedicalHistoryOpen(true)}
                  className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span className="text-xl">📋</span>
                  <div>
                    <p className="font-medium text-gray-900">Nueva Historia Clínica</p>
                    <p className="text-sm text-gray-500">Registrar nuevo paciente</p>
                  </div>
                </button>
                
                <button 
                  onClick={() => setVaccineControlOpen(true)}
                  className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span className="text-xl">💉</span>
                  <div>
                    <p className="font-medium text-gray-900">Control de Vacunas</p>
                    <p className="text-sm text-gray-500">Revisar calendario</p>
                  </div>
                </button>
                
                <button 
                  onClick={() => setBillingOpen(true)}
                  className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span className="text-xl">📄</span>
                  <div>
                    <p className="font-medium text-gray-900">Facturación</p>
                    <p className="text-sm text-gray-500">Generar facturas</p>
                  </div>
                </button>
                
                <button 
                  onClick={() => setTelemedicineOpen(true)}
                  className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span className="text-xl">📱</span>
                  <div>
                    <p className="font-medium text-gray-900">Teleconsulta</p>
                    <p className="text-sm text-gray-500">Consultas remotas</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Modales */}
      <AlertsModal open={alertsOpen} onOpenChange={setAlertsOpen} />
      <ConfigModal open={configOpen} onOpenChange={setConfigOpen} />
      <NewAppointmentModal open={newAppointmentOpen} onOpenChange={setNewAppointmentOpen} />
      <PatientHistoryModal 
        open={historyOpen} 
        onOpenChange={setHistoryOpen}
        patientName={selectedClient?.petName}
      />
      <ContactModal 
        open={contactOpen} 
        onOpenChange={setContactOpen}
        contactName={selectedClient?.name}
        contactPhone={selectedClient?.phone}
      />
      <NewMedicalHistoryModal open={newMedicalHistoryOpen} onOpenChange={setNewMedicalHistoryOpen} />
      <VaccineControlModal open={vaccineControlOpen} onOpenChange={setVaccineControlOpen} />
      <BillingModal open={billingOpen} onOpenChange={setBillingOpen} />
      <TelemedicineModal open={telemedicineOpen} onOpenChange={setTelemedicineOpen} />
      <StockModal open={stockOpen} onOpenChange={setStockOpen} />
      <UserManagementModal open={userManagementOpen} onOpenChange={setUserManagementOpen} />
      <ServicesModal open={servicesOpen} onOpenChange={setServicesOpen} />
      
      {/* Modal de búsqueda de clientes */}
      <ClientSearchModal
        open={clientSearchOpen}
        onOpenChange={setClientSearchOpen}
        onClientSelect={handleClientSelect}
        title={searchAction === 'history' ? 'Buscar Cliente - Ver Historia' : 'Buscar Cliente - Comunicación'}
      />
    </div>
  );
};

export default Index;
