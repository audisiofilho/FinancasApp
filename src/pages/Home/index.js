import React, { useState, useContext, useEffect } from "react";
import { Alert, Platform, TouchableOpacity } from "react-native";
import firebase from "../../services/firebaseConnection";
import { format, isBefore } from "date-fns";
import { MaterialIcons, Feather } from "@expo/vector-icons";

import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";
import HistoricoList from "../../components/HistoricoList";
import DatePicker from "../../components/DatePicker";

import * as Notification from "expo-notifications";
import * as Permissions from "expo-permissions";

import {
  Background,
  Container,
  Nome,
  Saldo,
  Tittle,
  List,
  Area,
  Saldo2,
  ContainerAlert,
  AlertText,
} from "./styles";

export default function Home() {
  const [saldo, setSaldo] = useState(0);
  const [historico, setHistorico] = useState([]);

  const { user } = useContext(AuthContext);
  const uid = user && user.uid;

  const [newDate, setNewDate] = useState(new Date());
  const [show, setShow] = useState(false);

  useEffect(() => {
    async function loadList() {
      await firebase
        .database()
        .ref("users")
        .child(uid)
        .on("value", (snapshot) => {
          setSaldo(snapshot.val().saldo);
        });

      await firebase
        .database()
        .ref("historico")
        .child(uid)
        .orderByChild("date")
        .limitToLast(25)
        .equalTo(format(newDate, "dd/MM/yyyy"))
        .on("value", (snapshot) => {
          setHistorico([]);

          snapshot.forEach((childItem) => {
            let list = {
              key: childItem.key,
              tipo: childItem.val().tipo,
              valor: childItem.val().valor,
              desc: childItem.val().desc,
              date: childItem.val().date,
            };

            setHistorico((oldArray) => [...oldArray, list]);
          });
        });
    }

    loadList();
  }, [newDate]);

  function handleDelete(data) {
    //Pegando data do item:
    const [diaItem, mesItem, anoItem] = data.date.split("/");
    const dateItem = new Date(`${anoItem}/${mesItem}/${diaItem}`);

    //Pegando data de hoje:
    const formatDiaHoje = format(new Date(), "dd/MM/yyyy");
    const [diaHoje, mesHoje, anoHoje] = formatDiaHoje.split("/");
    const dateHoje = new Date(`${anoHoje}/${mesHoje}/${diaHoje}`);

    if (isBefore(dateItem, dateHoje)) {
      //Se a data passou ira fazer esse movimento
      alert("Você não pode excluir um registro antigo!");
      return;
    }

    Alert.alert(
      "Atenção!",
      `Você deseja excluir ${data.tipo} - Valor: ${data.valor}`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Deletar!",
          onPress: () => handleDeleteSuccess(data),
        },
      ]
    );
  }

  async function handleDeleteSuccess(data) {
    await firebase
      .database()
      .ref("historico")
      .child(uid)
      .child(data.key)
      .remove()
      .then(async () => {
        let saldoAtual = saldo;
        data.tipo === "despesa"
          ? (saldoAtual += parseFloat(data.valor))
          : (saldoAtual -= parseFloat(data.valor));

        await firebase
          .database()
          .ref("users")
          .child(uid)
          .child("saldo")
          .set(saldoAtual);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleShowPicker() {
    setShow(true);
  }

  function handleClose() {
    setShow(false);
  }

  return (
    <Background>
      <Header />
      <Container>
        {saldo < "0" && (
          <ContainerAlert>
            <Feather name="alert-circle" color="#c62c36" size={25} />
            <AlertText>
              ATENÇÃO! VOCÊ ESTÁ COM SALDO NEGATIVO NA CONTA!
            </AlertText>
          </ContainerAlert>
        )}
        <Nome>{user && user.nome}</Nome>

        {saldo >= "0" ? (
          <Saldo>
            R$ {saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
          </Saldo>
        ) : (
          <Saldo2>
            R$ {saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
          </Saldo2>
        )}
      </Container>

      <Area>
        <TouchableOpacity onPress={handleShowPicker}>
          <MaterialIcons name="event" color="#fff" size={30} />
        </TouchableOpacity>
        <Tittle>Ultimas movimentações</Tittle>
      </Area>

      <List
        showsVerticalScrollIndicator={false}
        data={historico}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <HistoricoList data={item} deleteItem={handleDelete} />
        )}
      />

      {show && (
        <DatePicker
          onClose={handleClose}
          date={newDate}
          onChange={(date) => {
            setShow(Platform.OS === "ios");
            setNewDate(date);
            console.log(date);
          }}
        />
      )}
    </Background>
  );
}
