import React from 'react';
import {StyleSheet, ViewProps} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

import {BottomProgressState} from './constants';
import {CollapsedArea} from './CollapsedArea';
import {ProgressBarArea} from './ProgressBarArea';

type BottomProgressProps = {
  style?: ViewProps['style'];
  progress: Animated.SharedValue<number>;
  readingTime: string;
  onReset: () => void;
};

const BottomProgress: React.FC<BottomProgressProps> = React.memo(
  ({style, progress, readingTime, onReset}) => {
    const state = useDerivedValue(() => {
      if (progress.value === 0) {
        return BottomProgressState.INITIAL;
      }
      if (progress.value === 1) {
        return BottomProgressState.END;
      }
      return BottomProgressState.EXPANDED;
    }, []);

    const isExpanded = useDerivedValue(() => {
      return state.value === BottomProgressState.EXPANDED;
    }, []);

    const rAnimatedStyle = useAnimatedStyle(() => {
      const width = withTiming(isExpanded.value ? 200 : 70, {
        duration: 500,
      });

      return {
        width: width,
      };
    });

    return (
      <Animated.View style={[styles.container, rAnimatedStyle, style]}>
        <ProgressBarArea isVisible={isExpanded} progress={progress} />
        <CollapsedArea
          state={state}
          readingTime={readingTime}
          onReset={onReset}
        />
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    borderRadius: 40,
    height: 70,
    width: 200,
  },
});

export {BottomProgress};
