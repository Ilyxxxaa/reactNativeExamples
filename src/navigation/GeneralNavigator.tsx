import React from 'react';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {screensData} from '@screens';
import {RootStackParamList} from '@types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const ScreenWithoutHeaderConfig: NativeStackNavigationOptions = {
  headerShown: false,
};

const GeneralNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={ScreenWithoutHeaderConfig}>
        {screensData.map(item => {
          return (
            <Stack.Screen
              name={item.name}
              component={item.screen}
              key={item.name}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default GeneralNavigator;
