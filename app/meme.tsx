import axios from "axios";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Button,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function Meme() {
  const router = useRouter();
  const [meme, setMeme] = useState<any>(null);

  const getMeme = async () => {
    try {
      const response = await axios.get("https://api.imgflip.com/get_memes");
      const memes = response.data.data.memes;
      const randomMeme = memes[Math.floor(Math.random() * memes.length)];
      setMeme(randomMeme);
    } catch (error) {
      console.log("Meme API Error:", error);
    }
  };

  useEffect(() => {
    getMeme();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Meme Generator API</Text>

      {meme ? (
        <>
          <Text style={{ marginBottom: 10 }}>{meme.name}</Text>
          <Image
            source={{ uri: meme.url }}
            style={{ width: 300, height: 300 }}
            resizeMode="contain"
          />
        </>
      ) : (
        <Text>Loading meme...</Text>
      )}

      {/* 🔹 Button 1 */}
      <View style={styles.buttonWrapper}>
        <Button title="Generate Meme" onPress={getMeme} />
      </View>

      {/* 🔹 Button 2 */}
      <View style={styles.buttonWrapper}>
        <Button title="Back to Home" onPress={() => router.back()} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  buttonWrapper: {
    marginTop: 12,
  },
});
