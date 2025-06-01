/*
  # Seed Initial Data

  1. Purpose
    - Populate database with sample country data
    - Add economic indicators
    - Create historical records
    - Set up investment scores

  2. Data
    - Sample set of major economies
    - Recent economic indicators
    - Historical data for the past 5 years
    - Investment opportunities in key sectors
*/

-- Insert sample countries
INSERT INTO countries (id, name, flag, region, subregion, capital, population) VALUES
  ('usa', 'United States', 'https://flagcdn.com/us.svg', 'North America', 'Northern America', 'Washington, D.C.', 331002651),
  ('chn', 'China', 'https://flagcdn.com/cn.svg', 'Asia', 'Eastern Asia', 'Beijing', 1444216107),
  ('jpn', 'Japan', 'https://flagcdn.com/jp.svg', 'Asia', 'Eastern Asia', 'Tokyo', 126050804),
  ('deu', 'Germany', 'https://flagcdn.com/de.svg', 'Europe', 'Western Europe', 'Berlin', 83190556),
  ('gbr', 'United Kingdom', 'https://flagcdn.com/gb.svg', 'Europe', 'Northern Europe', 'London', 67215293),
  ('ind', 'India', 'https://flagcdn.com/in.svg', 'Asia', 'Southern Asia', 'New Delhi', 1380004385)
ON CONFLICT (id) DO NOTHING;

-- Insert economic indicators
INSERT INTO economic_indicators (
  country_id, gdp, gdp_growth, gdp_per_capita, inflation, unemployment,
  public_debt, debt_to_gdp_ratio, foreign_direct_investment, trade_balance,
  currency_code, exchange_rate, credit_rating_sp, credit_rating_moodys, credit_rating_fitch
) VALUES
  ('usa', 25457900000000, 2.6, 76978, 3.4, 3.7, 34000000000000, 133.6, 345000000000, -987000000000, 'USD', 1, 'AA+', 'Aaa', 'AAA'),
  ('chn', 18450900000000, 5.7, 12784, 1.8, 5.2, 14730000000000, 79.8, 180000000000, 422000000000, 'CNY', 7.16, 'A+', 'A1', 'A+'),
  ('jpn', 4230000000000, 1.3, 33560, 0.5, 2.6, 9087000000000, 214.8, 14500000000, -15600000000, 'JPY', 148.5, 'A+', 'A1', 'A'),
  ('deu', 4070000000000, 0.3, 48953, 2.3, 3.1, 2520000000000, 61.9, 31500000000, 208000000000, 'EUR', 0.92, 'AAA', 'Aaa', 'AAA'),
  ('gbr', 3070000000000, 0.2, 45643, 3.9, 4.2, 2680000000000, 87.3, 24500000000, -145000000000, 'GBP', 0.79, 'AA', 'Aa3', 'AA-'),
  ('ind', 3730000000000, 7.2, 2702, 5.7, 7.9, 2980000000000, 79.9, 49700000000, -162000000000, 'INR', 83.45, 'BBB-', 'Baa3', 'BBB-')
ON CONFLICT (country_id) DO NOTHING;

-- Insert investment scores
INSERT INTO investment_scores (
  country_id, overall_score, economic_stability, growth_potential, risk_factor
) VALUES
  ('usa', 92, 88, 85, 15),
  ('chn', 86, 82, 90, 35),
  ('jpn', 82, 86, 70, 18),
  ('deu', 88, 90, 78, 14),
  ('gbr', 81, 79, 76, 25),
  ('ind', 83, 74, 95, 42)
ON CONFLICT (country_id) DO NOTHING;

-- Insert sector opportunities
INSERT INTO sector_opportunities (
  country_id, sector, score, growth_rate, description
) VALUES
  ('usa', 'Technology', 95, 12.5, 'Strong innovation ecosystem with world-leading tech companies'),
  ('usa', 'Healthcare', 90, 8.7, 'Advanced medical research and growing healthcare needs'),
  ('usa', 'Renewable Energy', 87, 15.2, 'Significant government investment in clean energy transition'),
  
  ('chn', 'Manufacturing', 92, 8.3, 'Advanced manufacturing capabilities and infrastructure'),
  ('chn', 'E-commerce', 95, 18.5, 'Massive digital economy with continued growth potential'),
  ('chn', 'Green Technology', 88, 22.1, 'World leader in renewable energy production and technology'),
  
  ('jpn', 'Robotics', 94, 9.5, 'Advanced robotics technology with aging population needs'),
  ('jpn', 'Healthcare', 88, 6.8, 'Sophisticated healthcare system with aging demographic'),
  ('jpn', 'Entertainment', 85, 7.2, 'Global cultural influence in gaming, anime, and entertainment')
ON CONFLICT (country_id, sector) DO NOTHING;

-- Insert historical data (sample for GDP)
INSERT INTO historical_data (country_id, metric_type, date, value) VALUES
  ('usa', 'gdp', '2019-01-01', 21427700000000),
  ('usa', 'gdp', '2020-01-01', 20936600000000),
  ('usa', 'gdp', '2021-01-01', 22996100000000),
  ('usa', 'gdp', '2022-01-01', 25462700000000),
  ('usa', 'gdp', '2023-01-01', 25457900000000),
  
  ('chn', 'gdp', '2019-01-01', 14279900000000),
  ('chn', 'gdp', '2020-01-01', 14690000000000),
  ('chn', 'gdp', '2021-01-01', 16770000000000),
  ('chn', 'gdp', '2022-01-01', 17960000000000),
  ('chn', 'gdp', '2023-01-01', 18450900000000)
ON CONFLICT (country_id, metric_type, date) DO NOTHING;

-- Insert historical data (sample for inflation)
INSERT INTO historical_data (country_id, metric_type, date, value) VALUES
  ('usa', 'inflation', '2019-01-01', 1.8),
  ('usa', 'inflation', '2020-01-01', 1.2),
  ('usa', 'inflation', '2021-01-01', 4.7),
  ('usa', 'inflation', '2022-01-01', 8.0),
  ('usa', 'inflation', '2023-01-01', 3.4),
  
  ('chn', 'inflation', '2019-01-01', 2.9),
  ('chn', 'inflation', '2020-01-01', 2.5),
  ('chn', 'inflation', '2021-01-01', 1.8),
  ('chn', 'inflation', '2022-01-01', 2.0),
  ('chn', 'inflation', '2023-01-01', 1.8)
ON CONFLICT (country_id, metric_type, date) DO NOTHING;