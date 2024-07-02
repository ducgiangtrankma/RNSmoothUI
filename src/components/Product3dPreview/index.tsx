import React, {forwardRef, useImperativeHandle} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {_screen_width} from '../../utils/const';
const ITEM_WIDTH = _screen_width * 0.4;
const ITEM_HEIGHT = (ITEM_WIDTH * 3) / 2;
interface Props {}
export interface Product3dPreviewRef {
  resetScale: () => void;
}
export const Product3dPreview = forwardRef<Product3dPreviewRef, Props>(
  (props, ref) => {
    const scale = useSharedValue(1);
    const translateY = useSharedValue(0);
    const handlePress = () => {
      if (scale.value === 1) {
        scale.value = withTiming(3.0, {duration: 300});
        translateY.value = withTiming(-20, {duration: 300});
      } else {
        scale.value = withTiming(1, {duration: 300});
        translateY.value = withTiming(0, {duration: 300});
      }
    };
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{scale: scale.value}, {translateY: translateY.value}],
      };
    });
    useImperativeHandle(
      ref,
      () => ({
        resetScale: () => {
          scale.value = withTiming(1, {duration: 300});
          translateY.value = withTiming(0, {duration: 300});
        },
      }),
      [scale, translateY],
    );
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={handlePress}>
          <Animated.View style={animatedStyle}>
            <Image
              source={require('../../assets/images/Shoe.png')}
              style={styles.image}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
        <Text style={styles.productName}>GiangTranDev</Text>
      </View>
    );
  },
);
const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginRight: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  productName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
