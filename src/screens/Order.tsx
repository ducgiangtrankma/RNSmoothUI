import React, {FC, useRef} from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import {MusicAnimation, Product3dPreviewRef} from '../components';

interface Props {}
export const Orders: FC<Props> = () => {
  const componentRef = useRef<Product3dPreviewRef>(null);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.touchable}
        onPress={() => componentRef.current?.resetScale()}>
        <MusicAnimation />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
  touchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
