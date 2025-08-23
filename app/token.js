import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

export default function usePushToken() {
  const [expoPushToken, setExpoPushToken] = useState("");

  useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      try {
        if (Device.isDevice) {
          const { status: existingStatus } =
            await Notifications.getPermissionsAsync();
          // console.log("Existing permission status:", existingStatus);

          let finalStatus = existingStatus;

          if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
            // console.log("Requested permission status:", finalStatus);
          }

          if (finalStatus !== "granted") {
            alert("Push notification permissions not granted.");
            return;
          }

          const token = await Notifications.getExpoPushTokenAsync();
          // console.log("Expo Push Token:", token?.data || "No token received");
          setExpoPushToken(token?.data);
        } else {
          alert("You must use a real device for push notifications");
        }
      } catch (err) {
        console.error("Error getting push token:", err);
      }
    };

    registerForPushNotificationsAsync();
  }, []);
  

  return expoPushToken;
}
