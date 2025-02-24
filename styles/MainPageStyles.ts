import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f4',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  containerDark: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
  headerDark: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#000',
  },
  searchInputDark: {
    flex: 1,
    height: 40,
    color: '#000',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  toggleModeButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
    backgroundColor: '#10BFF',
    borderRadius: 5,
  },
  toggleModeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default styles;