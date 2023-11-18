import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface IProps {
  title: string;
  index: number;
  translateX: Animated.SharedValue<number>;
}

const {height, width} = Dimensions.get('window');
const SIZE = width * 0.7;

export const Page: React.FC<IProps> = ({index, translateX, title}) => {
  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0, 1, 0],
      Extrapolate.CLAMP,
    );

    const borderRadius = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0, SIZE / 2, 0],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{scale}],
      borderRadius,
    };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [height / 2, 0, -height / 2],
      Extrapolate.CLAMP,
    );

    const opacity = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [-2, 1, -2],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{translateY}],
      opacity,
    };
  });

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: `rgba(0,0,256,0.${index + 2})`},
      ]}>
      <Animated.View style={[styles.square, rStyle]} />
      <Animated.View style={[styles.textContainer, rTextStyle]}>
        <Text style={[styles.text]}>{title}</Text>
      </Animated.View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    height,
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    height: width * 0.7,
    width: width * 0.7,
    backgroundColor: 'rgba(0,0,256,0.4)',
  },
  textContainer: {
    position: 'absolute',
  },
  text: {
    fontSize: 45,
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: '700',
  },
});
