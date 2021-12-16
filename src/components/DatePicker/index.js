import React, { useState } from "react";
import { View, Text, Platform, TouchableOpacity, Touchable } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Container, Header } from './style'

export default function DatePicker({ date, onChange, onClose}) {
  const [dateNow, setDateNow] = useState(new Date(date));
  return (
    <Container>
        {Platform.OS === 'ios' && (
            <Header>
                <TouchableOpacity onPress={ onClose }>
                    <Text>Fechar</Text>
                </TouchableOpacity>
            </Header>
        )}
      <DateTimePicker
        value={dateNow}
        mode="date"
        display="default"
        onChange={(e, d) => {
          const currentDate = d || dateNow;
          setDateNow(currentDate);
          onChange(currentDate);
        }}
        style={{ backgroundColor: 'white'}}
      />
    </Container>
  );
}
