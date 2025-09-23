import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";


const ArtemisLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Lógica de login
    console.log("Email:", email);
    console.log("Senha:", password);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.header}>
              <Text style={styles.title}>Login</Text>
              <TouchableOpacity style={styles.closeButton}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.welcomeText}>Bem-vindo à Artemis Pizzaria</Text>
            <Image
              source={require("./assets/wave.png")}
              style={styles.waveImage}
              resizeMode="contain"
            />
            <View style={styles.inputSection}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#A5A5A5"
                value={email}
                onChangeText={setEmail}
              />
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Senha"
                  placeholderTextColor="#A5A5A5"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity style={styles.forgotPassword}>
                  <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Log In</Text>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>ou</Text>
              <View style={styles.divider} />
            </View>

            <TouchableOpacity style={styles.googleButton}>
              <Image
                source={require("./assets/google-logo.png")}
                style={styles.googleIcon}
              />
              <Text style={styles.googleButtonText}>Continuar com Google</Text>
            </TouchableOpacity>

            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Não tem uma conta? </Text>
              <TouchableOpacity>
                <Text style={styles.signUpLink}>Cadastre-se</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "transparent",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    backgroundColor: "#F9F6F1",
    borderRadius: 20,
    overflow: "hidden",
  },
  scrollContent: {
    padding: 20,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#1A1F3F",
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 24,
    color: "#1A1F3F",
    fontWeight: "bold",
  },
  welcomeText: {
    fontSize: 16,
    color: "#1A1F3F",
    marginBottom: 10,
  },
  waveImage: {
    width: "100%",
    height: 38,
    marginBottom: 20,
  },
  inputSection: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: "#FFF",
    borderColor: "#A5A5A5",
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 20,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  passwordContainer: {
    position: "relative",
  },
  forgotPassword: {
    position: "absolute",
    right: 10,
    bottom: 25,
  },
  forgotPasswordText: {
    color: "#1A1F3F",
    fontSize: 13,
    fontWeight: "bold",
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#9A1105",
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#000000",
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderColor: "#10191F",
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 12,
    marginBottom: 20,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleButtonText: {
    color: "#10191F",
    fontSize: 16,
    fontWeight: "bold",
  },
  signUpContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  signUpText: {
    fontSize: 14,
    color: "#1A1F3F",
  },
  signUpLink: {
    fontSize: 14,
    color: "#1A1F3F",
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#1A1F3F",
  },
});

export default ArtemisLogin;