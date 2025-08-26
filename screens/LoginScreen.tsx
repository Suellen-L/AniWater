import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password
      });

      const { id } = response.data;

      // Salva o ID do usuário localmente
      await AsyncStorage.setItem('user_id', String(id));

      Alert.alert('Sucesso', 'Login realizado com sucesso');
      navigation.navigate('Profile'); // Redireciona para tela de perfil
    } catch (error: any) {
      Alert.alert('Erro', error.response?.data?.error || 'Erro ao fazer login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome de usuário"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20 
    },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    textAlign: 'center' 
    },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 12, 
    marginBottom: 15, 
    borderRadius: 8 
    },
  button: { 
    backgroundColor: '#4169E1', 
    padding: 15, 
    borderRadius: 8 
    },
  buttonText: { 
    color: '#fff', 
    textAlign: 'center', 
    fontWeight: 'bold' 
    },
  link: { 
    marginTop: 15, 
    textAlign: 'center', 
    color: '#00FFFF' 
    }
});