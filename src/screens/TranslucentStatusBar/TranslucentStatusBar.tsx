import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {getStatusBarHeight} from '@utils';

const TranslucentStatusBar = () => {
  useEffect(() => {
    console.log('status bar', getStatusBarHeight());
  });

  return (
    <View style={styles.wrapper}>
      <StatusBar barStyle="dark-content" translucent animated />
      <Text style={styles.text}>TranslucentStatusBar</Text>
      <View style={styles.block} />
    </View>
  );
};

export default TranslucentStatusBar;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: getStatusBarHeight(),
  },
  text: {
    color: 'black',
  },
  block: {
    height: 200,
    backgroundColor: 'green',
  },
});
