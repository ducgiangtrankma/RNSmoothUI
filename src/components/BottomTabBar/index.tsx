import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Animated, {
  BounceIn,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CartSvg, DiscoverSvg, OrderSvg, ProfileSvg} from '../../assets';
import {navigate} from '../../navigator/NavigationServices';
import {APP_SCREEN} from '../../navigator/ScreenTypes';
import {Colors} from '../../utils/color';
import {_screen_height} from '../../utils/const';
import {BottomFloatingButton} from '../FloatingButton';
import {useActiveTabBarContext} from './activeTabbarProvider';
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
export const IS_SMALL_DEVICE = _screen_height < 700;
export const BOTTOM_BAR_HEIGHT = IS_SMALL_DEVICE ? 80 : 95;

const BottomTabBar = ({state}: {state: any}) => {
  // const {isScrollingUp} = useSelector(x => x.appReducer);
  const {isActive: tabBarActive} = useActiveTabBarContext();
  const floatingProgress = useSharedValue(0);

  const {bottom: safeBottom} = useSafeAreaInsets();

  // Define the animated style for the tab bar container
  const rContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(
            tabBarActive.value ? 0 : BOTTOM_BAR_HEIGHT + safeBottom,
            {
              duration: 300,
            },
          ),
        },
      ],
    };
  }, [safeBottom]);

  // Define the animated style for the floating action button
  const rFloatingActionStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(tabBarActive.value ? 1 : 0, {
            overshootClamping: true,
          }),
        },
      ],
    };
  }, []);

  const renderTabBarItem = (item: any, index: number) => {
    const isActive = state.index === index;
    const isCart = item.routeName === APP_SCREEN.CART;
    console.log('item', item);
    const onPress = () => {
      if (item.routeName === APP_SCREEN.PROFILE) {
        floatingProgress.value = withTiming(1, {
          duration: 500,
        });
      } else {
        floatingProgress.value = withTiming(0, {
          duration: 500,
        });
      }
      navigate(item.routeName);
    };
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
  const showFloatButton = state.index === 0 || state.index === 3;
  return (
    <>
      {showFloatButton && (
        <BottomFloatingButton
          onSelect={item => {
            console.log({item});
          }}
          style={[
            // eslint-disable-next-line react-native/no-inline-styles
            {
              position: 'absolute',
              bottom: BOTTOM_BAR_HEIGHT + safeBottom / 2,
              right: 16,
              height: 64,
              aspectRatio: 1,
              backgroundColor: Colors.primary,
              borderRadius: 32,
            },
            rFloatingActionStyle,
          ]}
          progress={floatingProgress}
        />
      )}
      <Animated.View
        style={[
          localStyles.container,
          {
            paddingBottom: safeBottom / 2,
          },
          rContainerStyle,
        ]}>
        {tabBarData.map(renderTabBarItem)}
      </Animated.View>
    </>
    // <View>
    //   <View style={styles.bottomTabBar}>
    //     {tabBarData.map(renderTabBarItem)}
    //   </View>
    // </View>
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
const localStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: BOTTOM_BAR_HEIGHT,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    flexDirection: 'row',
  },
  fill: {
    flex: 1,
  },
  fillCenter: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
