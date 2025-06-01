import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '@/context/AppContext';
import CountrySelector from '@/components/CountrySelector';
import EconomicChart from '@/components/EconomicChart';
import Colors from '@/constants/Colors';
import { CountryData } from '@/types/dataTypes';

type ComparisonMetric = 'gdp' | 'gdpGrowth' | 'inflation' | 'unemployment' | 'debtToGdpRatio' | 'investmentScore';

export default function AnalyzeScreen() {
  const { isLoading, globalData, selectedCountries, addSelectedCountry, removeSelectedCountry, clearSelectedCountries } = useAppContext();
  const [selectedMetric, setSelectedMetric] = useState<ComparisonMetric>('gdpGrowth');

  if (isLoading || !globalData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading economic data...</Text>
      </View>
    );
  }

  const getMetricDataForComparison = () => {
    switch (selectedMetric) {
      case 'gdp':
        return {
          title: 'GDP Comparison (USD)',
          data: selectedCountries.map(country => ({
            name: country.name,
            value: country.indicators.gdp,
            historicalData: country.historicalData.gdp
          })),
          format: 'currency'
        };
      case 'gdpGrowth':
        return {
          title: 'GDP Growth Rate Comparison (%)',
          data: selectedCountries.map(country => ({
            name: country.name,
            value: country.indicators.gdpGrowth,
            historicalData: country.historicalData.gdp.map((item, index, array) => {
              if (index === 0) return { date: item.date, value: 0 };
              const prevValue = array[index - 1].value;
              const currentValue = item.value;
              const growthRate = ((currentValue - prevValue) / prevValue) * 100;
              return { date: item.date, value: growthRate };
            })
          })),
          format: 'percentage'
        };
      case 'inflation':
        return {
          title: 'Inflation Rate Comparison (%)',
          data: selectedCountries.map(country => ({
            name: country.name,
            value: country.indicators.inflation,
            historicalData: country.historicalData.inflation
          })),
          format: 'percentage'
        };
      case 'unemployment':
        return {
          title: 'Unemployment Rate Comparison (%)',
          data: selectedCountries.map(country => ({
            name: country.name,
            value: country.indicators.unemployment,
            historicalData: country.historicalData.unemployment
          })),
          format: 'percentage'
        };
      case 'debtToGdpRatio':
        return {
          title: 'Debt to GDP Ratio Comparison (%)',
          data: selectedCountries.map(country => ({
            name: country.name,
            value: country.indicators.debtToGdpRatio,
            historicalData: [] // No historical data for this in our mock data
          })),
          format: 'percentage'
        };
      case 'investmentScore':
        return {
          title: 'Investment Score Comparison',
          data: selectedCountries.map(country => ({
            name: country.name,
            value: country.investmentScore.overall,
            historicalData: [] // No historical data for this in our mock data
          })),
          format: 'number'
        };
      default:
        return {
          title: 'Comparison',
          data: [],
          format: 'number'
        };
    }
  };

  const comparisonData = getMetricDataForComparison();
  const chartColors = [Colors.primary, Colors.secondary, Colors.accent, Colors.error, '#9C27B0'];

  const getMetricColors = () => {
    if (selectedMetric === 'gdpGrowth' || selectedMetric === 'investmentScore') {
      return { positive: true };
    } else if (selectedMetric === 'inflation' || selectedMetric === 'unemployment' || selectedMetric === 'debtToGdpRatio') {
      return { positive: false };
    } else {
      return { positive: null };
    }
  };

  const metricColors = getMetricColors();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Compare Economies</Text>
          <Text style={styles.subtitle}>Select up to 5 countries to compare</Text>
        </View>

        <CountrySelector
          countries={globalData.countries}
          selectedCountries={selectedCountries}
          onSelect={addSelectedCountry}
          onRemove={removeSelectedCountry}
          maxSelections={5}
          label="Compare Countries"
        />

        {selectedCountries.length > 0 && (
          <>
            <View style={styles.metricsSelector}>
              <Text style={styles.sectionTitle}>Select Metric</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <TouchableOpacity
                  style={[styles.metricButton, selectedMetric === 'gdpGrowth' && styles.metricButtonActive]}
                  onPress={() => setSelectedMetric('gdpGrowth')}
                >
                  <Text style={[styles.metricButtonText, selectedMetric === 'gdpGrowth' && styles.metricButtonTextActive]}>
                    GDP Growth
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.metricButton, selectedMetric === 'gdp' && styles.metricButtonActive]}
                  onPress={() => setSelectedMetric('gdp')}
                >
                  <Text style={[styles.metricButtonText, selectedMetric === 'gdp' && styles.metricButtonTextActive]}>
                    GDP
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.metricButton, selectedMetric === 'inflation' && styles.metricButtonActive]}
                  onPress={() => setSelectedMetric('inflation')}
                >
                  <Text style={[styles.metricButtonText, selectedMetric === 'inflation' && styles.metricButtonTextActive]}>
                    Inflation
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.metricButton, selectedMetric === 'unemployment' && styles.metricButtonActive]}
                  onPress={() => setSelectedMetric('unemployment')}
                >
                  <Text style={[styles.metricButtonText, selectedMetric === 'unemployment' && styles.metricButtonTextActive]}>
                    Unemployment
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.metricButton, selectedMetric === 'debtToGdpRatio' && styles.metricButtonActive]}
                  onPress={() => setSelectedMetric('debtToGdpRatio')}
                >
                  <Text style={[styles.metricButtonText, selectedMetric === 'debtToGdpRatio' && styles.metricButtonTextActive]}>
                    Debt to GDP
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.metricButton, selectedMetric === 'investmentScore' && styles.metricButtonActive]}
                  onPress={() => setSelectedMetric('investmentScore')}
                >
                  <Text style={[styles.metricButtonText, selectedMetric === 'investmentScore' && styles.metricButtonTextActive]}>
                    Investment Score
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>

            <View style={styles.comparisonSection}>
              <Text style={styles.sectionTitle}>{comparisonData.title}</Text>
              
              <View style={styles.comparisonTable}>
                <View style={styles.tableHeader}>
                  <Text style={styles.tableHeaderText}>Country</Text>
                  <Text style={styles.tableHeaderText}>Value</Text>
                  <Text style={styles.tableHeaderText}>Diff</Text>
                </View>
                
                {comparisonData.data.map((item, index) => {
                  // Calculate difference from best value
                  let bestValue;
                  if (metricColors.positive === true) {
                    // For metrics where higher is better
                    bestValue = Math.max(...comparisonData.data.map(d => d.value));
                  } else if (metricColors.positive === false) {
                    // For metrics where lower is better
                    bestValue = Math.min(...comparisonData.data.map(d => d.value));
                  } else {
                    // For metrics where there's no clear better direction
                    bestValue = comparisonData.data[0].value;
                  }
                  
                  const diff = item.value - bestValue;
                  let diffFormatted;
                  
                  if (comparisonData.format === 'percentage') {
                    diffFormatted = `${diff > 0 ? '+' : ''}${diff.toFixed(1)}%`;
                  } else if (comparisonData.format === 'currency') {
                    if (Math.abs(diff) >= 1000000000000) {
                      diffFormatted = `${diff > 0 ? '+' : ''}$${(diff / 1000000000000).toFixed(1)}T`;
                    } else if (Math.abs(diff) >= 1000000000) {
                      diffFormatted = `${diff > 0 ? '+' : ''}$${(diff / 1000000000).toFixed(1)}B`;
                    } else {
                      diffFormatted = `${diff > 0 ? '+' : ''}$${diff.toLocaleString()}`;
                    }
                  } else {
                    diffFormatted = `${diff > 0 ? '+' : ''}${diff.toFixed(1)}`;
                  }
                  
                  let diffColor;
                  if (diff === 0) {
                    diffColor = Colors.text; // Best value
                  } else if (metricColors.positive === true) {
                    diffColor = diff > 0 ? Colors.success : Colors.error;
                  } else if (metricColors.positive === false) {
                    diffColor = diff > 0 ? Colors.error : Colors.success;
                  } else {
                    diffColor = Colors.text;
                  }

                  // Format the main value
                  let valueFormatted;
                  if (comparisonData.format === 'percentage') {
                    valueFormatted = `${item.value.toFixed(1)}%`;
                  } else if (comparisonData.format === 'currency') {
                    if (item.value >= 1000000000000) {
                      valueFormatted = `$${(item.value / 1000000000000).toFixed(1)}T`;
                    } else if (item.value >= 1000000000) {
                      valueFormatted = `$${(item.value / 1000000000).toFixed(1)}B`;
                    } else {
                      valueFormatted = `$${item.value.toLocaleString()}`;
                    }
                  } else {
                    valueFormatted = item.value.toString();
                  }
                  
                  return (
                    <View key={item.name} style={styles.tableRow}>
                      <View style={[styles.colorIndicator, { backgroundColor: chartColors[index % chartColors.length] }]} />
                      <Text style={styles.countryName}>{item.name}</Text>
                      <Text style={styles.countryValue}>{valueFormatted}</Text>
                      <Text style={[styles.countryDiff, { color: diffColor }]}>
                        {diff === 0 ? 'Best' : diffFormatted}
                      </Text>
                    </View>
                  );
                })}
              </View>
              
              {comparisonData.data[0].historicalData.length > 0 && (
                <EconomicChart
                  title={`Historical ${comparisonData.title}`}
                  data={comparisonData.data[0].historicalData}
                  format={comparisonData.format as 'percentage' | 'currency' | 'number'}
                  color={chartColors[0]}
                />
              )}
              
              <TouchableOpacity 
                style={styles.clearButton}
                onPress={clearSelectedCountries}
              >
                <Text style={styles.clearButtonText}>Clear Comparison</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        
        {selectedCountries.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>Select Countries to Compare</Text>
            <Text style={styles.emptyStateText}>
              Add countries to start comparing economic indicators and see detailed analysis.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  loadingText: {
    marginTop: 16,
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.textLight,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: Colors.text,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textLight,
    marginTop: 4,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.text,
    marginBottom: 12,
  },
  metricsSelector: {
    marginTop: 24,
    marginBottom: 16,
  },
  metricButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  metricButtonActive: {
    backgroundColor: Colors.primary,
  },
  metricButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.text,
  },
  metricButtonTextActive: {
    color: 'white',
  },
  comparisonSection: {
    marginTop: 16,
  },
  comparisonTable: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    paddingBottom: 8,
    marginBottom: 8,
  },
  tableHeaderText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.textLight,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  colorIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  countryName: {
    flex: 3,
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.text,
  },
  countryValue: {
    flex: 2,
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.text,
    textAlign: 'right',
  },
  countryDiff: {
    flex: 1,
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    textAlign: 'right',
  },
  clearButton: {
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  clearButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.text,
  },
  emptyState: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    marginTop: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  emptyStateTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.textLight,
    textAlign: 'center',
  },
});