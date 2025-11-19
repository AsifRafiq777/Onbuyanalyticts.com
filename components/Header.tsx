import React from 'react';

interface HeaderProps {
  onOpenShare: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenShare }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-30 border-b border-slate-200">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex justify-between items-center">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg shadow-sm flex items-center justify-center">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                  <path d="M6 8h.01" />
                  <path d="M10 8h.01" />
                  <path d="M14 8h.01" />
                  <path d="M18 8h.01" />
               </svg>
            </div>
            <div>
              <h1 className="text-lg md:text-2xl font-bold text-slate-900 leading-none tracking-tight">
                OnBuyAnalytics
              </h1>
              <p className="text-[10px] md:text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">
                Fee & Profit Calculator
              </p>
            </div>
          </div>

          {/* Share Button */}
          <button 
            onClick={onOpenShare}
            className="flex items-center gap-2 px-3 py-2 md:px-5 md:py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-full transition-all duration-200 border border-indigo-100 group shadow-sm"
            aria-label="Share this tool"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span className="hidden md:inline font-medium">Share Tool</span>
          </button>

        </div>
      </div>
    </header>
  );
};

export default Header;