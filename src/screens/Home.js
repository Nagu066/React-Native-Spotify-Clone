import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../constants/colors'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import GradientText from '../components/GradientText';
import { useNavigation } from '@react-navigation/native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import GlobalAPIServices from '../services/GlobalAPIServices';

export default function Home() {

  const navigation = useNavigation();
  const [user, setUser] = useState('');
  const [playLists, setPLayLists] = useState('');

  useEffect(() => {
    getCurrentUser();
    getPlaylists();
  }, [])

  const getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    console.log('current user', currentUser);
    setUser(currentUser);
  };

  const getPlaylists = () => {
    GlobalAPIServices.getPLayLists().then(res => {
      if (res.data && res.data.artists) {
        console.log('response:::', res.data.artists);

        // Filter out duplicates based on unique `id`
        const uniquePlayLists = filterDuplicates(res.data.artists, 'id');

        setPLayLists(uniquePlayLists);
      } else {
        console.log("Error while fetching data");
      }
    });
  }

  const filterDuplicates = (array, key) => {
    const uniqueIds = new Set();
    return array.filter(item => {
      if (!uniqueIds.has(item[key])) {
        uniqueIds.add(item[key]);
        return true;
      }
      return false;
    });
  };

  return user && (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.textBlack }}>
      <View style={styles.header}>
        <TouchableOpacity onLongPress={()=>{}} >
          <Image
            source={{ uri: user?.user?.photo }}
            resizeMode={'cover'}
            height={40}
            width={40}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <Text style={styles.name}>{user?.user?.name}</Text>
      </View>
      <View style={{ marginHorizontal: 15, marginVertical: 10 }}>
        <Text style={{
          fontWeight: 'bold',
          color: colors.textWhite,
          fontSize: 18,
          marginBottom:10
        }}>Artists</Text>
        <FlatList
          data={playLists}
          keyExtractor={item => item.id}
          horizontal={true}
          renderItem={({ item }) =>
            <TouchableOpacity
              onPress={()=>navigation.navigate('ArtistProfile', { url: item.url })}
              activeOpacity={0.7}
              style={styles.artistsContainer}>
              <Image
                style={{
                  borderRadius:8,
                  opacity:0.7,
                  height:180,
                  width:200,
                  backgroundColor: colors.lightGrey
                }}
                source={item?.image.length > 0 ? {uri:item?.image[2]?.url} : require('../assets/images/artist.png')}
                height={180}
                width={200}
                resizeMode='cover'
              />
              <Text style={styles.artistsName}>{item.name}</Text>
            </TouchableOpacity>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
    paddingVertical: 10
  },
  avatar: {
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: colors.textWhite,
  },
  name: {
    color: colors.textWhite,
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold'
  },
  artistsContainer: {
    flexDirection: 'column',
    borderBottomWidth: 1,
    paddingRight:10,
  },
  artistsName: {
    fontWeight: '600',
    color: colors.textWhite,
    fontSize: 16,
    bottom:30,
    left:12
  }
})