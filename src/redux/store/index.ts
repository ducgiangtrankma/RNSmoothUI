import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import appReducer from '../reducer/appReducer';
import otherReducer from '../reducer/otherReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [],
  blacklist: [],
};
const rootReducer = combineReducers({
  appReducer: appReducer,
  otherReducer: otherReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      ignoredActions: ['Selector unknown'],
    }).concat([]),
});
const persistor = persistStore(store);

export {persistor, store};
export type RootState = ReturnType<typeof rootReducer>;
