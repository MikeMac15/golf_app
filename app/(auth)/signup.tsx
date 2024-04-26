import { createContext, useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { LogIn, SignUp} from './api';
import { View, Button, TextInput, Text, StyleSheet} from 'react-native';


export default function SignUpScreen() {
    const [email, setEmail] = useState('');
    const [display_name, setDisplayName] = useState('');
    const [password, setPassword] = useState('');

    return(
      <>
      <Stack.Screen
        
        options={{
          headerShown: false
        }}
        />
        <View style={styles.container}>
      {/* Email Input */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text: string) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
        />

      {/* Display Name Input */}
      <TextInput
        placeholder="Display Name"
        value={display_name}
        onChangeText={(text: string) => setDisplayName(text)}
        />

      {/* Password Input */}
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text: string) => setPassword(text)}
        secureTextEntry
        />

      {/* Submit Button */}
      <Button title="Sign Up" onPress={() => SignUp(email, display_name, password)} />
</View>
      {/* Add any other UI components or styling as needed */}
      
      <View style={styles.container}>
      <TextInput
        style={styles.text}
        placeholder="Email"
        value={email}
        onChangeText={(text: string) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
        />

    <TextInput
        style={styles.text}
        placeholder="Password"
        value={password}
        onChangeText={(text: string) => setPassword(text)}
        secureTextEntry
        />

<Button title="Log In" onPress={() => LogIn(email, password)} />

    </View>
        </>
    )

}

const styles = StyleSheet.create({
  container: {
        marginTop: 100,
        alignItems: 'center',
        justifyContent: 'center', 
        backgroundColor: 'grey'
    },
  text: {
    color: 'whitesmoke',
    fontSize: 20
  }
  })