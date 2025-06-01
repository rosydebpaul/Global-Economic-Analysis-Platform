import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, ActivityIndicator, Platform, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Filter, Search, X } from 'lucide-react-native';
import { useAppContext } from '@/context/AppContext';
import InvestmentOpportunityCard from '@/components/InvestmentOpportunityCard';
import Colors from '@/constants/Colors';
import { fetchInvestmentOpportunities } from '@/services/apiService';
import { CountryData } from '@/types/dataTypes';
import { router } from 'expo-router';

export default function InvestScreen() {
  const { isLoading: globalLoading, globalData } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [opportunities, setOpportunities] = useState<CountryData[]>([]);
  const [filtersVisible, setFiltersVisible] = useState(false);
  
  // Filter states
  const [minGdpGrowth, setMinGdpGrowth] = useState<string>('2');
  const [maxInflation, setMaxInflation] = useState<string>('5');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  
  const allRegions = globalData?.regions.map(r => r.name) || [];
  const allSectors = Array.from(
    new Set(
      globalData?.countries
        .flatMap(country => 
          country.investmentScore.sectorOpportunities.map(so => so.sector)
        ) || []
    )
  );

  const searchOpportunities = async () => {
    if (!globalData) {
      console.log('Global data not yet available');
      return;
    }

    setIsLoading(true);
    try {
      const filters = {
        minGdpGrowth: minGdpGrowth ? parseFloat(minGdpGrowth) : undefined,
        maxInflation: maxInflation ? parseFloat(maxInflation) : undefined,
        region: selectedRegion || undefined,
        sectors: selectedSectors.length > 0 ? selectedSectors : undefined
      };
      
      const results = await fetchInvestmentOpportunities(filters);
      setOpportunities(results);
      setFiltersVisible(false);
    } catch (error) {
      console.error('Error fetching investment opportunities:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSector = (sector: string) => {
    if (selectedSectors.includes(sector)) {
      setSelectedSectors(selectedSectors.filter(s => s !== sector));
    } else {
      setSelectedSectors([...selectedSectors, sector]);
    }
  };

  const resetFilters = () => {
    setMinGdpGrowth('2');
    setMaxInflation('5');
    setSelectedRegion('');
    setSelectedSectors([]);
  };

  React.useEffect(() => {
    if (globalData && !isLoading && opportunities.length === 0) {
      searchOpportunities();
    }
  }, [globalData]);

  if (globalLoading || !globalData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading investment data...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Investment Finder</Text>
            <Text style={styles.subtitle}>Discover opportunities based on economic indicators</Text>
          </View>
          <Pressable 
            style={styles.filterButton}
            onPress={() => setFiltersVisible(!filtersVisible)}
            role="button"
            accessible={true}
            accessibilityRole="button"
          >
            <Filter size={20} color={Colors.primary} />
          </Pressable>
        </View>

        {filtersVisible && (
          <View style={styles.filtersContainer}>
            <View style={styles.filterHeader}>
              <Text style={styles.filtersTitle}>Investment Filters</Text>
              <Pressable 
                onPress={() => setFiltersVisible(false)}
                role="button"
                accessible={true}
                accessibilityRole="button"
              >
                <X size={20} color={Colors.text} />
              </Pressable>
            </View>
            
            <View style={styles.filterItem}>
              <Text style={styles.filterLabel}>Minimum GDP Growth (%)</Text>
              <TextInput
                style={styles.filterInput}
                value={minGdpGrowth}
                onChangeText={setMinGdpGrowth}
                keyboardType="numeric"
                placeholder="e.g., 2.5"
              />
            </View>
            
            <View style={styles.filterItem}>
              <Text style={styles.filterLabel}>Maximum Inflation (%)</Text>
              <TextInput
                style={styles.filterInput}
                value={maxInflation}
                onChangeText={setMaxInflation}
                keyboardType="numeric"
                placeholder="e.g., 5"
              />
            </View>
            
            <View style={styles.filterItem}>
              <Text style={styles.filterLabel}>Region</Text>
              <View style={styles.chipContainer}>
                {allRegions.map(region => (
                  <Pressable
                    key={region}
                    style={[
                      styles.chip,
                      selectedRegion === region && styles.chipSelected
                    ]}
                    onPress={() => setSelectedRegion(
                      selectedRegion === region ? '' : region
                    )}
                    role="button"
                    accessible={true}
                    accessibilityRole="button"
                  >
                    <Text style={[
                      styles.chipText,
                      selectedRegion === region && styles.chipTextSelected
                    ]}>
                      {region}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
            
            <View style={styles.filterItem}>
              <Text style={styles.filterLabel}>Sectors</Text>
              <View style={styles.chipContainer}>
                {allSectors.map(sector => (
                  <Pressable
                    key={sector}
                    style={[
                      styles.chip,
                      selectedSectors.includes(sector) && styles.chipSelected
                    ]}
                    onPress={() => toggleSector(sector)}
                    role="button"
                    accessible={true}
                    accessibilityRole="button"
                  >
                    <Text style={[
                      styles.chipText,
                      selectedSectors.includes(sector) && styles.chipTextSelected
                    ]}>
                      {sector}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
            
            <View style={styles.filterActions}>
              <Pressable 
                style={styles.resetButton}
                onPress={resetFilters}
                role="button"
                accessible={true}
                accessibilityRole="button"
              >
                <Text style={styles.resetButtonText}>Reset</Text>
              </Pressable>
              <Pressable 
                style={styles.applyButton}
                onPress={searchOpportunities}
                role="button"
                accessible={true}
                accessibilityRole="button"
              >
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </Pressable>
            </View>
          </View>
        )}

        <View style={styles.searchBar}>
          <Search size={20} color={Colors.textLight} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search sectors or countries..."
          />
        </View>

        {isLoading ? (
          <View style={styles.loadingResults}>
            <ActivityIndicator size="small" color={Colors.primary} />
            <Text style={styles.loadingResultsText}>Finding opportunities...</Text>
          </View>
        ) : (
          <>
            {opportunities.length > 0 ? (
              <View style={styles.resultsContainer}>
                <Text style={styles.resultsTitle}>Top Investment Opportunities</Text>
                
                {opportunities.flatMap(country => 
                  country.investmentScore.sectorOpportunities
                    .sort((a, b) => b.score - a.score)
                    .slice(0, 1)
                    .map(sector => (
                      <InvestmentOpportunityCard
                        key={`${country.id}-${sector.sector}`}
                        country={country.name}
                        sector={sector}
                        onPress={() => router.push(`/country/${country.id}`)}
                      />
                    ))
                )}
              </View>
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateTitle}>No Opportunities Found</Text>
                <Text style={styles.emptyStateText}>
                  Try adjusting your filters to discover more investment opportunities.
                </Text>
                <Pressable 
                  style={styles.resetButton}
                  onPress={() => {
                    resetFilters();
                    searchOpportunities();
                  }}
                  role="button"
                  accessible={true}
                  accessibilityRole="button"
                >
                  <Text style={styles.resetButtonText}>Reset Filters</Text>
                </Pressable>
              </View>
            )}
          </>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
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
  filterButton: {
    backgroundColor: Colors.lightPrimary,
    padding: 12,
    borderRadius: 12,
  },
  filtersContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  filtersTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.text,
  },
  filterItem: {
    marginBottom: 16,
  },
  filterLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.text,
    marginBottom: 8,
  },
  filterInput: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    backgroundColor: Colors.lightGray,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  chipSelected: {
    backgroundColor: Colors.lightPrimary,
  },
  chipText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.text,
  },
  chipTextSelected: {
    color: Colors.primary,
  },
  filterActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  resetButton: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  resetButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.text,
  },
  applyButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  applyButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: 'white',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  loadingResults: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingResultsText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.textLight,
    marginLeft: 8,
  },
  resultsContainer: {
    marginBottom: 16,
  },
  resultsTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: Colors.text,
    marginBottom: 16,
  },
  emptyState: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
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
    marginBottom: 16,
  },
});