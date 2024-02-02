import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import db from '@react-native-firebase/database'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const createUser = (response: FirebaseAuthTypes.UserCredential) => {
    db().ref(`/users/${response.user.uid}`).set({ healthScore: 0 }) // initializes health score
  }

  const handleSignUp = async () => {
    // Insert the logic for signing up (e.g., API call) here.
    console.log('Username:', email, 'Password:', password)
    if (email && password) {
      try {
        const response = await auth().createUserWithEmailAndPassword(
          email,
          password
        )

        if (response.user) {
          createUser(response)
          console.log('done!!')
        }
      } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!')
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!')
        }

        console.error(error)
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Signss-Up Page</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  input: {
    width: '80%',
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
  },
  button: {
    width: '80%',
    backgroundColor: '#3498db',
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})

export default SignUp
