
export interface Category {
  id: string;
  name: string;
  feePercentage: number;
}

export interface UserInputs {
  itemName: string;
  salePrice: string;
  itemCost: string;
  shippingCharge: string;
  shippingCost: string;
  vatPercentage: string;
  categoryId: string;
  priceIncludesVat: boolean;
}

export interface CalculatedResults {
  totalRevenue: number;
  vatAmount: number;
  referralFee: number;
  paymentProcessingFee: number;
  totalOnBuyFees: number;
  totalCosts: number;
  netProfit: number;
  profitMargin: number;
  roi: number;
}

export interface CalculationHistoryItem {
  id: number;
  timestamp: string;
  inputs: UserInputs;
  results: CalculatedResults;
}
