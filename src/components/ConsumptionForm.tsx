import React from 'react';
import { useForm } from 'react-hook-form';
import { ConsumptionData } from '../types';

interface ConsumptionFormProps {
  onSubmit: (data: ConsumptionData[]) => void;
}

export const ConsumptionForm: React.FC<ConsumptionFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const values = watch();

  const calculateTotal = () => {
    return Object.values(values).reduce((acc: number, val: string) => acc + (Number(val) || 0), 0);
  };

  const onFormSubmit = (data: any) => {
    const consumptionData: ConsumptionData[] = Object.entries(data).map(([month, consumption]) => ({
      id: Math.random().toString(36).substr(2, 9),
      month,
      consumption: Number(consumption)
    }));
    onSubmit(consumptionData);
  };

  const months = [
    'Ene-Feb', 'Mar-Abr', 'May-Jun',
    'Jul-Ago', 'Sep-Oct', 'Nov-Dic'
  ];

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {months.map((month) => (
          <div key={month} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {month}
            </label>
            <input
              type="number"
              {...register(month, { required: true, min: 0 })}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="kWh"
            />
            {errors[month] && (
              <span className="text-red-500 text-sm">Este campo es requerido</span>
            )}
          </div>
        ))}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-lg font-semibold">
          Consumo Total Anual: {calculateTotal().toFixed(2)} kWh
        </p>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Calcular
      </button>
    </form>
  );
};