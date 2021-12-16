import React from "react";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import {
  Container,
  Tipo,
  IconView,
  TipoText,
  ValorText,
  DescTittle,
  DescText,
} from "./style";

export default function HistoricoList({ data, deleteItem }) {
  return (
    <Container>
      <Tipo>
        <IconView tipo={data.tipo}>
          <Feather
            name={data.tipo === "despesa" ? "arrow-down" : "arrow-up"}
            color="#fff"
            size={20}
          />
          <TipoText>{data.tipo}</TipoText>
        </IconView>
        <TouchableOpacity onPress={() => deleteItem(data)}>
          <Feather name="x-circle" color="red" size={30} />
        </TouchableOpacity>
      </Tipo>
      <ValorText>R$ {data.valor}</ValorText>
      {data.desc !== "" && (
        <>
          <DescTittle>Descrição:</DescTittle>
          <DescText>{data.desc}</DescText>
        </>
      )}
    </Container>
  );
}
