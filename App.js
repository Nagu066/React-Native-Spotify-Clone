import React from 'react'
import Router  from './src/router/index'
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { colors } from './src/constants/colors';

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}} >
      <StatusBar backgroundColor={colors.textBlack}></StatusBar>
      <Router />
    </GestureHandlerRootView>
  )
}