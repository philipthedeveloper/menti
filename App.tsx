/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import GlobalContextProvider from './src/context/GlobalContext';
import Router from './src/routes';
import {useRedux} from './src/hooks/useRedux';
import {RootState} from './src/redux/root';
import {useNetInfo} from '@react-native-community/netinfo';
import NoInternet from './src/components/NoInternet';
import Overlay from './src/components/Overlay';
import {
  endAuthorization,
  getCurrentSession,
  getUser,
} from './src/redux/user/userSlice';
import {ToastAndroid} from 'react-native';

function App(): JSX.Element {
  const {dispatch, useStateSelector} = useRedux();

  const {isAuthorized, isAuthorizing, authorizationError} = useStateSelector(
    (state: RootState) => state.User,
  );
  const network = useNetInfo();

  useEffect(() => {
    dispatch(getCurrentSession());
  }, []);

  useEffect(() => {
    const startAuthorization = async () => {
      if (!isAuthorized) {
        if (!network.isConnected) {
          dispatch(endAuthorization(null));
        } else {
          dispatch(getUser());
        }
      }
      return SplashScreen.hide();
    };

    (() => startAuthorization())();
  }, [network]);

  useEffect(() => {
    if (authorizationError) {
      ToastAndroid.show(authorizationError, ToastAndroid.LONG);
    }
  }, [authorizationError]);

  if (!network.isConnected && !network.isInternetReachable && !isAuthorized)
    return <NoInternet />;

  if (isAuthorizing) return <Overlay />;

  return (
    <Provider store={store}>
      <GlobalContextProvider>
        <Router isAuthorized={isAuthorized} />
      </GlobalContextProvider>
    </Provider>
  );
}

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <GlobalContextProvider>
        <App />
      </GlobalContextProvider>
    </Provider>
  );
};

export default AppWrapper;
