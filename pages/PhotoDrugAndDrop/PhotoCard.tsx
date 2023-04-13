import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {responsiveHeight, responsiveWidth} from '../../utils/normalize';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
// import {LongPressGesture} from 'react-native-gesture-handler/lib/typescript/handlers/gestures/longPressGesture';
import {GestureEvent, PanGestureHandler} from 'react-native-gesture-handler';
import {useVector} from 'react-native-redash';

const CARD_HEIGHT = responsiveHeight(156);
const CARD_WIDTH = responsiveWidth(106);

interface IProps {
  title: string;
  index: number;
}

const PhotoCard: React.FC<IProps> = ({title}) => {
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
    onActive: ({translationX, translationY}, ctx) => {
      translation.x.value = ctx.x + (translationX as number);
      translation.y.value = ctx.y + (translationY as number);
      console.log(ctx.x);
      console.log(translation.x.value);
    },
    onEnd: () => {
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
    <>
      <Animated.View style={style}>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View style={styles.cardContainer}>
            <Text style={styles.cardText}>{title}</Text>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </>
  );
};

export default PhotoCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#F6F8FA',
    borderRadius: 8,
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgba(0,0,256,0.8)',
    borderWidth: 1,
  },
  cardText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});
