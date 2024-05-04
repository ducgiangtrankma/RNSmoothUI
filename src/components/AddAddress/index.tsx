/* eslint-disable react-native/no-inline-styles */
import React, {FC, useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {ArrowLeftSvg, CheckSvg, SearchSvg} from '../../assets';
import {goBack} from '../../navigator/NavigationServices';
import {Colors} from '../../utils/color';
import Container from '../Container';
import vnAddress from '../../assets/json/vn_address.json';

import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {removeVietnameseTones} from '../../utils/helper';
import {dispatch} from '../../common';
import {addLocation} from '../../redux';
import {RouteProp, useRoute} from '@react-navigation/core';
import {APP_SCREEN, RootStackParamList} from '../../navigator/ScreenTypes';
const stepHeight = 44;

interface Props {}
enum AddressType {
  province = 'province',
  district = 'district',
  wards = 'wards',
}
interface ProvinceEntity {
  name: string;
  code: string;
}

export const AddAddress: FC<Props> = () => {
  //Route
  const route =
    useRoute<RouteProp<RootStackParamList, APP_SCREEN.ADD_DELIVERY_ADDRESS>>();
  //State
  const [keyword, setKeyword] = useState<string>('');
  const [type, setType] = useState<AddressType>(AddressType.province);
  const [province, setProvince] = useState<ProvinceEntity | null>(
    route.params?.currentAddress?.province ?? null,
  );
  const [district, setDistrict] = useState<ProvinceEntity | null>(
    route.params?.currentAddress?.district ?? null,
  );
  const [ward, setWard] = useState<ProvinceEntity | null>(
    route.params?.currentAddress?.ward ?? null,
  );

  const provinces = vnAddress
    .filter(item =>
      removeVietnameseTones(
        item.name.replace(/\s/g, '').toLocaleLowerCase(),
      ).includes(keyword.replace(/\s/g, '').toLocaleLowerCase()),
    )
    .map(item => {
      item.id === province?.code;
      return item;
    });
  const districts = province
    ? vnAddress
        .find(item => item.id === province.code)
        ?.districts.filter(item =>
          removeVietnameseTones(
            item.name.replace(/\s/g, '').toLocaleLowerCase(),
          ).includes(keyword.replace(/\s/g, '').toLocaleLowerCase()),
        )
        .map(item => {
          item.id === district?.code;
          return item;
        })
    : [];
  const wards =
    province && district
      ? vnAddress
          .find(item => item.id === province.code)
          ?.districts.find(item => item.id === district.code)
          ?.wards.filter(item =>
            removeVietnameseTones(
              item.name.replace(/\s/g, '').toLocaleLowerCase(),
            ).includes(keyword.replace(/\s/g, '').toLocaleLowerCase()),
          )
          .map(item => {
            item.id === ward?.code;
            return item;
          })
      : [];

  const animStep = useSharedValue(0);

  const activeStepStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: animStep.value * stepHeight,
      },
    ],
  }));

  useEffect(() => {
    if (type === AddressType.province) {
      animStep.value = withTiming(0);
      return;
    }
    if (type === AddressType.district) {
      animStep.value = withTiming(1);
      return;
    }
    if (type === AddressType.wards) {
      animStep.value = withTiming(2);
      return;
    }
  }, [animStep, type]);

  const renderLocationItem = React.useCallback(
    ({item}: {item: any}) => {
      const checkActive = () => {
        if (item.id === province?.code && type === AddressType.province) {
          return true;
        }
        if (item.id === district?.code && type === AddressType.district) {
          return true;
        }
        if (item.id === ward?.code && type === AddressType.wards) {
          return true;
        }
        return false;
      };
      const onPress = () => {
        if (type === AddressType.province) {
          setProvince({
            name: item.name,
            code: item.id,
          });
          setDistrict(null);
          setWard(null);
          setKeyword('');
          setType(AddressType.district);
        }
        if (type === AddressType.district) {
          setDistrict({
            name: item.name,
            code: item.id,
          });
          setWard(null);
          setKeyword('');
          setType(AddressType.wards);
        }
        if (type === AddressType.wards) {
          setWard({
            name: item.name,
            code: item.id,
          });
        }
      };
      return (
        <TouchableOpacity onPress={onPress} style={styles.locationItem}>
          <Text
            style={{
              fontSize: 15,
              color: checkActive() ? Colors.primary : Colors.typography,
            }}>
            {item.name}
          </Text>
          {checkActive() && <CheckSvg size={14} color={Colors.primary} />}
        </TouchableOpacity>
      );
    },
    [district?.code, province?.code, type, ward?.code],
  );

  const renderListHeader = useCallback(() => {
    const onResetPress = () => {
      setKeyword('');
      setProvince(null);
      setDistrict(null);
      setWard(null);
      setType(AddressType.province);
    };
    return (
      <View style={styles.stepContainer}>
        <View style={styles.stepHeader}>
          <Text style={{fontSize: 15, color: Colors.typography_40}}>
            Selected Location
          </Text>
          <TouchableOpacity onPress={onResetPress}>
            <Text style={{fontSize: 15, color: Colors.primary}}>Reset</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.stepList}>
          <View style={styles.stepBar}>
            <View style={styles.stepPoint} />
            <View style={styles.stepLine} />
            <View style={styles.stepPoint} />
            <View style={styles.stepLine} />
            <View style={styles.stepPoint} />
          </View>
          <View>
            <Pressable
              onPress={() => setType(AddressType.province)}
              style={styles.stepItem}>
              <Text style={{fontSize: 15}}>
                {province ? province.name : 'Select Province'}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => !!province && setType(AddressType.district)}
              style={styles.stepItem}>
              <Text style={{fontSize: 15}}>
                {district ? district.name : 'Select District'}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => !!district && setType(AddressType.wards)}
              style={styles.stepItem}>
              <Text style={{fontSize: 15}}>
                {ward ? ward.name : 'Select ward'}
              </Text>
            </Pressable>
          </View>
          <Animated.View style={[styles.activeStep, activeStepStyle]}>
            <View style={styles.activePointContainer}>
              <View style={styles.activePoint}>
                <View style={styles.activePointInner} />
              </View>
            </View>
            {type === AddressType.province && (
              <Animated.View entering={FadeIn}>
                <Text style={{fontSize: 15, color: Colors.primary}}>
                  {province ? province.name : 'Select Province'}
                </Text>
              </Animated.View>
            )}
            {type === AddressType.district && (
              <Animated.View entering={FadeIn}>
                <Text style={{fontSize: 15, color: Colors.primary}}>
                  {district ? district.name : 'Select District'}
                </Text>
              </Animated.View>
            )}
            {type === AddressType.wards && (
              <Animated.View entering={FadeIn}>
                <Text style={{fontSize: 15, color: Colors.primary}}>
                  {ward ? ward.name : 'Select Ward'}
                </Text>
              </Animated.View>
            )}
          </Animated.View>
        </View>
        <View style={styles.listTitleContainer}>
          <Text style={{fontSize: 15}}>
            {type === AddressType.province && 'Province'}
            {type === AddressType.district && 'District'}
            {type === AddressType.wards && 'Ward'}
          </Text>
        </View>
      </View>
    );
  }, [activeStepStyle, district, province, type, ward]);

  const _onSaveAddress = useCallback(() => {
    if (route.params?.mode === 'Create') {
      if (province && district && ward) {
        const address = {
          province,
          district,
          ward,
        };
        dispatch(addLocation(address));
      }
    }
    goBack();
  }, [district, province, route.params?.mode, ward]);
  return (
    <Container>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => _onSaveAddress()}
          style={styles.btnBack}>
          <ArrowLeftSvg />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <View style={styles.searchIcon}>
            <SearchSvg color={Colors.typography_20} />
          </View>
          <TextInput
            defaultValue={keyword}
            onChangeText={e => {
              setKeyword(e);
            }}
            style={styles.searchInput}
            placeholderTextColor={Colors.typography_20}
            placeholder="Search for District/Province"
            clearButtonMode="always"
          />
        </View>
      </View>
      <View style={styles.listContainer}>
        {renderListHeader()}
        <View style={{flex: 1}}>
          <FlatList
            style={{
              backgroundColor: Colors.white,
            }}
            data={provinces}
            renderItem={renderLocationItem}
          />
          <View
            style={[
              styles.districtList,
              type === AddressType.district && {
                zIndex: 1,
              },
            ]}>
            <FlatList data={districts} renderItem={renderLocationItem} />
          </View>
          <View
            style={[
              styles.wardList,
              type === AddressType.wards && {
                zIndex: 999,
              },
            ]}>
            <FlatList data={wards} renderItem={renderLocationItem} />
          </View>
        </View>
      </View>
    </Container>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
  },

  backIcon: {
    width: 5,
    height: 9.5,
  },
  searchContainer: {
    height: '100%',
    flex: 1,
    backgroundColor: Colors.border,
    marginRight: 26,
    borderRadius: 5,
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    fontSize: 15,
    flex: 1,
  },
  searchIcon: {
    height: '100%',
    aspectRatio: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnBack: {
    height: '100%',
    aspectRatio: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
    paddingTop: 24,
  },
  stepContainer: {},
  stepHeader: {
    paddingHorizontal: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepItem: {
    height: stepHeight,
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepList: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 26,
  },
  stepBar: {
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepPoint: {
    width: 8,
    height: 8,
    borderRadius: 99,
    backgroundColor: Colors.gray_40,
  },
  stepLine: {
    height: stepHeight - 16,
    marginVertical: 5,
    width: 1,
    backgroundColor: Colors.gray_40,
  },
  activeStep: {
    position: 'absolute',
    height: stepHeight,
    flexDirection: 'row',
    alignItems: 'center',
    left: 26,
    right: 26,
    top: 0,
    borderColor: Colors.primary,
    borderWidth: 1,
    backgroundColor: Colors.white,
  },
  activePointContainer: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activePoint: {
    padding: 3,
    borderRadius: 99,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  activePointInner: {
    width: 10,
    height: 10,
    borderRadius: 99,
    backgroundColor: Colors.primary,
  },
  listTitleContainer: {
    paddingHorizontal: 26,
    paddingVertical: 15,
    backgroundColor: Colors.border,
    marginTop: 16,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 26,
    paddingVertical: 14,
    borderBottomColor: Colors.border,
    borderBottomWidth: 0.5,
  },
  districtList: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.white,
    zIndex: -99,
  },
  wardList: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.white,
    zIndex: -99,
  },
});
