import React from 'react';
import { Clock, Power } from 'lucide-react';

interface InstallationTypeProps {
  onSelect: (type: 'grid' | 'isolated') => void;
}

export const InstallationType: React.FC<InstallationTypeProps> = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      <button
        onClick={() => onSelect('grid')}
        className="flex flex-col items-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
      >
        <Power className="w-16 h-16 text-black mb-4" />
        <h3 className="text-xl font-bold text-gray-800">Instalación Solar Interconectada</h3>
        <p className="mt-2 text-gray-600 text-center">
          Conectada a la red eléctrica para mayor eficiencia
        </p>
      </button>

      <div className="flex flex-col items-center p-8 bg-gray-100 rounded-xl opacity-75">
        <Clock className="w-16 h-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-bold text-gray-400">Instalación Solar Aislada</h3>
        <p className="mt-2 text-gray-500 text-center">Próximamente</p>
      </div>
    </div>
  );
};