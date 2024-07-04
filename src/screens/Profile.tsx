import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {DynamicButton, WidgetList} from '../components';
import Container from '../components/Container';
import {CardInfo} from '../components/ShowAndHideCardNumber';

interface Props {}
const SortTypeListHeight = 90;
export const Profile: FC<Props> = () => {
  const sortTypeAnim = useSharedValue(0);
  const toggleShowTypeList = () => {
    sortTypeAnim.value = withTiming(sortTypeAnim.value === 1 ? 0 : 1);
  };
  const sortTypeListStyle = useAnimatedStyle(() => ({
    height: interpolate(sortTypeAnim.value, [0, 1], [0, SortTypeListHeight]),
  }));
  const renderSortTypeItem = (item: any) => (
    <TouchableOpacity
      onPress={() => {
        sortTypeAnim.value = withDelay(100, withTiming(0));
      }}
      style={[styles.sortTypeItem]}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );
  return (
    <Container disableLast>
      <WidgetList />
      <DynamicButton />
      <TouchableOpacity onPress={toggleShowTypeList}>
        <Text>Sort by:</Text>
      </TouchableOpacity>
      <Animated.View style={[styles.sortTypeList, sortTypeListStyle]}>
        {sortTypes.map(renderSortTypeItem)}
      </Animated.View>
      <CardInfo cardNumber={2223000048400011} />
    </Container>
  );
};
const styles = StyleSheet.create({
  sortTypeList: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 26,
    height: SortTypeListHeight,
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
  sortTypeItem: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 99,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white',
  },
});
export const SortTypes = {
  Popular: {
    name: 'Popular',
    orderBy: 'total_reviews',
    orderType: 'desc',
  },
  PriceLowToHigh: {
    name: 'Price Low to High',
    orderBy: 'price',
    orderType: 'asc',
  },
  PriceHighToLow: {
    name: 'Price High to Low',
    orderBy: 'price',
    orderType: 'desc',
  },
  HighestRated: {
    name: 'Highest Rated',
    orderBy: 'avg_rating',
    orderType: 'desc',
  },
  PriceHighToLow1: {
    name: 'Price High to Low',
    orderBy: 'price',
    orderType: 'desc',
  },
  HighestRated1: {
    name: 'Highest Rated',
    orderBy: 'avg_rating',
    orderType: 'desc',
  },
};
const sortTypes = Object.values(SortTypes);
