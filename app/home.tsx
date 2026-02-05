import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Button,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const router = useRouter();

  // STATE to store push token
  const [expoPushToken, setExpoPushToken] = useState<string>("");

  // Register for notifications
  const registerForPushNotificationsAsync = async () => {
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
      });
    }

    if (!Device.isDevice) {
      alert("Must use physical device for push notifications");
      return;
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Permission not granted");
      return;
    }

    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;

    const token = (await Notifications.getExpoPushTokenAsync({ projectId }))
      .data;

    console.log("Expo Push Token:", token);
    setExpoPushToken(token);
  };

  // Call permission ONCE when Home loads
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  // Send push notification
  const sendPushNotification = async () => {
    if (!expoPushToken) {
      alert("Push token not available yet");
      return;
    }

    const message = {
      to: expoPushToken,
      sound: "default",
      title: "Hello 👋",
      body: "Push notification working!",
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appName}>My App</Text>
        <Text style={styles.userName}>Hello, Likhitha 👋</Text>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/profile")}
        >
          <Text style={styles.cardText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => alert("Settings")}>
          <Text style={styles.cardText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => alert("About")}>
          <Text style={styles.cardText}>About</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/randomuser")}
        >
          <Text style={styles.cardText}>Random User</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/meme")}
        >
          <Text style={styles.cardText}>Meme Generator</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.replace("/login")}
        >
          <Text style={[styles.cardText, { color: "red" }]}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={{ padding: 20 }}>
        <Button title="Send Push Notification" onPress={sendPushNotification} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 20,
    backgroundColor: "#4f46e5",
  },
  appName: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  userName: {
    color: "#fff",
    fontSize: 16,
    marginTop: 5,
  },
  menuContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  cardText: {
    fontSize: 18,
  },
});
