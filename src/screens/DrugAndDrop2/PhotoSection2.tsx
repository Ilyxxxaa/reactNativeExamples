import {StyleSheet, View} from 'react-native';
import React from 'react';
import PhotoCard from './PhotoCard';
import PhotoList from './PhotoList';

const photos = [
  {title: 'Первая', key: 1},
  {title: 'Вторая', key: 2},
  {title: 'Третья', key: 3},
  {title: 'Четвертая', key: 4},
  {title: 'Пятая', key: 5},
  {title: 'Шестая', key: 6},
];

export const PhotoSection: React.FC = () => {
  return (
    <View style={styles.container}>
      <PhotoList drugItemsAmount={2} photos={photos}>
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
