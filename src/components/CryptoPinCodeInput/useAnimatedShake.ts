import {useCallback} from 'react';
import {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const useAnimatedShake = () => {
  const shakeTranslateX = useSharedValue(0);

  const shake = useCallback(() => {
    cancelAnimation(shakeTranslateX);
    shakeTranslateX.value = 0;
    shakeTranslateX.value = withRepeat(
      withTiming(10, {
        duration: 100,
        easing: Easing.bezier(0.36, 0.69, 0.49, 0.71),
      }),
      4,
      true,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rShakeStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: shakeTranslateX.value}],
    };
  }, []);

  return {shake, rShakeStyle};
};

export {useAnimatedShake};
