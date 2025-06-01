import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTooltip } from 'victory-native';
import { TimeSeriesData } from '@/types/dataTypes';
import Colors from '@/constants/Colors';

interface EconomicChartProps {
  title: string;
  data: TimeSeriesData[];
  format?: 'percentage' | 'currency' | 'number';
  color?: string;
}

const EconomicChart: React.FC<EconomicChartProps> = ({ 
  title, 
  data, 
  format = 'number',
  color = Colors.primary,
}) => {
  if (!data || data.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.noData}>No data available</Text>
      </View>
    );
  }

  const formatValue = (value: number): string => {
    if (format === 'percentage') {
      return `${value.toFixed(1)}%`;
    } else if (format === 'currency') {
      return value >= 1000000000000 
        ? `$${(value / 1000000000000).toFixed(1)}T` 
        : value >= 1000000000 
          ? `$${(value / 1000000000).toFixed(1)}B` 
          : `$${value.toLocaleString()}`;
    } else {
      return value.toLocaleString();
    }
  };

  const chartData = data.map(item => ({
    x: new Date(item.date),
    y: item.value,
    label: formatValue(item.value)
  }));

  const formatDate = (date: Date) => {
    return date.getFullYear().toString();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.chartContainer}>
        <VictoryChart
          width={Dimensions.get('window').width - 48}
          height={180}
          padding={{ top: 10, bottom: 30, left: 50, right: 30 }}
        >
          <VictoryAxis
            tickFormat={(date) => formatDate(new Date(date))}
            style={{
              axis: { stroke: Colors.lightGray },
              ticks: { stroke: Colors.lightGray, size: 5 },
              tickLabels: { fontSize: 10, padding: 5, fontFamily: 'Inter-Regular' }
            }}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(tick) => {
              if (format === 'percentage') {
                return `${tick}%`;
              } else if (format === 'currency') {
                return tick >= 1000000000000 
                  ? `$${(tick / 1000000000000).toFixed(1)}T` 
                  : tick >= 1000000000 
                    ? `$${(tick / 1000000000).toFixed(1)}B` 
                    : `$${tick}`;
              } else {
                return tick.toString();
              }
            }}
            style={{
              axis: { stroke: Colors.lightGray },
              ticks: { stroke: Colors.lightGray, size: 5 },
              tickLabels: { fontSize: 10, padding: 5, fontFamily: 'Inter-Regular' }
            }}
          />
          <VictoryLine
            data={chartData}
            style={{
              data: { stroke: color, strokeWidth: 2 }
            }}
            labelComponent={
              <VictoryTooltip
                cornerRadius={5}
                flyoutStyle={{
                  fill: 'white',
                  stroke: Colors.lightGray,
                  strokeWidth: 1,
                }}
                style={{ fontSize: 12, fontFamily: 'Inter-Regular' }}
              />
            }
          />
        </VictoryChart>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  title: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginBottom: 12,
    color: Colors.text,
  },
  chartContainer: {
    alignItems: 'center',
  },
  noData: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textLight,
    textAlign: 'center',
    marginVertical: 32,
  },
});

export default EconomicChart;