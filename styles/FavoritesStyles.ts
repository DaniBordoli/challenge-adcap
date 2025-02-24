import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    marginBottom: 20,
    color: '#000',
  },
  headerDark: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  card: {
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '90%',
    padding: 10,
    borderRadius: 10,
  },
  cardDark: {
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#333', 
    width: '90%',
    padding: 10,
    borderRadius: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  titleDark: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  noFavorites: {
    color: '#000',
  },
  noFavoritesDark: {
    color: '#fff',
  },
});

export default styles;