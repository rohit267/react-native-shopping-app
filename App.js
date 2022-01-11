import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import useStore from './redux/store';
import Login from './screens/Login';
import Homepage from './screens/Homepage';
import {color} from 'native-base/lib/typescript/theme/styled-system';

const Stack = createNativeStackNavigator();

export default function App() {
  const mStore = useStore();

  return (
    <Provider store={mStore.store}>
      <PersistGate persistor={mStore.persistor}>
        <NativeBaseProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="login"
                options={{
                  headerShown: false,
                }}
                component={Login}
              />
              <Stack.Screen
                name="homepage"
                options={{
                  headerShown: true,
                  title: 'Homepage',
                  headerBackVisible: false,
                  headerStyle: {
                    backgroundColor: '#1a1a1a',
                  },
                  headerTitleStyle: {
                    color: 'white',
                  },
                }}
                component={Homepage}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
}
