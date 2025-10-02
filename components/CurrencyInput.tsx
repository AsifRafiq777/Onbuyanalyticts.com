import React from 'react';

interface CurrencyInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  helperText?: string;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({ label, name, value, onChange, helperText }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
          <span className="text-slate-500 sm:text-sm">£</span>
        </div>
        <input
          type="number"
          name={name}
          id={name}
          className="block w-full rounded-md border-slate-300 bg-white pl-7 pr-4 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="0.00"
          value={value}
          onChange={onChange}
          step="0.01"
          min="0"
        />
      </div>
      {helperText && <p className="mt-2 text-xs text-slate-500">{helperText}</p>}
    </div>
  );
};

export default CurrencyInput;