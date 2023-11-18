import 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import React from 'react';
import {GeneralNavigator} from '@navigation';

// import {AnimatedBall} from './components';
// import {Duolingo} from './pages';
// import { UseTransition } from './pages';
// import {OpacityRect} from './pages';
// import {PanGestureSimple} from './pages';
// import {Slider} from './pages';
// import {PhotoSection} from './pages;
// import {PhotoSection} from './pages';
// import {PhotoSection2} from './pages';
// import {Chrome} from './pages';
// import {ScrollingHeader} from './pages';
// import UberEats from './pages/UberEats';

const App = () => {
  return (
    <SafeAreaProvider>
      <GeneralNavigator />
    </SafeAreaProvider>
  );
};

export default App;
