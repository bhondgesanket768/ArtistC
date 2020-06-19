import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import myTheme from "./app/navigation/NavigationTheme"
import AppNavigator from './app/navigation/AppNavigator';
import OffLine from './app/components/offLine';
import AuthNavigator from './app/navigation/AuthNavigator';
import AuthContext from './app/auth/context';
import authToken from "./app/auth/storage"
import { AppLoading } from "expo"
import { navigationRef } from "./app/navigation/RootNavigation"

export default function App() {

  const [user, setUser] = useState()
  const [ready, setReady] = useState(false)

  const restoreUser = async () => {
    const user = await authToken.getUser()
    if (user) setUser(user)
  }

  if (!ready) {
    return <AppLoading startAsync={restoreUser} onFinish={() => setReady(true)} />
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <OffLine />
      <NavigationContainer ref={navigationRef} theme={myTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  )
}


