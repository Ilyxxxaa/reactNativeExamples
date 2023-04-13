import {StyleSheet} from 'react-native';
import React, {ReactElement} from 'react';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {GestureEvent, PanGestureHandler} from 'react-native-gesture-handler';
import {between, useVector} from 'react-native-redash';
import {Offset} from './utils';

interface IProps {
  children: ReactElement;
  index: number;
  offsets: Offset[];
}

export const SortablePhotoCard: React.FC<IProps> = ({
  offsets,
  index,
  children,
}) => {
  const translation = useVector();
  const isGestureActive = useSharedValue(false);

  const onGestureEvent = useAnimatedGestureHandler<
    GestureEvent,
    {x: number; y: number}
  >({
    onStart: (event, ctx) => {
      ctx.x = translation.x.value;
      ctx.y = translation.y.value;
      isGestureActive.value = true;
    },
    onActive: (event, ctx) => {
      translation.x.value = ctx.x + (event.translationX as number);
      translation.y.value = ctx.y + (event.translationY as number);

      for (let i = 0; i < offsets.length; i++) {
        const o = offsets[i];
        if (i === index) {
          continue;
        }
        if (
          between(
            event.absoluteX as number,
            o.originalX.value,
            o.originalX.value + o.width.value,
          ) &&
          between(
            event.absoluteY as number,
            o.originalY.value,
            o.originalY.value + o.height.value,
          )
        ) {
          console.log();
          break;
        }
      }
    },
    onEnd: () => {
      translation.x.value = withSpring(0);
      translation.y.value = withSpring(0);
      isGestureActive.value = false;
    },

    onCancel: () => {
      translation.x.value = withSpring(0);
      translation.y.value = withSpring(0);
      isGestureActive.value = false;
    },
  });

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translation.x.value},
        {translateY: translation.y.value},
      ],
      zIndex: isGestureActive.value ? 100 : 0,
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
