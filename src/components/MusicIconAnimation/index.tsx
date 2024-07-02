import React, {FC, useCallback, useEffect, useRef} from 'react';
import {Animated, Easing, StyleSheet, View} from 'react-native';

interface Props {}
export const getMusicNoteAnim = (
  animatedValue: any,
  isRotatedLeft: boolean,
) => {
  return {
    transform: [
      {
        translateX: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [8, -16],
        }),
      },
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -32],
        }),
      },
      {
        rotate: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', isRotatedLeft ? '-45deg' : '45deg'],
        }),
      },
    ],
    opacity: animatedValue.interpolate({
      inputRange: [0, 0.8, 1],
      outputRange: [0, 1, 0],
    }),
  };
};
export const MusicAnimation: FC<Props> = () => {
  const discAnimatedValue = useRef(new Animated.Value(0)).current;
  const musicNoteAnimatedValue1 = useRef(new Animated.Value(0)).current;
  const musicNoteAnimatedValue2 = useRef(new Animated.Value(0)).current;
  const musicNoteAnimatedValue3 = useRef(new Animated.Value(0)).current;

  const discAnimation = {
    transform: [
      {
        rotate: discAnimatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };
  const musicNoteAnimation1 = getMusicNoteAnim(musicNoteAnimatedValue1, true);
  const musicNoteAnimation2 = getMusicNoteAnim(musicNoteAnimatedValue2, false);
  const musicNoteAnimation3 = getMusicNoteAnim(musicNoteAnimatedValue3, true);

  const discAnimLoopRef = useRef<any>();
  const musicAnimLoopRef = useRef<any>();

  const triggerAnimation = useCallback(() => {
    discAnimLoopRef.current = Animated.loop(
      Animated.timing(discAnimatedValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    );
    discAnimLoopRef.current.start();
    musicAnimLoopRef.current = Animated.loop(
      Animated.sequence([
        Animated.timing(musicNoteAnimatedValue1, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(musicNoteAnimatedValue2, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(musicNoteAnimatedValue3, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ]),
    );
    musicAnimLoopRef.current.start();
  }, [
    discAnimatedValue,
    musicNoteAnimatedValue1,
    musicNoteAnimatedValue2,
    musicNoteAnimatedValue3,
  ]);

  useEffect(() => {
    triggerAnimation();
    // if (isActive) {
    //   triggerAnimation();
    // } else {
    //   discAnimLoopRef.current?.stop();
    //   musicAnimLoopRef.current?.stop();
    //   discAnimatedValue.setValue(0);
    //   musicNoteAnimatedValue1.setValue(0);
    //   musicNoteAnimatedValue2.setValue(0);
    // }
  }, [
    triggerAnimation,
    discAnimatedValue,
    musicNoteAnimatedValue1,
    musicNoteAnimatedValue2,
  ]);
  return (
    <View style={styles.bottomSection}>
      <View style={styles.bottomRightSection}>
        <Animated.Image
          source={require('../../../src/assets/floating-music-note.png')}
          style={[styles.floatingMusicNote, musicNoteAnimation1]}
        />
        <Animated.Image
          source={require('../../../src/assets/floating-music-note.png')}
          style={[styles.floatingMusicNote2, musicNoteAnimation2]}
        />
        <Animated.Image
          source={require('../../../src/assets/floating-music-note.png')}
          style={[styles.floatingMusicNote3, musicNoteAnimation3]}
        />
        <Animated.Image
          source={require('../../../src//assets/disc.png')}
          style={[styles.musicDisc, discAnimation]}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  bottomRightSection: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  floatingMusicNote: {
    position: 'absolute',
    right: 8,
    bottom: 16,
    width: 16,
    height: 16,
    tintColor: 'red',
  },
  floatingMusicNote2: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 16,
    height: 16,
    tintColor: 'green',
  },
  floatingMusicNote3: {
    position: 'absolute',
    right: 32,
    bottom: 16,
    width: 16,
    height: 16,
    tintColor: 'blue',
  },
  musicDisc: {
    width: 40,
    height: 40,
  },
});
