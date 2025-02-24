import { useEffect, useState } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/FavoritesStyles';
import { NavigationProps } from '../types/navigation';
import { Artwork } from '../types/artwork';

export default function Favorites({ route, navigation }: NavigationProps) {
  const { darkMode } = route.params;
  const [favorites, setFavorites] = useState<Artwork[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
      
      favorites = favorites.filter((item: any) => item && item.id);
  
      setFavorites(favorites);
    } catch (error) {
      console.error('Error loading favorites', error);
    }
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity 
      style={darkMode ? styles.cardDark : styles.card}
      onPress={() => navigation.navigate('DetailView', { itemId: item.id, darkMode })}
    >
      <Image
        source={{ uri: `https://www.artic.edu/iiif/2/${item.image_id}/full/200,/0/default.jpg` }}
        style={styles.image}
      />
      <Text style={darkMode ? styles.titleDark : styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={darkMode ? styles.containerDark : styles.container}>
      <Text style={darkMode ? styles.headerDark : styles.header}>Favorites</Text>
      {favorites.length === 0 ? (
        <Text style={darkMode ? styles.noFavoritesDark : styles.noFavorites}>No favorites yet</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}