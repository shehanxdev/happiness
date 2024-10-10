import { Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { BaseQuestionScreen } from '../BaseQuestionScreen';
import { strings } from './../../../constants/strings';
import tw from 'twrnc';
import { Button } from '../../../components/Button';
import type { StackScreenProps } from '@react-navigation/stack';
import {
  NumericalConstants,
  colors,
  screenNames,
  stackNames
} from '@vs/constants';
import { MeditatingPersonSVG } from '@vs/assets';
import { Animated, Easing } from 'react-native';

type WelcomeScreenProps = StackScreenProps<
  Record<string, object | undefined>,
  'WelcomeScreen'
>;

export const WelcomeScreen = ({ navigation }: WelcomeScreenProps) => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    const animationLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: NumericalConstants.MEDITATING_ANIMATION_DURATION,
          easing: Easing.linear,
          useNativeDriver: true
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: NumericalConstants.MEDITATING_ANIMATION_DURATION,
          easing: Easing.linear,
          useNativeDriver: true
        }),
        Animated.timing(animation, {
          toValue: -1,
          duration: NumericalConstants.MEDITATING_ANIMATION_DURATION,
          easing: Easing.linear,
          useNativeDriver: true
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: NumericalConstants.MEDITATING_ANIMATION_DURATION,
          easing: Easing.linear,
          useNativeDriver: true
        })
      ])
    );

    animationLoop.start();

    return () => {
      animationLoop.stop();
    };
  }, []);

  const translateY = animation.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [10, 0, -10]
  });

  const naviagteToNextScreen = (path: string) => {
    navigation.navigate(path);
  };

  return (
    <BaseQuestionScreen withBlob={true}>
      <View style={tw`flex justify-between mt-8 mb-8 flex-1`}>
        <View style={tw`flex justify-center items-center mx-10`}>
          <Text fontSize="5xl" bold>
            Happiness
          </Text>
          <Text fontSize="xl">Nurture your happiness, every day</Text>
        </View>
        <View style={tw`flex justify-center flex-1 items-center`}>
          <Animated.View style={{ transform: [{ translateY }] }}>
            <MeditatingPersonSVG />
          </Animated.View>
        </View>
        <View style={tw`flex  gap-4 mx-10`}>
          <Button
            title="Analyze my emotions"
            onPress={() => naviagteToNextScreen(screenNames.QuestionScreen)}
          />
          {/* <View style={tw`border-[${colors.primary[500]}] border rounded-lg`}>
            <Button
              pressedButtonColor={colors.lightGrey}
              buttonTextColor={colors.black}
              bgColor={colors.white}
              title="Skip"
              onPress={() => naviagteToNextScreen(stackNames.MainStack)}
            />
          </View> */}
        </View>
      </View>
    </BaseQuestionScreen>
  );
};
