/* eslint-disable react-native/no-inline-styles */
import React, {useCallback} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import Animated, {
  Layout,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export type AnimatedLayoutListProps<T> = {
  data: T[];
  renderItem: (
    item: T,
    index: number,
    isExpanded: boolean,
  ) => React.ReactElement;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  layout?: 'grid' | 'list';
};

enum Direction {
  Up = -1,
  Down = 1,
  None = 0,
}

const MAX_ROTATE_DEG = 20;
const MIN_ROTATE_DEG = -20;

function AnimatedLayoutList<T>({
  data,
  renderItem,
  style,
  contentContainerStyle,
  layout = 'list',
}: AnimatedLayoutListProps<T>) {
  const isExpanded = layout === 'list';

  const isScrolling = useSharedValue(false);
  const direction = useSharedValue(Direction.None);
  const lastOffset = useSharedValue(0);

  const onScrollEnd = useCallback(() => {
    'worklet';
    isScrolling.value = false;
    direction.value = Direction.None;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onScroll = useAnimatedScrollHandler({
    onBeginDrag: ({contentOffset: {y}}) => {
      lastOffset.value = y;
    },
    onScroll: ({contentOffset: {y}}) => {
      isScrolling.value = true;
      direction.value = y > lastOffset.value ? Direction.Down : Direction.Up;
    },
    onEndDrag: event => {
      if (event.velocity?.y === 0 && event.velocity?.x === 0) {
        onScrollEnd();
      }
    },
    onMomentumEnd: () => {
      onScrollEnd();
    },
  });

  const rotation = useDerivedValue(() => {
    'worklet';

    if (isScrolling.value && direction.value !== Direction.None) {
      return direction.value === Direction.Up
        ? `${MAX_ROTATE_DEG}deg`
        : `${MIN_ROTATE_DEG}deg`;
    }
    return '0deg';
  }, []);

  //Hiệu ứng đổ khi scroll
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const rAnimatedStyle = useAnimatedStyle(() => {
    const rotate = withTiming(rotation.value);
    return {
      transform: [
        {
          perspective: 500,
        },
        {
          rotateX: rotate,
        },
      ],
    };
  }, []);

  return (
    <Animated.ScrollView
      showsVerticalScrollIndicator={false}
      onScroll={onScroll}
      scrollEventThrottle={16}
      style={[
        {
          overflow: 'visible',
        },
        style,
      ]}
      contentContainerStyle={[
        {
          flexWrap: 'wrap',
          flexDirection: 'row',
        },
        contentContainerStyle,
      ]}>
      {data.map((item, i) => (
        <Animated.View
          key={i}
          layout={Layout.duration(500)}
          style={[
            {
              height: isExpanded ? 100 : 120,
              aspectRatio: isExpanded ? undefined : 1,
              width: isExpanded ? '90%' : `${(100 - 15) / 2}%`,
              backgroundColor: '#FFFFFF',
              borderRadius: 10,
              marginBottom: 20,
              marginLeft: '5%',
              overflow: 'hidden',
            },
            // rAnimatedStyle,
          ]}>
          {renderItem(item, i, isExpanded)}
        </Animated.View>
      ))}
    </Animated.ScrollView>
  );
}

export {AnimatedLayoutList};
