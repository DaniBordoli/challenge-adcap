import React, { useEffect, useCallback } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from "@navigation/StackNavigator";
import * as Notifications from "expo-notifications";

const App: React.FC = () => {
  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
  }, []);

  const MemoizedStackNavigator = useCallback(() => <StackNavigator />, []);

  return (
    <NavigationContainer>
      <MemoizedStackNavigator />
    </NavigationContainer>
  );
};

export default App;
