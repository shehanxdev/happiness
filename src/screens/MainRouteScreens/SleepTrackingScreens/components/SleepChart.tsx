import { colors } from '@vs/constants';
import React, { useEffect, useState } from 'react';

import { View, Text, Dimensions } from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';
import tw from 'twrnc';
import { executeQuery } from './../../../../services/DB.service';

export function SleepChart() {
  const [sleepDurations, setSleepDurations] = useState<number[]>(
    Array(7).fill(0)
  );
  useEffect(() => {
    const getData = async () => {
      const updatedDurations = Array(7).fill(0);
      const sql = `
      SELECT * FROM SleepInfo;
    `;
      const result = await executeQuery<{
        id: number;
        sleepTime: number;
        wakeTime: number;
        duration: number;
        date: number;
      }>(sql, [], false);
      if (Array.isArray(result)) {
        result.forEach(record => {
          console.log('Record ID:', record.id);
          console.log('Sleep Time:', record.sleepTime);
          console.log('Wake Time:', record.wakeTime);
          console.log('Duration:', record.duration);
          console.log('Date:', record.date);
          updatedDurations[record.date] = record.duration / 3600;
        });
        setSleepDurations(updatedDurations);
      } else {
        console.log('No records found or unexpected result format');
      }
    };
    getData();
  }, []);
  const data = {
    labels: [
      'Monday',
      'Thuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ],
    datasets: [
      {
        data: sleepDurations
      }
    ]
  };

  // Customize the chart's appearance
  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `${colors.primary[600]}`,
    fillShadowGradientFromOpacity: 1,
    fillShadowGradientToOpacity: 0,
    fillShadowGradientFrom: colors.primary[400],
    fillShadowGradientTo: colors.primary[400],
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    decimalPlaces: 0,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16
    }
  };

  return (
    <View style={tw` flex-1 flex justify-center items-center rounded`}>
      {/* Heading for the chart */}
      <Text style={tw`text-lg mb-4 text-black self-start`}>
        Sleep graph for the past week
      </Text>

      {/* Bar chart with X-axis and Y-axis labels */}
      <LineChart
        style={tw` rounded-lg`}
        data={data}
        width={Dimensions.get('window').width - 55} // Adjust to screen width
        height={500}
        yAxisLabel=""
        yAxisSuffix="(h)"
        chartConfig={chartConfig}
        verticalLabelRotation={90}
        // Rotate labels if needed
        fromZero={true} // Start Y-axis at 0
      />
    </View>
  );
}
