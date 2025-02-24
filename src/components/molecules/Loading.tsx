import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import type { LoadingProps } from "../../types/ui";

const Loading: React.FC<LoadingProps> = ({
  color = "#066068",
  size = "large",
  overlay = true,
}) => (
  <View style={[styles.container, overlay && styles.overlay]}>
    <ActivityIndicator size={size} color={color} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    zIndex: 999,
  },
});

export default Loading;
