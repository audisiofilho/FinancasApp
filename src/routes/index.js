import React, { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { View, ActivityIndicator } from "react-native";

import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";

function Routes() {
  const { signed, loading } = useContext(AuthContext);

  if(loading){
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#131313"}}>
        <ActivityIndicator size="large" color="#ffd700"/>
      </View>
    )
  }

  return (
      signed ? <AppRoutes /> : <AuthRoutes />
  );  
}

export default Routes;
