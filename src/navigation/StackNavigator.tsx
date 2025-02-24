import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { SCREENS, RootStackParamList } from "./routes";
import {
  HomeScreen,
  ArtworkDetailScreen,
  FavoritesScreen,
} from "@screens/index";

const Stack = createStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        gestureEnabled: true,
        gestureDirection: "horizontal",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        cardStyle: {
          backgroundColor: route.params?.darkMode ? "#333" : "#f0f4f4",
        },
        headerStyle: {
          backgroundColor: route.params?.darkMode ? "#1a1a1a" : "#ffffff",
        },
        headerTintColor: route.params?.darkMode ? "#fff" : "#000",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
      })}
    >
      <Stack.Screen
        name={SCREENS.HOME}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SCREENS.ARTWORK_DETAIL}
        component={ArtworkDetailScreen}
        options={({ route }) => ({
          title: "Detalle de obra",
          headerBackTitleVisible: false,
        })}
      />
      <Stack.Screen
        name={SCREENS.FAVORITES}
        component={FavoritesScreen}
        options={({ route }) => ({
          title: "Tus Favoritos",
          headerBackTitleVisible: false,
          cardStyle: {
            backgroundColor: route.params.darkMode ? "#333" : "#f0f4f4",
          },
        })}
      />
    </Stack.Navigator>
  );
};
