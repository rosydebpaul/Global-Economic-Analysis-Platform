import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Star, ArrowLeft, Download, ChevronRight } from 'lucide-react-native';
import { useAppContext } from '@/context/AppContext';
import EconomicChart from '@/components/EconomicChart';
import Colors from '@/constants/Colors';
import { formatCurrency, formatPercentage, formatNumber } from '@/utils/formatters';

export default function CountryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isLoading, globalData, favoriteCountries, toggleFavoriteCountry } = useAppContext();
  
  if (isLoading || !globalData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading country data...</Text>
      </View>
    );
  }
  
  const country = globalData.countries.find(c => c.id === id);
  
  if (!country) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Country not found</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const isFavorite = favoriteCountries.includes(country.id);
  
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: country.name,
          headerBackTitle: 'Back',
        }}
      />
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <View style={styles.flagContainer}>
              <Image source={{ uri: country.flag }} style={styles.flag} />
            </View>
            <View style={styles.countryInfo}>
              <Text style={styles.countryName}>{country.name}</Text>
              <Text style={styles.countryRegion}>{country.region} • {country.subregion}</Text>
              <Text style={styles.countryCapital}>Capital: {country.capital}</Text>
              <Text style={styles.countryPopulation}>
                Population: {formatNumber(country.population)}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => toggleFavoriteCountry(country.id)}
            >
              <Star
                size={24}
                color={isFavorite ? Colors.gold : Colors.gray}
                fill={isFavorite ? Colors.gold : 'transparent'}
              />
            </TouchableOpacity>
          </View>
          
          <View style={styles.keyIndicators}>
            <Text style={styles.sectionTitle}>Key Economic Indicators</Text>
            
            <View style={styles.indicatorRow}>
              <View style={styles.indicator}>
                <Text style={styles.indicatorLabel}>GDP</Text>
                <Text style={styles.indicatorValue}>
                  {formatCurrency(country.indicators.gdp)}
                </Text>
              </View>
              <View style={styles.indicator}>
                <Text style={styles.indicatorLabel}>GDP Growth</Text>
                <Text style={[
                  styles.indicatorValue,
                  country.indicators.gdpGrowth > 0 ? styles.positive : styles.negative
                ]}>
                  {formatPercentage(country.indicators.gdpGrowth)}
                </Text>
              </View>
              <View style={styles.indicator}>
                <Text style={styles.indicatorLabel}>GDP Per Capita</Text>
                <Text style={styles.indicatorValue}>
                  ${formatNumber(country.indicators.gdpPerCapita)}
                </Text>
              </View>
            </View>
            
            <View style={styles.indicatorRow}>
              <View style={styles.indicator}>
                <Text style={styles.indicatorLabel}>Inflation</Text>
                <Text style={[
                  styles.indicatorValue,
                  country.indicators.inflation < 3 ? styles.positive : 
                  country.indicators.inflation < 6 ? styles.neutral : styles.negative
                ]}>
                  {formatPercentage(country.indicators.inflation)}
                </Text>
              </View>
              <View style={styles.indicator}>
                <Text style={styles.indicatorLabel}>Unemployment</Text>
                <Text style={[
                  styles.indicatorValue,
                  country.indicators.unemployment < 5 ? styles.positive : 
                  country.indicators.unemployment < 8 ? styles.neutral : styles.negative
                ]}>
                  {formatPercentage(country.indicators.unemployment)}
                </Text>
              </View>
              <View style={styles.indicator}>
                <Text style={styles.indicatorLabel}>Debt to GDP</Text>
                <Text style={[
                  styles.indicatorValue,
                  country.indicators.debtToGdpRatio < 60 ? styles.positive : 
                  country.indicators.debtToGdpRatio < 100 ? styles.neutral : styles.negative
                ]}>
                  {formatPercentage(country.indicators.debtToGdpRatio)}
                </Text>
              </View>
            </View>
            
            <View style={styles.indicatorRow}>
              <View style={styles.indicator}>
                <Text style={styles.indicatorLabel}>FDI</Text>
                <Text style={styles.indicatorValue}>
                  {formatCurrency(country.indicators.foreignDirectInvestment)}
                </Text>
              </View>
              <View style={styles.indicator}>
                <Text style={styles.indicatorLabel}>Trade Balance</Text>
                <Text style={[
                  styles.indicatorValue,
                  country.indicators.tradeBalance > 0 ? styles.positive : styles.negative
                ]}>
                  {formatCurrency(country.indicators.tradeBalance)}
                </Text>
              </View>
              <View style={styles.indicator}>
                <Text style={styles.indicatorLabel}>Currency</Text>
                <Text style={styles.indicatorValue}>
                  {country.indicators.currencyCode}
                </Text>
              </View>
            </View>
          </View>
          
          <View style={styles.creditRatings}>
            <Text style={styles.sectionTitle}>Credit Ratings</Text>
            
            <View style={styles.ratingsContainer}>
              <View style={styles.ratingItem}>
                <Text style={styles.ratingAgency}>S&P</Text>
                <Text style={styles.ratingValue}>{country.indicators.creditRatings.sp}</Text>
              </View>
              <View style={styles.ratingItem}>
                <Text style={styles.ratingAgency}>Moody's</Text>
                <Text style={styles.ratingValue}>{country.indicators.creditRatings.moodys}</Text>
              </View>
              <View style={styles.ratingItem}>
                <Text style={styles.ratingAgency}>Fitch</Text>
                <Text style={styles.ratingValue}>{country.indicators.creditRatings.fitch}</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.investmentScore}>
            <Text style={styles.sectionTitle}>Investment Profile</Text>
            
            <View style={styles.scoreCard}>
              <View style={styles.scoreHeader}>
                <Text style={styles.scoreTitle}>Overall Score</Text>
                <View style={styles.scoreCircle}>
                  <Text style={styles.scoreValue}>{country.investmentScore.overall}</Text>
                </View>
              </View>
              
              <View style={styles.scoreBreakdown}>
                <View style={styles.scoreItem}>
                  <Text style={styles.scoreItemLabel}>Economic Stability</Text>
                  <View style={styles.scoreBar}>
                    <View style={[
                      styles.scoreBarFill, 
                      { width: `${country.investmentScore.economicStability}%` }
                    ]} />
                  </View>
                  <Text style={styles.scoreItemValue}>{country.investmentScore.economicStability}</Text>
                </View>
                
                <View style={styles.scoreItem}>
                  <Text style={styles.scoreItemLabel}>Growth Potential</Text>
                  <View style={styles.scoreBar}>
                    <View style={[
                      styles.scoreBarFill, 
                      { width: `${country.investmentScore.growthPotential}%` }
                    ]} />
                  </View>
                  <Text style={styles.scoreItemValue}>{country.investmentScore.growthPotential}</Text>
                </View>
                
                <View style={styles.scoreItem}>
                  <Text style={styles.scoreItemLabel}>Risk Factor</Text>
                  <View style={styles.scoreBar}>
                    <View style={[
                      styles.scoreBarFill, 
                      { 
                        width: `${country.investmentScore.riskFactor}%`,
                        backgroundColor: country.investmentScore.riskFactor < 30 ? Colors.success :
                                        country.investmentScore.riskFactor < 60 ? Colors.warning : Colors.error
                      }
                    ]} />
                  </View>
                  <Text style={styles.scoreItemValue}>{country.investmentScore.riskFactor}</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.sectorOpportunities}>
              <Text style={styles.sectionSubtitle}>Sector Opportunities</Text>
              
              {country.investmentScore.sectorOpportunities.map((sector, index) => (
                <View key={sector.sector} style={styles.sectorItem}>
                  <View style={styles.sectorInfo}>
                    <Text style={styles.sectorName}>{sector.sector}</Text>
                    <Text style={styles.sectorDescription}>{sector.description}</Text>
                  </View>
                  <View style={styles.sectorScores}>
                    <Text style={styles.sectorScore}>{sector.score}</Text>
                    <Text style={[styles.sectorGrowth, styles.positive]}>
                      +{sector.growthRate.toFixed(1)}%
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
          
          <View style={styles.historicalData}>
            <Text style={styles.sectionTitle}>Historical Data</Text>
            
            <EconomicChart
              title="GDP Trend"
              data={country.historicalData.gdp}
              format="currency"
              color={Colors.primary}
            />
            
            <EconomicChart
              title="Inflation Rate"
              data={country.historicalData.inflation}
              format="percentage"
              color={Colors.warning}
            />
            
            <EconomicChart
              title="Unemployment Rate"
              data={country.historicalData.unemployment}
              format="percentage"
              color={Colors.error}
            />
          </View>
          
          <TouchableOpacity style={styles.compareButton}>
            <Text style={styles.compareButtonText}>Add to Comparison</Text>
            <ChevronRight size={18} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.downloadButton}>
            <Download size={18} color={Colors.primary} />
            <Text style={styles.downloadButtonText}>Download Report</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: 24,
  },
  errorText: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: Colors.error,
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  backButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  flagContainer: {
    width: 80,
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 16,
  },
  flag: {
    width: '100%',
    height: '100%',
  },
  countryInfo: {
    flex: 1,
  },
  countryName: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.text,
    marginBottom: 4,
  },
  countryRegion: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.textLight,
    marginBottom: 4,
  },
  countryCapital: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text,
  },
  countryPopulation: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text,
  },
  favoriteButton: {
    padding: 8,
  },
  keyIndicators: {
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
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.text,
    marginBottom: 16,
  },
  indicatorRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  indicator: {
    flex: 1,
  },
  indicatorLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.textLight,
    marginBottom: 4,
  },
  indicatorValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.text,
  },
  positive: {
    color: Colors.success,
  },
  negative: {
    color: Colors.error,
  },
  neutral: {
    color: Colors.warning,
  },
  creditRatings: {
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
  ratingsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  ratingItem: {
    alignItems: 'center',
  },
  ratingAgency: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 8,
  },
  ratingValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: Colors.text,
  },
  investmentScore: {
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
  scoreCard: {
    marginBottom: 24,
  },
  scoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.text,
  },
  scoreCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: 'white',
  },
  scoreBreakdown: {},
  scoreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  scoreItemLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text,
    width: 130,
  },
  scoreBar: {
    flex: 1,
    height: 8,
    backgroundColor: Colors.lightGray,
    borderRadius: 4,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  scoreBarFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  scoreItemValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.text,
    width: 30,
    textAlign: 'right',
  },
  sectionSubtitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.text,
    marginBottom: 12,
  },
  sectorOpportunities: {},
  sectorItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  sectorInfo: {
    flex: 1,
    marginRight: 12,
  },
  sectorName: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.text,
    marginBottom: 4,
  },
  sectorDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textLight,
  },
  sectorScores: {
    alignItems: 'flex-end',
  },
  sectorScore: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.primary,
    marginBottom: 4,
  },
  sectorGrowth: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  historicalData: {
    marginBottom: 24,
  },
  compareButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    marginBottom: 12,
  },
  compareButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: 'white',
    marginRight: 8,
  },
  downloadButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  downloadButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.primary,
    marginLeft: 8,
  },
});