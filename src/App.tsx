import React, { useState } from 'react';
import { InstallationType } from './components/InstallationType';
import { ConsumptionForm } from './components/ConsumptionForm';
import { Results } from './components/Results';
import { ConsumptionData, SolarCalculation } from './types';
import { Sun } from 'lucide-react';
import logo from './assets/logo.svg';
import logo1 from './assets/logo1.png';


function App() {
  const [step, setStep] = useState(1);
  const [installationType, setInstallationType] = useState<'grid' | 'isolated' | null>(null);
  const [panelPower, setPanelPower] = useState(595); // Default panel power in watts
  const [solarConstant, setSolarConstant] = useState(4.1);
  const [calculation, setCalculation] = useState<SolarCalculation | null>(null);

  const handleInstallationSelect = (type: 'grid' | 'isolated') => {
    setInstallationType(type);
    setStep(2);
  };

  const calculateSolarSystem = (consumptionData: ConsumptionData[]) => {
    const totalConsumption = consumptionData.reduce((sum, data) => sum + data.consumption, 0);
    const dailyConsumption = totalConsumption / 365;
    const hourlyConsumption = dailyConsumption / solarConstant;
    const requiredPanels = Math.ceil((hourlyConsumption * 1000) / panelPower);
    const inverterSize = Math.ceil(hourlyConsumption);

    const newCalculation: SolarCalculation = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      consumptionData,
      panelPower,
      totalConsumption,
      dailyConsumption,
      hourlyConsumption,
      requiredPanels,
      inverterSize,
      solarConstant
    };

    setCalculation(newCalculation);
    setStep(3);
  };

  const handleSaveCalculation = (calc: SolarCalculation) => {
    const savedCalculations = JSON.parse(localStorage.getItem('solarCalculations') || '[]');
    savedCalculations.push(calc);
    localStorage.setItem('solarCalculations', JSON.stringify(savedCalculations));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-black text-white p-4">
        <div className="container mx-auto flex items-center gap-3">
          <Sun className="w-8 h-8" />
          <img src={logo1} alt="Logo" className="logo" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Selecciona el tipo de instalación</h2>
              <InstallationType onSelect={handleInstallationSelect} />
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Ingresa tu consumo bimestral</h2>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Potencia del Panel (W)
                  </label>
                  <input
                    type="number"
                    value={panelPower}
                    onChange={(e) => setPanelPower(Number(e.target.value))}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <ConsumptionForm onSubmit={calculateSolarSystem} />
              </div>
            </div>
          )}

          {step === 3 && calculation && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Resultados del cálculo</h2>
              <Results calculation={calculation} onSave={handleSaveCalculation} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;