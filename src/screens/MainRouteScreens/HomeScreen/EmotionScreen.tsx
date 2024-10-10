import { StackScreenProps } from '@react-navigation/stack';
import {
  AngryFaceSvg,
  HappyFaceSvg,
  NeutralFaceSvg,
  SadFaceSvg
} from '@vs/assets';
import React from 'react';
import { Text } from 'react-native';
import { ScrollView } from 'react-native';
import { MainStackParamList } from 'src/routes/route.types';
import tw from 'twrnc';

type EmotionScreenProps = StackScreenProps<MainStackParamList, 'EmotionScreen'>;

export function EmotionScreen({ route, navigation }: EmotionScreenProps) {
  const { emotion } = route.params as { emotion: string };

  const getEmotionEmoji = () => {
    if (emotion == 'Happy') {
      return <HappyFaceSvg />;
    } else if (emotion == 'Sad') {
      return <SadFaceSvg />;
    } else if (emotion == 'Neutral') {
      return <NeutralFaceSvg />;
    } else if (emotion == 'Angry') {
      return <AngryFaceSvg />;
    }
  };
  return (
    <ScrollView style={tw`m-6`}>
      {getEmotionEmoji()}
      <Text style={tw``}>Hello</Text>
    </ScrollView>
  );
}
