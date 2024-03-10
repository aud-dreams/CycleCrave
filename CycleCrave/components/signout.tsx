import { signOut } from 'firebase/auth'
import { auth } from '../firebaseConfig'
import { NavigationProp } from '@react-navigation/native'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface RouterProps {
  navigation: NavigationProp<any, any>
}
const SignOutButton = ({ navigation }: RouterProps) => {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('Sign-out successful.')
        navigation.navigate('Landing')
      })
      .catch((error) => {
        console.error('Error signing out:', error)
      })
  }

  return (
    <TouchableOpacity style={styles.button} onPress={handleSignOut}>
      <Text style={styles.text}>Sign Out</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '45%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#FEDBD5',
    borderColor: '#FF898D',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  text: {
    fontSize: 16,
  },
})

export default SignOutButton
