// screens/DetailScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';

export default function DetailScreen({ route }: any) {
  const { id } = route.params;
  const [media, setMedia] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/media/${id}`);
      setMedia(response.data?.data?.Media);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os detalhes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#4169E1" />;
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: media.coverImage.large }} style={styles.image} />
      <Text style={styles.title}>{media.title.romaji || media.title.english}</Text>
      <Text style={styles.genres}>{media.genres.join(', ')}</Text>
      <Text style={styles.info}>Tipo: {media.type}</Text>
      <Text style={styles.info}>Status: {media.status}</Text>
      {media.episodes && <Text style={styles.info}>Episódios: {media.episodes}</Text>}
      {media.chapters && <Text style={styles.info}>Capítulos: {media.chapters}</Text>}
      <Text style={styles.info}>Nota média: {media.averageScore}</Text>
      <Text style={styles.description}>{media.description?.replace(/<[^>]+>/g, '')}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  image: { width: '100%', height: 300, borderRadius: 8, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  genres: { fontSize: 16, color: '#666', marginBottom: 10 },
  info: { fontSize: 14, marginBottom: 5 },
  description: { fontSize: 14, marginTop: 15, lineHeight: 20 }
});