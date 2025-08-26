import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function ProfileScreen() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const userId = await AsyncStorage.getItem('user_id');
      if (!userId) {
        Alert.alert('Erro', 'Usuário não encontrado');
        return;
      }

      const response = await axios.get(`http://localhost:5000/profile/${userId}`);
      setProfile(response.data);
    } catch (error: any) {
      Alert.alert('Erro', error.response?.data?.error || 'Erro ao carregar perfil');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#4169E1" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Text style={styles.label}>ID:</Text>
      <Text style={styles.value}>{profile?.id}</Text>
      <Text style={styles.label}>Usuário:</Text>
      <Text style={styles.value}>{profile?.username}</Text>
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
    marginBottom: 30, 
    textAlign: 'center' 
    },
  label: { 
    fontSize: 18, 
    fontWeight: '600', 
    marginTop: 10 
    },
  value: { 
    fontSize: 16, 
    marginBottom: 10 
    }
});