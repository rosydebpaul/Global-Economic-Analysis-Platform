# Global Economic Analysis Platform

A comprehensive web and mobile application for analyzing global economic data, built with Expo Router and React Native.

## Architecture Overview

### Core Technologies
- Expo SDK 52.0.30
- Expo Router 4.0.17
- React Native
- TypeScript
- Supabase (Database)
- Victory Native (Data Visualization)
- Lucide React Native (Icons)

### Project Structure
```
├── app/                    # Application routes
│   ├── _layout.tsx        # Root layout
│   ├── (tabs)/           # Tab-based navigation
│   │   ├── _layout.tsx   # Tab configuration
│   │   ├── index.tsx     # Dashboard
│   │   ├── analyze.tsx   # Analysis
│   │   ├── invest.tsx    # Investment
│   │   └── settings.tsx  # Settings
│   ├── country/          # Country detail routes
│   │   └── [id].tsx      # Dynamic country page
│   └── compare.tsx       # Comparison modal
├── components/            # Reusable components
├── constants/            # Global constants
├── context/              # React Context providers
├── data/                # Mock data
├── hooks/               # Custom React hooks
├── services/           # API services
├── types/              # TypeScript definitions
└── utils/              # Utility functions
```

## Features

### 1. Dashboard (Home Tab)
- Global economic overview
  - Total countries tracked
  - Regional statistics
  - Top performers
- Key performance indicators
  - GDP growth
  - Inflation rates
  - Investment scores
- Country cards with quick metrics
  - Economic indicators
  - Growth trends
  - Risk assessment
- Filtering and sorting capabilities
  - By region
  - By economic metrics
  - By investment potential

### 2. Analysis (Compare Tab)
- Multi-country comparison (up to 5 countries)
- Economic indicator analysis
  - GDP and growth rates
  - Inflation and unemployment
  - Debt ratios
  - Trade balance
- Historical data visualization
  - Time series charts
  - Trend analysis
  - Performance comparison
- Interactive charts
  - Customizable metrics
  - Dynamic updates
  - Tooltip information
- Custom metric selection
  - Economic stability
  - Growth potential
  - Risk factors

### 3. Investment (Invest Tab)
- Investment opportunities
  - Sector-specific analysis
  - Growth potential
  - Risk assessment
- Sector analysis
  - Performance metrics
  - Growth rates
  - Market opportunities
- Risk assessment
  - Economic stability
  - Political factors
  - Market conditions
- Growth potential evaluation
  - Historical trends
  - Future projections
  - Market analysis
- Filtering by multiple criteria
  - Region
  - Sector
  - Risk level
  - Growth rate

### 4. Settings
- Theme customization
  - Light mode
  - Dark mode
  - System preference
- Currency preferences
  - Default currency
  - Exchange rate updates
- Data update frequency
  - Real-time
  - Daily
  - Weekly
- Notification settings
  - Economic alerts
  - Investment opportunities
  - Custom thresholds
- Offline access configuration
  - Data synchronization
  - Storage management

## Data Model

### Countries Table
```sql
CREATE TABLE countries (
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
```

### Economic Indicators
```sql
CREATE TABLE economic_indicators (
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
```

### Historical Data
```sql
CREATE TABLE historical_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id text REFERENCES countries(id),
  metric_type text NOT NULL,
  date date NOT NULL,
  value numeric NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(country_id, metric_type, date)
);
```

### Investment Scores
```sql
CREATE TABLE investment_scores (
  country_id text PRIMARY KEY REFERENCES countries(id),
  overall_score integer NOT NULL,
  economic_stability integer NOT NULL,
  growth_potential integer NOT NULL,
  risk_factor integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

## Components

### CountryCard
```typescript
interface CountryCardProps {
  country: CountryData;
  showActions?: boolean;
}
```
Features:
- Economic indicators display
- Investment score visualization
- Favorite toggle functionality
- Navigation to detailed view
- Responsive design
- Loading states
- Error handling

### CountrySelector
```typescript
interface CountrySelectorProps {
  countries: CountryData[];
  selectedCountries: CountryData[];
  onSelect: (country: CountryData) => void;
  onRemove: (countryId: string) => void;
  maxSelections?: number;
  label?: string;
}
```
Features:
- Multi-country selection
- Search functionality
- Selection limit enforcement
- Selected countries display
- Remove selection capability
- Accessibility support

### EconomicChart
```typescript
interface EconomicChartProps {
  title: string;
  data: TimeSeriesData[];
  format?: 'percentage' | 'currency' | 'number';
  color?: string;
}
```
Features:
- Time series visualization
- Multiple data formats
- Interactive tooltips
- Responsive design
- Custom styling
- Loading states
- Error boundaries

### InvestmentOpportunityCard
```typescript
interface InvestmentOpportunityCardProps {
  country: string;
  sector: SectorOpportunity;
  onPress: () => void;
}
```
Features:
- Sector information display
- Growth rate visualization
- Score indication
- Interactive elements
- Description display
- Navigation handling

## Context

### AppContext
```typescript
interface AppContextType {
  isLoading: boolean;
  globalData: GlobalData | null;
  selectedCountries: CountryData[];
  favoriteCountries: string[];
  addSelectedCountry: (country: CountryData) => void;
  removeSelectedCountry: (countryId: string) => void;
  toggleFavoriteCountry: (countryId: string) => void;
  clearSelectedCountries: () => void;
}
```
Features:
- Global state management
- Data caching
- Loading states
- Error handling
- User preferences
- Favorites management

## Services

### API Service
```typescript
interface APIService {
  fetchGlobalData: () => Promise<GlobalData>;
  fetchCountryData: (countryId: string) => Promise<CountryData>;
  fetchComparisonData: (countryIds: string[]) => Promise<CountryData[]>;
  fetchInvestmentOpportunities: (filters: FilterOptions) => Promise<CountryData[]>;
}
```
Features:
- Data fetching
- Error handling
- Response typing
- Request caching
- Retry logic
- Mock data support

## Utilities

### Formatters
```typescript
interface Formatters {
  formatCurrency: (value: number) => string;
  formatPercentage: (value: number) => string;
  formatNumber: (value: number) => string;
  formatDate: (dateString: string) => string;
  shortenNumber: (num: number) => string;
}
```
Features:
- Currency formatting
- Percentage formatting
- Number formatting
- Date formatting
- Localization support
- Custom format options

## Navigation

### Tab Navigation
- Dashboard (/)
  - Global overview
  - Quick actions
  - Recent updates
- Analysis (/analyze)
  - Comparison tools
  - Data visualization
  - Custom metrics
- Investment (/invest)
  - Opportunities
  - Risk analysis
  - Sector insights
- Settings (/settings)
  - User preferences
  - App configuration
  - Data management

### Stack Navigation
- Country Details (/country/[id])
  - Comprehensive data
  - Historical trends
  - Investment analysis
- Comparison Modal (/compare)
  - Multi-country view
  - Metric comparison
  - Data export

## Styling

### Color Scheme
```typescript
const Colors = {
  // Primary colors
  primary: '#1A73E8',
  primaryDark: '#0D47A1',
  lightPrimary: '#E8F0FE',
  
  // Secondary colors
  secondary: '#34A853',
  secondaryDark: '#1E7E34',
  lightSecondary: '#E6F4EA',
  
  // Accent colors
  accent: '#FBBC04',
  accentDark: '#F29900',
  lightAccent: '#FEF7E0',
  
  // Status colors
  success: '#34A853',
  warning: '#F9AB00',
  error: '#EA4335',
  
  // Neutral colors
  text: '#202124',
  textLight: '#5F6368',
  background: '#F8F9FA',
  lightGray: '#E1E3E6',
  mediumGray: '#BDC1C6',
  gray: '#9AA0A6',
  divider: '#DADCE0',
}
```

### Typography
```typescript
const Typography = {
  // Font families
  regular: 'Inter-Regular',
  medium: 'Inter-Medium',
  bold: 'Inter-Bold',
  
  // Font sizes
  h1: 28,
  h2: 24,
  h3: 20,
  h4: 18,
  body: 16,
  caption: 14,
  small: 12,
}
```

## Best Practices

### Performance
- Lazy loading of routes
- Optimized list rendering
  - FlatList virtualization
  - Memory management
- Proper memo usage
  - Component memoization
  - Callback optimization
- Efficient context usage
  - Context splitting
  - Selective updates

### Error Handling
- Graceful fallbacks
  - Error boundaries
  - Fallback UI
- User-friendly error messages
  - Clear communication
  - Action guidance
- Comprehensive error states
  - Loading states
  - Empty states
  - Error states
- Network error handling
  - Retry mechanisms
  - Offline support

### Security
- Data validation
  - Input sanitization
  - Type checking
- Type checking
  - TypeScript strict mode
  - Runtime checks
- Safe API calls
  - Request validation
  - Response validation
- Environment variable usage
  - Secure storage
  - Access control

## Development Workflow

### Environment Setup
1. Install dependencies
```bash
npm install
```

2. Configure environment variables
```bash
cp .env.example .env
```

3. Start development server
```bash
npm run dev
```

4. Test on web and mobile
```bash
# Web
npm run web

# iOS
npm run ios

# Android
npm run android
```

### Building
```bash
# Web build
npm run build:web

# iOS build
expo build:ios

# Android build
expo build:android
```

### Testing
- Component testing
  - Unit tests
  - Integration tests
- Integration testing
  - API tests
  - Flow tests
- E2E testing
  - User flows
  - Critical paths
- Performance testing
  - Load testing
  - Memory usage
  - Render performance

## Deployment

### Web Deployment
- Netlify compatible
  - Automatic deployments
  - Environment variables
  - Build configuration
- Static export
  - Optimized assets
  - Cache management
- Server-side rendering support
  - SEO optimization
  - Performance enhancement

### Mobile Deployment
- Expo build system
  - EAS Build
  - OTA updates
- App store submission
  - iOS requirements
  - Review guidelines
- Play store submission
  - Android requirements
  - Store listing

## Future Enhancements

1. Real-time data updates
   - WebSocket integration
   - Live data streaming
   - Push notifications

2. Advanced analytics
   - Machine learning integration
   - Predictive analysis
   - Custom indicators

3. PDF report generation
   - Custom templates
   - Data visualization
   - Export options

4. Social sharing
   - Share insights
   - Collaborative analysis
   - Export capabilities

5. Custom alerts
   - Threshold notifications
   - Market updates
   - Custom triggers

6. Portfolio tracking
   - Investment tracking
   - Performance monitoring
   - Risk assessment

7. News integration
   - Economic news
   - Market updates
   - Analysis articles

8. Machine learning predictions
   - Market trends
   - Risk analysis
   - Growth forecasting

## Contributing

1. Fork the repository
   - Create personal copy
   - Set up development environment

2. Create feature branch
   - Descriptive branch names
   - Isolated changes

3. Implement changes
   - Follow coding standards
   - Add tests
   - Update documentation

4. Submit pull request
   - Clear description
   - Reference issues
   - Review process

## License

MIT License

Copyright (c) 2025 Global Economic Analysis

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```