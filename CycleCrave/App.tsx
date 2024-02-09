import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignUp from './pages/SignUp'
import hydration from './pages/hydration'

import { PaperProvider } from 'react-native-paper';

const Stack = createNativeStackNavigator()

function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="hydration" component={hydration} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}

export default App