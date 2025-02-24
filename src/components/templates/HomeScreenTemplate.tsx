import React, { FC, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import ArtworkList from "../organisms/ArtworkList";
import styles from "../../styles/HomeScreenStyles";
import categoryStyles from "../../styles/CategoryFilterStyles";
import { Artwork } from "../../types/artwork";
import SearchBar from "../atoms/SearchBar";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, SCREENS } from "@navigation/routes";

interface HomeTemplateProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  categories: string[];
  selectedCategory: string;
  handleCategoryPress: (category: string) => void;
  filteredArtworks: Artwork[];
  favorites: Artwork[];
  toggleFavorite: (item: Artwork) => void;
  handlePageChange: (pageNumber: number) => void;
  page: number;
  navigation: NativeStackNavigationProp<RootStackParamList>;
  refreshData: () => Promise<void>;
}

const HomeTemplate: FC<HomeTemplateProps> = ({
  darkMode,
  setDarkMode,
  searchTerm,
  setSearchTerm,
  categories,
  selectedCategory,
  handleCategoryPress,
  filteredArtworks,
  navigation,
  favorites,
  toggleFavorite,
  handlePageChange,
  page,
}) => {
  const renderCategoryItem = useCallback(
    ({ item }: { item: string }) => (
      <TouchableOpacity
        style={[
          categoryStyles.categoryItem,
          selectedCategory === item && categoryStyles.selectedCategoryItem,
        ]}
        onPress={() => handleCategoryPress(item)}
      >
        <Text style={categoryStyles.categoryText}>{item}</Text>
      </TouchableOpacity>
    ),
    [selectedCategory, handleCategoryPress]
  );

  const renderPagination = useCallback(() => {
    const pages = Array.from({ length: 5 }, (_, i) => i + 1);

    return (
      <View
        style={{ flexDirection: "row", justifyContent: "center", margin: 20 }}
      >
        {pages.map((pageNumber) => (
          <TouchableOpacity
            key={pageNumber}
            onPress={() => handlePageChange(pageNumber)}
            style={{
              padding: 10,
              margin: 5,
              backgroundColor: pageNumber === page ? "#066068" : "#ccc",
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              {pageNumber}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }, [page, handlePageChange]);

  return (
    <ScrollView>
      <View style={darkMode ? styles.containerDark : styles.container}>
        <Text style={darkMode ? styles.headerDark : styles.header}>
          Artworks
        </Text>
        <SearchBar
          darkMode={darkMode}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <FlatList
          data={categories}
          horizontal
          keyExtractor={(item) => item}
          renderItem={renderCategoryItem}
          style={categoryStyles.categoryList}
          initialNumToRender={5}
          windowSize={10}
        />
        <TouchableOpacity
          style={styles.favoriteIcon}
          onPress={() =>
            navigation.navigate(SCREENS.FAVORITES, {
              favorites,
              darkMode,
            })
          }
        >
          <Icon name="heart" size={30} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toggleModeButton}
          onPress={() => setDarkMode(!darkMode)}
        >
          <Icon
            name={darkMode ? "sun-o" : "moon-o"}
            size={24}
            color={darkMode ? "#fff" : "#000"}
          />
        </TouchableOpacity>
        <ArtworkList
          artworks={filteredArtworks}
          darkMode={darkMode}
          navigation={navigation}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
        {renderPagination()}
      </View>
    </ScrollView>
  );
};

export default React.memo(HomeTemplate);
