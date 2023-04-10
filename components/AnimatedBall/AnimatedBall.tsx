import {StyleSheet, View, Animated, Pressable, Text} from 'react-native';
import React, {useRef} from 'react';

export const AnimatedBall = () => {
  const value = useRef(new Animated.Value(0)).current;
  const moveBall = () => {
    Animated.timing(value, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{opacity: value}}>
        <View style={styles.redCircle} />
      </Animated.View>
      <Pressable style={styles.btn} onPress={moveBall}>
        <Text>Click me!</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  redCircle: {
    backgroundColor: 'red',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
  },
  btn: {
    width: 100,
    backgroundColor: 'green',
    height: 20,
  },
});
