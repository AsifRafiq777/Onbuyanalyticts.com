import React from 'react';
import { CalculationHistoryItem, UserInputs } from '../types';
import HistoryItem from './HistoryItem';

interface HistorySectionProps {
  history: CalculationHistoryItem[];
  onLoadCalculation: (inputs: UserInputs) => void;
  onClearHistory: () => void;
  onExportHistory: () => void;
}

const HistorySection: React.FC<HistorySectionProps> = ({ history, onLoadCalculation, onClearHistory, onExportHistory }) => {
  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-10 mt-8">
      <div className="flex justify-between items-center border-b border-slate-300 pb-3 mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          Calculation History
        </h2>
        {history.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={onExportHistory}
              className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              aria-label="Export all saved calculations"
              title="Export history to CSV or Google Sheets"
            >
              Export History
            </button>
            <button
              onClick={onClearHistory}
              className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              aria-label="Clear all saved calculations from history"
            >
              Clear History
            </button>
          </div>
        )}
      </div>
      {history.length === 0 ? (
        <p className="text-slate-500 text-center py-4">Your saved calculations will appear here.</p>
      ) : (
        <ul className="space-y-4">
          {history.map(item => (
            <HistoryItem key={item.id} item={item} onLoad={onLoadCalculation} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistorySection;