/* eslint-disable react-native/no-inline-styles */
// Import necessary modules from React and React Native libraries
import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDerivedValue} from 'react-native-reanimated';

// Import custom component for touchable feedback

// Import custom component to hide numbers

import {SvgIcon} from '../SvgIcon';
import {HideableNumber} from './HideableNumber';
import {_screen_width} from '../../utils/const';

// Define the props type for CardInfo component
type CardInfoProps = {
  cardNumber: number;
};
const Number_Dot_Hide = 12;
// Define the CardInfo component
export const CardInfo: React.FC<CardInfoProps> = React.memo(({cardNumber}) => {
  // Split the card number into individual digits
  const splittedNumber = cardNumber.toString().split('');

  // State to toggle visibility of card number
  const [toggled, setToggled] = useState(false);

  // Derived value to determine which indexes to hide
  const hiddenIndexes = useDerivedValue(() => {
    if (toggled) {
      // If toggled, hide all numbers except the last 4
      return Array.from({length: Number_Dot_Hide}, (_, index) => index);
    }
    // If not toggled, show all numbers
    return [];
  }, [toggled]);

  // Callback function to toggle visibility
  const onToggle = useCallback(() => {
    setToggled(prev => !prev);
  }, []);

  // Render the CardInfo component
  return (
    <View style={styles.container}>
      <View>
        {/* Title */}
        <Text style={styles.title}>Card Number</Text>
        {/* Display Card Info */}
        <View style={styles.numbers}>
          {splittedNumber.map((number, index) => {
            return (
              <View
                key={index}
                style={{
                  marginRight: index !== 0 && (index + 1) % 4 === 0 ? 8 : 0,
                }}>
                {/* Individual digit with hideable feature */}
                <HideableNumber
                  number={number}
                  hiddenIndexes={hiddenIndexes}
                  index={index}
                />
              </View>
            );
          })}
        </View>
      </View>
      <View style={{flex: 1}} />
      {/* Toggle button for visibility */}
      <TouchableOpacity style={styles.button} onPress={onToggle}>
        <SvgIcon
          type="Feather"
          name={toggled ? 'eye-off' : 'eye'}
          size={24}
          style={{
            color: toggled ? 'gray' : 'green',
          }}
        />
      </TouchableOpacity>
    </View>
  );
});

// Styles for CardInfo component
const styles = StyleSheet.create({
  container: {
    height: 80,
    width: _screen_width - 32,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingTop: 15,
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    flexDirection: 'row',
  },
  title: {
    fontSize: 17,
    color: '#787878',
    fontWeight: '400',
  },
  button: {
    height: '100%',
    aspectRatio: 1,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 6,
  },
  numbers: {
    flexDirection: 'row',
    marginTop: 5,
  },
});
