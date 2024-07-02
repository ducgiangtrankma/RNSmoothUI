import React, {FC, useRef} from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import {Product3dPreview, Product3dPreviewRef} from '../components';

interface Props {}
export const Orders: FC<Props> = () => {
  const componentRef = useRef<Product3dPreviewRef>(null);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.touchable}
        onPress={() => componentRef.current?.resetScale()}>
        <Product3dPreview ref={componentRef} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  touchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
