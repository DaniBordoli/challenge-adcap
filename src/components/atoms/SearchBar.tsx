import React, { FC } from "react";
import { View, TextInput as RNTextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "@styles/HomeScreenStyles";

interface SearchBarProps {
  darkMode: boolean;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({
  darkMode,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <View style={styles.searchContainer}>
      <Icon
        name="search"
        size={20}
        color={darkMode ? "#fff" : "#000"}
        style={styles.searchIcon}
      />
      <RNTextInput
        style={darkMode ? styles.searchInputDark : styles.searchInput}
        placeholder="Search artworks..."
        placeholderTextColor={darkMode ? "#fff" : "#666"}
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      {searchTerm.length > 0 && (
        <TouchableOpacity onPress={() => setSearchTerm("")}>
          <Icon
            name="times-circle"
            size={20}
            color={darkMode ? "#fff" : "#666"}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default React.memo(SearchBar);
