import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import GlobalAPIServices from '../services/GlobalAPIServices';

export default function ArtistProfile({route}) {
 const {url} = route.params;

    useEffect(()=>{
        getSongs();
    },[])

    const getSongs = () => {
        GlobalAPIServices.getSongsOfArtist(url).then(res => {
          if (res) {
            console.log('getSongsOfArtist:::', res);
          } else {
            console.log("Error while fetching data");
          }
        });
      }
  return (
    <View>
      <Text>ArtistProfile</Text>
    </View>
  )
}