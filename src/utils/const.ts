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
