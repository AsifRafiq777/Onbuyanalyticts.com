
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-6 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          OnBuyAnalytics.com UK Seller Fee & Profit Calculator
        </h1>
        <p className="text-sm md:text-base text-slate-600 mt-1">
          An easy-to-use tool to estimate your real profit margin.
        </p>
      </div>
    </header>
  );
};

export default Header;