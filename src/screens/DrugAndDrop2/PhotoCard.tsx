import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CARD_HEIGHT, CARD_WIDTH} from './sizes';

interface IProps {
  title: string;
}

const PhotoCard: React.FC<IProps> = ({title}) => {
  return (
    <View style={styles.cardContainer}>
      <Text>{title}</Text>
    </View>
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
