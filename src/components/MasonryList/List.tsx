import MasonryList from '@react-native-seoul/masonry-list';
import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {_screen_width} from '../../utils/const';
import {dataSources} from './constants';
import {APP_SCREEN} from '../../navigator/ScreenTypes';
import {navigate} from '../../navigator/NavigationServices';

interface Props {}
export const MasonryListSc: FC<Props> = () => {
  return (
    <>
      <MasonryList
        numColumns={2}
        data={dataSources}
        contentContainerStyle={styles.listContainer}
        renderItem={({item: source, i}) => {
          const heroTag = 'heroTag' + i;
          return (
            <TouchableOpacity
              onPress={() => {
                navigate(APP_SCREEN.DETAIL_MANSON_LIST, {
                  source,
                  heroTag,
                });
              }}>
              <View
                style={[
                  // eslint-disable-next-line react-native/no-inline-styles
                  {
                    marginRight: (i ?? 0) % 2 === 1 ? 20 / 3 : 0,
                  },
                  styles.container,
                ]}>
                <Animated.Image
                  sharedTransitionTag={heroTag}
                  source={source as any}
                  style={[
                    {
                      height: 150 + 50 * ((i ?? 0) % 3),
                    },
                    styles.image,
                  ]}
                />
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    marginLeft: 20 / 3,
    marginTop: 20 / 3,
  },
  image: {
    width: _screen_width / 2 - 10,
    borderRadius: 10,
  },
  listContainer: {
    paddingBottom: 100,
  },
});
