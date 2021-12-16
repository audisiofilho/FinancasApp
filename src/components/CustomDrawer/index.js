import React, { useContext } from "react";
import { View, Text, Image } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from "@react-navigation/drawer";

import { AuthContext } from '../../contexts/auth'

export default function CustomDrawer(props) {
    const { user, signOut} = useContext(AuthContext)
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 25,
        }}
      >
        <Image
          source={require("../../assets/account.png")}
          style={{ width: 50, height: 50 }}
          resizeMode="contain"
        />
        <Text style={{ color: "#fff", fontSize: 18, marginTop: 5 }}>
          Bem-vindo
        </Text>

        <Text style={{ color: "#fff", fontSize: 17, fontWeight: 'bold', paddingBottom: 25 }}>
          {user && user.nome}
        </Text>
      </View>

      <DrawerItemList {...props} 
        activeTintColor="#171717"
      />

      <DrawerItem
        {...props}
        label="SAIR"
        inactiveBackgroundColor="#c62c36"
        onPress={ () => signOut() }
      />
      <Text style={{ color: '#fff', textAlign: 'center', marginTop: "75%", fontSize: 13}}>Finanças App v1.0.1 - BETA</Text>
    </DrawerContentScrollView>
  );
}
