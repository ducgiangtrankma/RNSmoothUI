import React, {useCallback, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AnimatedNumber} from './animated-number';
import {ButtonsGrid} from './buttons-grid';

const NumberInput: React.FC = () => {
  const [input, updateInput] = useState<number>(0);

  const reset = useCallback(() => {
    updateInput(0);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.fillCenter}>
        <View
          style={[
            styles.fillCenter,
            {
              paddingTop: 50,
            },
          ]}>
          <AnimatedNumber value={input} />
        </View>
      </View>
      <View style={styles.fill}>
        <ButtonsGrid
          input={input}
          onUpdate={updateInput}
          onBackspace={updateInput}
          onReset={reset}
          onMaxReached={() => {
            Alert.alert('Max Reached');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  fill: {
    flex: 1,
  },
  fillCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {NumberInput};
