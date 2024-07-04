import {RouteProp, useRoute} from '@react-navigation/native';
import React, {FC} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {APP_SCREEN, RootStackParamList} from '../../navigator/ScreenTypes';

interface Props {}
export const DetailsMasonListSc: FC<Props> = () => {
  const route =
    useRoute<RouteProp<RootStackParamList, APP_SCREEN.DETAIL_MANSON_LIST>>();
  const source = route.params?.source;
  const heroTag = route.params?.heroTag;
  return (
    <View style={styles.container}>
      <Animated.Image
        sharedTransitionTag={heroTag}
        source={source}
        style={styles.imageContainer}
      />
      <View style={styles.textContainer}>
        <Animated.Text
          entering={FadeIn.delay(400)}
          exiting={FadeOut}
          style={styles.title}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
        </Animated.Text>
        <Animated.Text
          entering={FadeIn.delay(600)}
          exiting={FadeOut}
          style={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Id tenetur deserunt
          vel, harum at cupiditate eveniet pariatur perferendis maiores possimus
          omnis accusantium itaque sapiente blanditiis asperiores! Pariatur
          alias autem non?
        </Animated.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width: Dimensions.get('window').width,
    height: 300,
  },
  textContainer: {
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
  },
  paragraph: {
    fontSize: 16,
    marginTop: 20,
  },
});
