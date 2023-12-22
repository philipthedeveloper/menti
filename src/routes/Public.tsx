import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Onboarding, SignIn, SignUp} from '../screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

const Stack = createNativeStackNavigator();

const PublicStack = () => {
  const [notFirstTime, setNotFirstTime] = useState<null | boolean>(null);

  useEffect(() => {
    (async () => {
      try {
        let notFirstTime = await AsyncStorage.getItem('notfirsttime');
        if (notFirstTime) return setNotFirstTime(true);
        setNotFirstTime(false);
      } catch (error) {
        console.log('Error in app.jsx', error);
      }
    })();
  }, []);

  if (notFirstTime === null) return;

  return (
    <Stack.Navigator
      initialRouteName={notFirstTime ? 'signin' : 'onboarding'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="onboarding" component={Onboarding} />
      <Stack.Screen name="signup" component={SignUp} />
      <Stack.Screen name="signin" component={SignIn} />
      {/* <Stack.Screen name="forgot-password" component={ForgotPassword} /> */}
    </Stack.Navigator>
  );
};

export default PublicStack;
