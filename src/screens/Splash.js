import { View, Text, SafeAreaView, StyleSheet, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { colors } from '../constants/colors'
import LinearGradient from 'react-native-linear-gradient';
import GradientText from '../components/GradientText';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

export default function Splash() {

  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      getCurrentUser();
    }, 3000)
  },[]);

  const getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    if (currentUser && Object.keys(currentUser).length > 0) {
        console.log("Logged in");
        // User is already logged in
        navigation.replace('Home')
    } else {
        console.log("Not Logged In")
        navigation.navigate('Login');
        // No user logged in
    }
  };


  return (
    <SafeAreaView style={{ flex: 1}}>
        <StatusBar
          barStyle={'default'}
          backgroundColor={colors.textBlack}
        />
        <View style={{  flex: 1, justifyContent:'center', alignItems:'center', backgroundColor:colors.textBlack}}>
          <GradientText style={styles.text}>Music Player</GradientText>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 2,
    fontSize: 30,
    overflow:'visible'
  },
});