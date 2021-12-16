import React, { useState, useContext } from "react";
import { SafeAreaView, Keyboard, TouchableWithoutFeedback, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { format } from 'date-fns';
import firebase from "../../services/firebaseConnection";

import Header from "../../components/Header";
import { Background, Input, SubmitButton, SubmitText } from "./styles";
import Picker from "../../components/Picker";
import { AuthContext } from "../../contexts/auth";

export default function New() {
  const [valor, setValor] = useState("");
  const [desc, setDesc] = useState("");
  const [tipo, setTipo] = useState("receita");

  const navigation = useNavigation();
  const { user: usuario } = useContext(AuthContext);

  function handleSubmit(){
    Keyboard.dismiss();
    if(isNaN(parseFloat(valor)) || tipo === null){
      alert('Preencha todos os campos!');
      return;
    }

    Alert.alert(
      'Confirmando dados',
      `Tipo ${tipo} - Valor: ${parseFloat(valor)} - Descrição: ${desc}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Continuar',
          onPress: () => handleAdd()
        }
      ]
    )

  }

  async function handleAdd(){
    let uid = usuario.uid;
    
    let key = await firebase.database().ref('historico').child(uid).push().key;
    await firebase.database().ref('historico').child(uid).child(key).set({
      tipo: tipo,
      desc: desc,
      valor: parseFloat(valor),
      date: format(new Date(), 'dd/MM/yyyy')
    })
    //Atualizar o saldo
    let user = firebase.database().ref('users').child(uid);
    await user.once('value').then((snapshot)=>{
      let saldo = parseFloat(snapshot.val().saldo);

      tipo === 'despesa' ? saldo -= parseFloat(valor) : saldo += parseFloat(valor);

      user.child('saldo').set(saldo);
    });
    Keyboard.dismiss();
    setValor('');
    setDesc('');
    navigation.navigate('Página Inicial');
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Background>
        <Header />

        <SafeAreaView style={{ alignItems: "center" }}>
          <Input
            placeholder="Valor desejado..."
            keyboardType="numeric"
            returnKeyType="next"
            onSubmitEditing={() => Keyboard.dismiss()}
            value={valor}
            onChangeText={(text) => setValor(text)}
          />

          <Input 
            placeholder="Adicione uma descrição..."
            returnKeyType="next"
            onSubmitEditing={() => Keyboard.dismiss()}
            value={desc}
            onChangeText={(text) => setDesc(text)}
          />

          <Picker onChange={setTipo} tipo={tipo} />

          <SubmitButton onPress={handleSubmit}>
            <SubmitText>Registrar</SubmitText>
          </SubmitButton>
        </SafeAreaView>
      </Background>
    </TouchableWithoutFeedback>
  );
}
