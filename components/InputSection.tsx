
import React from 'react';
import { UserInputs } from '../types';
import { CATEGORIES } from '../constants';
import CurrencyInput from './CurrencyInput';
import SelectInput from './SelectInput';

interface InputSectionProps {
  inputs: UserInputs;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSaveCalculation: () => void;
  remainingSaves: number;
  errors: Record<string, string>;
}

const InputSection: React.FC<InputSectionProps> = ({ inputs, onInputChange, onSaveCalculation, remainingSaves, errors }) => {
  const needsAd = remainingSaves <= 0;
  const hasErrors = Object.keys(errors).length > 0;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent invalid characters for numeric inputs
    if (['e', 'E', '+', '-'].includes(e.key)) {
      e.preventDefault();
    }
  };
  
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 border-b border-slate-300 pb-3 mb-6">
        Calculation Inputs
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
        <div className="sm:col-span-2">
          <label htmlFor="itemName" className="block text-sm font-medium text-slate-700">
            Item Name (Optional)
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="itemName"
              id="itemName"
              className="block w-full rounded-md border-slate-300 bg-white px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm shadow-sm"
              placeholder="e.g., 'Vintage Leather Jacket'"
              value={inputs.itemName}
              onChange={onInputChange}
            />
          </div>
          <p className="mt-2 text-xs text-slate-500">A name to identify this calculation in your history.</p>
        </div>

        <div className="sm:col-span-1">
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="salePrice" className="block text-sm font-medium text-slate-700">
              Item Sale Price
            </label>
            <div className="flex items-center bg-slate-100 rounded-lg p-0.5">
               <label className={`cursor-pointer px-2 py-0.5 text-xs rounded-md transition-colors ${!inputs.priceIncludesVat ? 'bg-white text-indigo-600 shadow-sm font-medium' : 'text-slate-500'}`}>
                  <input 
                    type="radio" 
                    name="priceIncludesVat" 
                    className="sr-only"
                    checked={!inputs.priceIncludesVat}
                    onChange={() => onInputChange({ target: { name: 'priceIncludesVat', value: 'false', type: 'checkbox', checked: false } } as any)}
                  />
                  Ex. VAT
               </label>
               <label className={`cursor-pointer px-2 py-0.5 text-xs rounded-md transition-colors ${inputs.priceIncludesVat ? 'bg-white text-indigo-600 shadow-sm font-medium' : 'text-slate-500'}`}>
                  <input 
                    type="radio" 
                    name="priceIncludesVat" 
                    className="sr-only"
                    checked={inputs.priceIncludesVat}
                    onChange={() => onInputChange({ target: { name: 'priceIncludesVat', value: 'true', type: 'checkbox', checked: true } } as any)}
                  />
                  Inc. VAT
               </label>
            </div>
          </div>
          <CurrencyInput
            label="" // Label handled above
            name="salePrice"
            value={inputs.salePrice}
            onChange={onInputChange}
            helperText={`Price you list for, ${inputs.priceIncludesVat ? 'including' : 'excluding'} VAT.`}
            error={errors.salePrice}
          />
        </div>

        <CurrencyInput
          label="Total Item Cost"
          name="itemCost"
          value={inputs.itemCost}
          onChange={onInputChange}
          helperText="Your cost for the item (what you paid for it)."
          error={errors.itemCost}
        />
        <CurrencyInput
          label="Shipping Charge to Customer"
          name="shippingCharge"
          value={inputs.shippingCharge}
          onChange={onInputChange}
          helperText="How much the customer pays for shipping."
          error={errors.shippingCharge}
        />
        <CurrencyInput
          label="Actual Shipping Cost"
          name="shippingCost"
          value={inputs.shippingCost}
          onChange={onInputChange}
          helperText="Your actual cost to ship the item."
          error={errors.shippingCost}
        />

        <div>
          <label htmlFor="vatPercentage" className="block text-sm font-medium text-slate-700">
            VAT Percentage
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="number"
              name="vatPercentage"
              id="vatPercentage"
              className={`block w-full rounded-md pr-8 pl-4 py-2 sm:text-sm focus:outline-none focus:ring-1 ${
                errors.vatPercentage
                  ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-slate-300 bg-white focus:border-indigo-500 focus:ring-indigo-500'
              }`}
              placeholder="20"
              value={inputs.vatPercentage}
              onChange={onInputChange}
              onKeyDown={handleKeyDown}
              step="0.01"
              min="0"
              max="100"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 pr-3 flex items-center">
              {errors.vatPercentage ? (
                 <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                   <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                 </svg>
              ) : (
                <span className="text-slate-500 sm:text-sm">%</span>
              )}
            </div>
          </div>
          {errors.vatPercentage ? (
            <p className="mt-2 text-xs text-red-600">{errors.vatPercentage}</p>
          ) : (
            <p className="mt-2 text-xs text-slate-500">Standard UK VAT is 20%.</p>
          )}
        </div>
        
        <div className="sm:col-span-2 mt-4">
            <SelectInput
            label="OnBuy Category"
            name="categoryId"
            value={inputs.categoryId}
            onChange={onInputChange}
            options={CATEGORIES.map(c => ({ value: c.id, label: `${c.name} (${c.feePercentage}%)` }))}
            />
        </div>
        
      </div>
      <div className="mt-8 text-center sm:text-left">
        <button
          onClick={onSaveCalculation}
          disabled={hasErrors}
          className={`w-full sm:w-auto px-6 py-3 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors 
            ${hasErrors 
                ? 'bg-slate-400 cursor-not-allowed' 
                : needsAd 
                    ? 'bg-teal-600 hover:bg-teal-700 focus:ring-teal-500' 
                    : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
            }`}
          aria-label="Save current calculation to history"
        >
          {hasErrors ? 'Fix Errors to Save' : needsAd ? 'Watch Ad to Save' : 'Save Calculation to History'}
        </button>
        {!needsAd && !hasErrors && (
            <p className="mt-2 text-xs text-slate-500">
                You have {remainingSaves} free {remainingSaves === 1 ? 'save' : 'saves'} remaining.
            </p>
        )}
      </div>
    </div>
  );
};

export default InputSection;
