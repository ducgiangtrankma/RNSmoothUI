/* eslint-disable react-native/no-inline-styles */
import React, {FC, useCallback} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Container from '../components/Container';
import {Colors} from '../utils/color';
import {goBack, navigate} from '../navigator/NavigationServices';
import {APP_SCREEN} from '../navigator/ScreenTypes';
import {useSelector} from '../common';
import {_screen_width} from '../utils/const';
import {AddressEntity} from '../redux';

interface Props {}
export const DeliveryAddress: FC<Props> = () => {
  const {deliveryLocations} = useSelector(x => x.userReducer);
  console.log('deliveryLocations :>> ', deliveryLocations);
  const renderLocationItem = useCallback(({item}: {item: AddressEntity}) => {
    return (
      <TouchableOpacity
        style={styles.addressContainer}
        onPress={() =>
          navigate(APP_SCREEN.ADD_DELIVERY_ADDRESS, {
            currentAddress: item,
          })
        }>
        <Image
          style={styles.icon}
          source={require('../assets/images/gps.png')}
        />
        <View style={{justifyContent: 'space-between'}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 4}}>
            GiangTranDev
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{item.ward.name}, </Text>
            <Text>{item.district.name}, </Text>
            <Text>{item.province.name}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Image
            style={styles.icon}
            source={require('../assets/images/trash.png')}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }, []);
  return (
    <Container>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => goBack()} style={styles.btnBack}>
          <Image
            style={styles.backIcon}
            source={require('../assets/images/chevron-left.png')}
          />
        </TouchableOpacity>
        {deliveryLocations.length !== 0 ? (
          <FlatList
            data={deliveryLocations}
            renderItem={renderLocationItem}
            contentContainerStyle={{marginTop: 32}}
          />
        ) : (
          <Image
            source={require('../assets/images/location.png')}
            style={styles.emptyLocation}
          />
        )}
        <Text style={styles.emptyDes}>Vui lòng thêm địa chỉ giao hàng!</Text>
        <TouchableOpacity
          style={styles.btnAdd}
          onPress={() =>
            navigate(APP_SCREEN.ADD_DELIVERY_ADDRESS, {mode: 'Create'})
          }>
          <Image
            style={styles.icon}
            source={require('../assets/images/gps.png')}
          />
          <Text style={styles.txtAdd}>Add new address</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  btnAdd: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 48,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  txtAdd: {
    color: Colors.white,
    fontSize: 16,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  emptyLocation: {
    width: 128,
    height: 128,
    alignSelf: 'center',
    marginTop: 64,
  },
  emptyDes: {
    fontSize: 16,
    color: Colors.aslo_gray,
    alignSelf: 'center',
    marginTop: 24,
  },
  btnBack: {
    // position: 'absolute',
    // zIndex: 999,
    // top: _screen_statusbar_height,
    // left:16,
    height: 38,
    width: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.app_background,
  },
  backIcon: {
    width: 5,
    height: 9.5,
  },
  addressContainer: {
    width: _screen_width - 32,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 10,
    backgroundColor: Colors.primary_overlay,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginBottom: 16,
    justifyContent: 'space-between',
  },
});
