import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ArtworkList from '../organisms/ArtworkList';
import styles from '../../styles/MainPageStyles';
import categoryStyles from '../../styles/CategoryFilterStyles';
import TextInput from '../atoms/TextInput';
import { NavigationProps } from '../../types/navigation';
import { Artwork } from '../../types/artwork';

const MainPageTemplate = ({
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
}: NavigationProps & {
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
}) => {
  const renderCategoryItem = ({ item }: any) => (
    <TouchableOpacity
      style={[categoryStyles.categoryItem, selectedCategory === item && categoryStyles.selectedCategoryItem]}
      onPress={() => handleCategoryPress(item)}
    >
      <Text style={categoryStyles.categoryText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderPagination = () => {
    if (filteredArtworks.length === 0) {
      return null;
    }

    const pages = Array.from({ length: 5 }, (_, i) => i + 1);

    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', margin: 20 }}>
        {pages.map((pageNumber) => (
          <TouchableOpacity
            key={pageNumber}
            onPress={() => handlePageChange(pageNumber)}
            style={{
              padding: 10,
              margin: 5,
              backgroundColor: pageNumber === page ? '#066068' : '#ccc',
              borderRadius: 5,
            }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>{pageNumber}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={darkMode ? styles.containerDark : styles.container}>
        <Text style={darkMode ? styles.headerDark : styles.header}>Artworks</Text>
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color={darkMode ? "#000" : "#000"} style={styles.searchIcon} />
          <TextInput
            style={darkMode ? styles.searchInputDark : styles.searchInput}
            placeholder="Search artworks..."
            placeholderTextColor={darkMode ? "#000" : "#000"}
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>
        <FlatList
          data={categories}
          horizontal
          keyExtractor={(item) => item}
          renderItem={renderCategoryItem}
          style={categoryStyles.categoryList}
        />
        <TouchableOpacity
          style={styles.favoriteIcon}
          onPress={() => navigation.navigate('Favorites', { favorites, darkMode })}
        >
          <Icon name="heart" size={30} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toggleModeButton}
          onPress={() => setDarkMode(!darkMode)}
        >
          <Icon name={darkMode ? "sun-o" : "moon-o"} size={24} color={darkMode ? "#fff" : "#000"} />
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

export default MainPageTemplate;
