import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StatsCard from '../components/StatsCard';
import PatientCard from '../components/PatientCard';
import AppointmentCard from '../components/AppointmentCard';
import InventoryItem from '../components/InventoryItem';
import NewAppointmentModal from '../components/NewAppointmentModal';
import StockModal from '../components/StockModal';
import ConfigModal from '../components/ConfigModal';
import ContactModal from '../components/ContactModal';
import UserManagementModal from '../components/UserManagementModal';
import UserProfileModal from '../components/UserProfileModal';
import ScheduledAppointmentsModal from '../components/ScheduledAppointmentsModal';
import PatientsAttendedModal from '../components/PatientsAttendedModal';
import PatientHistoryModal from '../components/PatientHistoryModal';
import NewMedicalHistoryModal from '../components/NewMedicalHistoryModal';
import ClientSearchModal from '../components/ClientSearchModal';
import ServicesModal from '../components/ServicesModal';
import BillingModal from '../components/BillingModal';
import SecurityAuditModal from '../components/SecurityAuditModal';
import VaccineControlModal from '../components/VaccineControlModal';
import TelemedicineModal from '../components/TelemedicineModal';
import VirtualAssistantModal from '../components/VirtualAssistantModal';
import { useDailyStats } from '../hooks/useDailyStats';
import { useTodayPatients } from '../hooks/useTodayPatients';
import { 
  Calendar, 
  Users, 
  Activity, 
  Package, 
  Plus, 
  Clock, 
  Search,
  UserCheck,
  FileText,
  DollarSign,
  Shield,
  Syringe,
  Video,
  Bot
} from 'lucide-react';

const Index = () => {
  const [newAppointmentOpen, setNewAppointmentOpen] = useState(false);
  const [stockOpen, setStockOpen] = useState(false);
  const [configOpen, setConfigOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [userManagementOpen, setUserManagementOpen] = useState(false);
  const [userProfileOpen, setUserProfileOpen] = useState(false);
  const [scheduledAppointmentsOpen, setScheduledAppointmentsOpen] = useState(false);
  const [patientsAttendedOpen, setPatientsAttendedOpen] = useState(false);
  const [patientHistoryOpen, setPatientHistoryOpen] = useState(false);
  const [newMedicalHistoryOpen, setNewMedicalHistoryOpen] = useState(false);
  const [clientSearchOpen, setClientSearchOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [billingOpen, setBillingOpen] = useState(false);
  const [securityAuditOpen, setSecurityAuditOpen] = useState(false);
  const [vaccineControlOpen, setVaccineControlOpen] = useState(false);
  const [telemedicineOpen, setTelemedicineOpen] = useState(false);
  const [virtualAssistantOpen, setVirtualAssistantOpen] = useState(false);

  const { dailyStats, isLoading: statsLoading } = useDailyStats();
  const { todayPatients, isLoading: patientsLoading } = useTodayPatients();

  const menuItems = [
    {
      title: "Gestión de Citas",
      icon: Calendar,
      items: [
        { name: "Nueva Cita", onClick: () => setNewAppointmentOpen(true), icon: Plus },
        { name: "Citas Programadas", onClick: () => setScheduledAppointmentsOpen(true), icon: Clock },
      ]
    },
    {
      title: "Gestión de Pacientes",
      icon: Users,
      items: [
        { name: "Buscar Cliente", onClick: () => setClientSearchOpen(true), icon: Search },
        { name: "Pacientes Atendidos", onClick: () => setPatientsAttendedOpen(true), icon: UserCheck },
        { name: "Historial Médico", onClick: () => setPatientHistoryOpen(true), icon: FileText },
        { name: "Nuevo Historial", onClick: () => setNewMedicalHistoryOpen(true), icon: Plus },
      ]
    },
    {
      title: "Servicios y Facturación",
      icon: DollarSign,
      items: [
        { name: "Servicios", onClick: () => setServicesOpen(true), icon: Activity },
        { name: "Facturación", onClick: () => setBillingOpen(true), icon: DollarSign },
      ]
    },
    {
      title: "Inventario",
      icon: Package,
      items: [
        { name: "Gestión de Stock", onClick: () => setStockOpen(true), icon: Package },
      ]
    },
    {
      title: "Funciones Avanzadas",
      icon: Bot,
      items: [
        { name: "Control de Vacunas", onClick: () => setVaccineControlOpen(true), icon: Syringe },
        { name: "Telemedicina", onClick: () => setTelemedicineOpen(true), icon: Video },
        { name: "Asistente Virtual", onClick: () => setVirtualAssistantOpen(true), icon: Bot },
        { name: "Auditoría de Seguridad", onClick: () => setSecurityAuditOpen(true), icon: Shield },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        onConfigClick={() => setConfigOpen(true)}
        onCallClick={() => setContactOpen(true)}
        onUserManagementClick={() => setUserManagementOpen(true)}
        onUserProfileClick={() => setUserProfileOpen(true)}
      />
      
      <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard 
            title="Citas Hoy" 
            value={statsLoading ? "..." : dailyStats.appointments} 
            icon={Calendar} 
            color="blue" 
          />
          <StatsCard 
            title="Pacientes Activos" 
            value={statsLoading ? "..." : dailyStats.activePatients} 
            icon={Users} 
            color="green" 
          />
          <StatsCard 
            title="Cirugías Programadas" 
            value={statsLoading ? "..." : dailyStats.surgeries} 
            icon={Activity} 
            color="orange" 
          />
          <StatsCard 
            title="Items en Stock" 
            value={statsLoading ? "..." : dailyStats.stockItems} 
            icon={Package} 
            color="purple" 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu de Navegación */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Menú Principal</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {menuItems.map((section, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center space-x-2 pb-2 border-b border-gray-100">
                      <section.icon className="w-5 h-5 text-gray-600" />
                      <h3 className="font-semibold text-gray-900">{section.title}</h3>
                    </div>
                    <div className="space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <button
                          key={itemIndex}
                          onClick={item.onClick}
                          className="w-full flex items-center space-x-3 p-3 text-left text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors group"
                        >
                          <item.icon className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                          <span className="text-sm font-medium">{item.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar derecho */}
          <div className="space-y-6">
            {/* Próximas Citas */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Próximas Citas</h3>
              <div className="space-y-3">
                <AppointmentCard 
                  petName="Luna" 
                  ownerName="María García" 
                  time="10:00 AM" 
                  service="Consulta General" 
                />
                <AppointmentCard 
                  petName="Max" 
                  ownerName="Carlos López" 
                  time="11:30 AM" 
                  service="Vacunación" 
                />
                <AppointmentCard 
                  petName="Bella" 
                  ownerName="Ana Martínez" 
                  time="2:00 PM" 
                  service="Cirugía Menor" 
                />
              </div>
            </div>

            {/* Pacientes de Hoy */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pacientes de Hoy</h3>
              <div className="space-y-3">
                {patientsLoading ? (
                  <div className="text-sm text-gray-500">Cargando...</div>
                ) : (
                  todayPatients.map((patient, index) => (
                    <PatientCard 
                      key={index}
                      name={patient.name} 
                      species={patient.species} 
                      lastVisit={patient.lastVisit} 
                      status={patient.status} 
                    />
                  ))
                )}
              </div>
            </div>

            {/* Inventario Crítico */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Stock Crítico</h3>
              <div className="space-y-3">
                <InventoryItem name="Vacuna Rabia" quantity={3} minStock={10} />
                <InventoryItem name="Antibiótico XYZ" quantity={5} minStock={15} />
                <InventoryItem name="Analgésico ABC" quantity={2} minStock={8} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Modals */}
      <NewAppointmentModal 
        isOpen={newAppointmentOpen} 
        onClose={() => setNewAppointmentOpen(false)} 
      />
      <StockModal 
        isOpen={stockOpen} 
        onClose={() => setStockOpen(false)} 
      />
      <ConfigModal 
        isOpen={configOpen} 
        onClose={() => setConfigOpen(false)} 
      />
      <ContactModal 
        isOpen={contactOpen} 
        onClose={() => setContactOpen(false)} 
      />
      <UserManagementModal 
        isOpen={userManagementOpen} 
        onClose={() => setUserManagementOpen(false)} 
      />
      <UserProfileModal 
        isOpen={userProfileOpen} 
        onClose={() => setUserProfileOpen(false)} 
      />
      <ScheduledAppointmentsModal 
        isOpen={scheduledAppointmentsOpen} 
        onClose={() => setScheduledAppointmentsOpen(false)} 
      />
      <PatientsAttendedModal 
        isOpen={patientsAttendedOpen} 
        onClose={() => setPatientsAttendedOpen(false)} 
      />
      <PatientHistoryModal 
        isOpen={patientHistoryOpen} 
        onClose={() => setPatientHistoryOpen(false)} 
      />
      <NewMedicalHistoryModal 
        isOpen={newMedicalHistoryOpen} 
        onClose={() => setNewMedicalHistoryOpen(false)} 
      />
      <ClientSearchModal 
        isOpen={clientSearchOpen} 
        onClose={() => setClientSearchOpen(false)} 
      />
      <ServicesModal 
        isOpen={servicesOpen} 
        onClose={() => setServicesOpen(false)} 
      />
      <BillingModal 
        isOpen={billingOpen} 
        onClose={() => setBillingOpen(false)} 
      />
      <SecurityAuditModal 
        isOpen={securityAuditOpen} 
        onClose={() => setSecurityAuditOpen(false)} 
      />
      <VaccineControlModal 
        isOpen={vaccineControlOpen} 
        onClose={() => setVaccineControlOpen(false)} 
      />
      <TelemedicineModal 
        isOpen={telemedicineOpen} 
        onClose={() => setTelemedicineOpen(false)} 
      />
      <VirtualAssistantModal 
        isOpen={virtualAssistantOpen} 
        onClose={() => setVirtualAssistantOpen(false)} 
      />
    </div>
  );
};

export default Index;
