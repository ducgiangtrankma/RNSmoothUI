import {AddressEntity} from '../redux';

export enum APP_SCREEN {
  AUTHENTICATION = 'AUTHENTICATION',
  MAIN_APP = 'MAIN_APP',
  LOGIN = 'LOGIN',
  HOME = 'HOME',
  CART = 'CART',
  ORDERS = 'ORDERS',
  PROFILE = 'PROFILE',
  PRODUCT_DETAIL = 'PRODUCT_DETAIL',
  DELIVERY_ADDRESS = 'DELIVERY_ADDRESS',
  ADD_DELIVERY_ADDRESS = 'ADD_DELIVERY_ADDRESS',
  SCROLL_PROGRESS = 'SCROLL_PROGRESS',
  GRID_TO_LIST = 'GRID_TO_LIST',
  MANSON_LIST = 'MANSON_LIST',
  DETAIL_MANSON_LIST = 'DETAIL_MANSON_LIST',
}
export type UnAuthenticationPramsList = {
  [APP_SCREEN.LOGIN]: undefined;
};

export type AuthenticationPramsList = {
  [APP_SCREEN.HOME]: undefined;
  [APP_SCREEN.CART]: undefined;
  [APP_SCREEN.ORDERS]: undefined;
  [APP_SCREEN.PROFILE]: undefined;
  [APP_SCREEN.PRODUCT_DETAIL]: {
    data: any;
    animated?: boolean;
    image: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
  };
  [APP_SCREEN.DELIVERY_ADDRESS]: undefined;
  [APP_SCREEN.ADD_DELIVERY_ADDRESS]: {
    currentAddress?: AddressEntity;
    mode?: 'Edit' | 'Create';
  };
  [APP_SCREEN.SCROLL_PROGRESS]: undefined;
  [APP_SCREEN.GRID_TO_LIST]: undefined;
  [APP_SCREEN.MANSON_LIST]: undefined;
  [APP_SCREEN.DETAIL_MANSON_LIST]: {
    source: any;
    heroTag: string;
  };
};

export type RootStackParamList = {
  [APP_SCREEN.AUTHENTICATION]: undefined;
  [APP_SCREEN.MAIN_APP]: undefined;
} & Partial<UnAuthenticationPramsList> &
  Partial<AuthenticationPramsList>;
