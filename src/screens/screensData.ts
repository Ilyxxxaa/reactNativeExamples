import {
  BottomModalScreen,
  ScrollViewWithDynamicHeader,
  TextInputProps,
  TranslucentStatusBar,
  UberEats,
  WelcomeScreen,
} from '@screens';
import {RootStackParamList} from '@types';

export const screensData: {
  name: keyof RootStackParamList;
  screen: any;
}[] = [
  {
    name: 'WelcomeScreen',
    screen: WelcomeScreen,
  },
  {
    name: 'UberEats',
    screen: UberEats,
  },
  {
    name: 'BottomModal',
    screen: BottomModalScreen,
  },
  {
    name: 'Translucent',
    screen: TranslucentStatusBar,
  },
  {
    name: 'TextInputProps',
    screen: TextInputProps,
  },
  {
    name: 'ScrollViewWithDynamicHeader',
    screen: ScrollViewWithDynamicHeader,
  },
];
