import React from 'react';
import { FlatList } from 'react-native';
import Card from '../molecules/Card';
import { Artwork } from '../../types/artwork';

const ArtworkList = ({
  artworks,
  darkMode,
  navigation,
  favorites,
  toggleFavorite,
}: {
  artworks: Artwork[];
  darkMode: boolean;
  navigation: any;
  favorites: Artwork[];
  toggleFavorite: (item: Artwork) => void;
}) => {
  const renderItem = ({ item, index }: any) => {
    const isFavorite = favorites.some((fav: any) => fav.id === item.id);

    return (
      <Card
        item={item}
        darkMode={darkMode}
        onPress={() => navigation.navigate('DetailView', { itemId: item.id, darkMode })}
        onToggleFavorite={() => toggleFavorite(item)}
        isFavorite={isFavorite}
      />
    );
  };

  return (
    <FlatList
      data={artworks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  );
};

export default ArtworkList;
