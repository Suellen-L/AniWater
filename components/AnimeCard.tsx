import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AnimeCard({ anime }: any) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Detail', { id: anime.id })}>
      <View style={styles.card}>
        <Image source={{ uri: anime.coverImage.large }} style={styles.image} />
        <Text style={styles.title}>{anime.title.romaji || anime.title.english}</Text>
        <Text style={styles.genres}>{anime.genres.join(', ')}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { 
    marginBottom: 20 
    },
  image: { 
    width: '100%', 
    height: 200, 
    borderRadius: 8 
    },
  title: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginTop: 10 
    },
  genres: { 
    fontSize: 14, 
    color: '#666' 
    }
});