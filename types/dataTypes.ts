// Country-related types
export interface CountryData {
  id: string;
  name: string;
  flag: string;
  region: string;
  subregion: string;
  capital: string;
  population: number;
  indicators: EconomicIndicators;
  historicalData: HistoricalData;
  investmentScore: InvestmentScore;
}

export interface EconomicIndicators {
  gdp: number;
  gdpGrowth: number;
  gdpPerCapita: number;
  inflation: number;
  unemployment: number;
  publicDebt: number;
  debtToGdpRatio: number;
  foreignDirectInvestment: number;
  tradeBalance: number;
  currencyCode: string;
  exchangeRate: number;
  creditRatings: CreditRatings;
}

export interface CreditRatings {
  sp: string;
  moodys: string;
  fitch: string;
}

export interface HistoricalData {
  gdp: TimeSeriesData[];
  inflation: TimeSeriesData[];
  unemployment: TimeSeriesData[];
  exchangeRate: TimeSeriesData[];
}

export interface TimeSeriesData {
  date: string;
  value: number;
}

export interface InvestmentScore {
  overall: number;
  economicStability: number;
  growthPotential: number;
  riskFactor: number;
  sectorOpportunities: SectorOpportunity[];
}

export interface SectorOpportunity {
  sector: string;
  score: number;
  growthRate: number;
  description: string;
}

// Global data types
export interface GlobalData {
  lastUpdated: string;
  totalCountries: number;
  regions: RegionData[];
  topPerformers: TopPerformers;
  countries: CountryData[];
}

export interface RegionData {
  name: string;
  avgGdpGrowth: number;
  avgInflation: number;
  countries: number;
}

export interface TopPerformers {
  gdpGrowth: RankedCountry[];
  lowestInflation: RankedCountry[];
  highestInvestmentScore: RankedCountry[];
}

export interface RankedCountry {
  id: string;
  name: string;
  value: number;
}

// User preferences and settings
export interface UserPreferences {
  defaultCurrency: string;
  favoriteCountries: string[];
  alertThresholds: AlertThreshold[];
  theme: 'light' | 'dark' | 'system';
  dataUpdateFrequency: 'daily' | 'weekly' | 'realtime';
}

export interface AlertThreshold {
  countryId: string;
  metric: string;
  threshold: number;
  direction: 'above' | 'below';
}