import React, {createRef, forwardRef, memo, useImperativeHandle} from 'react';
import isEqual from 'react-fast-compare';
import {useDispatch} from 'react-redux';
import {Action} from 'redux';
import {RootState} from '../../redux/store';
import {useSelector as useReduxSelector} from 'react-redux';

export function useSelector<T>(
  selector: (state: RootState) => T,
  equalityFn = isEqual,
): T {
  return useReduxSelector<RootState, T>(selector, equalityFn);
}

type ActionBase = Action<string>;

const RXStoreComponent = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const store = useSelector(x => x);

  useImperativeHandle(
    ref,
    () => ({
      dispatch: (action: ActionBase) => {
        dispatch(action);
      },
      getState: (state: keyof RootState) => {
        return store[state];
      },
    }),
    [dispatch, store],
  );
  return null;
});

type RXStoreType = {
  dispatch: (action: ActionBase) => void;
  getState: <K extends keyof RootState>(selector: K) => RootState[K];
};

const storeRef = createRef<RXStoreType>();

export const RXStore = memo(() => <RXStoreComponent ref={storeRef} />, isEqual);

export const dispatch = (action: ActionBase) => {
  if (storeRef.current) {
    storeRef.current.dispatch(action);
  }
};
export function getState<K extends keyof RootState>(selector: K): RootState[K] {
  if (storeRef.current) {
    return storeRef.current.getState(selector);
  }
  return {} as RootState[K];
}
