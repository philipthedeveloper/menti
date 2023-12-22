import React, {
  Children,
  PropsWithChildren,
  ReactChildren,
  useMemo,
} from 'react';
import {GlobalInterface} from './interface';

export const GlobalContext = React.createContext<GlobalInterface | null>(null);

const GlobalContextProvider = ({children}: PropsWithChildren) => {
  const styleGuide = useMemo(
    () => ({
      viewStyle: {
        backgroundColor: '#0A4D68',
        paddingHorizontal: 19,
      },
      backgroundColor: '#0A4D68',
    }),
    [],
  );
  return (
    <GlobalContext.Provider value={{styleGuide}}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
