/* eslint-disable react-native/no-inline-styles */
import React, {FC, useCallback, useRef} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {dispatch} from '../common';
import Container from '../components/Container';
import {toggleDrawerMenu} from '../redux';
import {Colors} from '../utils/color';

import {navigate} from '../navigator/NavigationServices';
import {APP_SCREEN} from '../navigator/ScreenTypes';
import {HeartSvg, StarSvg} from '../assets';

interface Props {}
export const Home: FC<Props> = () => {
  const imageRef = useRef<any>(null);
  const onCardPress = React.useCallback((item: any) => {
    imageRef.current?.measure(
      (
        x: number,
        y: number,
        width: number,
        height: number,
        pageX: number,
        pageY: number,
      ) => {
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
    ({item}: {item: any}) => {
      return (
        <Pressable
          onPress={() => onCardPress(item)}
          style={[styles.container, styles.foodItem]}>
          <Image
            ref={imageRef}
            style={[styles.banner]}
            source={{uri: item.image}}
            resizeMode="cover"
          />
          <View style={styles.headerInfo}>
            <View style={styles.priceInfo}>
              <Text style={{fontSize: 15, lineHeight: 15}}>
                <Text
                  style={{color: Colors.primary, fontSize: 15, lineHeight: 15}}>
                  $
                </Text>
                {item.price}
              </Text>
            </View>
            <TouchableOpacity style={[styles.btnFav]}>
              <HeartSvg color={Colors.white} />
            </TouchableOpacity>
          </View>
          <View style={styles.reviewInfo}>
            <Text style={{fontSize: 12, lineHeight: 12}}>{4.5 || '--'} </Text>
            <StarSvg />
            <Text
              style={{
                color: Colors.typography_20,
                fontSize: 10,
                lineHeight: 10,
              }}>
              {'  '}({`${item.totalReviews}+`})
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={{fontSize: 15, fontWeight: '600', marginBottom: 5}}>
              Piza
            </Text>
            <Text style={{fontSize: 13, color: Colors.smoky}}>Fast Food</Text>
          </View>
        </Pressable>
      );
    },
    [onCardPress],
  );
  return (
    <Container disableLast>
      <TouchableOpacity
        style={styles.btnMenu}
        onPress={() => dispatch(toggleDrawerMenu())}>
        <Image
          style={styles.menuIcon}
          source={require('../assets/images/horizontal-line.png')}
        />
      </TouchableOpacity>
      <FlatList
        data={FoodData}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};
export const _screen_width = Dimensions.get('window').width;
const Food_Item_WIDTH = _screen_width / 2 - 32;
const styles = StyleSheet.create({
  menuIcon: {
    width: 20,
    height: 12,
  },
  btnMenu: {
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4.65,
    elevation: 6,
    marginLeft: 16,
  },
  //Card Item
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
  headerInfo: {
    position: 'absolute',
    left: 12,
    right: 12,
    top: 12,
    zIndex: 99,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnFav: {
    height: 34,
    width: 34,
    borderRadius: 17,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: 99,
    backgroundColor: Colors.white,
  },
  reviewInfo: {
    height: 29,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8.5,
    borderRadius: 99,
    backgroundColor: Colors.white,
    marginLeft: 13,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    alignSelf: 'flex-start',
    transform: [
      {
        translateY: -14.5,
      },
    ],
  },
  banner: {
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    height: 136,
    width: '100%',
  },
  infoContainer: {
    padding: 13,
    paddingTop: -14.5,
  },
  deliveryIcon: {
    width: 13.78,
    height: 11.43,
    marginRight: 6,
  },
  timerIcon: {
    width: 10.68,
    height: 12.09,
    marginRight: 6,
  },
  deliveryInfo: {
    marginTop: 6,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryInfoLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  foodItem: {
    width: Food_Item_WIDTH,
    marginHorizontal: 8,
    marginBottom: 16,
  },
  listContainer: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
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
    image:
      'https://cdn.pizzahut.vn/images/Web_V3/Homepage/Onl%E2%80%A6PizzaHut_Pate_Lap_Xuong_KV_ZR0HI_220620220330.jpg',
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
    image: 'https://vietgifts.com/wp-content/uploads/2018/12/ocean-delight.jpg',
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
    image: 'https://toplist.vn/images/800px/pizza-hut-953767.jpg',
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
    id: 5,
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
