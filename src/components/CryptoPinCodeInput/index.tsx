/* eslint-disable react-native/no-inline-styles */
import React, {FC, useCallback, useRef, useState} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {AnimatedFace, AnimatedFaceRefType} from './AnimatedFace';
import {ButtonsGrid} from './ButtonGrid';
import {PinArea} from './PinArea';
import {useAnimatedShake} from './useAnimatedShake';
import {Canvas} from '@shopify/react-native-skia';
import {CircleStroke} from './CircleStroke';

interface LockScreenProps {}
const correctPin = '11111';
export const CryptoPinCodeInputSc: FC<LockScreenProps> = ({}) => {
  const animatedFaceRef = useRef<AnimatedFaceRefType>(null);
  const [screenStatus, setScreenStatus] = useState<
    'Unlock Screen' | 'Lock Screen'
  >('Lock Screen');
  const {shake, rShakeStyle: rPinContainerStyle} = useAnimatedShake();

  const pin = useSharedValue<number[]>([]);
  const activeDots = useDerivedValue(() => {
    return pin.value.length;
  }, []);
  const correct = useCallback(() => {
    animatedFaceRef.current?.happy();
    setScreenStatus('Unlock Screen');
    console.log('onCompleted');
  }, []);

  const wrong = useCallback(() => {
    shake();
    console.log('onCompleted', pin.value.join(''));
    animatedFaceRef.current?.sad();
  }, [pin.value, shake]);

  const activate = useCallback(() => {
    animatedFaceRef.current?.openEyes();
  }, []);

  const reset = useCallback(() => {
    pin.value = [];
    animatedFaceRef.current?.reset();
    setScreenStatus('Lock Screen');
    console.log('onClear');
  }, [pin]);

  useAnimatedReaction(
    () => {
      return pin.value;
    },
    currentPin => {
      const active = currentPin.length > 0;
      if (currentPin.length > correctPin.length) {
        return;
      }

      if (currentPin.join('') === correctPin) {
        runOnJS(correct)();
        return;
      }

      if (currentPin.length === correctPin.length) {
        runOnJS(wrong)();
        return;
      }
      if (active) {
        runOnJS(activate)();
        return;
      }
    },
    [activate, reset, wrong, correct],
  );
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Canvas style={{width: '200%', position: 'absolute', aspectRatio: 1}}>
        <CircleStroke />
        <AnimatedFace ref={animatedFaceRef} />
      </Canvas>
      <View style={{flex: 1, paddingTop: 24}}>
        <Text style={styles.header}>{screenStatus}</Text>
        <View style={{flex: 1}} />
        <View style={{height: '60%'}}>
          <Animated.View style={rPinContainerStyle}>
            <PinArea
              activeDots={activeDots}
              dotsAmount={correctPin.length}
              style={{
                marginTop: 20,
                marginBottom: 15,
              }}
            />
          </Animated.View>
          <ButtonsGrid pin={pin} onReset={reset} />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C274D',
  },
  header: {
    marginTop: 45,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
