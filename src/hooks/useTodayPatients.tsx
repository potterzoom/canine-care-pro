
import { useState, useEffect } from 'react';

interface RecentPatient {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  owner: string;
  lastVisit: string;
  nextVaccine: string;
  timestamp: number;
  urgent?: boolean;
}

export const useTodayPatients = () => {
  const [todayPatients, setTodayPatients] = useState<RecentPatient[]>(() => {
    const today = new Date().toDateString();
    const saved = localStorage.getItem(`todayPatients_${today}`);
    
    if (saved) {
      return JSON.parse(saved);
    }
    
    // Pacientes iniciales para el día
    return [
      {
        id: '1',
        name: "Buddy",
        species: "Perro",
        breed: "Golden Retriever",
        age: "3 años",
        owner: "Ana López",
        lastVisit: new Date().toLocaleDateString('es-ES'),
        nextVaccine: "15 Dic 2024",
        timestamp: Date.now() - 3600000 // 1 hora atrás
      },
      {
        id: '2',
        name: "Whiskers",
        species: "Gato",
        breed: "Persa",
        age: "2 años",
        owner: "Pedro Silva",
        lastVisit: new Date().toLocaleDateString('es-ES'),
        nextVaccine: "10 Ene 2025",
        urgent: true,
        timestamp: Date.now() - 1800000 // 30 minutos atrás
      }
    ];
  });

  // Verificar si es un nuevo día y limpiar pacientes
  useEffect(() => {
    const checkNewDay = () => {
      const today = new Date().toDateString();
      const lastSaved = localStorage.getItem('lastPatientsCheck');
      
      if (lastSaved !== today) {
        setTodayPatients([]);
        localStorage.setItem('lastPatientsCheck', today);
        localStorage.removeItem(`todayPatients_${lastSaved}`);
      }
    };

    checkNewDay();
    const interval = setInterval(checkNewDay, 60000); // Check cada minuto
    return () => clearInterval(interval);
  }, []);

  // Guardar en localStorage cada vez que cambien los pacientes
  useEffect(() => {
    const today = new Date().toDateString();
    localStorage.setItem(`todayPatients_${today}`, JSON.stringify(todayPatients));
  }, [todayPatients]);

  const addPatient = (patient: Omit<RecentPatient, 'id' | 'timestamp' | 'lastVisit'>) => {
    const newPatient: RecentPatient = {
      ...patient,
      id: Date.now().toString(),
      timestamp: Date.now(),
      lastVisit: new Date().toLocaleDateString('es-ES')
    };

    setTodayPatients(prev => {
      // Agregar al inicio y mantener solo los últimos 10
      const updated = [newPatient, ...prev].slice(0, 10);
      return updated;
    });
  };

  const getRecentPatients = (limit: number = 5) => {
    return todayPatients
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);
  };

  const getPatientCount = () => {
    return todayPatients.length;
  };

  return {
    todayPatients,
    addPatient,
    getRecentPatients,
    getPatientCount
  };
};
