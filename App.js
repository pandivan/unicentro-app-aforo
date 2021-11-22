import React from "react";
import AppLoading from 'expo-app-loading';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { Center, NativeBaseProvider } from "native-base";

import Aforo from './src/containers/clientes/Aforo';


export default () => {

  let [fontsLoaded] = useFonts({ Inter_900Black });

  if (!fontsLoaded) 
  {
    return <AppLoading />;
  } 
  else 
  {
    return (
      <NativeBaseProvider>
        <Center flex={1}>        
          <Aforo />
        </Center>
      </NativeBaseProvider>
    )
  }
}
