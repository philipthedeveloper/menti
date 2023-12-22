import React from 'react';
import PublicStack from './Public';
import ProtectedStack from './Protected';
import {NavigationContainer} from '@react-navigation/native';

interface RouterProps {
  isAuthorized: boolean;
}

const Router = ({isAuthorized}: RouterProps) => {
  return (
    <NavigationContainer>
      {!isAuthorized ? <PublicStack /> : <ProtectedStack />}
    </NavigationContainer>
  );
};

export default Router;
