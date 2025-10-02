import React, { useState, useMemo, useEffect, useRef } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { UserInputs, CalculatedResults } from './types';
import { CATEGORIES } from './constants';
import Header from './components/Header';
import InputSection from './components/InputSection';
import ResultsSection from './components/ResultsSection';
import Footer from './components/Footer';
import HistorySection from './components/HistorySection';
import { useCalculationHistory } from './hooks/useCalculationHistory';
import ExportModal from './components/ExportModal';
import RewardModal from './components/RewardModal';


// --- AdSense Constants ---
const MAX_FREE_SAVES = 3;
const SAVE_COUNT_STORAGE_KEY = 'onbuy-calc-save-count';

// Helper to get category name from ID
const getCategoryName = (categoryId: string): string => {
    const category = CATEGORIES.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown';
}

// Helper to safely format CSV fields
const formatCsvField = (field: any): string => {
  const str = String(field ?? '');
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
};

// Helper to trigger CSV download
const downloadCsv = (csvContent: string, fileName: string) => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


function App() {
  const [inputs, setInputs] = useState<UserInputs>({
    itemName: '',
    salePrice: '',
    itemCost: '',
    shippingCharge: '',
    shippingCost: '',
    vatPercentage: '20',
    categoryId: 'default',
  });
  
  const [exportTarget, setExportTarget] = useState<'current' | 'history' | null>(null);
  const [saveCount, setSaveCount] = useState<number>(() => {
    const saved = localStorage.getItem(SAVE_COUNT_STORAGE_KEY);
    return saved ? parseInt(saved, 10) : 0;
  });
  const [showRewardModal, setShowRewardModal] = useState<boolean>(false);
  const postRewardAction = useRef<(() => void) | null>(null);


  const { history, addCalculation, clearHistory } = useCalculationHistory();

  useEffect(() => {
    localStorage.setItem(SAVE_COUNT_STORAGE_KEY, saveCount.toString());
  }, [saveCount]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const results: CalculatedResults = useMemo(() => {
    const salePriceExVat = parseFloat(inputs.salePrice) || 0;
    const itemCost = parseFloat(inputs.itemCost) || 0;
    const shippingCharge = parseFloat(inputs.shippingCharge) || 0;
    const shippingCost = parseFloat(inputs.shippingCost) || 0;
    const vatPercentage = parseFloat(inputs.vatPercentage) || 0;

    const selectedCategory = CATEGORIES.find(c => c.id === inputs.categoryId) || CATEGORIES.find(c => c.id === 'default')!;

    const vatAmount = salePriceExVat * (vatPercentage / 100);
    const salePriceIncVat = salePriceExVat + vatAmount;

    // Total Revenue is what the customer pays
    const totalRevenue = salePriceIncVat + shippingCharge;

    // Fees are calculated on the total amount collected from the customer
    const referralFee = totalRevenue * (selectedCategory.feePercentage / 100);
    const paymentProcessingFee = 0; // Removed payment method selection
    const totalOnBuyFees = referralFee + paymentProcessingFee;

    const totalCosts = itemCost + shippingCost + totalOnBuyFees;

    // Net profit is based on the ex-VAT revenue, as VAT is paid to the government.
    const netRevenue = salePriceExVat + shippingCharge;
    const netProfit = netRevenue - totalCosts;

    const profitMargin = netRevenue > 0 ? (netProfit / netRevenue) * 100 : 0;
    const totalAcquisitionCost = itemCost + shippingCost;
    const roi = totalAcquisitionCost > 0 ? (netProfit / totalAcquisitionCost) * 100 : 0;

    return {
      totalRevenue,
      vatAmount,
      referralFee,
      paymentProcessingFee,
      totalOnBuyFees,
      totalCosts,
      netProfit,
      profitMargin,
      roi,
    };
  }, [inputs]);

  const grantReward = () => {
    console.log('Reward granted! Resetting save count.');
    setSaveCount(0); // Reset count
    setShowRewardModal(false);
    if (postRewardAction.current) {
      postRewardAction.current(); // Perform the saved action
      postRewardAction.current = null;
    }
  };

  const handleConfirmReward = () => {
    // --- Google AdSense Rewarded Ad Integration ---
    console.log('Attempting to show rewarded ad...');
    
    // **DEVELOPMENT ONLY**: For testing, we immediately grant the reward.
    setTimeout(() => {
      console.log('Simulating successful ad view...');
      grantReward();
    }, 1000);
  };

  const handleSaveCalculation = () => {
    const performSave = () => {
        addCalculation(inputs, results);
        setSaveCount(currentCount => currentCount + 1);
    };

    if (saveCount < MAX_FREE_SAVES) {
      performSave();
    } else {
      postRewardAction.current = performSave;
      setShowRewardModal(true);
    }
  };

  const handleLoadCalculation = (savedInputs: UserInputs) => {
    setInputs(savedInputs);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCsvContent = (target: 'current' | 'history'): { content: string, filename: string } => {
    const websiteHeader = [
      formatCsvField('Data from OnBuyAnalytics.com'),
      formatCsvField('https://onbuyanalytics.com')
    ].join(',');

    let csvRows: string[] = [websiteHeader, '']; // Start with header and a blank line
    let filename = 'onbuy-export.csv';

    if (target === 'current') {
      const rows = [
        ['Metric', 'Value'],
        ['Item Name', inputs.itemName || 'N/A'],
        ['Item Sale Price (ex. VAT)', `£${inputs.salePrice}`],
        ['Total Item Cost', `£${inputs.itemCost}`],
        ['Shipping Charge to Customer', `£${inputs.shippingCharge}`],
        ['Actual Shipping Cost', `£${inputs.shippingCost}`],
        ['VAT Percentage', `${inputs.vatPercentage}%`],
        ['OnBuy Category', getCategoryName(inputs.categoryId)],
        ['---', '---'],
        ['Total Customer Payment', `£${results.totalRevenue.toFixed(2)}`],
        ['VAT on Item Price', `£${results.vatAmount.toFixed(2)}`],
        ['Referral Fee', `£${results.referralFee.toFixed(2)}`],
        ['Total Costs', `£${results.totalCosts.toFixed(2)}`],
        ['Net Profit', `£${results.netProfit.toFixed(2)}`],
        ['Profit Margin', `${results.profitMargin.toFixed(2)}%`],
        ['Return on Investment (ROI)', `${results.roi.toFixed(2)}%`],
      ];
      csvRows.push(...rows.map(row => row.map(formatCsvField).join(',')));
      filename = inputs.itemName ? `${inputs.itemName.replace(/\s+/g, '-')}-calculation.csv` : 'onbuy-calculation.csv';
    
    } else if (target === 'history') {
      const headers = [
        'ID', 'Timestamp', 'Item Name',
        'Sale Price (ex. VAT)', 'Item Cost', 'Shipping Charge', 'Shipping Cost', 'VAT %', 'Category',
        'Total Revenue', 'VAT Amount', 'Referral Fee', 'Total OnBuy Fees', 'Total Costs',
        'Net Profit', 'Profit Margin (%)', 'ROI (%)'
      ];
      const dataRows = history.map(item => [
        item.id, item.timestamp, item.inputs.itemName, item.inputs.salePrice,
        item.inputs.itemCost, item.inputs.shippingCharge, item.inputs.shippingCost,
        item.inputs.vatPercentage, getCategoryName(item.inputs.categoryId),
        item.results.totalRevenue.toFixed(2), item.results.vatAmount.toFixed(2),
        item.results.referralFee.toFixed(2), item.results.totalOnBuyFees.toFixed(2),
        item.results.totalCosts.toFixed(2), item.results.netProfit.toFixed(2),
        item.results.profitMargin.toFixed(2), item.results.roi.toFixed(2),
      ]);
      csvRows.push(headers.map(formatCsvField).join(','));
      csvRows.push(...dataRows.map(row => row.map(formatCsvField).join(',')));
      filename = 'onbuy-calculation-history.csv';
    }

    return { content: csvRows.join('\n'), filename };
  };

  const handleDownloadCsv = () => {
    if (!exportTarget) return;
    const { content, filename } = getCsvContent(exportTarget);
    downloadCsv(content, filename);
    setExportTarget(null);
  };

  const handleGoogleSheetsExport = () => {
    if (!exportTarget) return;
    const { content, filename } = getCsvContent(exportTarget);
    const sheetName = filename.replace('.csv', '');
    const encodedCsv = encodeURIComponent(content);
    const url = `https://docs.google.com/spreadsheets/create?name=${encodeURIComponent(sheetName)}&csv_data=${encodedCsv}`;
    window.open(url, '_blank');
    setExportTarget(null);
  };

  const handlePdfExport = () => {
    if (!exportTarget) return;

    const doc = new jsPDF();
    const addHeader = () => {
      doc.setFontSize(10);
      doc.setTextColor(128, 128, 128);
      doc.text('Data from OnBuyAnalytics.com', 14, 15);
      doc.setTextColor(66, 133, 244);
      doc.textWithLink('https://onbuyanalytics.com', 14, 20, { url: 'https://onbuyanalytics.com' });
    };

    addHeader();

    if (exportTarget === 'current') {
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      const title = inputs.itemName || 'OnBuy Calculation';
      doc.text(title, 14, 35);
      
      (doc as any).autoTable({
        startY: 45,
        head: [['Metric', 'Value']],
        body: [
          ['Item Name', inputs.itemName || 'N/A'],
          ['Item Sale Price (ex. VAT)', `£${inputs.salePrice}`],
          ['Total Item Cost', `£${inputs.itemCost}`],
          ['Shipping Charge to Customer', `£${inputs.shippingCharge}`],
          ['Actual Shipping Cost', `£${inputs.shippingCost}`],
          ['VAT Percentage', `${inputs.vatPercentage}%`],
          ['OnBuy Category', getCategoryName(inputs.categoryId)],
        ],
        theme: 'striped',
        headStyles: { fillColor: [75, 85, 99] },
      });
      
      (doc as any).autoTable({
        startY: (doc as any).autoTable.previous.finalY + 10,
        head: [['Analysis', 'Value']],
        body: [
          ['Total Customer Payment', `£${results.totalRevenue.toFixed(2)}`],
          ['VAT on Item Price', `£${results.vatAmount.toFixed(2)}`],
          ['Referral Fee', `£${results.referralFee.toFixed(2)}`],
          ['Total Costs', `£${results.totalCosts.toFixed(2)}`],
          ['Net Profit', `£${results.netProfit.toFixed(2)}`],
          ['Profit Margin', `${results.profitMargin.toFixed(2)}%`],
          ['Return on Investment (ROI)', `${results.roi.toFixed(2)}%`],
        ],
        theme: 'grid',
        headStyles: { fillColor: [22, 163, 74] },
      });

      doc.save(inputs.itemName ? `${inputs.itemName.replace(/\s+/g, '-')}-calculation.pdf` : 'onbuy-calculation.pdf');

    } else if (exportTarget === 'history') {
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      doc.text('OnBuy Calculation History', 14, 35);
      
      const head = [
        'Item Name', 'Sale Price', 'Item Cost', 'Shipping Charge', 'Shipping Cost', 'Net Profit', 'Profit Margin'
      ];
      const body = history.map(item => [
        item.inputs.itemName || 'N/A',
        `£${item.inputs.salePrice}`,
        `£${item.inputs.itemCost}`,
        `£${item.inputs.shippingCharge}`,
        `£${item.inputs.shippingCost}`,
        `£${item.results.netProfit.toFixed(2)}`,
        `${item.results.profitMargin.toFixed(2)}%`
      ]);

      (doc as any).autoTable({
        startY: 45,
        head: [head],
        body: body,
        theme: 'grid',
        headStyles: { fillColor: [75, 85, 99] },
      });
      doc.save('onbuy-calculation-history.pdf');
    }

    setExportTarget(null);
  };

  const remainingSaves = Math.max(0, MAX_FREE_SAVES - saveCount);

  return (
    <>
      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <InputSection
                inputs={inputs}
                onInputChange={handleInputChange}
                onSaveCalculation={handleSaveCalculation}
                remainingSaves={remainingSaves}
              />
              <ResultsSection results={results} onExportCalculation={() => setExportTarget('current')} />
            </div>
          </div>
          <HistorySection
            history={history}
            onLoadCalculation={handleLoadCalculation}
            onClearHistory={clearHistory}
            onExportHistory={() => setExportTarget('history')}
          />
        </main>
        <Footer />
      </div>
      <ExportModal
        isOpen={!!exportTarget}
        onClose={() => setExportTarget(null)}
        onDownloadCsv={handleDownloadCsv}
        onGoogleSheets={handleGoogleSheetsExport}
        onPdfExport={handlePdfExport}
      />
      <RewardModal
        isOpen={showRewardModal}
        onClose={() => setShowRewardModal(false)}
        onConfirm={handleConfirmReward}
        rewardAmount={MAX_FREE_SAVES}
      />
    </>
  );
}

export default App;