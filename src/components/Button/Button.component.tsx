import React, { useState } from 'react';
import { Button as NBButton, Text, useTheme } from 'native-base';
import { colors } from './../../constants/colors';
import { TextFontSizes } from '@vs/constants';
import tw from 'twrnc';
interface ButtonProps {
  title: string;
  bgColor?: string;
  outlineColor?: string;
  pressedButtonColor?: string;
  isLoading?: boolean;
  fontSize?: TextFontSizes;
  buttonTextColor?: string;
  onPress?: () => void;
  disabled?: boolean;
}

export const Button = ({
  disabled,
  bgColor = colors.primary[400],
  outlineColor,
  pressedButtonColor = colors.primary[500],
  title,
  isLoading = false,
  fontSize = 'lg',
  buttonTextColor = colors.white,
  onPress
}: ButtonProps) => {
  const [buttonBgColor, setButtonBgColor] = useState(bgColor);
  const theme = useTheme();

  return (
    <NBButton
      disabled={disabled}
      style={tw`rounded-md w-full`}
      fontFamily={'Noto Sans Sinhala'}
      onPress={onPress}
      outlineColor={outlineColor}
      isLoading={isLoading}
      backgroundColor={buttonBgColor}
      onPressIn={() => setButtonBgColor(pressedButtonColor)}
      onPressOut={() => setButtonBgColor(bgColor)}>
      <Text color={buttonTextColor} fontSize={fontSize}>
        {title}
      </Text>
    </NBButton>
  );
};
