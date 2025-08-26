import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function HistoryScreen() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const userId = await AsyncStorage.getItem('user_id');
      if (!userId) {
        Alert.alert('Erro', 'Usuário não encontrado');
        return;
      }

      const response = await axios.get(`http://localhost:5000/history/${userId}`);
      setHistory(response.data);
    } catch (error: any) {
      Alert.alert('Erro', error.response?.data?.error || 'Erro ao carregar histórico');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#4169E1" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Buscas</Text>
      {history.length === 0 ? (
        <Text style={styles.empty}>Nenhuma busca registrada ainda.</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.query}>{item.query}</Text>
              <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleString()}</Text>
            </View>
          )}
        />
      )}
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
    },
  empty: { 
    textAlign: 'center', 
    fontSize: 16, 
    color: '#888' 
    },
  item: { 
    padding: 12, 
    borderBottomWidth: 1, 
    borderColor: '#ccc' 
    },
  query: { 
    fontSize: 16, 
    fontWeight: '600' 
    },
  timestamp: { 
    fontSize: 14, 
    color: '#666' 
    }
});