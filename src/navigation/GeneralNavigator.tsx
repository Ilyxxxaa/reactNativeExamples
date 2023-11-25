import React from 'react';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {BottomModalScreen, TranslucentStatusBar, WelcomeScreen} from '@screens';
import {RootStackParamList} from '@types';
import {UberEats} from '@screens';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const ScreenWithoutHeaderConfig: NativeStackNavigationOptions = {
  headerShown: false,
};

const GeneralNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={ScreenWithoutHeaderConfig}>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="UberEats" component={UberEats} />
        <Stack.Screen name="BottomModal" component={BottomModalScreen} />
        <Stack.Screen name="Translucent" component={TranslucentStatusBar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default GeneralNavigator;
