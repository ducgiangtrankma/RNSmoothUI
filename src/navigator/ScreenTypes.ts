import {ProductEntity} from '../screens/Home';

export enum APP_SCREEN {
  AUTHENTICATION = 'AUTHENTICATION',
  MAIN_APP = 'MAIN_APP',
  LOGIN = 'LOGIN',
  HOME = 'HOME',
  CART = 'CART',
  ORDERS = 'ORDERS',
  PROFILE = 'PROFILE',
  PRODUCT_DETAIL = 'PRODUCT_DETAIL',
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
    data: ProductEntity;
    animated?: boolean;
    image: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
  };
};

export type RootStackParamList = {
  [APP_SCREEN.AUTHENTICATION]: undefined;
  [APP_SCREEN.MAIN_APP]: undefined;
} & Partial<UnAuthenticationPramsList> &
  Partial<AuthenticationPramsList>;
