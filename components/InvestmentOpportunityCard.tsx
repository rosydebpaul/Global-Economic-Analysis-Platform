import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowUpRight } from 'lucide-react-native';
import { SectorOpportunity } from '@/types/dataTypes';
import Colors from '@/constants/Colors';
import { formatPercentage } from '@/utils/formatters';

interface InvestmentOpportunityCardProps {
  country: string;
  sector: SectorOpportunity;
  onPress: () => void;
}

const InvestmentOpportunityCard: React.FC<InvestmentOpportunityCardProps> = ({
  country,
  sector,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.sector}>{sector.sector}</Text>
          <Text style={styles.country}>{country}</Text>
        </View>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreLabel}>Score</Text>
          <View style={styles.score}>
            <Text style={styles.scoreValue}>{sector.score}</Text>
          </View>
        </View>
      </View>
      
      <Text style={styles.description}>{sector.description}</Text>
      
      <View style={styles.footer}>
        <View style={styles.growthContainer}>
          <Text style={styles.growthLabel}>Growth Rate</Text>
          <Text style={styles.growthValue}>{formatPercentage(sector.growthRate)}</Text>
        </View>
        <ArrowUpRight size={20} color={Colors.primary} />
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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
  },
  sector: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.text,
    marginBottom: 4,
  },
  country: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textLight,
  },
  scoreContainer: {
    alignItems: 'center',
  },
  scoreLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.textLight,
    marginBottom: 4,
  },
  score: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: 'white',
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text,
    marginBottom: 16,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  growthContainer: {},
  growthLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.textLight,
    marginBottom: 4,
  },
  growthValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.success,
  },
});

export default InvestmentOpportunityCard;