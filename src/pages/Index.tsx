
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

  const { stats } = useDailyStats();
  const { todayPatients } = useTodayPatients();

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

  const handleClientSelect = (client: any) => {
    console.log('Cliente seleccionado:', client);
    setClientSearchOpen(false);
  };

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
            value={stats.scheduledAppointments.toString()} 
            change="+2 desde ayer"
            trend="up"
            icon={Calendar} 
            color="blue" 
          />
          <StatsCard 
            title="Pacientes Activos" 
            value={stats.patientsAttended.toString()} 
            change="+5 esta semana"
            trend="up"
            icon={Users} 
            color="green" 
          />
          <StatsCard 
            title="Horas de Consulta" 
            value={Math.floor(stats.consultationHours).toString()} 
            change="Tiempo activo"
            trend="neutral"
            icon={Activity} 
            color="orange" 
          />
          <StatsCard 
            title="Alertas Activas" 
            value={stats.activeAlerts.toString()} 
            change="Requieren atención"
            trend="down"
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
                  type="Consulta General"
                  status="confirmed"
                />
                <AppointmentCard 
                  petName="Max" 
                  ownerName="Carlos López" 
                  time="11:30 AM" 
                  type="Vacunación"
                  status="pending"
                />
                <AppointmentCard 
                  petName="Bella" 
                  ownerName="Ana Martínez" 
                  time="2:00 PM" 
                  type="Cirugía Menor"
                  status="confirmed"
                />
              </div>
            </div>

            {/* Pacientes de Hoy */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pacientes de Hoy</h3>
              <div className="space-y-3">
                {todayPatients.map((patient, index) => (
                  <PatientCard 
                    key={index}
                    name={patient.name} 
                    species={patient.species} 
                    breed={patient.breed}
                    age={patient.age}
                    owner={patient.owner}
                    lastVisit={patient.lastVisit} 
                    nextVaccine={patient.nextVaccine}
                    urgent={patient.urgent}
                  />
                ))}
              </div>
            </div>

            {/* Inventario Crítico */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Stock Crítico</h3>
              <div className="space-y-3">
                <InventoryItem 
                  name="Vacuna Rabia" 
                  category="Vacunas"
                  stock={3} 
                  minStock={10} 
                  expiryDate="30 Dic 2024"
                  price={25.99}
                />
                <InventoryItem 
                  name="Antibiótico XYZ" 
                  category="Medicamentos"
                  stock={5} 
                  minStock={15} 
                  expiryDate="15 Feb 2025"
                  price={18.50}
                />
                <InventoryItem 
                  name="Analgésico ABC" 
                  category="Medicamentos"
                  stock={2} 
                  minStock={8} 
                  expiryDate="10 Mar 2025"
                  price={12.75}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Modals */}
      <NewAppointmentModal 
        open={newAppointmentOpen} 
        onOpenChange={setNewAppointmentOpen} 
      />
      <StockModal 
        open={stockOpen} 
        onOpenChange={setStockOpen} 
      />
      <ConfigModal 
        open={configOpen} 
        onOpenChange={setConfigOpen} 
      />
      <ContactModal 
        open={contactOpen} 
        onOpenChange={setContactOpen} 
      />
      <UserManagementModal 
        open={userManagementOpen} 
        onOpenChange={setUserManagementOpen} 
      />
      <UserProfileModal 
        open={userProfileOpen} 
        onOpenChange={setUserProfileOpen} 
      />
      <ScheduledAppointmentsModal 
        open={scheduledAppointmentsOpen} 
        onOpenChange={setScheduledAppointmentsOpen} 
      />
      <PatientsAttendedModal 
        open={patientsAttendedOpen} 
        onOpenChange={setPatientsAttendedOpen} 
      />
      <PatientHistoryModal 
        open={patientHistoryOpen} 
        onOpenChange={setPatientHistoryOpen} 
      />
      <NewMedicalHistoryModal 
        open={newMedicalHistoryOpen} 
        onOpenChange={setNewMedicalHistoryOpen} 
      />
      <ClientSearchModal 
        open={clientSearchOpen} 
        onOpenChange={setClientSearchOpen}
        onClientSelect={handleClientSelect}
        title="Buscar Cliente"
      />
      <ServicesModal 
        open={servicesOpen} 
        onOpenChange={setServicesOpen} 
      />
      <BillingModal 
        open={billingOpen} 
        onOpenChange={setBillingOpen} 
      />
      <SecurityAuditModal 
        open={securityAuditOpen} 
        onOpenChange={setSecurityAuditOpen} 
      />
      <VaccineControlModal 
        open={vaccineControlOpen} 
        onOpenChange={setVaccineControlOpen} 
      />
      <TelemedicineModal 
        open={telemedicineOpen} 
        onOpenChange={setTelemedicineOpen} 
      />
      <VirtualAssistantModal 
        open={virtualAssistantOpen} 
        onOpenChange={setVirtualAssistantOpen} 
      />
    </div>
  );
};

export default Index;
