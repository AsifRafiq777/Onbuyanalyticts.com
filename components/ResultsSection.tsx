import React from 'react';
import { CalculatedResults } from '../types';

interface ResultsSectionProps {
  results: CalculatedResults;
  onExportCalculation: () => void;
}

const formatCurrency = (value: number) => {
  return `£${value.toFixed(2)}`;
};

const ResultRow: React.FC<{ label: string; value: string; className?: string }> = ({ label, value, className = '' }) => (
  <div className={`flex justify-between items-center py-2 ${className}`}>
    <span className="text-slate-600">{label}</span>
    <span className="font-semibold text-slate-800">{value}</span>
  </div>
);

const ResultsSection: React.FC<ResultsSectionProps> = ({ results, onExportCalculation }) => {
  const { totalRevenue, vatAmount, referralFee, totalOnBuyFees, totalCosts, netProfit, profitMargin, roi } = results;
  const isProfit = netProfit >= 0;

  return (
    <div className="bg-slate-50 rounded-lg p-6 ring-1 ring-slate-200 h-full">
      <div className="flex justify-between items-center border-b border-slate-300 pb-3 mb-4">
        <h2 className="text-xl font-bold text-slate-900">
          Profit & Fee Analysis
        </h2>
        <button
          onClick={onExportCalculation}
          className="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-md hover:bg-green-700 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          aria-label="Export current calculation"
          title="Export to CSV or Google Sheets"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Revenue</h3>
            <div className="bg-green-50 rounded-md divide-y divide-green-200">
              <div className="flex justify-between items-center p-3">
                <span className="text-slate-600">VAT on Item Price</span>
                <span className="font-semibold text-slate-800">{formatCurrency(vatAmount)}</span>
              </div>
              <div className="flex justify-between items-center p-3 text-lg">
                <span className="text-slate-600">Total Customer Payment</span>
                <span className="font-bold text-green-800">{formatCurrency(totalRevenue)}</span>
              </div>
            </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">OnBuyAnalytics Fees</h3>
          <div className="bg-white rounded-md p-3 ring-1 ring-slate-100">
            <ResultRow label="Referral Fee" value={formatCurrency(referralFee)} className="!text-red-600 font-bold" />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Net Profit Summary</h3>
          <div className="bg-white rounded-md p-3 ring-1 ring-slate-100">
            <ResultRow label="Total Costs" value={formatCurrency(totalCosts)} />
            <div className="border-t border-slate-200 my-2"></div>
            <div className={`flex justify-between items-center py-3 px-3 rounded-md ${isProfit ? 'bg-green-100' : 'bg-red-100'}`}>
              <span className={`text-xl font-bold ${isProfit ? 'text-green-800' : 'text-red-800'}`}>Net Profit</span>
              <span className={`text-2xl font-bold ${isProfit ? 'text-green-800' : 'text-red-800'}`}>{formatCurrency(netProfit)}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Key Metrics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-md p-3 text-center ring-1 ring-slate-100">
              <div className="text-sm text-slate-500">Profit Margin</div>
              <div className="text-xl font-bold text-indigo-600">{profitMargin.toFixed(2)}%</div>
            </div>
            <div className="bg-white rounded-md p-3 text-center ring-1 ring-slate-100">
              <div className="text-sm text-slate-500">Return on Investment (ROI)</div>
              <div className="text-xl font-bold text-indigo-600">{roi.toFixed(2)}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsSection;