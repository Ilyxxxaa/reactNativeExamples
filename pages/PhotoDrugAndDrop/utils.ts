import {move} from 'react-native-redash';

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

export const reorder = (input: Offset[], from: number, to: number) => {
  'worklet';
  const offsets = input.sort(byOrder);
  const newOffset = move(offsets, from, to);
  newOffset.map((offset, index) => (offset.order.value = index));
};

export const calculateLayout = (offsets: Offset[]) => {
  'worklet';
  if (offsets.length === 0) {
    return;
  }

  offsets.forEach((offset, index) => {
    if (index === 0) {
      offsets[index].x.value = PADDING;
      offsets[index].y.value = PADDING;
    }
    if (index === 1) {
      offsets[index].x.value = PADDING + CARD_WIDTH + CARDS_GAP;
      offsets[index].y.value = PADDING;
    }
    if (index === 2) {
      offsets[index].x.value = PADDING + CARD_WIDTH * 2 + CARDS_GAP * 2;
      offsets[index].y.value = PADDING;
    }
    if (index === 3) {
      offsets[index].x.value = PADDING;
      offsets[index].y.value = PADDING + CARDS_GAP + CARD_HEIGHT;
    }
    if (index === 4) {
      offsets[index].x.value = PADDING + CARD_WIDTH + CARDS_GAP;
      offsets[index].y.value = PADDING + CARDS_GAP + CARD_HEIGHT;
    }
    if (index === 5) {
      offsets[index].x.value = PADDING + CARD_WIDTH * 2 + CARDS_GAP * 2;
      offsets[index].y.value = PADDING + CARDS_GAP + CARD_HEIGHT;
    }
  });
};
