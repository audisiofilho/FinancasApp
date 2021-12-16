import styled from "styled-components/native";

export const Background = styled.View`
    flex: 1;
    background-color: #131313;
`;

export const Container = styled.View`
    margin-left: 15px;
    margin-bottom: 25px;
`;

export const Area = styled.View`
    flex-direction: row;
    margin-left: 15px;
    align-items: baseline;
`;

export const Nome = styled.Text`
    font-size: 19px;
    color: #fff;
    font-style: italic;
`;

export const Saldo = styled.Text`
    margin-top: 5px;
    font-size: 30px;
    color: #FFF;
    font-weight: bold;
`;

export const Saldo2 = styled.Text`
    margin-top: 5px;
    font-size: 30px;
    color: #c62c36;
    font-weight: bold;
`;

export const ContainerAlert = styled.View`
    width: 300px;
    height: 70px;
    margin-top: -25px;
    border-radius: 15px;
    margin-left: 10px;
    flex-direction: row;
    justify-content: center;
    align-items: center;

`;

export const AlertText = styled.Text`
    font-size: 11px;
    margin-left: 5px;
    color: #c62c36
`;

export const Tittle = styled.Text`
    margin-left: 5px;
    color: #ffd700;
    margin-bottom: 10px;
`;

export const List = styled.FlatList.attrs({
    marginHorinzontal: 15
})`
    padding-top: 15px;
    background-color: #fff;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    margin-left: 8px;
    margin-right: 8px;
`;
