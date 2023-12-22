import {GlobalInterface} from '../context/interface';
import {useGlobalContext} from '../hooks/useGlobalContext';
import {View, StatusBar, ActivityIndicator} from 'react-native';

const Overlay = () => {
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
        backgroundColor={styleGuide?.backgroundColor}
        barStyle={'light-content'}
      />
      <ActivityIndicator size={'large'} color={'red'} />
    </View>
  );
};

export default Overlay;
