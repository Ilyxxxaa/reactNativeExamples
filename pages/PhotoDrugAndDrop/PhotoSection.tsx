import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PhotoCard from './PhotoCard';

const photos = [
  {title: '1'},
  {title: '2'},
  {title: '3'},
  {title: '4'},
  {title: '5'},
  {title: '6'},
];

const HEIGHT = 334;

export const PhotoSection = () => {
  return (
    <View style={styles.container}>
      <View style={styles.photosContainer}>
        {photos.map((item, index) => {
          return <PhotoCard title={item.title} index={index} />;
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
    padding: 12,
    marginTop: 20,
    marginHorizontal: 8,
    backgroundColor: 'white',
    height: HEIGHT,
    borderRadius: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});
