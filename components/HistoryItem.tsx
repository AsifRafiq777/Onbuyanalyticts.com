import React from 'react';
import { CalculationHistoryItem, UserInputs } from '../types';

interface HistoryItemProps {
  item: CalculationHistoryItem;
  onLoad: (inputs: UserInputs) => void;
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
}

const formatCurrency = (value: number) => `£${value.toFixed(2)}`;

const HistoryItem: React.FC<HistoryItemProps> = ({ item, onLoad, isSelected, onToggleSelect }) => {
  const isProfit = item.results.netProfit >= 0;
  const displayName = item.inputs.itemName || 'Unnamed Calculation';
  const hasItemName = !!item.inputs.itemName;

  return (
    <li className={`flex items-center p-4 rounded-lg ring-1 ring-slate-200 hover:shadow-md transition-shadow duration-200 ${isProfit ? 'bg-green-50' : 'bg-red-50'}`}>
      <div className="flex items-center mr-4">
        <input
          type="checkbox"
          className="h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 cursor-pointer"
          checked={isSelected}
          onChange={() => onToggleSelect(item.id)}
          aria-label={`Select calculation ${displayName}`}
        />
      </div>
      <div className="flex-grow overflow-hidden pr-4">
        <p className="font-semibold text-slate-800 truncate max-w-md">
          <span
            title={displayName}
            className={!hasItemName ? 'italic text-slate-500' : ''}
          >
            {displayName}
          </span>
        </p>
        <p className="text-xs text-slate-500">{item.timestamp}</p>
        <p className="font-medium text-slate-800 mt-1">
          Total Revenue: {formatCurrency(item.results.totalRevenue)}
        </p>
        <p className={`font-bold ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
          Net Profit: {formatCurrency(item.results.netProfit)}
        </p>
      </div>
      <button
        onClick={() => onLoad(item.inputs)}
        className="flex-shrink-0 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        aria-label={`Load calculation for ${displayName} from ${item.timestamp}`}
      >
        Load
      </button>
    </li>
  );
};

export default HistoryItem;