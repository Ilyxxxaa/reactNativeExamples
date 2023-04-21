// import {move} from 'react-native-redash';

import Animated from 'react-native-reanimated';
import {CARDS_GAP, CARD_HEIGHT, CARD_WIDTH, PADDING} from './sizes';

export type SharedValues<T extends Record<string, string | number | boolean>> =
  {
    [K in keyof T]: Animated.SharedValue<T[K]>;
  };

export type Offset = SharedValues<{
  order: number;
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  photoTitle: string;
}>;

const byOrder = (a: Offset, b: Offset) => {
  'worklet';
  return a.order.value > b.order.value ? 1 : -1;
};

export const move = <T>(input: T[], from: number, to: number) => {
  'worklet';
  const offsets = input.slice();
  offsets.splice(to, 0, offsets.splice(from, 1)[0]);
  return offsets;
};

export const reorder = (input: Offset[], from: number, to: number) => {
  'worklet';
  console.log('меняю местами', from, 'и', to);
  // const offsets = input.sort(byOrder);
  const newOffset = move(input, from, to);
  newOffset.map((offset, index) => (offset.order.value = index));
  console.log('new offsets', input);

  return;
};

export const calculateLayout = (offsets: Offset[]) => {
  'worklet';
  // const offsets = input.sort(byOrder);

  if (offsets.length === 0) {
    return;
  }

  offsets.forEach((offset, index) => {
    if (offset.order.value === 0) {
      offsets[index].x.value = PADDING;
      offsets[index].y.value = PADDING;
    }
    if (offset.order.value === 1) {
      offsets[index].x.value = PADDING + CARD_WIDTH + CARDS_GAP;
      offsets[index].y.value = PADDING;
    }
    if (offset.order.value === 2) {
      offsets[index].x.value = PADDING + CARD_WIDTH * 2 + CARDS_GAP * 2;
      offsets[index].y.value = PADDING;
    }
    if (offset.order.value === 3) {
      offsets[index].x.value = PADDING;
      offsets[index].y.value = PADDING + CARDS_GAP + CARD_HEIGHT;
    }
    if (offset.order.value === 4) {
      offsets[index].x.value = PADDING + CARD_WIDTH + CARDS_GAP;
      offsets[index].y.value = PADDING + CARDS_GAP + CARD_HEIGHT;
    }
    if (offset.order.value === 5) {
      offsets[index].x.value = PADDING + CARD_WIDTH * 2 + CARDS_GAP * 2;
      offsets[index].y.value = PADDING + CARDS_GAP + CARD_HEIGHT;
    }
  });
};
