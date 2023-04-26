import React, {ReactNode} from 'react';
import {Dimensions, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {
  COL,
  Positions,
  SIZE,
  animationConfig,
  getOrder,
  getPosition,
} from './Config';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

interface ItemProps {
  children: ReactNode;
  id: string;
  positions: Animated.SharedValue<Positions>;
}

const Item = ({children, positions, id}: ItemProps) => {
  // const inset = useSafeAreaInsets();
  // const containerHeight =
  //   Dimensions.get('window').height - inset.top - inset.bottom;
  // const contentHeight = (Object.keys(positions.value).length / COL) * SIZE;
  const position = getPosition(positions.value[id]);
  const isGestureActive = useSharedValue(false);
  const translateX = useSharedValue(position.x);
  const translateY = useSharedValue(position.y);
  useAnimatedReaction(
    () => positions.value[id],
    newOrder => {
      const newPosition = getPosition(newOrder);
      translateX.value = withTiming(newPosition.x, animationConfig);
      translateY.value = withTiming(newPosition.y, animationConfig);
    },
  );
  const onGestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {x: number; y: number}
  >({
    onStart: (_, ctx) => {
      isGestureActive.value = true;
      ctx.x = translateX.value;
      ctx.y = translateY.value;
    },
    onActive: ({translationX, translationY}, ctx) => {
      translateX.value = ctx.x + translationX;
      translateY.value = ctx.y + translationY;
      const oldOrder = positions.value[id];
      const newOrder = getOrder(translateX.value, translateY.value);
      if (oldOrder !== newOrder) {
        const idToSwap = Object.keys(positions.value).find(
          key => positions.value[key] === newOrder,
        );
        if (idToSwap) {
          const newPositions = JSON.parse(JSON.stringify(positions.value));
          newPositions[id] = newOrder;
          newPositions[idToSwap] = oldOrder;
          positions.value = newPositions;
        }
      }
    },
    onEnd: () => {
      const destination = getPosition(positions.value[id]);
      translateX.value = withSpring(destination.x, undefined, () => {
        isGestureActive.value = false;
      });
      translateY.value = withSpring(destination.y);
      console.log(positions);
    },
  });

  const style = useAnimatedStyle(() => {
    const zIndex = isGestureActive.value ? 100 : 0;
    const scale = isGestureActive.value ? 1.1 : 1;
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      width: SIZE,
      height: SIZE,
      zIndex,
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
        {scale},
      ],
    };
  });
  return (
    <Animated.View style={style}>
      <PanGestureHandler onGestureEvent={onGestureHandler}>
        <Animated.View>{children}</Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default Item;
