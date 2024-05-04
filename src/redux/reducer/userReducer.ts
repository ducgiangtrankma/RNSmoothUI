import {PayloadAction, createSlice} from '@reduxjs/toolkit';
export interface AddressEntity {
  district: {name: string; code: string};
  province: {name: string; code: string};
  ward: {name: string; code: string};
}
interface UserInfoEntity {
  deliveryLocations: AddressEntity[];
}
const initialUserState: UserInfoEntity = {
  deliveryLocations: [],
};
const slice = createSlice({
  name: 'USER_STATE',
  initialState: initialUserState,
  reducers: {
    addLocation: (
      state,
      {
        payload,
      }: PayloadAction<{
        district: {name: string; code: string};
        province: {name: string; code: string};
        ward: {name: string; code: string};
      }>,
    ) => {
      state.deliveryLocations = state.deliveryLocations.concat(payload);
    },
  },
});
const userReducer = slice.reducer;
export default userReducer;
export const {addLocation} = slice.actions;
