
import React from 'react';
import { Calendar, User } from 'lucide-react';

interface AppointmentCardProps {
  time: string;
  petName: string;
  ownerName: string;
  type: string;
  status: 'pending' | 'confirmed' | 'completed';
  urgent?: boolean;
}

const AppointmentCard = ({ 
  time, 
  petName, 
  ownerName, 
  type, 
  status, 
  urgent = false 
}: AppointmentCardProps) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
    completed: 'bg-green-100 text-green-800 border-green-200'
  };

  const statusLabels = {
    pending: 'Pendiente',
    confirmed: 'Confirmada',
    completed: 'Completada'
  };

  return (
    <div className={`bg-white rounded-lg border-l-4 ${urgent ? 'border-l-red-500' : 'border-l-green-500'} shadow-sm p-4 hover:shadow-md transition-shadow`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-slate-500" />
          <span className="text-sm font-medium text-slate-800">{time}</span>
          {urgent && (
            <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
              URGENTE
            </span>
          )}
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${statusColors[status]}`}>
          {statusLabels[status]}
        </span>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <span className="text-lg">🐕</span>
          <div>
            <p className="font-medium text-slate-800">{petName}</p>
            <p className="text-sm text-slate-600">{type}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-slate-600">
          <User className="w-4 h-4" />
          <span>{ownerName}</span>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
