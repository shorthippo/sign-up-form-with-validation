import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function ConfirmationScreen() {
  const { firstName } = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <Text style={styles.message}>Account created for {firstName}!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    backgroundColor: "#def5ec",
  },

  message: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Times New Roman",
    color: "#266148",
  },
});
