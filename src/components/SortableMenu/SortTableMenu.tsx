import React, {FC, ReactElement} from 'react';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {Item} from './Item';
import {COL, Positions, SIZE} from './config';
import {View} from 'react-native';
interface Props {
  children: ReactElement<{id: string}>[];
  editing: boolean;
  onDragEnd: (diff: Positions) => void;
}
export const SortTableMenu: FC<Props> = ({children, editing, onDragEnd}) => {
  const scrollY = useSharedValue(0);
  const scrollView = useAnimatedRef<Animated.ScrollView>();
  const positions = useSharedValue<Positions>(
    Object.assign(
      {},
      ...children.map((child, index) => ({[child.props.id]: index})),
    ),
  );
  const onScroll = useAnimatedScrollHandler({
    onScroll: ({contentOffset: {y}}) => {
      scrollY.value = y;
    },
  });
  return (
    <Animated.ScrollView
      onScroll={onScroll}
      ref={scrollView}
      contentContainerStyle={{
        height: Math.ceil(children.length / COL) * SIZE,
      }}
      showsVerticalScrollIndicator={false}
      bounces={false}
      scrollEventThrottle={16}>
      <View>
        {children.map(child => {
          return (
            <Item
              key={child.props.id}
              positions={positions}
              id={child.props.id}
              editing={editing}
              onDragEnd={onDragEnd}
              scrollView={scrollView}
              scrollY={scrollY}>
              {child}
            </Item>
          );
        })}
      </View>
    </Animated.ScrollView>
  );
};
