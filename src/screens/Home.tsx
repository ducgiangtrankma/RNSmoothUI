import React, {FC, useCallback, useRef} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {dispatch} from '../common';
import Container from '../components/Container';
import {navigate} from '../navigator/NavigationServices';
import {APP_SCREEN} from '../navigator/ScreenTypes';
import {toggleDrawerMenu} from '../redux';
import {Colors} from '../utils/color';
export interface ProductEntity {
  id: number;
  name: string;
  avgRate: number;
  totalReviews: number;
  image: string;
  short_description: string;
  description: string;
  price: number;
  options: ProductOption[];
}

interface ProductOption {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface Props {}
export const Home: FC<Props> = () => {
  const imageRef = useRef<any>(null);

  const onCardPress = React.useCallback((item: ProductEntity) => {
    imageRef.current?.measure(
      (width: number, height: number, pageX: number, pageY: number) => {
        navigate(APP_SCREEN.PRODUCT_DETAIL, {
          data: item,
          animated: true,
          image: {
            x: pageX,
            y: pageY,
            width,
            height,
          },
        });
      },
    );
  }, []);
  const renderItem = useCallback(
    ({item, index}: {item: ProductEntity; index: number}) => {
      return (
        <Pressable
          key={index}
          onPress={() => onCardPress(item)}
          style={styles.productContainer}>
          <Image
            ref={imageRef}
            style={[styles.banner]}
            source={{
              uri: item.image,
            }}
          />
        </Pressable>
      );
    },
    [onCardPress],
  );
  return (
    <Container disableLast>
      <TouchableOpacity
        onPress={() => {
          dispatch(toggleDrawerMenu());
        }}>
        <Image
          style={styles.menuIcon}
          source={require('../assets/images/horizontal-line.png')}
        />
      </TouchableOpacity>

      <FlatList
        data={FoodData}
        renderItem={renderItem}
        numColumns={2}
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingTop: 24,
        }}
      />
    </Container>
  );
};
const _screen_width = Dimensions.get('window').width;
const IMAGE_WIDTH = _screen_width / 2 - 32;
console.log('IMAGE_WIDTH :>> ', IMAGE_WIDTH);
const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    width: 266,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginBottom: 15,
  },
  productContainer: {
    width: IMAGE_WIDTH,
    marginHorizontal: 8,
    borderRadius: 16,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginBottom: 16,
  },
  banner: {
    borderRadius: 15,
    height: 'auto',
    width: '100%',
    aspectRatio: 1,
    alignSelf: 'center',
    marginBottom: 64,
  },
  menuIcon: {
    width: 24,
    height: 12,
    marginLeft: 16,
  },
});
const PRODUCT_IMAGE =
  'https://fptshop.com.vn/Uploads/Originals/2024/3/20/638465625194600454_pizza-hut-mua-1-ta-ng-1-va-o-thu-ma-y-0.jpg';
const FoodData = [
  {
    id: 1,
    name: 'Chicken Tikka',
    avgRate: 4.5,
    totalReviews: 25,
    image: PRODUCT_IMAGE,
    short_description: 'Fast food',
    description:
      'Chicken Tikka Skewers is a fast food restaurant in the heart of the city. It is a place where you can enjoy the best chicken tikka skewers in the city.',
    price: 10.5,
    options: [
      {
        id: 1,
        name: 'Pepper Julienned',
        price: 2.5,
        image: PRODUCT_IMAGE,
      },
      {
        id: 2,
        name: 'Baby Spinach',
        price: 4.5,
        image: PRODUCT_IMAGE,
      },
      {
        id: 3,
        name: 'Masroom',
        price: 4.5,
        image: PRODUCT_IMAGE,
      },
    ],
  },
  {
    id: 2,
    name: 'Chicken Tikka',
    avgRate: 4.5,
    totalReviews: 25,
    image: PRODUCT_IMAGE,
    short_description: 'Fast food',
    description:
      'Chicken Tikka Skewers is a fast food restaurant in the heart of the city. It is a place where you can enjoy the best chicken tikka skewers in the city.',
    price: 10.5,
    options: [
      {
        id: 1,
        name: 'Pepper Julienned',
        price: 2.5,
        image: PRODUCT_IMAGE,
      },
      {
        id: 2,
        name: 'Baby Spinach',
        price: 4.5,
        image: PRODUCT_IMAGE,
      },
      {
        id: 3,
        name: 'Masroom',
        price: 4.5,
        image: PRODUCT_IMAGE,
      },
    ],
  },
  {
    id: 3,
    name: 'Chicken Tikka',
    avgRate: 4.5,
    totalReviews: 25,
    image: PRODUCT_IMAGE,
    short_description: 'Fast food',
    description:
      'Chicken Tikka Skewers is a fast food restaurant in the heart of the city. It is a place where you can enjoy the best chicken tikka skewers in the city.',
    price: 10.5,
    options: [
      {
        id: 1,
        name: 'Pepper Julienned',
        price: 2.5,
        image: PRODUCT_IMAGE,
      },
      {
        id: 2,
        name: 'Baby Spinach',
        price: 4.5,
        image: PRODUCT_IMAGE,
      },
      {
        id: 3,
        name: 'Masroom',
        price: 4.5,
        image: PRODUCT_IMAGE,
      },
    ],
  },
  {
    id: 4,
    name: 'Chicken Tikka',
    avgRate: 4.5,
    totalReviews: 25,
    image: PRODUCT_IMAGE,
    short_description: 'Fast food',
    description:
      'Chicken Tikka Skewers is a fast food restaurant in the heart of the city. It is a place where you can enjoy the best chicken tikka skewers in the city.',
    price: 10.5,
    options: [
      {
        id: 1,
        name: 'Pepper Julienned',
        price: 2.5,
        image: PRODUCT_IMAGE,
      },
      {
        id: 2,
        name: 'Baby Spinach',
        price: 4.5,
        image: PRODUCT_IMAGE,
      },
      {
        id: 3,
        name: 'Masroom',
        price: 4.5,
        image: PRODUCT_IMAGE,
      },
    ],
  },
];
