import React, {useMemo, ReactNode, useContext} from 'react';
import {SharedValue, useSharedValue} from 'react-native-reanimated';

// Define the type for the ActiveTabBarContext
type ActiveTabBarContextType = {
  isActive: SharedValue<boolean>; // Animated shared value to track the active state
};

// Create the ActiveTabBarContext with a placeholder initial value
const ActiveTabBarContext = React.createContext<
  ActiveTabBarContextType | undefined
>(undefined);

// Define the props for the ActiveTabBarContextProvider
type ActiveTabBarContextProviderProps = {
  children?: ReactNode; // Children elements to be wrapped within the context provider
};

// Create the ActiveTabBarContextProvider component
const ActiveTabBarContextProvider: React.FC<
  ActiveTabBarContextProviderProps
> = ({children}) => {
  // Create a shared animated value 'isActive' and initialize it to true
  const isActive = useSharedValue(true);

  // Create the context value using useMemo to avoid unnecessary re-renders
  const value = useMemo(() => {
    return {isActive}; // Provide the 'isActive' shared animated value to the context consumers
  }, [isActive]);

  // Render the ActiveTabBarContextProvider with the provided children wrapped within the context
  return (
    <ActiveTabBarContext.Provider value={value}>
      {children}
    </ActiveTabBarContext.Provider>
  );
};

// Create the custom hook 'useActiveTabBarContext' to access the ActiveTabBarContext value
const useActiveTabBarContext = () => {
  const context = useContext(ActiveTabBarContext);
  if (!context) {
    throw new Error(
      'useActiveTabBarContext must be used within an ActiveTabBarContextProvider',
    );
  }
  return context;
};

export {ActiveTabBarContextProvider, useActiveTabBarContext};
