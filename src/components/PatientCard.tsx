
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
}

const PatientCard = ({ 
  name, 
  species, 
  breed, 
  age, 
  owner, 
  lastVisit, 
  nextVaccine,
  urgent = false 
}: PatientCardProps) => {
  const speciesEmoji = species.toLowerCase().includes('perro') ? '🐕' : 
                      species.toLowerCase().includes('gato') ? '🐱' : '🐾';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{speciesEmoji}</div>
          <div>
            <h3 className="font-semibold text-slate-800">{name}</h3>
            <p className="text-sm text-slate-600">{breed} • {age}</p>
          </div>
        </div>
        {urgent && (
          <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
            Vacuna Vencida
          </span>
        )}
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center space-x-2 text-slate-600">
          <Phone className="w-4 h-4" />
          <span>{owner}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-slate-600">
          <Calendar className="w-4 h-4" />
          <span>Última visita: {lastVisit}</span>
        </div>
        
        {nextVaccine && (
          <div className="flex items-center space-x-2 text-amber-600">
            <span>💉</span>
            <span>Próxima vacuna: {nextVaccine}</span>
          </div>
        )}
      </div>
      
      <div className="mt-4 flex space-x-2">
        <button className="flex-1 px-3 py-2 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
          Ver Historia
        </button>
        <button className="px-3 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
          Contactar
        </button>
      </div>
    </div>
  );
};

export default PatientCard;
