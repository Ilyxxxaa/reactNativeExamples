import {StyleSheet, View, Animated, Pressable} from 'react-native';
import React, {useState} from 'react';

export const AnimatedBall = () => {
  const value = useState(new Animated.ValueXY({x: 0, y: 0}))[0];
  const moveBall = () => {
    Animated.timing(value, {
      toValue: {x: 100, y: 100},
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View>
      <Animated.View style={value.getLayout()}>
        <View style={styles.redCircle} />
      </Animated.View>
      <Pressable style={styles.btn} onPress={moveBall} />
    </View>
  );
};

const styles = StyleSheet.create({
  redCircle: {
    backgroundColor: 'red',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
  },
  btn: {
    width: 50,
    backgroundColor: 'green',
    height: 100,
  },
});
