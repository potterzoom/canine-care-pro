
import React from 'react';
import { Calendar, Phone } from 'lucide-react';

interface PatientCardProps {
  name: string;
  species: string;
  breed: string;
  age: string;
  owner: string;
  lastVisit: string;
  nextVaccine?: string;
  urgent?: boolean;
  onViewHistory?: () => void;
  onContact?: () => void;
}

const PatientCard = ({ 
  name, 
  species, 
  breed, 
  age, 
  owner, 
  lastVisit, 
  nextVaccine,
  urgent = false,
  onViewHistory,
  onContact
}: PatientCardProps) => {
  const speciesEmoji = species.toLowerCase().includes('perro') ? '🐕' : 
                      species.toLowerCase().includes('gato') ? '🐱' : '🐾';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{speciesEmoji}</div>
          <div>
            <h3 className="font-semibold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-600">{breed} • {age}</p>
          </div>
        </div>
        {urgent && (
          <span className="px-2 py-1 text-xs font-medium bg-black text-white rounded-full">
            Vacuna Vencida
          </span>
        )}
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center space-x-2 text-gray-600">
          <Phone className="w-4 h-4" />
          <span>{owner}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>Última visita: {lastVisit}</span>
        </div>
        
        {nextVaccine && (
          <div className="flex items-center space-x-2 text-gray-700">
            <span>💉</span>
            <span>Próxima vacuna: {nextVaccine}</span>
          </div>
        )}
      </div>
      
      <div className="mt-4 flex space-x-2">
        <button 
          onClick={onViewHistory}
          className="flex-1 px-3 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-black rounded-lg transition-colors"
        >
          Ver Historia
        </button>
        <button 
          onClick={onContact}
          className="px-3 py-2 text-sm font-medium text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          Contactar
        </button>
      </div>
    </div>
  );
};

export default PatientCard;
