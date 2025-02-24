import React, { FC } from "react";
import { FlatList } from "react-native";
import Card from "../molecules/Card";
import { Artwork } from "../../types/artwork";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@navigation/routes";
import { SCREENS } from "@navigation/routes";

interface ArtworkListProps {
  artworks: Artwork[];
  darkMode: boolean;
  navigation: NativeStackNavigationProp<RootStackParamList>;
  favorites: Artwork[];
  toggleFavorite: (item: Artwork) => void;
}

const ArtworkList: FC<ArtworkListProps> = ({
  artworks,
  darkMode,
  navigation,
  favorites,
  toggleFavorite,
}) => {
  const getUniqueKey = (item: Artwork) => {
    if (!item.id) {
      return `unknown-${Math.random().toString(36).slice(2, 11)}`;
    }
    return `artwork-${item.id}-${item.image_id || "0"}-${
      item.artist_title?.slice(0, 5) || "unk"
    }`;
  };

  return (
    <FlatList
      data={artworks}
      keyExtractor={getUniqueKey}
      renderItem={({ item }) => (
        <Card
          item={item}
          darkMode={darkMode}
          onPress={() =>
            navigation.navigate(SCREENS.ARTWORK_DETAIL, {
              artworkId: item.id.toString(),
              darkMode,
            })
          }
          onToggleFavorite={() => toggleFavorite(item)}
          isFavorite={favorites.some((f) => f.id === item.id)}
        />
      )}
      initialNumToRender={5}
      maxToRenderPerBatch={5}
      windowSize={10}
    />
  );
};

export default React.memo(ArtworkList);
