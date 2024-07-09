import React, {FC} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Container from '../components/Container';
import {navigate} from '../navigator/NavigationServices';
import {APP_SCREEN} from '../navigator/ScreenTypes';
import {_screen_width} from '../utils/const';
import {RightArrowIcon} from '../assets';

interface Props {}
export const Cart: FC<Props> = () => {
  return (
    <Container disableLast>
      <Text style={styles.title}>Animation Limited</Text>
      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigate(APP_SCREEN.SCROLL_PROGRESS)}>
          <Text style={styles.btnTitle}>Reading Progress UI</Text>
          <RightArrowIcon />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigate(APP_SCREEN.GRID_TO_LIST)}>
          <Text style={styles.btnTitle}>Grid to list UI</Text>
          <RightArrowIcon />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigate(APP_SCREEN.MANSON_LIST)}>
          <Text style={styles.btnTitle}>Mason list UI</Text>
          <RightArrowIcon />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigate(APP_SCREEN.CRYPTO_PIN_CODE_INPUT)}>
          <Text style={styles.btnTitle}>Crypto Pin Code Input UI</Text>
          <RightArrowIcon />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigate(APP_SCREEN.NUMBER_INPUT)}>
          <Text style={styles.btnTitle}>Number Input UI</Text>
          <RightArrowIcon />
        </TouchableOpacity>
      </ScrollView>
    </Container>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  button: {
    width: _screen_width - 64,
    height: 44,
    marginBottom: 24,
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'white',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    alignSelf: 'center',
    color: 'red',
    marginBottom: 24,
  },
  btnTitle: {
    fontWeight: '500',
  },
});
