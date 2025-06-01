# Global Economic Analysis Platform

A comprehensive web and mobile application for analyzing global economic data, built with React Native and Expo.

## File Documentation

### App Layout (`app/_layout.tsx`)

**Imports:**
```typescript
import { useEffect } from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useFrameworkReady } from '@/hooks/useFrameworkReady'
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter'
import { SplashScreen } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { AppProvider } from '@/context/AppContext'
import { Platform } from 'react-native'
```

**Components:**
- `RootLayout`: Root component handling font loading and app initialization
  - Manages font loading state
  - Handles splash screen visibility
  - Sets up navigation structure
  - Wraps app in necessary providers

### Tab Layout (`app/(tabs)/_layout.tsx`)

**Imports:**
```typescript
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { Tabs } from 'expo-router'
import { ChartBar, Globe, Search, Settings } from 'lucide-react-native'
```

**Components:**
- `TabLayout`: Configures bottom tab navigation
- `CustomTabBar`: Custom tab bar component with animations and styling

### Dashboard Screen (`app/(tabs)/index.tsx`)

**Key Functions:**
- `sortCountries`: Sorts countries based on different metrics
- `filteredCountries`: Filters countries based on user preferences
- `formatMetricValue`: Formats numeric values for display

### Analysis Screen (`app/(tabs)/analyze.tsx`)

**Key Functions:**
- `getMetricDataForComparison`: Prepares data for comparison charts
- `getMetricColors`: Determines color coding for metrics
- `formatComparisonValue`: Formats values for comparison display

### Investment Screen (`app/(tabs)/invest.tsx`)

**Key Functions:**
- `searchOpportunities`: Searches for investment opportunities
- `toggleSector`: Handles sector selection
- `resetFilters`: Resets search filters

### Settings Screen (`app/(tabs)/settings.tsx`)

**State Management:**
- `isDarkMode`: Controls theme preference
- `notificationsEnabled`: Manages notification settings
- `dataUpdateFrequency`: Controls data update frequency
- `offlineEnabled`: Manages offline access settings

### API Service (`services/apiService.ts`)

**Key Functions:**
- `fetchGlobalData`: Retrieves global economic data
- `fetchCountryData`: Gets detailed country information
- `fetchInvestmentOpportunities`: Searches investment opportunities
- `transformCountryData`: Transforms raw data into app format

### Components

#### CountryCard (`components/CountryCard.tsx`)
Displays country information in a card format.

**Props:**
```typescript
interface CountryCardProps {
  country: CountryData
  showActions?: boolean
}
```

#### EconomicChart (`components/EconomicChart.tsx`)
Renders economic data visualizations.

**Props:**
```typescript
interface EconomicChartProps {
  title: string
  data: TimeSeriesData[]
  format?: 'percentage' | 'currency' | 'number'
  color?: string
}
```

### Context

#### AppContext (`context/AppContext.tsx`)
Global state management for the application.

**Key Features:**
- Global data management
- Theme management
- Country selection
- Favorites management

### Types

#### Data Types (`types/dataTypes.ts`)
```typescript
interface CountryData {
  id: string
  name: string
  flag: string
  region: string
  // ... other properties
}

interface EconomicIndicators {
  gdp: number
  gdpGrowth: number
  // ... other indicators
}

// ... other type definitions
```

### Utilities

#### Formatters (`utils/formatters.ts`)
```typescript
export const formatPercentage = (value: number): string
export const formatCurrency = (value: number): string
export const formatNumber = (value: number): string
export const formatDate = (dateString: string): string
```

## Database Schema

### Countries Table
```sql
CREATE TABLE countries (
  id text PRIMARY KEY,
  name text NOT NULL,
  flag text NOT NULL,
  region text NOT NULL,
  // ... other columns
);
```

### Economic Indicators Table
```sql
CREATE TABLE economic_indicators (
  country_id text PRIMARY KEY REFERENCES countries(id),
  gdp numeric NOT NULL,
  gdp_growth numeric NOT NULL,
  // ... other columns
);
```

## Development Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Start development server:
```bash
npm run dev
```

## Building for Production

```bash
# Web build
npm run build:web

# iOS build
expo build:ios

# Android build
expo build:android
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see LICENSE file for details