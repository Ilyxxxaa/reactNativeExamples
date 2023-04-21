/* eslint-disable react-hooks/rules-of-hooks */
import {StyleSheet, View} from 'react-native';
import React, {ReactElement, useState} from 'react';
import {runOnJS, runOnUI, useSharedValue} from 'react-native-reanimated';
import {SortablePhotoCard} from './SortablePhotoCard';
import {CARDS_GAP, CONTAINER_HEIGHT, MARGIN, PADDING} from './sizes';
import {calculateLayout} from './utils';
import {
  LongPressGestureHandler,
  LongPressGestureHandlerStateChangeEvent,
  State,
} from 'react-native-gesture-handler';

interface IProps {
  children: ReactElement[];
  drugItemsAmount: number;
  photos: {key: number; title: string}[];
}

export const PhotoList: React.FC<IProps> = ({
  children,
  drugItemsAmount,
  photos,
}) => {
  const offsets = children.map((_, index) => ({
    order: useSharedValue(index),
    x: useSharedValue(0),
    y: useSharedValue(0),
    originalX: useSharedValue(0),
    originalY: useSharedValue(0),
    photoTitle: useSharedValue(photos[index].title),
  }));
  console.log('массив из photoList', offsets);

  calculateLayout(offsets);

  // if (!ready) {
  //   return (
  //     <View style={[styles.container, styles.rowContainer]}>
  //       {children.map((child, index) => {
  //         return (
  //           <View
  //             key={index}
  //             onLayout={({
  //               nativeEvent: {
  //                 layout: {x, y},
  //               },
  //             }) => {
  //               const offset = offsets[index];
  //               offset.order.value = index;
  //               offset.originalX.value = x;
  //               offset.originalY.value = y;
  //               runOnUI(() => {
  //                 'worklet';
  //                 if (offsets.filter(o => o.order.value === -1).length !== 0) {
  //                   calculateLayout(offsets);
  //                   runOnJS(setReady)(true);
  //                 }
  //               })();
  //             }}>
  //             {child}
  //           </View>
  //         );
  //       })}
  //     </View>
  //   );
  // }

  // const eventGesture = (event: LongPressGestureHandlerStateChangeEvent) => {
  //   if (event.nativeEvent.state === State.ACTIVE) {
  //     console.log('включен режим редактирования');
  //     setEditMode(true);
  //   }
  // };

  return (
    <View style={styles.container}>
      {children.map((child, index) => {
        return (
          <SortablePhotoCard
            index={index}
            offsets={offsets}
            key={index}
            drugItemsAmount={drugItemsAmount}>
            {child}
          </SortablePhotoCard>
        );
      })}
    </View>
  );
};

export default PhotoList;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: CARDS_GAP,
  },
  container: {
    marginTop: 20,
    marginHorizontal: MARGIN,
    paddingVertical: PADDING,
    paddingHorizontal: PADDING,
    backgroundColor: 'white',
    height: CONTAINER_HEIGHT,
    borderRadius: 16,
  },
});
