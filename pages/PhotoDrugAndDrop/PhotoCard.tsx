import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {responsiveHeight, responsiveWidth} from '../../utils/normalize';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
// import {LongPressGesture} from 'react-native-gesture-handler/lib/typescript/handlers/gestures/longPressGesture';
import {GestureEvent, PanGestureHandler} from 'react-native-gesture-handler';
import {between, useVector} from 'react-native-redash';
import {reorder} from './utils';

const CARD_HEIGHT = responsiveHeight(156);
const CARD_WIDTH = responsiveWidth(106);

interface IProps {
  title: string;
  index: number;
  offsets: any;
  setPhotos: React.Dispatch<
    React.SetStateAction<
      {
        title: string;
        key: number;
      }[]
    >
  >;
  photosArray: {
    title: string;
    key: number;
  }[];
}

const PhotoCard: React.FC<IProps> = ({
  title,
  offsets,
  index,
  setPhotos,
  photosArray,
}) => {
  const translation = useVector();
  const isGestureActive = useSharedValue(false);
  const offsetTest = offsets[index];

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
          const newPhotos = [...photosArray];
          console.log('функция работет', `меняю индекс ${index} c ${i}`);
          const item1 = newPhotos[index];
          const item2 = newPhotos[i];
          newPhotos[index] = item2;
          newPhotos[i] = item1;

          runOnJS(setPhotos)(newPhotos);

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
    <>
      <Animated.View
        style={style}
        onLayout={({
          nativeEvent: {
            layout: {x, y, width, height},
          },
        }) => {
          const offset = offsets[index];
          offset.order.value = index;
          offset.width.value = width;
          offset.height.value = height;
          offset.originalX.value = x;
          offset.originalY.value = y;
        }}>
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
