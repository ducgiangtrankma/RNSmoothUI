import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {SIZE} from './config';
import {Colors} from '../../utils/color';
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
    backgroundColor: Colors.gray_40,
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
        <Text>SPENT</Text>
      </View>
    );
  }

  if (id === 'cashback') {
    return (
      <View style={[styles.container]} pointerEvents="none">
        <Text>CASHBACK</Text>
      </View>
    );
  }

  if (id === 'recent') {
    return (
      <View style={styles.container} pointerEvents="none">
        <Text>RECENT</Text>
      </View>
    );
  }

  if (id === 'cards') {
    return (
      <View style={styles.container} pointerEvents="none">
        <Text>CARDS</Text>
      </View>
    );
  }
};
