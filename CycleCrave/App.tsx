import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignUp from './pages/SignUp'
import landing from './pages/landing'
import dashboard from './pages/dashboard'
import { useFonts } from 'expo-font'
import { Cormorant_400Regular, Cormorant_700Bold } from '@expo-google-fonts/cormorant';

const Stack = createNativeStackNavigator()

function App() {
  let [fontsLoaded] = useFonts({
    Cormorant_400Regular,
    Cormorant_700Bold,
  });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Landing'>
        <Stack.Screen
          name="Landing"
          component={landing}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Dashboard'
          component={dashboard}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;