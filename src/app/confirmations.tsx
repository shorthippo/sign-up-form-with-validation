import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function ConfirmationScreen() {
  const { firstName } = useLocalSearchParams();
  return (
    <View>
      <Text>Account created for {firstName}!</Text>
    </View>
  );
}
