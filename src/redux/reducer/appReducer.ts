import {PayloadAction, createSlice} from '@reduxjs/toolkit';
interface AppStateEntity {
  drawerMenuVisible: boolean;
  isScrollingUp: boolean;
}
const initialAppState: AppStateEntity = {
  drawerMenuVisible: false,
  isScrollingUp: true,
};
const slice = createSlice({
  name: 'APP_STATE',
  initialState: initialAppState,
  reducers: {
    toggleDrawerMenu: state => {
      state.drawerMenuVisible = !state.drawerMenuVisible;
    },
    updateScrollingUp: (
      state,
      {
        payload,
      }: PayloadAction<{
        newStatus: boolean;
      }>,
    ) => {
      state.isScrollingUp = payload.newStatus;
    },
  },
});
const appReducer = slice.reducer;
export default appReducer;
export const {toggleDrawerMenu, updateScrollingUp} = slice.actions;
