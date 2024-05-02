import {createSlice} from '@reduxjs/toolkit';
interface AppStateEntity {
  cart: boolean;
}
const initialAppState: AppStateEntity = {
  cart: false,
};
const slice = createSlice({
  name: 'OTHER_STATE',
  initialState: initialAppState,
  reducers: {
    toggleCartIcon: state => {
      state.cart = !state.cart;
    },
  },
});
const otherReducer = slice.reducer;
export default otherReducer;
export const {toggleCartIcon} = slice.actions;
