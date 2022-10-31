import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { fireRegisterUser } from '../../services/firebase/fire-auth.service';
import { useAppDispatch } from '../../services/store/store';

export const SignUpPage = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create an account</Text>
      <TextInput
        value={displayName}
        placeholder="Username"
        onChangeText={text => setDisplayName(text)}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        value={email}
        placeholder="Email"
        onChangeText={userEmail => setEmail(userEmail)}
        autoCapitalize="none"
        keyboardType="email-address"
        autoCorrect={false}
      />
      <TextInput
        value={password}
        placeholder="Password"
        onChangeText={userPassword => setPassword(userPassword)}
        autoCapitalize="none"
        secureTextEntry={true}
      />
      <Button
        onPress={() =>
          dispatch(fireRegisterUser(displayName, email, password))
        }>
        Sign up
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 24,
    marginBottom: 10,
  },
});
