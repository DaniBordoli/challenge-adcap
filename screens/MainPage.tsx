import { useEffect, useState, useRef } from 'react';
import { ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import MainPageTemplate from '../components/templates/MainPageTemplate';
import Card from '../components/molecules/Card';
import { NavigationProps } from '../types/navigation';
import { Artwork, Category } from '../types/artwork';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

async function sendPushNotification(expoPushToken: string, itemTitle: string) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Favorite Added',
    body: `${itemTitle} has been added to your favorites.`,
    data: { someData: 'Lorem Ipsum' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Permission not granted to get push token for push notification!');
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    if (!projectId) {
      alert('Project ID not found');
      return;
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e: unknown) {
      alert(`${e}`);
    }
  } else {
    alert('Must use physical device for push notifications');
  }
}

export default function MainPage({ navigation }: NavigationProps) {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [favorites, setFavorites] = useState<Artwork[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredArtworks, setFilteredArtworks] = useState<Artwork[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [expoPushToken, setExpoPushToken] = useState<string>('');
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(token => setExpoPushToken(token ?? ''))
      .catch((error: any) => setExpoPushToken(`${error}`));

    fetchArtworks(page);
    loadFavorites();
    fetchCategories();
  }, [page]);

  useEffect(() => {
    searchArtworks();
  }, [searchTerm]);

  useEffect(() => {
    filterByCategory();
  }, [selectedCategory]);

  const fetchArtworks = (page: number) => {
    fetch(`https://api.artic.edu/api/v1/artworks?page=${page}&limit=10`)
      .then(response => response.json())
      .then(data => {
        setArtworks(data.data);
        setFilteredArtworks(data.data);
      })
      .catch(error => console.error('Error fetching artworks:', error));
  };

  const fetchCategories = () => {
    fetch('https://api.artic.edu/api/v1/artwork-types')
      .then(response => response.json())
      .then(data => {
        const categoryNames = data.data.map((category: any) => category.title);
        setCategories(categoryNames);
      })
      .catch(error => console.error('Error fetching categories:', error));
  };

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
      setFavorites(favorites);
    } catch (error) {
      console.error('Error loading favorites', error);
    }
  };

  const toggleFavorite = async (item: any) => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

      if (favorites.some((fav: any) => fav.id === item.id)) {
        favorites = favorites.filter((fav: any) => fav.id !== item.id);
      } else {
        favorites.push(item);
        await sendPushNotification(expoPushToken, item.title);
      }

      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      setFavorites(favorites);
    } catch (error) {
      console.error('Error toggling favorite', error);
    }
  };

  const searchArtworks = () => {
    if (searchTerm.trim() === '') {
      setFilteredArtworks(artworks);
      return;
    }

    fetch(`https://api.artic.edu/api/v1/artworks/search?q=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        setFilteredArtworks(data.data);
      })
      .catch(error => console.error('Error searching artworks:', error));
  };

  const filterByCategory = () => {
    if (selectedCategory.trim() === '') {
      setFilteredArtworks(artworks);
      return;
    }

    const filtered = artworks.filter(artwork => artwork.artwork_type_title === selectedCategory);
    setFilteredArtworks(filtered);
  };

  const handleCategoryPress = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory('');
    } else {
      setSelectedCategory(category);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
    scrollViewRef.current?.scrollTo({ y: 0, animated: true }); 
  };

  return (
    <ScrollView ref={scrollViewRef}>
      <MainPageTemplate
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categories={categories}
        selectedCategory={selectedCategory}
        handleCategoryPress={handleCategoryPress}
        filteredArtworks={filteredArtworks}
        navigation={navigation}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        handlePageChange={handlePageChange}
        page={page}
        renderCard={(item: any) => (
          <Card
            key={item.id}
            item={item}
            darkMode={darkMode}
            onPress={() => navigation.navigate('Detail', { item })}
            onToggleFavorite={() => toggleFavorite(item)}
            isFavorite={favorites.some(fav => fav.id === item.id)}
          />
        )}
      />
    </ScrollView>
  );
}