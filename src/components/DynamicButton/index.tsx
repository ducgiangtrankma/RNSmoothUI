import React, {FC} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {DragAndDropGifIcon} from './DragDropCmp';
const _screen_height = Dimensions.get('window').height;
interface Props {}
export const DynamicButton: FC<Props> = () => {
  return (
    <View style={[styles.container, styles.defaultPosition]}>
      <DragAndDropGifIcon />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  defaultPosition: {
    top: _screen_height / 2,
    right: 16,
  },
  gif: {
    width: 127,
    height: 127,
  },
  closeButton: {
    width: 16,
    height: 16,
    position: 'absolute',
    top: -110,
    right: 16,
  },
});
