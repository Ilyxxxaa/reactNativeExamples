import {move} from 'react-native-redash';
import {SharedValues} from './components/Utils';

export const WORD_HEIGHT = 55;

export type Offset = SharedValues<{
  order: number;
  width: number;
  height: number;
  x: number;
  y: number;
  originalX: number;
  originalY: number;
}>;

const isNotInBank = (offset: Offset) => {
  'worklet';
  return offset.order.value === -1;
};

const byOrder = (a: Offset, b: Offset) => {
  'worklet';
  return a.order.value > b.order.value ? 1 : -1;
};

export const reorder = (input: Offset[], from: number, to: number) => {
  'worklet';
  const offsets = input.filter(isNotInBank).sort(byOrder);
  const newOffset = move(offsets, from, to);
  newOffset.map((offset, index) => (offset.order.value = index));
};

export const calculateLayout = (input: Offset[], containerWidth: number) => {
  'worklet';
  const offsets = input.filter(isNotInBank).sort(byOrder);
  if (offsets.length === 0) {
    return;
  }

  let lineNumber = 0;
  let lineBreak = 0;
  offsets.forEach((offset, index) => {
    const total = offsets
      .slice(lineBreak, index)
      .reduce((acc, o) => acc + o.width.value, 0);
    if (total + offset.width.value > containerWidth) {
      lineNumber = lineNumber + 1;
      lineBreak = index;
      offset.x.value = 0;
    } else {
      offset.x.value = total;
    }
    offset.y.value = WORD_HEIGHT * lineNumber;
  });
};
