import {StyleSheet, Text, View, Animated} from 'react-native';
import React, {useRef} from 'react';

const ScrollingHeader = () => {
  const scrollYValue = useRef(new Animated.Value(0)).current;

  console.log(scrollYValue);

  const translateY = scrollYValue.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  return (
    <View>
      <Animated.ScrollView
        scrollEventThrottle={16}
        bounces={false}
        overScrollMode="never"
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollYValue,
                },
              },
            },
          ],
          {
            useNativeDriver: true,
          },
        )}>
        <Animated.View style={[styles.header, {transform: [{translateY}]}]}>
          <Text>Header</Text>
        </Animated.View>

        <View style={styles.content} />
      </Animated.ScrollView>
    </View>
  );
};

export default ScrollingHeader;

const styles = StyleSheet.create({
  header: {
    height: 75,
    backgroundColor: 'gray',
  },
  content: {
    height: 2000,
    backgroundColor: 'green',
  },
});
