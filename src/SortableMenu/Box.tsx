import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {SIZE} from './config';
const styles = StyleSheet.create({
  container: {
    width: SIZE - 20,
    height: 150,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    padding: 14,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
interface TileProps {
  id: string;
  onLongPress: () => void;
}

export const Box = ({id}: TileProps) => {
  if (id === 'spent') {
    return (
      <View style={styles.container} pointerEvents="none">
        <Text>spent</Text>
      </View>
    );
  }

  if (id === 'cashback') {
    return (
      <View style={[styles.container]} pointerEvents="none">
        <Text>cashback</Text>
      </View>
    );
  }

  if (id === 'recent') {
    return (
      <View style={styles.container} pointerEvents="none">
        <Text>recent</Text>
      </View>
    );
  }

  if (id === 'cards') {
    return (
      <View style={styles.container} pointerEvents="none">
        <Text>Cards</Text>
      </View>
    );
  }
};
