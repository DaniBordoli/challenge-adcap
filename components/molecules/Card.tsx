import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Button from '../atoms/Button';
import styles from '../../styles/CardStyles'
import { Artwork } from '../../types/artwork';

const Card = ({
  item,
  darkMode,
  onPress,
  onToggleFavorite,
  isFavorite,
}: {
  item: Artwork;
  darkMode: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
  isFavorite: boolean;
}) => (
  <View style={darkMode ? styles.cardDark : styles.card}>
    <TouchableOpacity style={styles.cardContent} onPress={onPress}>
      <Image
        source={{ uri: `https://www.artic.edu/iiif/2/${item.image_id}/full/200,/0/default.jpg` }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={darkMode ? styles.titleDark : styles.title} numberOfLines={3} ellipsizeMode="tail">{item.title}</Text>
        {item.artist_title && (
          <Text style={darkMode ? styles.authorDark : styles.author} numberOfLines={1} ellipsizeMode="tail">{item.artist_title}</Text>
        )}
        <Button onPress={onToggleFavorite} title={isFavorite ? 'Saved' : 'Save'} />
      </View>
    </TouchableOpacity>
  </View>
);

export default Card;
