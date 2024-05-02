import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Animated, {BounceIn, FadeInUp} from 'react-native-reanimated';
import {CartSvg, DiscoverSvg, OrderSvg, ProfileSvg} from '../../assets';
import {navigate} from '../../navigator/NavigationServices';
import {Colors} from '../../utils/color';
import {APP_SCREEN} from '../../navigator/ScreenTypes';
const tabBarData = [
  {
    name: 'Home',
    icon: DiscoverSvg,
    routeName: APP_SCREEN.HOME,
  },
  {
    name: 'Cart',
    icon: CartSvg,
    routeName: APP_SCREEN.CART,
  },
  {
    name: 'Orders',
    icon: OrderSvg,
    routeName: APP_SCREEN.ORDERS,
  },
  {
    name: 'Profile',
    icon: ProfileSvg,
    routeName: APP_SCREEN.PROFILE,
  },
];
const BottomTabBar = ({state}: {state: any}) => {
  const renderTabBarItem = (item: any, index: number) => {
    const isActive = state.index === index;
    const isCart = item.routeName === APP_SCREEN.CART;
    const onPress = () => navigate(item.routeName);
    return (
      <Pressable key={item.name} onPress={onPress} style={styles.tabItem}>
        {isActive && (
          <Animated.View entering={BounceIn} style={styles.activeLine} />
        )}
        {isActive ? (
          <Animated.View entering={FadeInUp}>
            <item.icon color={Colors.primary} />
          </Animated.View>
        ) : (
          <item.icon color={Colors.typography_40} />
        )}
        {isCart && (
          <View style={styles.cartBadge}>
            <Text style={{fontSize: 16, color: Colors.white}}>5</Text>
          </View>
        )}
      </Pressable>
    );
  };
  return (
    <View>
      <View style={styles.bottomTabBar}>
        {tabBarData.map(renderTabBarItem)}
      </View>
    </View>
  );
};

export default BottomTabBar;

const styles = StyleSheet.create({
  bottomTabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 74,
    backgroundColor: Colors.white,
    borderTopColor: Colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  activeLine: {
    width: 40,
    height: 3,
    backgroundColor: Colors.primary,
    position: 'absolute',
    top: 0,
    borderBottomRightRadius: 3,
    borderBottomLeftRadius: 3,
  },
  cartBadge: {
    position: 'absolute',
    top: 10,
    right: 30,
    padding: 2,
    paddingHorizontal: 4,
    borderRadius: 99,
    backgroundColor: Colors.primary,
    borderColor: Colors.white,
    borderWidth: 2,
  },
});
