import axios from "axios";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function apiIntegration() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);

  const getRandomUser = async () => {
    try {
      const response = await axios.get("https://randomuser.me/api/");
      setUser(response.data.results[0]);
    } catch (error) {
      console.log("Random User API Error:", error);
    }
  };

  useEffect(() => {
    getRandomUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>API Integration</Text>

      <Text style={styles.subHeading}>Random User API</Text>
      {user ? (
        <>
          <Text>
            Name: {user.name.first} {user.name.last}
          </Text>
          <Text>Email: {user.email}</Text>
          <Text>Country: {user.location.country}</Text>
        </>
      ) : (
        <Text>Loading user...</Text>
      )}

      {/* 🔹 Button 1 */}
      <View style={styles.buttonWrapper}>
        <Button title="Refresh APIs" onPress={getRandomUser} />
      </View>

      {/* 🔹 Button 2 */}
      <View style={styles.buttonWrapper}>
        <Button title="Back to Home" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
  },
  buttonWrapper: {
    marginTop: 12, // ✅ spacing between buttons
  },
});
