import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { AuthRoutesNames, SignUpScreenProps } from '../../routes/auth';
import { fireRegisterUser } from '../../services/firebase/fire-auth.service';
import { RootState, useAppDispatch } from '../../services/store/store';

export const SignUpScreen = ({ navigation }: SignUpScreenProps) => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  const handleSignUp = () => {
    dispatch(fireRegisterUser(displayName, email, password));
    if (user) {
      navigation.navigate(AuthRoutesNames.VerifyEmail);
    }
  };

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
      <Button onPress={handleSignUp}>Sign up</Button>
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
