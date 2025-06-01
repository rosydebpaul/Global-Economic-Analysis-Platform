/*
  # Initial Database Schema for Global Economic Analysis

  1. New Tables
    - `countries`
      - Basic country information
      - Primary identifiers and metadata
    - `economic_indicators`
      - Current economic data
      - Foreign key to countries
    - `historical_data`
      - Time series data for various metrics
      - Foreign key to countries
    - `investment_scores`
      - Investment ratings and metrics
      - Foreign key to countries
    - `sector_opportunities`
      - Sector-specific investment opportunities
      - Foreign key to investment_scores
    - `user_preferences`
      - User settings and preferences
      - Connected to auth.users
    - `favorite_countries`
      - User's favorite countries
      - Many-to-many relationship between users and countries

  2. Security
    - Enable RLS on all tables
    - Create policies for authenticated users
    - Public read access for country data
    - Private write access for user preferences
*/

-- Create countries table
CREATE TABLE IF NOT EXISTS countries (
  id text PRIMARY KEY,
  name text NOT NULL,
  flag text NOT NULL,
  region text NOT NULL,
  subregion text,
  capital text,
  population bigint,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create economic_indicators table
CREATE TABLE IF NOT EXISTS economic_indicators (
  country_id text PRIMARY KEY REFERENCES countries(id),
  gdp numeric NOT NULL,
  gdp_growth numeric NOT NULL,
  gdp_per_capita numeric NOT NULL,
  inflation numeric NOT NULL,
  unemployment numeric NOT NULL,
  public_debt numeric NOT NULL,
  debt_to_gdp_ratio numeric NOT NULL,
  foreign_direct_investment numeric NOT NULL,
  trade_balance numeric NOT NULL,
  currency_code text NOT NULL,
  exchange_rate numeric NOT NULL,
  credit_rating_sp text,
  credit_rating_moodys text,
  credit_rating_fitch text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create historical_data table
CREATE TABLE IF NOT EXISTS historical_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id text REFERENCES countries(id),
  metric_type text NOT NULL,
  date date NOT NULL,
  value numeric NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(country_id, metric_type, date)
);

-- Create investment_scores table
CREATE TABLE IF NOT EXISTS investment_scores (
  country_id text PRIMARY KEY REFERENCES countries(id),
  overall_score integer NOT NULL,
  economic_stability integer NOT NULL,
  growth_potential integer NOT NULL,
  risk_factor integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create sector_opportunities table
CREATE TABLE IF NOT EXISTS sector_opportunities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id text REFERENCES countries(id),
  sector text NOT NULL,
  score integer NOT NULL,
  growth_rate numeric NOT NULL,
  description text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(country_id, sector)
);

-- Create user_preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id),
  default_currency text DEFAULT 'USD',
  theme text DEFAULT 'light',
  data_update_frequency text DEFAULT 'daily',
  notifications_enabled boolean DEFAULT true,
  offline_access_enabled boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create favorite_countries table
CREATE TABLE IF NOT EXISTS favorite_countries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  country_id text REFERENCES countries(id),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, country_id)
);

-- Enable Row Level Security
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE economic_indicators ENABLE ROW LEVEL SECURITY;
ALTER TABLE historical_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE investment_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE sector_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorite_countries ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Countries: Public read access
CREATE POLICY "Countries are publicly readable"
  ON countries
  FOR SELECT
  TO public
  USING (true);

-- Economic Indicators: Public read access
CREATE POLICY "Economic indicators are publicly readable"
  ON economic_indicators
  FOR SELECT
  TO public
  USING (true);

-- Historical Data: Public read access
CREATE POLICY "Historical data is publicly readable"
  ON historical_data
  FOR SELECT
  TO public
  USING (true);

-- Investment Scores: Public read access
CREATE POLICY "Investment scores are publicly readable"
  ON investment_scores
  FOR SELECT
  TO public
  USING (true);

-- Sector Opportunities: Public read access
CREATE POLICY "Sector opportunities are publicly readable"
  ON sector_opportunities
  FOR SELECT
  TO public
  USING (true);

-- User Preferences: Private access
CREATE POLICY "Users can manage their own preferences"
  ON user_preferences
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Favorite Countries: Private access
CREATE POLICY "Users can manage their favorite countries"
  ON favorite_countries
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_countries_region ON countries(region);
CREATE INDEX IF NOT EXISTS idx_historical_data_country_metric ON historical_data(country_id, metric_type);
CREATE INDEX IF NOT EXISTS idx_historical_data_date ON historical_data(date);
CREATE INDEX IF NOT EXISTS idx_sector_opportunities_country ON sector_opportunities(country_id);
CREATE INDEX IF NOT EXISTS idx_favorite_countries_user ON favorite_countries(user_id);