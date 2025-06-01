import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, X } from 'lucide-react-native';
import { useAppContext } from '@/context/AppContext';
import CountrySelector from '@/components/CountrySelector';
import EconomicChart from '@/components/EconomicChart';
import Colors from '@/constants/Colors';
import { formatCurrency, formatPercentage, formatNumber } from '@/utils/formatters';

export default function CompareScreen() {
  const { isLoading, globalData, selectedCountries } = useAppContext();
  
  if (isLoading || !globalData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading comparison data...</Text>
      </View>
    );
  }
  
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: 'Compare Countries',
          headerBackTitle: 'Back',
        }}
      />
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Compare Economic Data</Text>
          
          <View style={styles.comparisonCard}>
            <Text style={styles.cardTitle}>GDP Comparison</Text>
            
            <View style={styles.dataTable}>
              <View style={styles.tableHeader}>
                <Text style={styles.headerCountry}>Country</Text>
                <Text style={styles.headerValue}>GDP (USD)</Text>
                <Text style={styles.headerValue}>Growth</Text>
              </View>
              
              {selectedCountries.map((country) => (
                <View key={country.id} style={styles.tableRow}>
                  <Text style={styles.rowCountry}>{country.name}</Text>
                  <Text style={styles.rowValue}>
                    {formatCurrency(country.indicators.gdp)}
                  </Text>
                  <Text style={[
                    styles.rowValue,
                    country.indicators.gdpGrowth > 0 ? styles.positive : styles.negative
                  ]}>
                    {formatPercentage(country.indicators.gdpGrowth)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          
          <View style={styles.comparisonCard}>
            <Text style={styles.cardTitle}>Inflation & Unemployment</Text>
            
            <View style={styles.dataTable}>
              <View style={styles.tableHeader}>
                <Text style={styles.headerCountry}>Country</Text>
                <Text style={styles.headerValue}>Inflation</Text>
                <Text style={styles.headerValue}>Unemployment</Text>
              </View>
              
              {selectedCountries.map((country) => (
                <View key={country.id} style={styles.tableRow}>
                  <Text style={styles.rowCountry}>{country.name}</Text>
                  <Text style={[
                    styles.rowValue,
                    country.indicators.inflation < 3 ? styles.positive : 
                    country.indicators.inflation < 6 ? styles.neutral : styles.negative
                  ]}>
                    {formatPercentage(country.indicators.inflation)}
                  </Text>
                  <Text style={[
                    styles.rowValue,
                    country.indicators.unemployment < 5 ? styles.positive : 
                    country.indicators.unemployment < 8 ? styles.neutral : styles.negative
                  ]}>
                    {formatPercentage(country.indicators.unemployment)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          
          <View style={styles.comparisonCard}>
            <Text style={styles.cardTitle}>Debt & Investment</Text>
            
            <View style={styles.dataTable}>
              <View style={styles.tableHeader}>
                <Text style={styles.headerCountry}>Country</Text>
                <Text style={styles.headerValue}>Debt to GDP</Text>
                <Text style={styles.headerValue}>FDI</Text>
              </View>
              
              {selectedCountries.map((country) => (
                <View key={country.id} style={styles.tableRow}>
                  <Text style={styles.rowCountry}>{country.name}</Text>
                  <Text style={[
                    styles.rowValue,
                    country.indicators.debtToGdpRatio < 60 ? styles.positive : 
                    country.indicators.debtToGdpRatio < 100 ? styles.neutral : styles.negative
                  ]}>
                    {formatPercentage(country.indicators.debtToGdpRatio)}
                  </Text>
                  <Text style={styles.rowValue}>
                    {formatCurrency(country.indicators.foreignDirectInvestment)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          
          <View style={styles.comparisonCard}>
            <Text style={styles.cardTitle}>Investment Score</Text>
            
            <View style={styles.dataTable}>
              <View style={styles.tableHeader}>
                <Text style={styles.headerCountry}>Country</Text>
                <Text style={styles.headerValue}>Overall</Text>
                <Text style={styles.headerValue}>Risk</Text>
              </View>
              
              {selectedCountries.map((country) => (
                <View key={country.id} style={styles.tableRow}>
                  <Text style={styles.rowCountry}>{country.name}</Text>
                  <Text style={styles.rowValue}>
                    {country.investmentScore.overall}
                  </Text>
                  <Text style={[
                    styles.rowValue,
                    country.investmentScore.riskFactor < 30 ? styles.positive : 
                    country.investmentScore.riskFactor < 60 ? styles.neutral : styles.negative
                  ]}>
                    {country.investmentScore.riskFactor}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => router.back()}
          >
            <Text style={styles.closeButtonText}>Close Comparison</Text>
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
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.text,
    marginBottom: 16,
  },
  comparisonCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  cardTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.text,
    marginBottom: 16,
  },
  dataTable: {},
  tableHeader: {
    flexDirection: 'row',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  headerCountry: {
    flex: 2,
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.textLight,
  },
  headerValue: {
    flex: 1,
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.textLight,
    textAlign: 'right',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  rowCountry: {
    flex: 2,
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.text,
  },
  rowValue: {
    flex: 1,
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.text,
    textAlign: 'right',
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
  closeButton: {
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 24,
  },
  closeButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.text,
  },
});