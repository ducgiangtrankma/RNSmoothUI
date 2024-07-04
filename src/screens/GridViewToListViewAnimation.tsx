import React, {FC} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import GridViewToListView from '../components/GridViewToListView';

interface Props {}
export const GridViewToListViewSc: FC<Props> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <GridViewToListView />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
