import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useCallback, useEffect} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {GpsSvg, LogoutSvg, OrderSvg, ProfileSvg} from '../assets';
import {RXStore, dispatch, useSelector} from '../common';
import BottomTabBar from '../components/BottomTabBar';
import {toggleDrawerMenu} from '../redux';
import {Cart} from '../screens/Cart';
import {Home} from '../screens/Home';
import {Orders} from '../screens/Order';
import {ProductDetail} from '../screens/ProductDetail';
import {Profile} from '../screens/Profile';
import {navigate, navigationRef} from './NavigationServices';
import {APP_SCREEN} from './ScreenTypes';
import {DeliveryAddress} from '../screens/DeliveryAddress';
import {AddAddress} from '../components/AddAddress';
import {ScrollProgressSc} from '../screens/ScrollProgress';
import {GridViewToListViewSc} from '../screens/GridViewToListViewAnimation';
import {MasonryListSc} from '../components/MasonryList/List';
import {DetailsMasonListSc} from '../components/MasonryList/DetailMasonList';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export const drawerMenus = [
  {
    name: 'Home',
    routeName: APP_SCREEN.HOME,
    iconComponent: OrderSvg,
  },
  {
    name: 'Profile',
    routeName: 'Setting',
    iconComponent: ProfileSvg,
  },
  {
    name: 'Delivery Address',
    routeName: APP_SCREEN.DELIVERY_ADDRESS,
    iconComponent: GpsSvg,
  },
  {
    name: 'Payment Methods',
    routeName: 'Home',
    iconSrc: require('../assets/images/wallet.png'),
  },
  {
    name: 'Contact Us',
    routeName: 'Home',
    iconSrc: require('../assets/images/message.png'),
  },
  {
    name: 'Settings',
    routeName: 'Home',
    iconSrc: require('../assets/images/setting.png'),
  },
  {
    name: 'Help & FAQs',
    routeName: 'Home',
    iconSrc: require('../assets/images/help.png'),
  },
];
const config = {
  headerShown: false,
};

const HomeTab = React.memo(() => (
  <Tab.Navigator
    // eslint-disable-next-line react/no-unstable-nested-components
    tabBar={props => <BottomTabBar {...props} />}
    screenOptions={config}>
    <Tab.Screen name={APP_SCREEN.HOME} component={Home} />
    <Tab.Screen name={APP_SCREEN.CART} component={Cart} />
    <Tab.Screen name={APP_SCREEN.ORDERS} component={Orders} />
    <Tab.Screen name={APP_SCREEN.PROFILE} component={Profile} />
  </Tab.Navigator>
));
const HomeStack = React.memo(() => (
  <Stack.Navigator screenOptions={config}>
    <Stack.Screen name={APP_SCREEN.MAIN_APP} component={HomeTab} />
    <Stack.Screen
      name={APP_SCREEN.PRODUCT_DETAIL}
      component={ProductDetail}
      options={{
        animation: 'none',
      }}
    />
    <Stack.Screen
      name={APP_SCREEN.DELIVERY_ADDRESS}
      component={DeliveryAddress}
    />
    <Stack.Screen
      name={APP_SCREEN.ADD_DELIVERY_ADDRESS}
      component={AddAddress}
    />
    <Stack.Screen
      name={APP_SCREEN.SCROLL_PROGRESS}
      component={ScrollProgressSc}
    />
    <Stack.Screen
      name={APP_SCREEN.GRID_TO_LIST}
      component={GridViewToListViewSc}
    />
    <Stack.Screen name={APP_SCREEN.MANSON_LIST} component={MasonryListSc} />
    <Stack.Screen
      name={APP_SCREEN.DETAIL_MANSON_LIST}
      component={DetailsMasonListSc}
    />
  </Stack.Navigator>
));
const AppNavigation = React.memo(() => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={config}>
        <Stack.Screen name="HomeStack" component={HomeStack} />
      </Stack.Navigator>
      <RXStore />
    </NavigationContainer>
  );
});
const {width} = Dimensions.get('window');
const menuWidth = width * 0.5;

export const AnimatedAppNavigation = () => {
  const drawerMenuVisible = useSelector(x => x.appReducer.drawerMenuVisible);
  console.log('🚀 ~ App ~ drawerMenuVisible:', drawerMenuVisible);
  const anim = useSharedValue(0);

  useEffect(() => {
    anim.value = withTiming(drawerMenuVisible ? 1 : 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerMenuVisible]);

  const menuStyle = useAnimatedStyle(
    () => ({
      transform: [
        {translateX: (1 - anim.value) * menuWidth},
        {
          scale: interpolate(anim.value, [0, 1], [0.8, 1]),
        },
      ],
    }),
    [],
  );
  const appStyle = useAnimatedStyle(
    () => ({
      transform: [
        {translateX: anim.value * menuWidth},
        {
          scale: interpolate(anim.value, [0, 1], [1, 0.8]),
        },
      ],
      borderRadius: anim.value * 20,
    }),
    [],
  );
  const _handleToggleDrawerMenu = useCallback(() => {
    dispatch(toggleDrawerMenu());
  }, []);
  const renderMenuItem = (item: any) => {
    const onPress = () => {
      _handleToggleDrawerMenu();
      setTimeout(() => {
        navigate(item.routeName);
      }, 100);
    };
    return (
      <TouchableOpacity
        onPress={onPress}
        key={item.name}
        style={styles.btnMenu}>
        <View style={styles.menuIcon}>
          {item.iconSrc ? (
            <Image style={styles.icon} source={item.iconSrc} />
          ) : (
            <item.iconComponent color={'#979ba0'} />
          )}
        </View>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.menuContainer, menuStyle]}>
        <Image
          style={styles.avatar}
          source={{
            uri: 'https://static-images.vnncdn.net/files/publish/2023/10/20/my-nhan-vbiz-bang-tuoi-nhau-nhung-khac-biet-kho-ai-ngo-ngoctrinh-gejd-1630489868-8-width1024height688-190.jpg',
          }}
        />
        <Text style={styles.userName}>Giang Tran</Text>
        <Text style={styles.email}>giangtrandev@gmail.com</Text>
        <View style={styles.menuList}>{drawerMenus.map(renderMenuItem)}</View>
        <TouchableOpacity
          onPress={() => {
            _handleToggleDrawerMenu();
          }}
          style={styles.btnLogout}>
          <View style={styles.logoutIcon}>
            <LogoutSvg />
          </View>
          <Text style={{color: 'white'}}>Log Out</Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.appContainer, appStyle]}>
        <React.Fragment>
          {drawerMenuVisible && (
            <Pressable
              onPress={_handleToggleDrawerMenu}
              style={styles.overlay}
            />
          )}
        </React.Fragment>
        <AppNavigation />
      </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgb(245,245,245)',
  },
  appContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  menuContainer: {
    width: menuWidth,
    paddingLeft: 26,
    paddingVertical: 50,
    position: 'absolute',
    height: '100%',
    left: 0,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 99,
    backgroundColor: 'white',
  },
  menuList: {
    marginTop: 25,
    flex: 1,
  },
  btnMenu: {
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnLogout: {
    height: 43,
    padding: 9,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 99,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    paddingRight: 14,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
  },
  menuIcon: {
    marginRight: 14,
  },
  icon: {
    width: 23,
    height: 23,
  },
  logoutIcon: {
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 99,
    marginRight: 9,
  },
  //
  userName: {
    fontWeight: 'bold',
    fontSize: 22,
    marginTop: 24,
  },
  email: {
    color: '#9796A1',
    marginTop: 4,
  },
});
