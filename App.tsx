import React from 'react';
import {LogBox, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {AnimatedAppNavigation} from './src/navigator';
import {store} from './src/redux';
LogBox.ignoreLogs([
  'Selector unknown returned the root state when called. This can lead to unnecessary rerenders',
]);
export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <GestureHandlerRootView style={styles.container}>
          <AnimatedAppNavigation />
        </GestureHandlerRootView>
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
