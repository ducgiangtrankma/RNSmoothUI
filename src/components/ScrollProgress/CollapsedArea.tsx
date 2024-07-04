/* eslint-disable react-native/no-inline-styles */
import React, {useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {BottomProgressState} from './constants';

type CollapsedAreaProps = {
  state: SharedValue<BottomProgressState>;
  readingTime: string;
  onReset: () => void;
};

const CollapsedArea: React.FC<CollapsedAreaProps> = React.memo(
  ({state, readingTime, onReset}) => {
    const rCollapsedAreaStyle = useAnimatedStyle(() => {
      const isCollapsed =
        state.value === BottomProgressState.INITIAL ||
        state.value === BottomProgressState.END;
      return {
        opacity: withTiming(isCollapsed ? 1 : 0),
      };
    }, []);

    const rMinContainerStyle = useAnimatedStyle(() => {
      const isVisible = state.value === BottomProgressState.INITIAL;
      return {
        opacity: withTiming(isVisible ? 1 : 0),
      };
    }, []);

    const rUpArrowContainerStyle = useAnimatedStyle(() => {
      const isVisible = state.value === BottomProgressState.END;
      return {
        opacity: withTiming(isVisible ? 1 : 0),
      };
    }, []);

    const onPressArrow = useCallback(() => {
      if (state.value !== BottomProgressState.END) {
        return;
      }
      return onReset();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: '#2E2D2E',
            borderRadius: 40,
            margin: 5,
          },
          rCollapsedAreaStyle,
        ]}>
        <Animated.View style={[StyleSheet.absoluteFill, rMinContainerStyle]}>
          <View style={styles.fillCenter}>
            <Text
              style={{
                color: '#9E9E9E',
                marginHorizontal: 5,
              }}
              adjustsFontSizeToFit
              numberOfLines={1}>
              {readingTime}
            </Text>
          </View>
        </Animated.View>
        <Animated.View
          style={[StyleSheet.absoluteFill, rUpArrowContainerStyle]}>
          <View style={styles.fillCenter} onTouchEnd={onPressArrow}>
            <Text style={{color: 'white'}}>Up</Text>
          </View>
        </Animated.View>
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  fillCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {CollapsedArea};
