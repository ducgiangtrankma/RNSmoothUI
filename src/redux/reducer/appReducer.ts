import {createSlice} from '@reduxjs/toolkit';
interface AppStateEntity {
  drawerMenuVisible: boolean;
}
const initialAppState: AppStateEntity = {
  drawerMenuVisible: false,
};
const slice = createSlice({
  name: 'APP_STATE',
  initialState: initialAppState,
  reducers: {
    toggleDrawerMenu: state => {
      state.drawerMenuVisible = !state.drawerMenuVisible;
    },
  },
});
const appReducer = slice.reducer;
export default appReducer;
export const {toggleDrawerMenu} = slice.actions;
