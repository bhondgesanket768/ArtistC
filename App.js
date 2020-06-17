import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import myTheme from "./app/navigation/NavigationTheme"
import AppNavigator from './app/navigation/AppNavigator';
import OffLine from './app/components/offLine';
import AuthNavigator from './app/navigation/AuthNavigator';
import AuthContext from './app/auth/context';
import authToken from "./app/auth/storage"
import JwtDecode from "jwt-decode"

export default function App() {

  const [user, setUser] = useState()

  const restoreToken = async () => {
    const result = await authToken.getToken()
    if (!result) return;
    const user = JwtDecode(result)
    setUser(user)
  }

  useEffect(() => {
    restoreToken()
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <OffLine />
      <NavigationContainer theme={myTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  )
}


