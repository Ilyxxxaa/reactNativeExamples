import {StyleSheet} from 'react-native';
import React, {ReactElement} from 'react';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {GestureEvent, PanGestureHandler} from 'react-native-gesture-handler';
import {between, useVector} from 'react-native-redash';
import {Offset, calculateLayout, reorder} from './utils';
import {CARD_HEIGHT, CARD_WIDTH} from './sizes';

interface IProps {
  children: ReactElement;
  index: number;
  offsets: Offset[];
  drugItemsAmount: number;
  editMode: boolean;
}

export const SortablePhotoCard: React.FC<IProps> = ({
  offsets,
  index,
  children,
  drugItemsAmount,
  editMode,
}) => {
  const offset = offsets[index];
  const translation = useVector();
  const isGestureActive = useSharedValue(false);

  const onGestureEvent = useAnimatedGestureHandler<
    GestureEvent,
    {x: number; y: number}
  >({
    onStart: (event, ctx) => {
      console.log(editMode, 'edit Mode');
      if (drugItemsAmount > offsets[index].order.value && editMode) {
        translation.x.value = offset.x.value;
        translation.y.value = offset.y.value;
        ctx.x = translation.x.value;
        ctx.y = translation.y.value;
        isGestureActive.value = true;
      }
    },
    onActive: (event, ctx) => {
      translation.x.value = ctx.x + (event.translationX as number);
      translation.y.value = ctx.y + (event.translationY as number);
      for (let i = 0; i < offsets.length; i++) {
        const o = offsets[i];
        if (offset.order.value === offsets[i].order.value) {
          continue;
        }
        if (
          between(translation.x.value, o.x.value, o.x.value + CARD_WIDTH) &&
          between(translation.y.value, o.y.value, o.y.value + CARD_HEIGHT) &&
          o.order.value < drugItemsAmount
        ) {
          reorder(offsets, offset.order.value, i);
          calculateLayout(offsets);

          const serverRequest = offsets.map(item => {
            return item.photoTitle;
          });
          console.log(serverRequest);
          break;
        }
      }
    },
    onEnd: () => {
      translation.x.value = withSpring(offset.x.value);
      translation.y.value = withSpring(offset.y.value);
      isGestureActive.value = false;
    },
  });

  const translateX = useDerivedValue(() => {
    if (isGestureActive.value) {
      return translation.x.value;
    }
    return withSpring(offset.x.value);
  });
  const translateY = useDerivedValue(() => {
    if (isGestureActive.value) {
      return translation.y.value;
    }
    return withSpring(offset.y.value);
  });

  const style = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: isGestureActive.value ? 100 : 0,

      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
        {scale: isGestureActive.value ? 1.1 : 1},
      ],
    };
  });

  return (
    <Animated.View style={style}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={StyleSheet.absoluteFillObject}>
          {children}
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};
