import React, { FC } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Button from "@components/atoms/Button";
import styles from "../../styles/CardStyles";
import { Artwork } from "../../types/artwork";

interface CardProps {
  item: Artwork;
  darkMode: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
  isFavorite: boolean;
}

const Card: FC<CardProps> = ({
  item,
  darkMode,
  onPress,
  onToggleFavorite,
  isFavorite,
}) => {
  const imageUri = item.image_id
    ? `https://www.artic.edu/iiif/2/${item.image_id}/full/200,/0/default.jpg`
    : "https://placehold.co/200x200/png?text=No+Image";

  return (
    <View style={darkMode ? styles.cardDark : styles.card}>
      <TouchableOpacity style={styles.cardContent} onPress={onPress}>
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          defaultSource={{
            uri: "https://placehold.co/200x200/png?text=Loading...",
          }}
        />
        <View style={styles.textContainer}>
          <Text
            style={darkMode ? styles.titleDark : styles.title}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {item.title || "Untitled"}
          </Text>
          {item.artist_title && (
            <Text
              style={darkMode ? styles.authorDark : styles.author}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.artist_title}
            </Text>
          )}
          <Button
            onPress={onToggleFavorite}
            title={isFavorite ? "Saved" : "Save"}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(Card);
