import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons"

import WelcomeScreen from './app/screens/WelcomeScreen';
import ViewImageScreen from './app/screens/ViewImageScreen';

import AppText from "./app/components/AppText";
import AppButton from './app/components/AppButton';
import Card from "./app/components/Card";
import Screen from "./app/components/Screen"
import Icon from "./app/components/Icon"
import ListingDetailsScreen from './app/screens/ListingDetailsScreen';
import MessagesScreen from './app/screens/MessagesScreen';
import MyAccountScreen from './app/screens/MyAccountScreen';
import ListingsScreen from './app/screens/ListingsScreen';
import AppTextInput from './app/components/AppTextInput';
import AppPicker from './app/components/AppPicker';
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import ListingEditScreen from './app/screens/ListingEditScreen';

const categories = [
  {
    value: 1,
    label: "Sketches"
  },
  {
    value: 2,
    label: "Paintings"
  },
  {
    value: 3,
    label: "Other Art work"
  },
]

export default function App() {

  const [category, setCategory] = useState(categories[0])

  return (
    /*<WelcomeScreen />*/
    /*<ListingDetailsScreen />*/
    /*<ViewImageScreen />*/
    /*<MessagesScreen />*/
    /*<MyAccountScreen />*/
    /*<ListingsScreen />*/
    /*
        <Screen>
          <AppPicker placeholder="Category" icon="apps" items={categories} selected={category} onSelectItem={(item) => setCategory(item)} />
          <AppTextInput placeholder="email" icon="email" />
        </Screen>
    */
    /*<LoginScreen />*/
    /*<RegisterScreen />*/
    <ListingEditScreen />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})

