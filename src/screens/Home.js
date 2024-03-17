import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import { colors } from '../constants/colors'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import GradientText from '../components/GradientText';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Home() {

  const navigation = useNavigation();
  const [user, setUser] = React.useState('')

  useEffect(()=>{
    getCurrentUser();
  },[])

  const getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    console.log('current user', currentUser);
    setUser(currentUser);
  };

  return user && (
    <SafeAreaView style={{flex:1, backgroundColor:colors.textBlack}}>
        <View style={styles.header}>
          <TouchableOpacity onPress={()=>navigation.navigate('AudioPlayer')}>
            <Image
              onMagicTap={()=>navigation.navigate('AudioPlayer')}
              source={{uri:user?.user?.photo}}
              resizeMode={'cover'}
              height={40}
              width={40}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <Text style={styles.name}>{user?.user?.name}</Text>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection:'row',
    alignItems:'center',
    width:'100%',
    paddingLeft:20,
    borderBottomWidth:1,
    borderBottomColor:colors.lightGrey,
    paddingVertical:10
  },
  avatar:{
    borderRadius:30,
    borderWidth:0.5,
    borderColor:colors.textWhite,
  },
  name:{
    color:colors.textWhite,
    fontSize:16,
    marginLeft:10,
    fontWeight: 'bold'
  }
})