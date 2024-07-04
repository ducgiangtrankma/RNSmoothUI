/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import type {SharedValue} from 'react-native-reanimated';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import {SvgIcon} from '../SvgIcon';

type HideableNumberProps = {
  number: string;
  hiddenIndexes: SharedValue<number[]>;
  index: number;
};

const HideableNumberHeight = 25;

const DotSize = 14;

export const HideableNumber: React.FC<HideableNumberProps> = React.memo(
  ({number, hiddenIndexes, index}) => {
    const isHidden = useDerivedValue(
      () => hiddenIndexes.value.includes(index),
      [hiddenIndexes, index],
    );

    const animationProgress = useDerivedValue(
      () =>
        withDelay(
          index * HideableNumberHeight,
          withSpring(isHidden.value ? 1 : 0, {
            mass: 0.75,
          }),
        ),
      [isHidden, index],
    );

    const dotPositionY = useDerivedValue(() =>
      interpolate(animationProgress.value, [0, 1], [-HideableNumberHeight, 0]),
    );
    const textPositionY = useDerivedValue(() =>
      interpolate(animationProgress.value, [0, 1], [0, HideableNumberHeight]),
    );

    const rDotNumberStyle = useAnimatedStyle(() => ({
      opacity: animationProgress.value ** 3,
      transform: [{translateY: dotPositionY.value}],
    }));
    const rTextNumberStyle = useAnimatedStyle(() => ({
      opacity: (1 - animationProgress.value) ** 3,
      transform: [{translateY: textPositionY.value}],
    }));

    return (
      <View
        style={{width: 11, overflow: 'hidden', height: HideableNumberHeight}}>
        <Animated.View style={[styles.box, rDotNumberStyle]}>
          <SvgIcon
            type="Octicons"
            name="dot-fill"
            style={{paddingTop: 3, color: 'black'}}
            size={DotSize}
          />
        </Animated.View>
        <Animated.View style={[styles.box, rTextNumberStyle]}>
          <Text style={styles.cardNumber}>{number}</Text>
        </Animated.View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  box: {
    position: 'absolute',
    height: HideableNumberHeight,
    justifyContent: 'center',
  },
  cardNumber: {
    fontFamily: 'FiraCode',
    fontSize: 20,
  },
});
