import {move} from 'react-native-redash';

import Animated from 'react-native-reanimated';

export type SharedValues<T extends Record<string, string | number | boolean>> =
  {
    [K in keyof T]: Animated.SharedValue<T[K]>;
  };

export type Offset = SharedValues<{
  order: number;
  width: number;
  height: number;
  x: number;
  y: number;
  originalX: number;
  originalY: number;
}>;

const byOrder = (a: Offset, b: Offset) => {
  'worklet';
  return a.order.value > b.order.value ? 1 : -1;
};

export const reorder = (input: Offset[], from: number, to: number) => {
  'worklet';
  const offsets = input.sort(byOrder);
  const newOffset = move(offsets, from, to);
  newOffset.map((offset, index) => (offset.order.value = index));
};
