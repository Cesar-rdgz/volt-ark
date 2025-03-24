import React from 'react';
import { Download, Share2 } from 'lucide-react';
import { SolarCalculation } from '../types';
import { jsPDF } from 'jspdf';

interface ResultsProps {
  calculation: SolarCalculation;
  onSave: (calculation: SolarCalculation) => void;
}

export const Results: React.FC<ResultsProps> = ({ calculation, onSave }) => {
  const handleExportPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(16);
    doc.text('Resultados del Cálculo Solar', 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Consumo Diario: ${calculation.dailyConsumption.toFixed(2)} kWh`, 20, 40);
    doc.text(`Consumo por Hora: ${calculation.hourlyConsumption.toFixed(2)} kWh`, 20, 50);
    doc.text(`Paneles Necesarios: ${calculation.requiredPanels}`, 20, 60);
    doc.text(`Capacidad del Inversor: ${calculation.inverterSize} kW`, 20, 70);
    
    doc.save('calculo-solar.pdf');
  };

  const handleShare = async () => {
    const text = `
      Resultados del Cálculo Solar:
      - Consumo Diario: ${calculation.dailyConsumption.toFixed(2)} kWh
      - Consumo por Hora: ${calculation.hourlyConsumption.toFixed(2)} kWh
      - Paneles Necesarios: ${calculation.requiredPanels}
      - Capacidad del Inversor: ${calculation.inverterSize} kW
    `;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Cálculo Solar',
          text: text
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900">Consumo Diario</h3>
          <p className="text-2xl font-bold text-blue-600">
            {calculation.dailyConsumption.toFixed(2)} kWh
          </p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-green-900">Consumo por Hora</h3>
          <p className="text-2xl font-bold text-green-600">
            {calculation.hourlyConsumption.toFixed(2)} kWh
          </p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-900">Paneles Necesarios</h3>
          <p className="text-2xl font-bold text-purple-600">
            {calculation.requiredPanels}
          </p>
        </div>
        
        <div className="bg-orange-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-orange-900">Capacidad del Inversor</h3>
          <p className="text-2xl font-bold text-orange-600">
            {calculation.inverterSize} kW
          </p>
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleExportPDF}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Download size={20} />
          Exportar PDF
        </button>
        
        <button
          onClick={handleShare}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          <Share2 size={20} />
          Compartir
        </button>
      </div>
    </div>
  );
};