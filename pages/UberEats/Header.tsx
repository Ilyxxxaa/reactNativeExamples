import React, {RefObject} from 'react';
import {StyleSheet, View} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {HEADER_IMAGE_HEIGHT} from './HeaderImage';
import TabHeader from './TabHeader';
import {TabModel} from './Content';
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const ICON_SIZE = 24;
const PADDING = 16;
export const MIN_HEADER_HEIGHT = 45;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  header: {
    flexDirection: 'row',
    height: MIN_HEADER_HEIGHT,
    alignItems: 'center',
    paddingHorizontal: PADDING,
  },
  title: {
    fontFamily: 'UberMoveMedium',
    fontSize: 18,
    marginLeft: PADDING,
    flex: 1,
  },
});

interface HeaderProps {
  tabs: TabModel[];
  y: SharedValue<number>;
  scrollViewRef: RefObject<Animated.ScrollView>;
}

export default ({tabs, y, scrollViewRef}: HeaderProps) => {
  const insets = useSafeAreaInsets();
  const {top: paddingTop} = insets;

  const translateYStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      y.value,
      [0, HEADER_IMAGE_HEIGHT],
      [HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT, 0],
      {
        extrapolateRight: Extrapolate.CLAMP,
      },
    );

    const translateX = interpolate(
      y.value,
      [0, HEADER_IMAGE_HEIGHT],
      [-ICON_SIZE - PADDING, 0],
      {
        extrapolateRight: Extrapolate.CLAMP,
        extrapolateLeft: Extrapolate.CLAMP,
      },
    );

    return {
      transform: [{translateY}, {translateX}],
    };
  });

  return (
    <View style={[styles.container, {paddingTop}]}>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'white',
        }}
      />
      <View style={styles.header}>
        <Animated.Text style={[styles.title, translateYStyle]}>
          Miss Miu Europaallee
        </Animated.Text>
      </View>
      <TabHeader {...{tabs, y, scrollViewRef}} />
    </View>
  );
};
