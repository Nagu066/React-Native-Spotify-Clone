import { View, Text, ToastAndroid, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';
import { webClientID } from '../services/firebase';
import { colors } from '../constants/colors';
import { useNavigation } from '@react-navigation/native';

export default function Login() {

    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [userInfo, setUserInfo] = useState('');

    GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
        webClientId: webClientID, // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
        profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
      });

    const signIn = async () => {
        setIsLoading(true);
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          if(userInfo.idToken){
            navigation.navigate('Home');
            setUserInfo(userInfo)
          }
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
            ToastAndroid.show('play services not available', ToastAndroid.SHORT);
          } else {
            // some other error happened
          }
        }
        finally {
            setIsLoading(false);
        }
      };

  return (
    <SafeAreaView style={{flex:1}}>
       <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:colors.textBlack}}> 
            <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={signIn}
                disabled={isLoading}
            />
        </View>
    </SafeAreaView>
  )
}