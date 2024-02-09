import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignUp from './pages/SignUp'
import Landing from './pages/landing'
import Dashboard from './pages/dashboard'
import { useFonts } from 'expo-font'
import { Cormorant_400Regular, Cormorant_700Bold } from '@expo-google-fonts/cormorant';
import BottomTabNav from './components/navbar'
import hydration from './pages/hydration'

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
          name="BottomTabNav"
          component={BottomTabNav}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Landing"
          component={Landing}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Dashboard'
          component={Dashboard}
          options={{ headerShown: false }}
        />
      <Stack.Screen name="hydration" component={hydration} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;