import React, { useState, useEffect } from 'react';
import { CalculationHistoryItem, UserInputs } from '../types';
import HistoryItem from './HistoryItem';

interface HistorySectionProps {
  history: CalculationHistoryItem[];
  onLoadCalculation: (inputs: UserInputs) => void;
  onClearHistory: () => void;
  onExportHistory: (ids?: number[]) => void;
  onDeleteHistoryItems: (ids: number[]) => void;
}

const HistorySection: React.FC<HistorySectionProps> = ({ 
  history, 
  onLoadCalculation, 
  onClearHistory, 
  onExportHistory,
  onDeleteHistoryItems
}) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Reset selection if history changes (e.g. external clear)
  useEffect(() => {
    setSelectedIds(prev => prev.filter(id => history.some(h => h.id === id)));
  }, [history]);

  const toggleSelect = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === history.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(history.map(h => h.id));
    }
  };

  const handleDeleteSelected = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedIds.length} selected items?`)) {
      onDeleteHistoryItems(selectedIds);
      setSelectedIds([]);
    }
  };

  const handleExportSelected = () => {
    onExportHistory(selectedIds);
  };

  const hasSelection = selectedIds.length > 0;
  const isAllSelected = history.length > 0 && selectedIds.length === history.length;

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-10 mt-8">
      <div className="flex flex-col md:flex-row justify-between items-center border-b border-slate-300 pb-3 mb-6 gap-4">
        <h2 className="text-xl font-bold text-slate-900">
          Calculation History
        </h2>
        
        {history.length > 0 && (
          <div className="flex flex-wrap justify-center items-center gap-2">
             {hasSelection ? (
               <>
                <span className="text-sm text-slate-600 mr-2 font-medium">
                  {selectedIds.length} selected
                </span>
                <button
                  onClick={handleExportSelected}
                  className="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Export Selected
                </button>
                <button
                  onClick={handleDeleteSelected}
                  className="px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete Selected
                </button>
                <button
                  onClick={() => setSelectedIds([])}
                  className="px-3 py-1.5 bg-slate-200 text-slate-700 text-xs font-medium rounded-md hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                >
                  Cancel
                </button>
               </>
             ) : (
               <>
                <button
                  onClick={toggleSelectAll}
                  className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-medium rounded-md hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                >
                  Select All
                </button>
                <button
                  onClick={() => onExportHistory()}
                  className="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Export All
                </button>
                <button
                  onClick={onClearHistory}
                  className="px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Clear All
                </button>
               </>
             )}
          </div>
        )}
      </div>
      
      {history.length === 0 ? (
        <p className="text-slate-500 text-center py-4">Your saved calculations will appear here.</p>
      ) : (
        <ul className="space-y-4">
          {history.map(item => (
            <HistoryItem 
              key={item.id} 
              item={item} 
              onLoad={onLoadCalculation} 
              isSelected={selectedIds.includes(item.id)}
              onToggleSelect={toggleSelect}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistorySection;