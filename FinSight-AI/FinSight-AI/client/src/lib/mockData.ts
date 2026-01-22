import { ArrowUp, ArrowDown, TrendingUp, TrendingDown, Minus } from "lucide-react";

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  currency: string;
  lastUpdated: string;
}

export interface HistoricalPoint {
  date: string;
  price: number;
  volume: number;
}

export interface Fundamentals {
  marketCap: string;
  peRatio: number;
  eps: number;
  dividendYield: string;
  high52: number;
  low52: number;
  revenue: string;
}

export interface AIAnalysis {
  recommendation: "Buy" | "Sell" | "Hold";
  confidence: number;
  summary: string;
  keyFactors: string[];
}

export const STOCKS = [
  { value: "RELIANCE", label: "Reliance Industries Ltd." },
  { value: "TCS", label: "Tata Consultancy Services" },
  { value: "HDFCBANK", label: "HDFC Bank Ltd." },
  { value: "INFY", label: "Infosys Ltd." },
  { value: "ICICIBANK", label: "ICICI Bank Ltd." },
];

const MOCK_DB: Record<string, {
  data: StockData;
  history: HistoricalPoint[];
  fundamentals: Fundamentals;
  analysis: AIAnalysis;
}> = {
  "RELIANCE": {
    data: {
      symbol: "RELIANCE",
      name: "Reliance Industries Ltd.",
      price: 2785.45,
      change: 32.10,
      changePercent: 1.15,
      currency: "INR",
      lastUpdated: new Date().toISOString()
    },
    history: generateHistory(2500, 3000), // Helper to gen data
    fundamentals: {
      marketCap: "₹18.8L Cr",
      peRatio: 28.5,
      eps: 98.4,
      dividendYield: "0.32%",
      high52: 2950.00,
      low52: 2200.00,
      revenue: "₹9.2L Cr"
    },
    analysis: {
      recommendation: "Buy",
      confidence: 85,
      summary: "Strong retail growth and 5G dominance suggest continued upside. Technical indicators show a breakout pattern above key resistance levels.",
      keyFactors: ["Retail expansion", "5G Market Share", "Green Energy Investments"]
    }
  },
  "TCS": {
    data: {
      symbol: "TCS",
      name: "Tata Consultancy Services",
      price: 3950.20,
      change: -15.50,
      changePercent: -0.39,
      currency: "INR",
      lastUpdated: new Date().toISOString()
    },
    history: generateHistory(3800, 4200),
    fundamentals: {
      marketCap: "₹14.5L Cr",
      peRatio: 31.2,
      eps: 115.8,
      dividendYield: "1.25%",
      high52: 4250.00,
      low52: 3600.00,
      revenue: "₹2.4L Cr"
    },
    analysis: {
      recommendation: "Hold",
      confidence: 60,
      summary: "Steady cash flows but facing global IT spending headwinds. Valuation is slightly premium compared to historical averages.",
      keyFactors: ["Deal wins", "Margin pressure", "Attrition rates stabilizing"]
    }
  },
  "HDFCBANK": {
    data: {
      symbol: "HDFCBANK",
      name: "HDFC Bank Ltd.",
      price: 1680.75,
      change: 12.30,
      changePercent: 0.73,
      currency: "INR",
      lastUpdated: new Date().toISOString()
    },
    history: generateHistory(1500, 1800),
    fundamentals: {
      marketCap: "₹12.8L Cr",
      peRatio: 18.4,
      eps: 85.2,
      dividendYield: "0.95%",
      high52: 1750.00,
      low52: 1460.00,
      revenue: "₹1.8L Cr"
    },
    analysis: {
      recommendation: "Buy",
      confidence: 92,
      summary: "Post-merger synergies are starting to materialize. Attractive valuation at current P/B multiples with robust loan growth.",
      keyFactors: ["Deposit growth", "NIM expansion", "Branch expansion"]
    }
  },
  "INFY": {
    data: {
      symbol: "INFY",
      name: "Infosys Ltd.",
      price: 1620.40,
      change: -8.20,
      changePercent: -0.50,
      currency: "INR",
      lastUpdated: new Date().toISOString()
    },
    history: generateHistory(1400, 1700),
    fundamentals: {
      marketCap: "₹6.7L Cr",
      peRatio: 24.8,
      eps: 62.5,
      dividendYield: "2.10%",
      high52: 1720.00,
      low52: 1350.00,
      revenue: "₹1.5L Cr"
    },
    analysis: {
      recommendation: "Buy",
      confidence: 78,
      summary: "Large deal pipeline remains strong despite macro uncertainty. Attractive entry point for long-term investors.",
      keyFactors: ["Large deal wins", "AI capabilities", "Capital allocation policy"]
    }
  }
};

function generateHistory(min: number, max: number) {
  const data = [];
  let currentPrice = (min + max) / 2;
  const now = new Date();
  
  for (let i = 365; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Random walk
    const change = (Math.random() - 0.5) * (max - min) * 0.05;
    currentPrice += change;
    currentPrice = Math.max(min, Math.min(max, currentPrice));
    
    data.push({
      date: date.toISOString().split('T')[0],
      price: Number(currentPrice.toFixed(2)),
      volume: Math.floor(Math.random() * 1000000) + 500000
    });
  }
  return data;
}

export async function fetchStockData(symbol: string) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const stock = MOCK_DB[symbol];
  if (!stock) throw new Error("Stock not found");
  
  return stock;
}