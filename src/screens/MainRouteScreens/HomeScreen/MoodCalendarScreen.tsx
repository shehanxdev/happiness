import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import tw from 'twrnc';
import { executeQuery } from './../../../services/DB.service';
import { useFocusEffect } from '@react-navigation/native';

const moodColors = {
  Angry: '#B22222',
  Happy: '#FFA500',
  Neutral: '#228B22',
  Sad: '#1E90FF'
};

type Mood = 'Angry' | 'Happy' | 'Neutral' | 'Sad';

interface EmotionData {
  id: number;
  emotion: Mood;
  date: string;
}

export const MoodCalendar: React.FC = () => {
  const [emotionsData, setEmotions] = useState<EmotionData[]>();

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        const sql = `
     SELECT *
FROM Emotions e1
WHERE e1.id = (
    SELECT MAX(e2.id)
    FROM Emotions e2
    WHERE e2.date = e1.date
);
    `;
        const result = await executeQuery<EmotionData>(sql, [], false);
        if (Array.isArray(result)) {
          console.log('Hello');
          setEmotions([...result]);
        } else {
          console.log('Noo records found or unexpected result format');
        }
      };
      getData();
    }, [])
  );

  const getMarkedDates = (): { [key: string]: any } => {
    const markedDates: { [key: string]: any } = {};

    emotionsData?.forEach(({ emotion, date }) => {
      console.log('Hello in ' + emotion + ' and ' + moodColors[emotion]);
      markedDates[date] = {
        customStyles: {
          container: {
            backgroundColor: moodColors[emotion],
            borderRadius: 6
          },
          text: {
            color: '#fff',
            fontWeight: 'bold'
          }
        }
      };
    });

    return markedDates;
  };

  return (
    <View style={tw`flex-1`}>
      {emotionsData ? (
        <Calendar
          key={JSON.stringify(emotionsData)}
          style={tw`border border-gray-200 rounded-lg`}
          markingType={'custom'}
          markedDates={getMarkedDates()}
          firstDay={1}
          theme={{
            textDayFontWeight: 'bold',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: 'bold',
            todayTextColor: '#00adf5'
          }}
        />
      ) : (
        <Calendar
          style={tw`border border-gray-200 rounded-lg`}
          markingType={'custom'}
          markedDates={''}
          firstDay={1}
          theme={{
            textDayFontWeight: 'bold',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: 'bold',
            todayTextColor: '#00adf5'
          }}
        />
      )}

      {/* Mood Legend */}
      <View style={tw`mt-4`}>
        <Text style={tw`text-center text-lg font-bold mb-2`}>Mood Legend</Text>
        <View style={tw`flex-row justify-between px-8`}>
          <View style={tw`items-center`}>
            <View
              style={[
                tw`w-6 h-6 bg-[${moodColors.Angry}]`,
                { borderRadius: 3 }
              ]}
            />
            <Text> angry</Text>
          </View>
          <View style={tw`items-center`}>
            <View
              style={[
                tw`w-6 h-6 bg-[${moodColors.Happy}]`,
                { borderRadius: 3 }
              ]}
            />
            <Text> Happy</Text>
          </View>
          <View style={tw`items-center`}>
            <View
              style={[
                tw`w-6 h-6 bg-[${moodColors.Neutral}]`,
                { borderRadius: 3 }
              ]}
            />
            <Text> Neutral</Text>
          </View>
          <View style={tw`items-center`}>
            <View
              style={[tw`w-6 h-6 bg-[${moodColors.Sad}]`, { borderRadius: 3 }]}
            />
            <Text> Sad</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
