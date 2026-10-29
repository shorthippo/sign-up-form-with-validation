import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
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
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
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

  const router = useRouter();

  function onSubmit(data: SignupFormData) {
    console.log("Signed up:", data.firstName, data.lastName, data.email);
    router.push({
      pathname: "/confirmation",
      params: { firstName: data.firstName },
    });
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text>Create Account</Text>
      <Text>Please fill in the form to create an account</Text>

      <View>
        <Text>First Name</Text>
        <Controller
          control={control}
          name="firstName"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Enter your first name"
            />
          )}
        />
        {errors.firstName && <Text>{errors.firstName.message}</Text>}
      </View>

      <View>
        <Text>Last Name</Text>
        <Controller
          control={control}
          name="lastName"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Enter your last name"
            />
          )}
        />
        {errors.lastName && <Text>{errors.lastName.message}</Text>}
      </View>

      <View>
        <Text>Email</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Enter your email"
            />
          )}
        />
        {errors.email && <Text>{errors.email.message}</Text>}
      </View>

      <View>
        <Text>Password</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Enter new password"
              secureTextEntry
            />
          )}
        />
        {errors.password && <Text>{errors.password.message}</Text>}
      </View>

      <View>
        <Text>Confirm Password</Text>
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Confirm password"
              secureTextEntry
            />
          )}
        />
        {errors.confirmPassword && (
          <Text>{errors.confirmPassword.message}</Text>
        )}
      </View>

      <Pressable style={styles.button} onPress={() => handleSubmit(onSubmit)()}>
        <Text>Sign Up</Text>
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
  input: {
    borderWidth: 1,
    borderColor: "#000000",
  },
  button: {
    backgroundColor: "#489476",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
});
