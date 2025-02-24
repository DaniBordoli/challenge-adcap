import { Artwork } from "../types";

export type RootStackParamList = {
  [SCREENS.HOME]: undefined;
  [SCREENS.ARTWORK_DETAIL]: { artworkId: string; darkMode: boolean };
  [SCREENS.FAVORITES]: { favorites: Artwork[]; darkMode: boolean };
};

export const SCREENS = {
  HOME: "HomeScreen",
  ARTWORK_DETAIL: "ArtworkDetailScreen",
  FAVORITES: "FavoritesScreen",
} as const;
