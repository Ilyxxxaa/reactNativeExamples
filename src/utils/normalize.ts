import {Dimensions} from 'react-native';

import {getBottomSpace, getStatusBarHeight} from './safeAreaHelpers';

const MOCKUP_HEIGHT = 741; // SAFE AREA HEIGHT WITHOUT STATUSBAR & HOME INDICATOR AREA
const MOCKUP_WIDTH = 375;

const {height: windowHeight, width: windowWidth} = Dimensions.get('window');

export const responsiveHeight = (height: number) => {
  const deviceSafeHeight =
    windowHeight - (getStatusBarHeight(false) + getBottomSpace()); // we use false for status bar because it is transparent in our app and we need this value

  return height * (deviceSafeHeight / MOCKUP_HEIGHT);
};

export const responsiveWidth = (width: number) => {
  return width * (windowWidth / MOCKUP_WIDTH);
};
