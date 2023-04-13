import {StyleSheet, View} from 'react-native';
import React from 'react';
import PhotoCard from './PhotoCard';
import PhotoList from './PhotoList';

const photos = [
  {title: '1', key: 1},
  {title: '2', key: 2},
  {title: '3', key: 3},
  {title: '4', key: 4},
  {title: '5', key: 5},
  {title: '6', key: 6},
];

export const PhotoSection: React.FC = () => {
  return (
    <View style={styles.container}>
      <PhotoList drugItemsAmount={3}>
        {photos.map(item => {
          return <PhotoCard title={item.title} key={item.key} />;
        })}
      </PhotoList>
    </View>
  );
};

export default PhotoSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,256,0.2)',
  },
});
