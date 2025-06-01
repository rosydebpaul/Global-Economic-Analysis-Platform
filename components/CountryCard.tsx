import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { router } from 'expo-router';
import { ArrowUpRight, Star } from 'lucide-react-native';
import { useAppContext } from '@/context/AppContext';
import { CountryData } from '@/types/dataTypes';
import { formatCurrency, formatPercentage } from '@/utils/formatters';
import Colors from '@/constants/Colors';

interface CountryCardProps {
  country: CountryData;
  showActions?: boolean;
}

const CountryCard: React.FC<CountryCardProps> = ({ country, showActions = true }) => {
  const { favoriteCountries, toggleFavoriteCountry } = useAppContext();
  const isFavorite = favoriteCountries.includes(country.id);

  const handlePress = () => {
    router.push(`/country/${country.id}`);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.7}
      role="button"
    >
      <View style={styles.header}>
        <Image source={{ uri: country.flag }} style={styles.flag} />
        <View style={styles.titleContainer}>
          <Text style={styles.name}>{country.name}</Text>
          <Text style={styles.region}>{country.region}</Text>
        </View>
        {showActions && (
          <TouchableOpacity 
            style={styles.favoriteButton}
            onPress={() => toggleFavoriteCountry(country.id)}
            role="button"
          >
            <Star
              size={22}
              color={isFavorite ? Colors.gold : Colors.gray}
              fill={isFavorite ? Colors.gold : 'transparent'}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.indicators}>
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
          <Text style={styles.indicatorLabel}>GDP</Text>
          <Text style={styles.indicatorValue}>
            {formatCurrency(country.indicators.gdp)}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.investmentScore}>
          <Text style={styles.investmentLabel}>Investment Score</Text>
          <View style={styles.scoreContainer}>
            <View style={[styles.scoreBar, { width: `${country.investmentScore.overall}%` }]} />
            <Text style={styles.scoreText}>{country.investmentScore.overall}</Text>
          </View>
        </View>
        
        <View style={styles.viewDetails}>
          <ArrowUpRight size={16} color={Colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  flag: {
    width: 40,
    height: 30,
    borderRadius: 4,
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  name: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.text,
  },
  region: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textLight,
  },
  favoriteButton: {
    padding: 8,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  indicator: {
    flex: 1,
    alignItems: 'flex-start',
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
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  investmentScore: {
    flex: 1,
  },
  investmentLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.textLight,
    marginBottom: 4,
  },
  scoreContainer: {
    height: 12,
    backgroundColor: Colors.lightGray,
    borderRadius: 6,
    overflow: 'hidden',
    position: 'relative',
  },
  scoreBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: Colors.primary,
    borderRadius: 6,
  },
  scoreText: {
    position: 'absolute',
    right: 4,
    top: -1,
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: 'white',
  },
  viewDetails: {
    padding: 8,
  },
});

export default CountryCard;