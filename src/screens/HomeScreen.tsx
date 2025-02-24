import React, { useEffect, useState, useCallback } from "react";
import { View, Text } from "react-native";
import HomeScreenTemplate from "../components/templates/HomeScreenTemplate";
import Loading from "../components/molecules/Loading";
import { useArtwork } from "@hooks/useArtwork";
import { useFavorites } from "@hooks/useFavorites";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@navigation/routes";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const {
    artworks: filteredArtworks,
    categories,
    isLoading,
    error,
    page,
    setPage,
    searchArtworks,
    filterByCategory,
    refreshData,
  } = useArtwork();

  const { favorites, toggleFavorite } = useFavorites();

  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleCategoryPress = useCallback(
    (category: string) => {
      const newCategory = selectedCategory === category ? "" : category;
      setSelectedCategory(newCategory);
      filterByCategory(newCategory);
    },
    [selectedCategory, filterByCategory]
  );

  useEffect(() => {
    setIsTyping(true);
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setIsTyping(false);
    }, 500);

    return () => {
      clearTimeout(handler);
      setIsTyping(false);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm.length >= 3) {
      searchArtworks(debouncedSearchTerm);
      setSelectedCategory("");
      filterByCategory("");
    } else if (debouncedSearchTerm.length === 0) {
      searchArtworks("");
    }
  }, [debouncedSearchTerm, searchArtworks, filterByCategory]);

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <>
      <HomeScreenTemplate
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categories={categories}
        selectedCategory={selectedCategory}
        handleCategoryPress={handleCategoryPress}
        filteredArtworks={filteredArtworks}
        navigation={navigation}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        handlePageChange={setPage}
        page={page}
        refreshData={refreshData}
      />

      {(isLoading || isTyping) && <Loading />}
    </>
  );
}
