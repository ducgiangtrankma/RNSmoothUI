import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {View} from 'react-native';

import {AppScreens} from './const';
import {BottomTabBarCustom} from './BottomTabBar';

const BottomTab = createBottomTabNavigator();

const BackgroundView = () => {
  return <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.1)'}} />;
};

const BottomTabAnimation = () => {
  return (
    <BottomTab.Navigator
      tabBar={props => {
        return <BottomTabBarCustom {...props} />;
      }}>
      <BottomTab.Screen name={AppScreens.Home} component={BackgroundView} />
      <BottomTab.Screen name={AppScreens.Search} component={BackgroundView} />
      <BottomTab.Screen name={AppScreens.User} component={BackgroundView} />
    </BottomTab.Navigator>
  );
};

export {BottomTabAnimation};
