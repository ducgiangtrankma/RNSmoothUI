import {Dimensions, NativeModules} from 'react-native';

const {StatusBarManager} = NativeModules;

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
};
export const _screen_statusbar_height = StatusBarManager.HEIGHT;
export const _screen_width = Dimensions.get('window').width;
export const _screen_height = Dimensions.get('window').height;
