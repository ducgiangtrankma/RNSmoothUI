import React, {useImperativeHandle, useCallback} from 'react';
import {
  Group,
  useCanvas,
  useComputedValue,
  Circle as SkiaCircle,
  Skia,
  Path,
  useValue,
  interpolate,
  runTiming,
} from '@shopify/react-native-skia';

const sadMouth = Skia.Path.MakeFromSVGString(
  'M31.2226 8.20008C27.3898 4.95606 22.4321 3 17.0176 3C11.6909 3 6.8063 4.89309 3 8.04317',
);

const happyMouth = Skia.Path.MakeFromSVGString(
  'M31.2226 2.99999C27.3898 6.24401 22.4321 8.20007 17.0176 8.20007C11.6909 8.20007 6.8063 6.30699 3 3.15691',
);

export type AnimatedFaceRefType = {
  happy: () => void;
  sad: () => void;
  reset: () => void;
  openEyes: () => void;
  closeEyes: () => void;
};

const runTimingConfig = {duration: 250};

const AnimatedFace = React.forwardRef<AnimatedFaceRefType, {}>((_, ref) => {
  const mouthProgress = useValue(0.5);
  const eyesProgress = useValue(0);

  const {size} = useCanvas();

  const happy = useCallback(() => {
    return runTiming(mouthProgress, 1, runTimingConfig);
  }, [mouthProgress]);

  const sad = useCallback(() => {
    return runTiming(mouthProgress, 0, runTimingConfig);
  }, [mouthProgress]);

  const closeEyes = useCallback(() => {
    return runTiming(eyesProgress, 0, runTimingConfig);
  }, [eyesProgress]);

  const openEyes = useCallback(() => {
    return runTiming(eyesProgress, 1, runTimingConfig);
  }, [eyesProgress]);

  const reset = useCallback(() => {
    runTiming(mouthProgress, 0.5, runTimingConfig);
    closeEyes();
  }, [mouthProgress, closeEyes]);

  useImperativeHandle(ref, () => ({happy, sad, reset, openEyes, closeEyes}), [
    happy,
    sad,
    reset,
    openEyes,
    closeEyes,
  ]);

  const eyeRadius = useComputedValue(() => {
    return interpolate(eyesProgress.current, [0, 1], [4, 6]);
  }, [eyesProgress]);

  const path = useComputedValue(() => {
    return happyMouth?.interpolate(sadMouth!, mouthProgress.current)!;
  }, [happyMouth, mouthProgress, sadMouth]);

  const centerX = useComputedValue(() => {
    return size.current.width / 4 - path.current.getBounds().width / 2;
  }, [size, path]);

  const centerY = useComputedValue(() => {
    return size.current.height / 4 + 30;
  }, [size]);

  const origin = useComputedValue(() => {
    return {
      x:
        centerX.current +
        path.current.getBounds().width / 2 +
        eyeRadius.current,
      y: centerY.current - 5,
    };
  }, [centerX, centerY, eyeRadius]);

  const transform = useComputedValue(() => {
    return [
      {scale: 1.8},
      {translateX: centerX.current},
      {translateY: centerY.current},
    ];
  }, [centerX, centerY]);

  const firstEyeCx = useComputedValue(() => {
    return eyeRadius.current / 2;
  }, [eyeRadius]);
  const secondEyeCx = useComputedValue(() => {
    return path.current.getBounds().width + eyeRadius.current / 2;
  }, [path, eyeRadius]);

  return (
    <Group origin={origin} transform={transform}>
      <Group>
        <SkiaCircle cx={firstEyeCx} cy={-20} r={eyeRadius} color="white" />
        <SkiaCircle cx={secondEyeCx} cy={-20} r={eyeRadius} color="white" />
        <Path
          path={path}
          color="white"
          style="stroke"
          strokeWidth={3}
          strokeCap="round"
          strokeJoin="round"
        />
      </Group>
    </Group>
  );
});

export {AnimatedFace};
