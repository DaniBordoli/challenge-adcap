import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../styles/ArtworkDetailStyles";
import { Artwork } from "../types/artwork";
import { useFavorites } from "@hooks/useFavorites";
import { useFocusEffect } from "@react-navigation/native";

export default function ArtworkDetailScreen({ route }: any) {
  const { artworkId, darkMode } = route.params;
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const heartIconRef = useRef(null);

  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const fetchArtworkData = async () => {
      try {
        const response = await fetch(
          `https://api.artic.edu/api/v1/artworks/${artworkId}`
        );
        if (!response.ok) throw new Error("Error fetching artwork");

        const data = await response.json();

        if (!data.data) throw new Error("Invalid artwork data");

        setArtwork({
          id: data.data.id,
          title: data.data.title || "Untitled",
          artist_title: data.data.artist_title,
          image_id: data.data.image_id,
          description:
            data.data.description || data.data.thumbnail?.alt_text || "",
          date_display: data.data.date_display,
          place_of_origin: data.data.place_of_origin,
          dimensions: data.data.dimensions,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchArtworkData();
  }, [artworkId]);

  useFocusEffect(
    React.useCallback(() => {
      heartIconRef.current?.rubberBand?.(500);
    }, [])
  );

  const handleToggleFavorite = () => {
    if (artwork) {
      toggleFavorite(artwork);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#066068" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={darkMode ? styles.darkContainer : styles.container}>
      {artwork?.image_id ? (
        <Image
          source={{
            uri: `https://www.artic.edu/iiif/2/${artwork.image_id}/full/600,/0/default.jpg`,
          }}
          style={styles.image}
          resizeMode="contain"
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text>No image available</Text>
        </View>
      )}

      <Text style={[styles.title, darkMode && styles.darkText]}>
        {artwork?.title}
      </Text>

      <View style={styles.details}>
        {artwork?.artist_title && (
          <Text style={[styles.detailText, darkMode && styles.darkText]}>
            Artist: {artwork.artist_title}
          </Text>
        )}
        {artwork?.date_display && (
          <Text style={[styles.detailText, darkMode && styles.darkText]}>
            Date: {artwork.date_display}
          </Text>
        )}
        {artwork?.dimensions && (
          <Text style={[styles.detailText, darkMode && styles.darkText]}>
            Dimensions: {artwork.dimensions}
          </Text>
        )}
      </View>

      <Text style={[styles.description, darkMode && styles.darkText]}>
        {artwork?.description || "No description available"}
      </Text>

      <TouchableOpacity
        onPress={handleToggleFavorite}
        style={styles.favoriteButton}
      >
        <Icon
          name={artwork && isFavorite(artwork.id) ? "heart" : "heart-o"}
          size={30}
          color={
            artwork && isFavorite(artwork.id)
              ? "red"
              : darkMode
              ? "white"
              : "black"
          }
        />
      </TouchableOpacity>
    </ScrollView>
  );
}
