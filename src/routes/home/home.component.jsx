import React, { useState } from "react";
import { InstallationType } from "../../components/directory/InstallationType.component";
import { ConsumptionForm } from "../../components/ConsumptionForm";
import { Results } from "../../components/Results";
import { Navigation } from "../navigation/navigation.component";

export const Home = () => {
  const [step, setStep] = useState(1);
  const [installationType, setInstallationType] = useState(null);
  const [panelPower, setPanelPower] = useState(595); // Default panel power in watts
  const [solarConstant, setSolarConstant] = useState(4.1);
  const [calculation, setCalculation] = useState(null);

  const handleInstallationSelect = (type) => {
    setInstallationType(type);
    setStep(2);
  };

  const calculateSolarSystem = (consumptionData) => {
    const totalConsumption = consumptionData.reduce(
      (sum, data) => sum + data.consumption,
      0
    );
    const dailyConsumption = totalConsumption / 365;
    const hourlyConsumption = dailyConsumption / solarConstant;
    const requiredPanels = Math.ceil((hourlyConsumption * 1000) / panelPower);
    const inverterSize = Math.ceil(hourlyConsumption);

    const newCalculation = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      consumptionData,
      panelPower,
      totalConsumption,
      dailyConsumption,
      hourlyConsumption,
      requiredPanels,
      inverterSize,
      solarConstant,
    };

    setCalculation(newCalculation);
    setStep(3);
  };

  const handleSaveCalculation = (calc) => {
    const savedCalculations = JSON.parse(
      localStorage.getItem("solarCalculations") || "[]"
    );
    savedCalculations.push(calc);
    localStorage.setItem(
      "solarCalculations",
      JSON.stringify(savedCalculations)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <header className="bg-black text-white p-4">
        <div className="container mx-auto flex items-center gap-3">
          <img src={logo1} alt="Logo" className="logo" />
        </div>
      </header> */}

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">
                Selecciona el tipo de instalación
              </h2>
              <InstallationType onSelect={handleInstallationSelect} />
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">
                Ingresa tu consumo bimestral
              </h2>
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
              <h2 className="text-2xl font-bold mb-6">
                Resultados del cálculo
              </h2>
              <Results
                calculation={calculation}
                onSave={handleSaveCalculation}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
