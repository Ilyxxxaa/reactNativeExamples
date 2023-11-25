import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '@types';
import {getStatusBarHeight, responsiveHeight} from '@utils';

const WelcomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Hello</Text>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('UberEats')}>
          <Text>Uber Eats</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('BottomModal')}>
          <Text>Bottom Modal</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Translucent')}>
          <Text>Translucent status bar</Text>
        </TouchableOpacity>
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
