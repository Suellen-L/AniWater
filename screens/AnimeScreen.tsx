import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import AnimeCard from '../components/AnimeCard';

export default function AnimeScreen() {
  const [animes, setAnimes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAnimes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/animes?season=FALL&year=2023');
      const media = response.data?.data?.Page?.media || [];
      setAnimes(media);
    } catch (error: any) {
      Alert.alert('Erro', 'Não foi possível carregar os animes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimes();
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#4169E1" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Animes da Temporada</Text>
      <FlatList
        data={animes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <AnimeCard anime={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20 
    },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    textAlign: 'center' 
    }
});