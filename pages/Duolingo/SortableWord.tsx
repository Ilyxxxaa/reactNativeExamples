import React, {ReactElement} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  useSharedValue,
  useDerivedValue,
} from 'react-native-reanimated';
import {GestureEvent, PanGestureHandler} from 'react-native-gesture-handler';
import {between, useVector} from 'react-native-redash';

import {calculateLayout, lastOrder, Offset, reorder} from './Layout';
import Placeholder, {MARGIN_TOP, MARGIN_LEFT} from './components/Placeholder';

interface SortableWordProps {
  offsets: Offset[];
  children: ReactElement<{id: number}>;
  index: number;
  containerWidth: number;
}

const SortableWord = ({
  offsets,
  index,
  children,
  containerWidth,
}: SortableWordProps) => {
  const offset = offsets[index];
  const isGestureActive = useSharedValue(false);
  const translation = useVector();
  const isInBank = useDerivedValue(() => offset.order.value === -1);
  const onGestureEvent = useAnimatedGestureHandler<
    GestureEvent,
    {x: number; y: number}
  >({
    onStart: (event, ctx) => {
      if (isInBank.value) {
        translation.x.value = offset.originalX.value - MARGIN_LEFT;
        translation.y.value = offset.originalY.value + MARGIN_TOP;
      } else {
        translation.x.value = offset.x.value;
        translation.y.value = offset.y.value;
      }
      ctx.x = translation.x.value;
      ctx.y = translation.y.value;
      isGestureActive.value = true;
    },
    onActive: ({translationX, translationY}, ctx) => {
      translation.x.value = ctx.x + (translationX as number);
      translation.y.value = ctx.y + (translationY as number);
    },
    onEnd: () => {
      isGestureActive.value = false;
    },
  });
  const translateX = useDerivedValue(() => {
    if (isGestureActive.value) {
      return translation.x.value;
    }
    if (isInBank) {
      return offset.originalX.value - MARGIN_LEFT;
    }
    return offset.y.value;
  });
  const translateY = useDerivedValue(() => {
    if (isGestureActive.value) {
      return translation.y.value;
    }
    if (isInBank) {
      return offset.originalY.value + MARGIN_TOP;
    }
    return offset.y.value;
  });
  const style = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: isGestureActive ? 100 : 0,
      width: offset.width.value,
      height: offset.height.value,
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
    };
  });
  return (
    <>
      <Placeholder offset={offset} />
      <Animated.View style={style}>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View style={StyleSheet.absoluteFill}>
            {children}
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </>
  );
};

export default SortableWord;
