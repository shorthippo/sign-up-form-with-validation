import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Alert,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
} from "react-native";
import { z } from "zod";

const signupSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, "First name required")
      .max(30, "Too many characters entered"),
    lastName: z
      .string()
      .trim()
      .min(2, "Last name required")
      .max(30, "Too many characters entered"),
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Please enter valid Email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupScreen() {
  const { control, handleSubmit, reset } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onSubmit",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit({ password, confirmPassword, ...safe }: SignupFormData) {
    console.log("onSubmit fired", safe);
    const msg = JSON.stringify(safe, null, 2);
    if (Platform.OS === "web") {
      window.alert(msg);
    } else {
      Alert.alert("Valid", msg);
    }

    reset();
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>
        Please fill in the form to create an account
      </Text>
      <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}> Sign Up</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
});
