import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  Dimensions,
  Image,
  NativeModules,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {goBack} from '../navigator/NavigationServices';
import {APP_SCREEN, RootStackParamList} from '../navigator/ScreenTypes';
import {Colors} from '../utils/color';
const {StatusBarManager} = NativeModules;

export const _screen_statusbar_height = StatusBarManager.HEIGHT;

const bannerHeight = 296;
const IMG_HEIGHT = bannerHeight;
const bannerWidth = Dimensions.get('window').width;
const bannerRadius = 0;
const bannerBottomRadius = 0;

const targetX = 0;
const targetY = 0;
const paddingLeft = 26;
export const ProductDetail = () => {
  const navigation = useNavigation();
  const route =
    useRoute<RouteProp<RootStackParamList, APP_SCREEN.PRODUCT_DETAIL>>();
  const data = route.params?.data;
  const animated = route.params?.animated ?? true;

  const image = route.params?.image;
  const x = image?.x ?? 0;
  const y = image?.y ?? 0;
  const imgWidth = image?.width ?? 999;
  const imgHeight = image?.height ?? 999;

  const {top} = useSafeAreaInsets();
  const anim = useSharedValue(animated ? 0 : 1);
  const isFocused = useIsFocused();

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  useEffect(() => {
    anim.value = withTiming(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onBackPress = () => {
    if (isFocused) {
      const callback = () => goBack();
      navigation.setOptions({
        headerShown: false,
      });
      if (animated) {
        anim.value = withTiming(0, {}, () => runOnJS(callback)());
      } else {
        callback();
      }
    }
  };

  //   useEffect(() => {
  //     navigation.setOptions({
  //       headerShown: true,
  //       headerTransparent: true,
  //       headerTitle: '',
  //       // eslint-disable-next-line react/no-unstable-nested-components
  //       headerLeft: () => (
  //         <TouchableOpacity onPress={onBackPress} style={styles.btnBack}>
  //           <Image
  //             style={styles.backIcon}
  //             source={require('../assets/images/chevron-left.png')}
  //             resizeMode="cover"
  //           />
  //         </TouchableOpacity>
  //       ),
  //     });
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [navigation]);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75],
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1],
          ),
        },
      ],
    };
  });

  const headerStyle = useAnimatedStyle(() => {
    return {
      left: interpolate(anim.value, [0, 1], [x - paddingLeft, targetX]),
      top: interpolate(anim.value, [0, 1], [y - top, targetY]),
      width: interpolate(anim.value, [0, 1], [imgWidth, bannerWidth]),
      height: interpolate(anim.value, [0, 1], [imgHeight, bannerHeight]),
      borderRadius: bannerRadius,
      borderBottomLeftRadius: interpolate(
        anim.value,
        [0, 1],
        [0, bannerBottomRadius],
      ),
      borderBottomRightRadius: interpolate(
        anim.value,
        [0, 1],
        [0, bannerBottomRadius],
      ),
    };
  });

  const informationContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: anim.value,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollRef}
        contentContainerStyle={styles.content}>
        <Animated.Image
          source={{
            uri: data?.image ?? '',
          }}
          style={[styles.banner, imageAnimatedStyle, headerStyle]}
          resizeMode={'cover'}
        />
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={onBackPress} style={styles.btnBack}>
            <Image
              style={styles.backIcon}
              source={require('../assets/images/chevron-left.png')}
            />
          </TouchableOpacity>
        </View>

        <Animated.View
          style={[styles.contentWrapper, informationContainerStyle]}>
          <Text>
            Why do we use it? It is a long established fact that a reader will
            be distracted by the readable content of a page when looking at its
            layout. The point of using Lorem Ipsum is that it has a more-or-less
            normal distribution of letters, as opposed to using 'Content here,
            content here', making it look like readable English. Many desktop
            publishing packages and web page editors now use Lorem Ipsum as
            their default model text, and a search for 'lorem ipsum' will
            uncover many web sites still in their infancy. Various versions have
            evolved over the years, sometimes by accident, sometimes on purpose
            (injected humour and the like). Where does it come from? Contrary to
            popular belief, Lorem Ipsum is not simply random text. It has roots
            in a piece of classical Latin literature from 45 BC, making it over
            2000 years old. Richard McClintock, a Latin professor at
            Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections
            1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes
            of Good and Evil) by Cicero, written in 45 BC. This book is a
            treatise on the theory of ethics, very popular during the
            Renaissance. The first line of Lorem Ipsum
          </Text>
        </Animated.View>
      </Animated.ScrollView>
      <View style={styles.footer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {paddingBottom: 150, flex: 1},
  header: {
    height: bannerHeight,
    width: '100%',
    borderRadius: bannerRadius,
    overflow: 'hidden',
  },
  banner: {
    width: Dimensions.get('window').width,
    height: IMG_HEIGHT,
  },
  image: {
    width: Dimensions.get('window').width,
    height: IMG_HEIGHT,
  },
  headerBar: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    left: 12,
    right: 12,
    top: _screen_statusbar_height,
  },
  btnFav: {
    height: 34,
    width: 34,
    borderRadius: 17,
    backgroundColor: Colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnBack: {
    // position: 'absolute',
    // zIndex: 999,
    // top: _screen_statusbar_height,
    // left:16,
    height: 38,
    width: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  backIcon: {
    width: 5,
    height: 9.5,
  },
  contentWrapper: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.white,
  },
  footer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    padding: 20,
    paddingBottom: _screen_statusbar_height,
    width: Dimensions.get('window').width,
  },
});
