import React, { useState, useContext } from "react";
import { Platform, Keyboard, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../contexts/auth";
import { Fontisto } from "@expo/vector-icons";

import {
  Background,
  Container,
  Logo,
  AreaInput,
  Input,
  SubmitButton,
  SubmitPrivacity,
  SubmitText,
  SubmitTextPrivacity,
  Link,
  LinkText,
} from "./styles";

export default function SignIn() {
  const navigation = useNavigation();
  const { signIn, loadingAuth } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [security, setSecurity] = useState(true);

  function handleLogin() {
    signIn(email, password);
    Keyboard.dismiss();
  }

  function privacity() {
    security === true ? setSecurity(false) : setSecurity(true);
  }

  return (
    <Background>
      <Container behavior={Platform.OS === "ios" ? "padding" : ""} enabled>
      <Logo source={require("../../assets/coins2.png")} />

        <AreaInput>
          <Input
            placeholder="Email"
            autoCorret={false}
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </AreaInput>

        <AreaInput>
          <Input
            placeholder="Senha"
            autoCorret={false}
            autoCapitalize="none"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={security}
          />
        </AreaInput>

        <SubmitPrivacity onPress={privacity}>
          <SubmitTextPrivacity>Mostrar Senha </SubmitTextPrivacity>
          {security === true ? (
            <Fontisto name="checkbox-passive" size={20} color="#fff" />
          ) : (
            <Fontisto name="checkbox-active" size={20} color="#fff" />
          )}
        </SubmitPrivacity>

        <SubmitButton onPress={handleLogin}>
          {loadingAuth ? (
            <ActivityIndicator size={20} color="#000" />
          ) : (
            <SubmitText>Acessar</SubmitText>
          )}
        </SubmitButton>

        {/**<Link onPress={() => navigation.navigate("SignUp")}>
          <LinkText>Criar uma conta!</LinkText>
          </Link>**/}
      </Container>
    </Background>
  );
}
