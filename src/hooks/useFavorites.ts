// src/hooks/useFavorites.ts
import { useState, useEffect, useCallback, useMemo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Artwork } from "../types/artwork";
import { useNotifications } from "@hooks/useNotifications";

interface UseFavoritesReturn {
  favorites: Artwork[];
  toggleFavorite: (item: Artwork) => Promise<void>;
  loadFavorites: () => Promise<void>;
  isFavorite: (id: number) => boolean;
}

export const useFavorites = (): UseFavoritesReturn => {
  const [favorites, setFavorites] = useState<Artwork[]>([]);
  const { expoPushToken, sendPushNotification } = useNotifications();

  const loadFavorites = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem("favorites");
      if (stored) {
        const parsed: Artwork[] = JSON.parse(stored);
        const unique = Array.from(
          new Map(
            parsed.map((item) => [item.id + item.image_id, item])
          ).values()
        );
        setFavorites(unique);
        await AsyncStorage.setItem("favorites", JSON.stringify(unique));
      }
    } catch (error) {
      console.error("Error loading favorites", error);
    }
  }, []);

  const isFavorite = useCallback(
    (id?: number | string) => {
      if (!id) return false;
      return favorites.some((fav) => fav.id.toString() === id.toString());
    },
    [favorites]
  );

  const toggleFavorite = useCallback<UseFavoritesReturn["toggleFavorite"]>(
    async (item) => {
      try {
        const isCurrentlyFavorite = isFavorite(item.id);
        const exists = favorites.some(
          (f) =>
            f.id === item.id &&
            f.image_id === item.image_id &&
            f.title === item.title
        );

        const updated = exists
          ? favorites.filter((f) => f.id !== item.id)
          : [...favorites, item];

        await AsyncStorage.setItem("favorites", JSON.stringify(updated));
        setFavorites(updated);

        if (expoPushToken) {
          const title = isCurrentlyFavorite
            ? "Obra eliminada de favoritos"
            : "Obra marcada como favorita";
          const body = `${item.title} ha sido ${
            isCurrentlyFavorite ? "removida de" : "añadida a"
          } tus favoritos.`;

          await sendPushNotification(expoPushToken, title, body);
        }
      } catch (error) {
        console.error("Error toggling favorite", error);
      }
    },
    [favorites, expoPushToken, sendPushNotification]
  );

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  return useMemo(
    () => ({
      favorites,
      toggleFavorite,
      loadFavorites,
      isFavorite,
    }),
    [favorites, toggleFavorite, loadFavorites, isFavorite]
  );
};
