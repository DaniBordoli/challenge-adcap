import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
    paddingHorizontal: 15,
    backgroundColor: '#ff8f8',
  },
  containerDark: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
    paddingHorizontal: 15,
    backgroundColor: '#333',
    height: '100%'
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    marginTop: 20,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  titleDark: {
    marginTop: 20,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  detailText: {
    marginTop: 10,
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
  },
  detailTextDark: {
    marginTop: 10,
    fontSize: 18,
    color: '#ccc',
    textAlign: 'center',
  },
  description: {
    marginTop: 20,
    paddingHorizontal: 15,
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
  descriptionDark: {
    marginTop: 20,
    paddingHorizontal: 15,
    textAlign: 'center',
    fontSize: 16,
    color: '#aaa',
  },
  favoriteButton: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
    elevation: 3,
  },
});

export default styles;