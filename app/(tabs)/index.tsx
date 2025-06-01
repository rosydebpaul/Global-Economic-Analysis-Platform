import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Star, Filter, ArrowDownUp } from 'lucide-react-native';
import { useAppContext } from '@/context/AppContext';
import CountryCard from '@/components/CountryCard';
import Colors from '@/constants/Colors';
import { CountryData } from '@/types/dataTypes';
import { formatDate } from '@/utils/formatters';

type SortOption = 'name' | 'gdpGrowth' | 'inflation' | 'investmentScore';

export default function DashboardScreen() {
  const { isLoading, globalData, favoriteCountries } = useAppContext();
  const [refreshing, setRefreshing] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('investmentScore');
  const [filterFavorites, setFilterFavorites] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // In a real app, this would refresh the data
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const sortCountries = (countries: CountryData[]): CountryData[] => {
    return [...countries].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'gdpGrowth':
          return b.indicators.gdpGrowth - a.indicators.gdpGrowth;
        case 'inflation':
          return a.indicators.inflation - b.indicators.inflation;
        case 'investmentScore':
          return b.investmentScore.overall - a.investmentScore.overall;
        default:
          return 0;
      }
    });
  };

  const filteredCountries = globalData?.countries.filter(country => {
    if (filterFavorites) {
      return favoriteCountries.includes(country.id);
    }
    return true;
  }) || [];

  const sortedCountries = sortCountries(filteredCountries);
  
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading economic data...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          Platform.OS !== 'web' ? (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          ) : undefined
        }
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Economy Dashboard</Text>
            <Text style={styles.subtitle}>
              Last updated: {globalData ? formatDate(globalData.lastUpdated) : 'Loading...'}
            </Text>
          </View>
        </View>

        {globalData && (
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{globalData.regions.length}</Text>
              <Text style={styles.statLabel}>Regions</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{globalData.totalCountries}</Text>
              <Text style={styles.statLabel}>Countries</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>
                {globalData.topPerformers.gdpGrowth[0].value}%
              </Text>
              <Text style={styles.statLabel}>Top Growth</Text>
            </View>
          </View>
        )}

        <View style={styles.topPerformersSection}>
          <Text style={styles.sectionTitle}>Top Performers</Text>
          {globalData && (
            <View style={styles.topPerformersContainer}>
              <View style={styles.topPerformerCard}>
                <Text style={styles.topPerformerTitle}>GDP Growth</Text>
                <View style={styles.topPerformerItem}>
                  <Text style={styles.topPerformerName}>
                    {globalData.topPerformers.gdpGrowth[0].name}
                  </Text>
                  <Text style={[styles.topPerformerValue, styles.positiveValue]}>
                    +{globalData.topPerformers.gdpGrowth[0].value}%
                  </Text>
                </View>
              </View>
              
              <View style={styles.topPerformerCard}>
                <Text style={styles.topPerformerTitle}>Lowest Inflation</Text>
                <View style={styles.topPerformerItem}>
                  <Text style={styles.topPerformerName}>
                    {globalData.topPerformers.lowestInflation[0].name}
                  </Text>
                  <Text style={styles.topPerformerValue}>
                    {globalData.topPerformers.lowestInflation[0].value}%
                  </Text>
                </View>
              </View>
              
              <View style={styles.topPerformerCard}>
                <Text style={styles.topPerformerTitle}>Investment Score</Text>
                <View style={styles.topPerformerItem}>
                  <Text style={styles.topPerformerName}>
                    {globalData.topPerformers.highestInvestmentScore[0].name}
                  </Text>
                  <Text style={styles.topPerformerValue}>
                    {globalData.topPerformers.highestInvestmentScore[0].value}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>

        <View style={styles.countriesSection}>
          <View style={styles.countriesHeader}>
            <Text style={styles.sectionTitle}>Countries</Text>
            <View style={styles.filterContainer}>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  filterFavorites && styles.filterButtonActive
                ]}
                onPress={() => setFilterFavorites(!filterFavorites)}
              >
                <Star
                  size={16}
                  color={filterFavorites ? 'white' : Colors.text}
                />
                <Text
                  style={[
                    styles.filterButtonText,
                    filterFavorites && styles.filterButtonTextActive
                  ]}
                >
                  Favorites
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.sortButton}
                onPress={() => {
                  // Cycle through sort options
                  const options: SortOption[] = ['name', 'gdpGrowth', 'inflation', 'investmentScore'];
                  const currentIndex = options.indexOf(sortBy);
                  const nextIndex = (currentIndex + 1) % options.length;
                  setSortBy(options[nextIndex]);
                }}
              >
                <ArrowDownUp size={16} color={Colors.text} />
                <Text style={styles.sortButtonText}>
                  Sort: {
                    sortBy === 'name' ? 'Name' :
                    sortBy === 'gdpGrowth' ? 'GDP Growth' :
                    sortBy === 'inflation' ? 'Inflation' : 'Investment Score'
                  }
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {sortedCountries.length > 0 ? (
            sortedCountries.map(country => (
              <CountryCard key={country.id} country={country} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                {filterFavorites
                  ? "You haven't added any countries to favorites yet."
                  : "No countries available."}
              </Text>
            </View>
          )}
        </View>
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
    alignItems: 'center',
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textLight,
  },
  topPerformersSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: Colors.text,
    marginBottom: 16,
  },
  topPerformersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topPerformerCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  topPerformerTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 8,
  },
  topPerformerItem: {
    flexDirection: 'column',
  },
  topPerformerName: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.text,
    marginBottom: 4,
  },
  topPerformerValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.text,
  },
  positiveValue: {
    color: Colors.success,
  },
  countriesSection: {
    marginBottom: 24,
  },
  countriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: 'row',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginLeft: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  filterButtonActive: {
    backgroundColor: Colors.primary,
  },
  filterButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.text,
    marginLeft: 4,
  },
  filterButtonTextActive: {
    color: 'white',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginLeft: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sortButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.text,
    marginLeft: 4,
  },
  emptyState: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
  },
  emptyStateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.textLight,
    textAlign: 'center',
  },
});