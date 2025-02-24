import { StyleSheet } from "react-native";

const cardStyles = StyleSheet.create({
  card: {
    flexDirection: "column",
    margin: 10,
    paddingBottom: 30,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 1,
    width: "90%",
  },
  cardDark: {
    flexDirection: "column",
    margin: 10,
    paddingBottom: 30,
    borderRadius: 10,
    backgroundColor: "#3a3a3a",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 1,
    width: "90%",
  },
  cardContent: {
    alignItems: "flex-start",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  textContainer: {
    marginTop: 10,
    alignItems: "flex-start",
    marginLeft: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
  },
  titleDark: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    color: "#fff",
  },
  author: {
    fontSize: 14,
    color: "#666",
    textAlign: "left",
  },
  authorDark: {
    fontSize: 14,
    color: "#ccc",
    textAlign: "left",
  },
  cardFavoriteIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  saveButton: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    width: 80,
    backgroundColor: "#066068",
    borderRadius: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default cardStyles;
