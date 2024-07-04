/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {SharedValue} from 'react-native-reanimated';
import {SvgIcon} from '../SvgIcon';
import {InputButton} from './InputButton';

const items = [
  {label: 1},
  {label: 2},
  {label: 3},
  {label: 4},
  {label: 5},
  {label: 6},
  {label: 7},
  {label: 8},
  {label: 9},
  {label: 'FaceID'},
  {label: 0},
  {label: 'backspace'},
];

type ButtonsGridProps = {
  pin: SharedValue<number[]>;
  onReset?: () => void;
};

const ButtonsGrid: React.FC<ButtonsGridProps> = React.memo(({pin, onReset}) => {
  return (
    <View style={styles.container}>
      {items.map(({label}, index) => {
        return (
          <InputButton
            key={index}
            style={styles.input}
            onTap={() => {
              if (typeof label === 'number') {
                pin.value = [...pin.value, label];
                return;
              }
              if (label === 'backspace') {
                onReset?.();
              }
              if (label === 'FaceID') {
                console.log('FaceID');
              }
            }}>
            {typeof label === 'number' && (
              <Text style={styles.number}>{label}</Text>
            )}
            {label === 'backspace' && (
              <SvgIcon
                type="FontAwesome5"
                name={label}
                size={24}
                style={{color: 'white'}}
              />
            )}
            {label === 'FaceID' && (
              <SvgIcon
                type="Entypo"
                name="emoji-happy"
                size={24}
                style={{color: 'white'}}
              />
            )}
          </InputButton>
        );
      })}
    </View>
  );
});
const margin = 7 / 3;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  input: {
    width: '30%',
    height: '20%',
    marginLeft: `${margin}%`,
    marginBottom: `${margin}%`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
  },
});

export {ButtonsGrid};
