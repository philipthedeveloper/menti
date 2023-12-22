import {GlobalInterface} from '../context/interface';
import {useGlobalContext} from '../hooks/useGlobalContext';
import {View, StatusBar, Text} from 'react-native';

const NoInternet = () => {
  const {styleGuide} = useGlobalContext() as GlobalInterface;

  return (
    <View
      style={[
        styleGuide.viewStyle,
        {
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}>
      <StatusBar
        backgroundColor={styleGuide.backgroundColor}
        barStyle={'light-content'}
      />
      <Text
        style={{
          color: '#fff',
          // fontFamily: 'Montserrat-SemiBold',
          fontSize: 14,
          textAlign: 'center',
        }}>
        You are not connected to the internet!🥺
      </Text>
    </View>
  );
};

export default NoInternet;
