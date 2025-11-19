import React from 'react';

interface CurrencyInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  helperText?: string;
  error?: string;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({ label, name, value, onChange, helperText, error }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent invalid characters for positive currency: 'e', 'E', '+', '-'
    if (['e', 'E', '+', '-'].includes(e.key)) {
      e.preventDefault();
    }
  };

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
          className={`block w-full rounded-md pl-7 pr-4 py-2 sm:text-sm focus:outline-none focus:ring-1 ${
            error
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-slate-300 bg-white focus:border-indigo-500 focus:ring-indigo-500'
          }`}
          placeholder="0.00"
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          step="0.01"
          min="0"
        />
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      {error ? (
        <p className="mt-2 text-xs text-red-600" id={`${name}-error`}>{error}</p>
      ) : (
        helperText && <p className="mt-2 text-xs text-slate-500">{helperText}</p>
      )}
    </div>
  );
};

export default CurrencyInput;