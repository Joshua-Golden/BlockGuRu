import React from 'react';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {NHSColors, sizes} from '../../../constants/theme';

type CustomBackgroundProps = {
  animatedIndex? : any;
  style? : any;
}

const CustomBackground = ({animatedIndex, style}: CustomBackgroundProps) => {
  const containerStyle = useAnimatedStyle(() => ({
    ...style,
    backgroundColor: NHSColors['nhs-white'],
    borderTopLeftRadius: sizes.radius,
    borderTopRightRadius: sizes.radius,
    opacity: interpolate(
      animatedIndex.value,
      [0, 0.08],
      [0, 1],
      Extrapolation.CLAMP,
    ),
  }));
  return <Animated.View style={containerStyle} />;
};

export default CustomBackground;
