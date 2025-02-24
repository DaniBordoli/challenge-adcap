import { StyleSheet } from 'react-native';

const categoryStyles = StyleSheet.create({
  categoryList: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  categoryItem: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  selectedCategoryItem: {
    backgroundColor: '#066068',
  },
  categoryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default categoryStyles;