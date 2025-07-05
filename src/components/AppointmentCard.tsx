
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
    pending: 'bg-gray-100 text-gray-800 border-gray-200',
    confirmed: 'bg-gray-200 text-gray-900 border-gray-300',
    completed: 'bg-gray-800 text-white border-gray-900'
  };

  const statusLabels = {
    pending: 'Pendiente',
    confirmed: 'Confirmada',
    completed: 'Completada'
  };

  return (
    <div className={`bg-white rounded-lg border-l-4 ${urgent ? 'border-l-black' : 'border-l-gray-600'} shadow-sm p-4 hover:shadow-md transition-shadow`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-900">{time}</span>
          {urgent && (
            <span className="px-2 py-1 text-xs font-medium bg-black text-white rounded-full">
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
            <p className="font-medium text-gray-900">{petName}</p>
            <p className="text-sm text-gray-600">{type}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <User className="w-4 h-4" />
          <span>{ownerName}</span>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
