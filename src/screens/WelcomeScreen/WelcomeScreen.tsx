import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '@types';
import {getStatusBarHeight, responsiveHeight} from '@utils';
import {screensData} from '../screensData';

const WelcomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Hello</Text>
      <View style={styles.container}>
        {screensData.map(item => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate(item.name)}
              key={item.name}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: getStatusBarHeight(),
    paddingHorizontal: responsiveHeight(20),
    alignItems: 'center',
  },
  title: {
    fontSize: responsiveHeight(25),
  },
  container: {
    width: '100%',
  },
});

export default WelcomeScreen;
