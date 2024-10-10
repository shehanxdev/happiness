import React from 'react';
import { View } from 'react-native';
import { BlobBackgroundSVG } from '../../../assets';
import tw from 'twrnc';
import { Text } from 'native-base';

interface BaseQuestionScreenProps {
  children?: React.ReactNode;
  withBlob?: boolean;
}

export const BaseQuestionScreen: React.FC<BaseQuestionScreenProps> = ({
  children,
  withBlob = false
}) => {
  return (
    <View style={tw`h-100 flex-1`}>
      {withBlob && <BlobBackgroundSVG style={tw`absolute`} />}
      {children}
    </View>
  );
};
