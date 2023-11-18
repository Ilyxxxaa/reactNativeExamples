import React, {useRef, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';

import HeaderImage from './HeaderImage';
import Content, {defaultTabs} from './Content';
import Header from './Header';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

const {height: wHeight, width: wWidth} = Dimensions.get('window');
export const HEADER_IMAGE_HEIGHT = wHeight / 3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: wWidth,
    resizeMode: 'cover',
    // height: HEADER_IMAGE_HEIGHT,
  },
});

export default () => {
  const [tabs, setTabs] = useState(defaultTabs);
  const y = useSharedValue(0);
  const scrollViewRef = useRef<Animated.ScrollView>(null);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      y.value = e.contentOffset.y;
    },
  });

  return (
    <View style={styles.container}>
      <HeaderImage y={y} />
      <Animated.ScrollView
        ref={scrollViewRef}
        style={StyleSheet.absoluteFill}
        scrollEventThrottle={1}
        onScroll={scrollHandler}>
        <Content
          onMeasurement={(index, tab) => {
            tabs[index] = tab;
            setTabs([...tabs]);
          }}
        />
      </Animated.ScrollView>
      <Header {...{tabs, y, scrollViewRef}} />
    </View>
  );
};
