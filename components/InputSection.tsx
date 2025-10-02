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
}

const InputSection: React.FC<InputSectionProps> = ({ inputs, onInputChange, onSaveCalculation, remainingSaves }) => {
  const needsAd = remainingSaves <= 0;
  
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

        <CurrencyInput
          label="Item Sale Price (ex. VAT)"
          name="salePrice"
          value={inputs.salePrice}
          onChange={onInputChange}
          helperText="The price you list the item for, before VAT."
        />
        <CurrencyInput
          label="Total Item Cost"
          name="itemCost"
          value={inputs.itemCost}
          onChange={onInputChange}
          helperText="Your cost for the item (what you paid for it)."
        />
        <CurrencyInput
          label="Shipping Charge to Customer"
          name="shippingCharge"
          value={inputs.shippingCharge}
          onChange={onInputChange}
          helperText="How much the customer pays for shipping."
        />
        <CurrencyInput
          label="Actual Shipping Cost"
          name="shippingCost"
          value={inputs.shippingCost}
          onChange={onInputChange}
          helperText="Your actual cost to ship the item."
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
              className="block w-full rounded-md border-slate-300 bg-white pr-8 pl-4 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="20"
              value={inputs.vatPercentage}
              onChange={onInputChange}
              step="0.01"
              min="0"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 pr-3 flex items-center">
              <span className="text-slate-500 sm:text-sm">%</span>
            </div>
          </div>
          <p className="mt-2 text-xs text-slate-500">Standard UK VAT is 20%.</p>
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
          className={`w-full sm:w-auto px-6 py-3 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${needsAd ? 'bg-teal-600 hover:bg-teal-700 focus:ring-teal-500' : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'}`}
          aria-label="Save current calculation to history"
        >
          {needsAd ? 'Watch Ad to Save' : 'Save Calculation to History'}
        </button>
        {!needsAd && (
            <p className="mt-2 text-xs text-slate-500">
                You have {remainingSaves} free {remainingSaves === 1 ? 'save' : 'saves'} remaining.
            </p>
        )}
      </div>
    </div>
  );
};

export default InputSection;