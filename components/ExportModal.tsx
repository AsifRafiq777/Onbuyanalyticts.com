import React from 'react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadCsv: () => void;
  onGoogleSheets: () => void;
  onPdfExport: () => void;
}

const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, onDownloadCsv, onGoogleSheets, onPdfExport }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-slate-800">Export Options</h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-800"
            aria-label="Close export options"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-sm text-slate-600 mb-6">
          Choose your preferred format. The data will include a link back to OnBuyAnalytics.com.
        </p>
        <div className="space-y-3">
          <button
            onClick={onGoogleSheets}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.54 11.7L12.01 7.29V17.5h-1.5V7.31l-3.5 4.39-1.05-1.1 5.3-6.7 5.29 6.7-1.01 1.1z"></path>
                <path d="M18.5 3H5.5C4.12 3 3 4.12 3 5.5v13C3 19.88 4.12 21 5.5 21h13c1.38 0 2.5-1.12 2.5-2.5v-13C21 4.12 19.88 3 18.5 3zm-2 15h-10v-1.5h10v1.5zm0-3h-10v-1.5h10v1.5zm0-3h-10V10.5h10v1.5z"></path>
            </svg>
            Add to Google Sheets
          </button>
          <button
            onClick={onDownloadCsv}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download .CSV File
          </button>
          <button
            onClick={onPdfExport}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
            <svg xmlns="http://www.w.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download .PDF File
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;