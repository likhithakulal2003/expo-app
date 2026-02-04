import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appName}>My App</Text>
        <Text style={styles.userName}>Hello,Likhitha 👋</Text>
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
          onPress={() => router.replace("/login")}
        >
          <Text style={[styles.cardText, { color: "red" }]}>Logout</Text>
        </TouchableOpacity>
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
