import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { LoginScreenProps, AuthRoutesNames } from '../../routes/auth';
import { fireLoginUser } from '../../services/firebase/fire-auth.service';
import { RootState, useAppDispatch } from '../../services/store/store';

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, isLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  const handleLogin = async () => {
    try {
      isLoading(true);
      await dispatch(fireLoginUser(email, password));
      if (user && !user.emailVerified) {
        navigation.navigate(AuthRoutesNames.VerifyEmail);
      }
    } catch (error) {
      isLoading(false);
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to AniWatch</Text>
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
        secureTextEntry={true}
      />
      <Button
        loading={loading}
        onPress={handleLogin}
        mode={'contained'}
        disabled={loading}>
        Login
      </Button>
      <Button onPress={() => navigation.navigate(AuthRoutesNames.SignUp)}>
        New user? Join here
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 24,
    marginBottom: 10,
  },
});
