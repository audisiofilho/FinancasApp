import styled from "styled-components/native";

export const Container = styled.View`
  margin: 5px;
  padding: 10px;
  box-shadow: 2px 2px rgba(0, 0, 0, 0.4);
  background-color: rgba(0, 0, 0, 0.08);
  border-radius: 10px;
`;

export const Tipo = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const IconView = styled.View`
  flex-direction: row;
  background-color: ${(props) =>
    props.tipo === "despesa" ? "#c62c36" : "#049301"};
  padding-bottom: 3px;
  padding-top: 3px;
  padding-right: 8px;
  padding-left: 8px;
  border-radius: 7px;
`;

export const TipoText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-style: italic;
`;

export const ValorText = styled.Text`
  color: #222;
  font-size: 22px;
  font-weight: bold;
`;

export const DescTittle = styled.Text`
  color: #222;
  font-size: 22px;
  font-weight: bold;
`;

export const DescText = styled.Text`
  color: #222;
  font-size: 16px;
`;
