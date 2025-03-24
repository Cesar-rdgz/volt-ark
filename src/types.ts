export interface ConsumptionData {
  id: string;
  month: string;
  consumption: number;
}

export interface SolarCalculation {
  id: string;
  date: string;
  consumptionData: ConsumptionData[];
  panelPower: number;
  totalConsumption: number;
  dailyConsumption: number;
  hourlyConsumption: number;
  requiredPanels: number;
  inverterSize: number;
  solarConstant: number;
}