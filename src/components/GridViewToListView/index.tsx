/* eslint-disable react-native/no-inline-styles */
import {SafeAreaView, StyleSheet, Text, Image} from 'react-native';
import Animated, {FadeIn, FadeOut, Layout} from 'react-native-reanimated';
import React, {useCallback, useState} from 'react';

import {data} from './constants';
import {FloatingButton} from './FloatingButton';
import {
  AnimatedLayoutList,
  AnimatedLayoutListProps,
} from './AnimatedLayoutList';

const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function GridViewToListView() {
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  const renderItem: AnimatedLayoutListProps<(typeof data)[0]>['renderItem'] =
    useCallback((item, _, isExpanded) => {
      return (
        <Animated.View
          style={{
            flex: 1,
            alignItems: 'center',
            flexDirection: isExpanded ? 'row' : 'column',
          }}>
          <AnimatedImage
            layout={Layout}
            source={{uri: item.img}}
            style={{
              width: isExpanded ? 64 : 200,
              aspectRatio: 1,
              borderRadius: isExpanded ? 32 : 0,
              marginHorizontal: isExpanded ? 16 : 0,
            }}
          />
          {isExpanded && (
            <Animated.View
              layout={Layout.duration(600)}
              entering={FadeIn}
              exiting={FadeOut}>
              <Text
                style={{
                  marginBottom: 2,
                  maxWidth: '80%',
                }}
                numberOfLines={1}>
                {item.title}
              </Text>
              <Text
                style={{
                  color: '#383838',
                  fontSize: 12,
                  maxWidth: 200,
                }}
                numberOfLines={1}>
                {item.subtitle}
              </Text>
            </Animated.View>
          )}
        </Animated.View>
      );
    }, []);

  return (
    <SafeAreaView style={styles.container}>
      <AnimatedLayoutList data={data} layout={layout} renderItem={renderItem} />
      <FloatingButton
        style={{
          position: 'absolute',
          bottom: 50,
          right: 16,
        }}
        onPress={() => {
          setLayout(currentLayout =>
            currentLayout === 'grid' ? 'list' : 'grid',
          );
        }}
        layout={layout}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
});
