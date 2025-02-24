import { useEffect, useState, useRef } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import styles from '../styles/DetailViewStyles';
import { NavigationProps } from '../types/navigation';
import { Artwork } from '../types/artwork';

export default function DetailView({ route }: NavigationProps) {
  const { itemId, darkMode } = route.params;
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const heartIconRef = useRef(null);

  useEffect(() => {
    fetch(`https://api.artic.edu/api/v1/artworks/${itemId}`)
      .then(response => response.json())
      .then(data => setArtwork(data.data))
      .catch(error => console.error('Error fetching artwork details:', error));

    checkIfFavorite();
  }, [itemId]);

  const checkIfFavorite = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
      const isAlreadyFavorite = favorites.some((fav: any) => fav.id === itemId);
      setIsFavorite(isAlreadyFavorite);
    } catch (error) {
      console.error('Error checking favorite status', error);
    }
  };

  const toggleFavorite = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

      if (isFavorite) {
        const updatedFavorites = favorites.filter((fav: any) => fav.id !== itemId);
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));

        sendFavoriteNotification('Obra eliminada de favoritos', `${artwork.title} ha sido removida de tus favoritos.`);
      } else {
        const updatedFavorites = [...favorites, artwork];
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));

        sendFavoriteNotification('Obra marcada como favorita', `${artwork.title} ha sido añadida a tus favoritos.`);
      }

      setIsFavorite(!isFavorite);

      if (heartIconRef.current) {
        heartIconRef.current.rubberBand(500);
      }
    } catch (error) {
      console.error('Error toggling favorite', error);
    }
  };

  async function sendFavoriteNotification(title: string, body: string) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        sound: 'default',
      },
      trigger: null, 
    });
  }

  if (!artwork) {
    return <Text>Loading...</Text>;
  }

  return (
    <Animatable.View animation="fadeIn" duration={1500} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={darkMode ? styles.containerDark : styles.container}>
        <Image
          source={{ uri: `https://www.artic.edu/iiif/2/${artwork.image_id}/full/600,/0/default.jpg` }}
          style={styles.image}
        />
        <Text style={darkMode ? styles.titleDark : styles.title}>{artwork.title}</Text>

        {artwork.artist_title && (
          <Text style={darkMode ? styles.detailTextDark : styles.detailText}>Author: {artwork.artist_title}</Text>
        )}

        {artwork.category_titles && artwork.category_titles.length > 0 && (
          <Text style={darkMode ? styles.detailTextDark : styles.detailText}>
            Categories: {artwork.category_titles}
          </Text>
        )}

        {artwork.description ? (
          <Text style={darkMode ? styles.descriptionDark : styles.description}>{artwork.description}</Text>
        ) : (
          <Text style={darkMode ? styles.descriptionDark : styles.description}>No description available.</Text>
        )}

        {artwork.date_display && (
          <Text style={darkMode ? styles.detailTextDark : styles.detailText}>Year: {artwork.date_display}</Text>
        )}

        {artwork.place_of_origin && (
          <Text style={darkMode ? styles.detailTextDark : styles.detailText}>Place of Origin: {artwork.place_of_origin}</Text>
        )}

        {artwork.dimensions && (
          <Text style={darkMode ? styles.detailTextDark : styles.detailText}>Dimensions: {artwork.dimensions}</Text>
        )}

        <Animatable.View ref={heartIconRef}>
          <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
            <Icon name="heart" size={30} color={isFavorite ? 'red' : 'gray'} />
          </TouchableOpacity>
        </Animatable.View>
      </ScrollView>
    </Animatable.View>
  );
}