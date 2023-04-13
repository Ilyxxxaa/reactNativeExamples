import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CARD_HEIGHT = 156;
const CARD_WIDTH = 106;

interface IProps {
  title: string;
  index: number;
}

const PhotoCard: React.FC<IProps> = ({title}) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardText}>{title}</Text>
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
