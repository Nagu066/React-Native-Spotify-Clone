import React from 'react'
import Router  from './src/router/index'
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Router />
    </GestureHandlerRootView>
  )
}