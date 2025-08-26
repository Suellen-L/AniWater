import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnimeScreen from '../screens/AnimeScreen';
import MangaScreen from '../screens/MangaScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Anime">
      <Tab.Screen name="Anime" component={AnimeScreen} />
      <Tab.Screen name="Mangá" component={MangaScreen} />
      <Tab.Screen name="Histórico" component={HistoryScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}