/* eslint-disable react-hooks/rules-of-hooks */
import {StyleSheet, View} from 'react-native';
import React, {ReactElement} from 'react';
import {useSharedValue} from 'react-native-reanimated';
import {SortablePhotoCard} from './SortablePhotoCard';
import {CARDS_GAP, CONTAINER_HEIGHT, MARGIN, PADDING} from './sizes';
import {calculateLayout} from './utils';

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
    initialIndex: useSharedValue(index),
  }));
  console.log('массив из photoList', offsets);

  calculateLayout(offsets);

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
