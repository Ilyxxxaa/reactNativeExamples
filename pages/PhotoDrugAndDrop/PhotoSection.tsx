/* eslint-disable react-hooks/rules-of-hooks */

import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import PhotoCard from './PhotoCard';
import {responsiveHeight, responsiveWidth} from '../../utils/normalize';
import {useSharedValue} from 'react-native-reanimated';

const photos = [
  {title: '1', key: 1},
  {title: '2', key: 2},
  {title: '3', key: 3},
  {title: '4', key: 4},
  {title: '5', key: 5},
  {title: '6', key: 6},
];

const HEIGHT = responsiveHeight(344);

export const PhotoSection: React.FC = () => {
  const [photosArray, setPhotos] = useState(photos);

  const offsets = photos.map(() => ({
    order: useSharedValue(0),
    width: useSharedValue(0),
    height: useSharedValue(0),
    x: useSharedValue(0),
    y: useSharedValue(0),
    originalX: useSharedValue(0),
    originalY: useSharedValue(0),
  }));

  return (
    <View style={styles.container}>
      <View style={styles.photosContainer}>
        {photosArray.map((item, index) => {
          return (
            <PhotoCard
              title={item.title}
              index={index}
              key={item.key}
              offsets={offsets}
              setPhotos={setPhotos}
              photosArray={photosArray}
            />
          );
        })}
      </View>
    </View>
  );
};

export default PhotoSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,256,0.2)',
  },
  photosContainer: {
    paddingVertical: responsiveHeight(12),
    paddingHorizontal: responsiveWidth(12),
    marginTop: 20,
    marginHorizontal: 8,
    backgroundColor: 'white',
    height: HEIGHT,
    borderRadius: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: responsiveWidth(8),
  },
});
