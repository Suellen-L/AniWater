import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import MangaCard from '../components/MangaCard';

export default function MangaScreen() {
  const [mangas, setMangas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMangas = async () => {
    try {
      const response = await axios.get('http://localhost:5000/mangas?genre=Action');
      const media = response.data?.data?.Page?.media || [];
      setMangas(media);
    } catch (error: any) {
      Alert.alert('Erro', 'Não foi possível carregar os mangás');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMangas();
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#4169E1" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mangás de Ação</Text>
      <FlatList
        data={mangas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MangaCard manga={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20 
    },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }
});