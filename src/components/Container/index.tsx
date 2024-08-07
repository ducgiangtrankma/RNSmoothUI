import {StyleSheet, StatusBar, View} from 'react-native';
import React, {ReactNode} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
interface ContainerProp {
  children?: ReactNode;
  disableFirst?: boolean;
  disableLast?: boolean;
  statusBarProps?: any;
  statusBarBackground?: string;
  barStyle?: string;
}

const Container = ({
  children,
  disableFirst,
  disableLast,
  statusBarProps,
  statusBarBackground,
  barStyle,
}: ContainerProp) => {
  const {bottom, top} = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      {!disableFirst && <View style={[styles.bar, {height: top}]} />}
      <StatusBar
        translucent
        backgroundColor={statusBarBackground ?? 'transparent'}
        barStyle={barStyle ?? 'dark-content'}
        {...statusBarProps}
      />
      <View style={styles.container}>{children}</View>
      {!disableLast && (
        <View style={[styles.bar, {height: bottom > 0 ? bottom : 15}]} />
      )}
    </View>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bar: {
    width: '100%',
    backgroundColor: '#fff',
  },
});
