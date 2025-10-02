
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="container mx-auto px-4 py-8 text-center">
      <div className="max-w-4xl mx-auto text-xs text-slate-500 border-t border-slate-200 pt-6">
        <p className="font-semibold mb-2">Disclaimer:</p>
        <p>
          This calculator is for estimation purposes only. OnBuyAnalytics's fees are subject to change.
          This tool does not account for OnBuyAnalytics's monthly subscription fees, VAT on fees, returns, or other potential costs.
          Always verify with official OnBuyAnalytics documentation.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
