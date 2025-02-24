import React, { useCallback } from "react";
import { Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import styles from "../styles/FavoritesStyles";
import { Artwork } from "../types/artwork";
import { useFavorites } from "@hooks/useFavorites";
import { useFocusEffect } from "@react-navigation/native";
import { RootStackParamList, SCREENS } from "@navigation/routes";

type FavoritesScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Favorites"
>;

export default function FavoritesScreen() {
  const route = useRoute();
  const navigation = useNavigation<FavoritesScreenNavigationProp>();
  const { darkMode, favorites: initialFavorites } = route.params as {
    darkMode: boolean;
    favorites: Artwork[];
  };

  const { favorites, loadFavorites } = useFavorites();

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites])
  );

  const handleNavigateToDetail = (item: Artwork) => {
    navigation.navigate(SCREENS.ARTWORK_DETAIL, {
      artworkId: item.id.toString(),
      darkMode,
    });
  };

  const renderItem = useCallback(
    ({ item }: { item: Artwork }) => (
      <TouchableOpacity
        style={darkMode ? styles.cardDark : styles.card}
        onPress={() => handleNavigateToDetail(item)}
      >
        <Image
          source={{
            uri: item.image_id
              ? `https://www.artic.edu/iiif/2/${item.image_id}/full/200,/0/default.jpg`
              : "https://placehold.co/200x200/png?text=No+Image",
          }}
          style={styles.image}
          defaultSource={{
            uri: "https://placehold.co/200x200/png?text=Loading...",
          }}
        />
        <Text
          style={darkMode ? styles.titleDark : styles.title}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {item.title || "Untitled Artwork"}
        </Text>
      </TouchableOpacity>
    ),
    [darkMode]
  );

  return (
    <View style={darkMode ? styles.containerDark : styles.container}>
      <Text style={darkMode ? styles.headerDark : styles.header}>
        Favorites
      </Text>

      {favorites.length === 0 ? (
        <Text style={darkMode ? styles.noFavoritesDark : styles.noFavorites}>
          No favorites yet
        </Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) =>
            `fav-${item.id}-${item.image_id || "no-image"}`
          }
          renderItem={renderItem}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={10}
        />
      )}
    </View>
  );
}
