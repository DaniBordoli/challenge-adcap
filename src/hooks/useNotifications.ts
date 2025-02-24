import { useState, useEffect, useCallback } from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";

interface UseNotificationsReturn {
  expoPushToken: string;
  notificationPermission?: Notifications.PermissionStatus;
  registerForPushNotifications: () => Promise<string | null>;
  sendPushNotification: (
    token: string,
    title: string,
    body: string
  ) => Promise<void>;
}

export const useNotifications = (): UseNotificationsReturn => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notificationPermission, setNotificationPermission] =
    useState<Notifications.PermissionStatus>();

  const registerForPushNotifications = useCallback(async () => {
    if (!Device.isDevice) {
      console.warn("Push notifications solo funcionan en dispositivos físicos");
      return null;
    }

    try {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      setNotificationPermission(finalStatus);
      if (finalStatus !== "granted") return null;

      const projectId = Constants.expoConfig?.extra?.eas.projectId;
      if (!projectId) throw new Error("Project ID no encontrado");

      const token = (await Notifications.getExpoPushTokenAsync({ projectId }))
        .data;
      setExpoPushToken(token);
      return token;
    } catch (error) {
      console.error("Error registrando notificaciones:", error);
      return null;
    }
  }, []);

  const sendPushNotification = useCallback(
    async (title: string, body: string) => {
      try {
        await Notifications.scheduleNotificationAsync({
          content: {
            title,
            body,
            sound: "default",
            data: { timestamp: Date.now() },
          },
          trigger: null,
        });
      } catch (error) {
        console.error("Error enviando notificación:", error);
      }
    },
    []
  );

  useEffect(() => {
    registerForPushNotifications();
  }, [registerForPushNotifications]);

  return {
    expoPushToken,
    notificationPermission,
    registerForPushNotifications,
    sendPushNotification,
  };
};
