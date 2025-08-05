
import { useState, useEffect } from 'react';

interface DailyStats {
  consultationHours: number;
  patientsAttended: number;
  scheduledAppointments: number;
  activeAlerts: number;
  todayStart: string;
}

export const useDailyStats = () => {
  const [stats, setStats] = useState<DailyStats>(() => {
    const today = new Date().toDateString();
    const saved = localStorage.getItem(`dailyStats_${today}`);
    
    if (saved) {
      return JSON.parse(saved);
    }
    
    return {
      consultationHours: 0,
      patientsAttended: 10, // Valor inicial basado en los datos existentes
      scheduledAppointments: 7,
      activeAlerts: 5,
      todayStart: today
    };
  });

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);

  // Guardar en localStorage cada vez que cambien las stats
  useEffect(() => {
    const today = new Date().toDateString();
    localStorage.setItem(`dailyStats_${today}`, JSON.stringify(stats));
  }, [stats]);

  // Verificar si es un nuevo día
  useEffect(() => {
    const checkNewDay = () => {
      const today = new Date().toDateString();
      if (today !== stats.todayStart) {
        // Nuevo día - reiniciar stats
        setStats({
          consultationHours: 0,
          patientsAttended: 0,
          scheduledAppointments: 0,
          activeAlerts: 5, // Las alertas pueden persistir
          todayStart: today
        });
        setIsTimerRunning(false);
      }
    };

    const interval = setInterval(checkNewDay, 60000); // Check cada minuto
    return () => clearInterval(interval);
  }, [stats.todayStart]);

  const startTimer = () => {
    if (!isTimerRunning) {
      setIsTimerRunning(true);
      const interval = setInterval(() => {
        setStats(prev => ({
          ...prev,
          consultationHours: prev.consultationHours + (1/3600) // 1 segundo = 1/3600 horas
        }));
      }, 1000);
      setTimerInterval(interval);
    }
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  };

  const addPatient = () => {
    setStats(prev => ({
      ...prev,
      patientsAttended: prev.patientsAttended + 1
    }));
  };

  const updateScheduledAppointments = (count: number) => {
    setStats(prev => ({
      ...prev,
      scheduledAppointments: count
    }));
  };

  const updateActiveAlerts = (count: number) => {
    setStats(prev => ({
      ...prev,
      activeAlerts: count
    }));
  };

  const formatHours = (hours: number) => {
    const totalMinutes = Math.floor(hours * 60);
    const displayHours = Math.floor(totalMinutes / 60);
    const displayMinutes = totalMinutes % 60;
    return `${displayHours}h ${displayMinutes}m`;
  };

  return {
    stats,
    isTimerRunning,
    startTimer,
    stopTimer,
    addPatient,
    updateScheduledAppointments,
    updateActiveAlerts,
    formatHours
  };
};
