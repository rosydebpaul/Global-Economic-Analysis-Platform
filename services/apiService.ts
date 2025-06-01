import { supabase } from '@/lib/supabase';
import { GlobalData, CountryData } from '@/types/dataTypes';

export const fetchGlobalData = async (): Promise<GlobalData> => {
  try {
    // Fetch countries
    const { data: countries, error: countriesError } = await supabase
      .from('countries')
      .select(`
        *,
        economic_indicators (*),
        investment_scores (*),
        sector_opportunities (*),
        historical_data (*)
      `);

    if (countriesError) throw countriesError;

    // Fetch unique regions using a different approach
    const { data: regionsData, error: regionsError } = await supabase
      .from('countries')
      .select('region')
      .order('region');

    if (regionsError) throw regionsError;

    // Extract unique regions
    const regions = Array.from(new Set(regionsData.map(r => r.region)))
      .map(region => ({ region }));

    // Calculate region statistics
    const regionStats = regions.map(({ region }) => {
      const regionCountries = countries.filter(c => c.region === region);
      return {
        name: region,
        avgGdpGrowth: average(regionCountries.map(c => c.economic_indicators.gdp_growth)),
        avgInflation: average(regionCountries.map(c => c.economic_indicators.inflation)),
        countries: regionCountries.length
      };
    });

    // Get top performers
    const topPerformers = {
      gdpGrowth: getTopPerformers(countries, 'economic_indicators.gdp_growth'),
      lowestInflation: getTopPerformers(countries, 'economic_indicators.inflation', true),
      highestInvestmentScore: getTopPerformers(countries, 'investment_scores.overall_score')
    };

    // Transform data to match the expected format
    const transformedCountries = countries.map(transformCountryData);

    return {
      lastUpdated: new Date().toISOString(),
      totalCountries: countries.length,
      regions: regionStats,
      topPerformers,
      countries: transformedCountries
    };
  } catch (error) {
    console.error('Error fetching global data:', error);
    throw error;
  }
};

export const fetchCountryData = async (countryId: string): Promise<CountryData> => {
  try {
    const { data: country, error } = await supabase
      .from('countries')
      .select(`
        *,
        economic_indicators (*),
        investment_scores (*),
        sector_opportunities (*),
        historical_data (*)
      `)
      .eq('id', countryId)
      .single();

    if (error) throw error;
    return transformCountryData(country);
  } catch (error) {
    console.error(`Error fetching country data for ${countryId}:`, error);
    throw error;
  }
};

export const fetchInvestmentOpportunities = async (filters: {
  minGdpGrowth?: number;
  maxInflation?: number;
  region?: string;
  sectors?: string[];
} = {}): Promise<CountryData[]> => {
  try {
    let query = supabase
      .from('countries')
      .select(`
        *,
        economic_indicators (*),
        investment_scores (*),
        sector_opportunities (*),
        historical_data (*)
      `);

    if (filters.minGdpGrowth !== undefined) {
      query = query.gte('economic_indicators.gdp_growth', filters.minGdpGrowth);
    }

    if (filters.maxInflation !== undefined) {
      query = query.lte('economic_indicators.inflation', filters.maxInflation);
    }

    if (filters.region) {
      query = query.eq('region', filters.region);
    }

    const { data: countries, error } = await query;

    if (error) throw error;

    let filteredCountries = countries;

    if (filters.sectors && filters.sectors.length > 0) {
      filteredCountries = countries.filter(country =>
        country.sector_opportunities.some(so => filters.sectors!.includes(so.sector))
      );
    }

    return filteredCountries
      .map(transformCountryData)
      .sort((a, b) => b.investmentScore.overall - a.investmentScore.overall);
  } catch (error) {
    console.error('Error fetching investment opportunities:', error);
    throw error;
  }
};

// Helper functions
const average = (numbers: number[]) => 
  numbers.reduce((a, b) => a + b, 0) / numbers.length;

const getTopPerformers = (countries: any[], field: string, ascending = false) => {
  const sorted = [...countries].sort((a, b) => {
    const aValue = getNestedValue(a, field);
    const bValue = getNestedValue(b, field);
    return ascending ? aValue - bValue : bValue - aValue;
  });

  return sorted.slice(0, 5).map(country => ({
    id: country.id,
    name: country.name,
    value: getNestedValue(country, field)
  }));
};

const getNestedValue = (obj: any, path: string) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

const transformCountryData = (data: any): CountryData => {
  return {
    id: data.id,
    name: data.name,
    flag: data.flag,
    region: data.region,
    subregion: data.subregion,
    capital: data.capital,
    population: data.population,
    indicators: {
      gdp: data.economic_indicators.gdp,
      gdpGrowth: data.economic_indicators.gdp_growth,
      gdpPerCapita: data.economic_indicators.gdp_per_capita,
      inflation: data.economic_indicators.inflation,
      unemployment: data.economic_indicators.unemployment,
      publicDebt: data.economic_indicators.public_debt,
      debtToGdpRatio: data.economic_indicators.debt_to_gdp_ratio,
      foreignDirectInvestment: data.economic_indicators.foreign_direct_investment,
      tradeBalance: data.economic_indicators.trade_balance,
      currencyCode: data.economic_indicators.currency_code,
      exchangeRate: data.economic_indicators.exchange_rate,
      creditRatings: {
        sp: data.economic_indicators.credit_rating_sp,
        moodys: data.economic_indicators.credit_rating_moodys,
        fitch: data.economic_indicators.credit_rating_fitch
      }
    },
    historicalData: {
      gdp: data.historical_data
        .filter(hd => hd.metric_type === 'gdp')
        .map(hd => ({ date: hd.date, value: hd.value })),
      inflation: data.historical_data
        .filter(hd => hd.metric_type === 'inflation')
        .map(hd => ({ date: hd.date, value: hd.value })),
      unemployment: data.historical_data
        .filter(hd => hd.metric_type === 'unemployment')
        .map(hd => ({ date: hd.date, value: hd.value })),
      exchangeRate: data.historical_data
        .filter(hd => hd.metric_type === 'exchange_rate')
        .map(hd => ({ date: hd.date, value: hd.value }))
    },
    investmentScore: {
      overall: data.investment_scores.overall_score,
      economicStability: data.investment_scores.economic_stability,
      growthPotential: data.investment_scores.growth_potential,
      riskFactor: data.investment_scores.risk_factor,
      sectorOpportunities: data.sector_opportunities.map(so => ({
        sector: so.sector,
        score: so.score,
        growthRate: so.growth_rate,
        description: so.description
      }))
    }
  };
};