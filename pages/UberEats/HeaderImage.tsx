import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const {height: wHeight, width: wWidth} = Dimensions.get('window');
// eslint-disable-next-line @typescript-eslint/no-var-requires
export const backgroundImage = require('./assets/background.jpeg');

export const HEADER_IMAGE_HEIGHT = wHeight / 3;
const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: wWidth,
    resizeMode: 'cover',
    height: HEADER_IMAGE_HEIGHT,
  },
});

interface HeaderImageProps {
  y: SharedValue<number>;
}

export default ({y}: HeaderImageProps) => {
  const heightStyle = useAnimatedStyle(() => {
    const height = interpolate(
      y.value,
      [-100, 0],
      [HEADER_IMAGE_HEIGHT + 100, HEADER_IMAGE_HEIGHT],
      {
        extrapolateRight: Extrapolation.CLAMP,
      },
    );

    const top = interpolate(y.value, [0, 1], [0, -1], {
      extrapolateLeft: Extrapolation.CLAMP,
    });

    return {
      height: height,
      top,
    };
  });

  return (
    <Animated.Image
      source={backgroundImage}
      style={[styles.image, heightStyle]}
    />
  );
};
