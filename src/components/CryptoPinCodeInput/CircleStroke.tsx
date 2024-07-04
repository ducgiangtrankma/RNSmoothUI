import {
  BlurMask,
  Group,
  SweepGradient,
  useCanvas,
  useClockValue,
  useComputedValue,
  vec,
  Circle as SkiaCircle,
  Extrapolate,
} from '@shopify/react-native-skia';
import React from 'react';
import {interpolate} from 'react-native-reanimated';

const CircleStroke = React.memo(() => {
  const {size} = useCanvas();

  const cx = useComputedValue(() => {
    return size.current.width / 4;
  }, [size]);

  const cy = useComputedValue(() => {
    return size.current.height / 4 + 20;
  }, [size]);

  const sweepGradientCenter = useComputedValue(() => {
    return vec(cx.current, cy.current);
  }, [cx, cy]);

  const r = useComputedValue(() => {
    return size.current.height / 7.5;
  }, [size]);

  const clock = useClockValue();

  const blur = useComputedValue(() => {
    const value = interpolate(
      (clock.current % 4000) / 4000,
      [0, 0.5, 1],
      [10, 45, 10],
      Extrapolate.CLAMP,
    );

    return value;
  }, [clock]);

  return (
    <Group>
      <SkiaCircle cx={cx} cy={cy} r={r} style="stroke" strokeWidth={25}>
        <SweepGradient
          c={sweepGradientCenter}
          colors={[
            'yellow',
            'cyan',
            'cyan',
            '#3C91E6',
            'magenta',
            'orange',
            'yellow',
          ]}
        />
      </SkiaCircle>
      <BlurMask blur={blur} style="solid" />
    </Group>
  );
});

export {CircleStroke};
