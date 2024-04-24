import { View, Text, SafeAreaView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalAPIServices from '../services/GlobalAPIServices';
import { colors } from '../constants/colors';
import LinearGradient from 'react-native-linear-gradient';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

export default function ArtistProfile({route}) {
 const {url} = route.params;

 const [artistData, setArtistData] = useState([]);

    useEffect(()=>{
        getSongs();
    },[])

    const getSongs = () => {
        GlobalAPIServices.getSongsOfArtist(url).then(res => {
          if (res) {
            console.log('Songs', res.data.songs);
            setArtistData(res.data);
          } else {
            console.log("Error while fetching data");
          }
        });
      }
  return (
    <SafeAreaView style={{ flex: 1}}>
      <LinearGradient
        colors={[colors.primaryMedium, '#1B1A1A']}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.5 }}
      >
        <ScrollView
          nestedScrollEnabled={true}
        >
          <Image
            source={require('../assets/images/back.png')}
            style={{height:25, width:25, position: 'absolute', top:15, left:15, opacity:0.8}}
            tintColor={colors.textWhite}
          />
          <View style={{alignItems:'center', justifyContent:'center', marginHorizontal:20,}}>
            <Image
              source={artistData?.image?.length > 0 ? {uri:artistData?.image[2]?.url} : require('../assets/images/artist.png')}
              height={300}
              width={250}
              resizeMode= 'contain'
            />
            <Text
              style={{
                color:colors.textWhite,
                fontSize:16,
                textAlign:'left',
              }}
            >{artistData.description}</Text>
          </View>
          <View style={{marginTop:8, marginHorizontal:20}}>
            <Text style={{
                color:colors.textWhite,
                fontSize:14,
                textAlign:'left',
              }}>Songs : {artistData.songCount}</Text>
              {/* <Text>{artistData.duration}</Text> */}
          </View>
          <FlatList
            style={{marginTop:10, alignSelf:"stretch"}}
            data={artistData?.songs}
            keyExtractor={item => item.id}
            horizontal={false}
            renderItem={({item}) =>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  flex:1,
                  flexDirection:'row',
                  marginHorizontal:15,
                  marginVertical:7
                }}
              >
                <Image
                  source={{uri: item?.image[1]?.url}}
                  style={{height: 60, width: 60, borderRadius: 6}}
                />
                <View style={{
                  paddingLeft:10,
                  justifyContent:'space-evenly'
                }}>
                  <Text style={{
                    color: colors.textWhite,
                    fontSize:14,

                  }}>
                    {item?.name}
                  </Text>
                  <Text style={{
                    color: colors.textWhite,
                    fontSize:12,
                    opacity:0.6
                  }}>
                    {item?.label}
                  </Text>
                </View>
              </TouchableOpacity>
            }
          />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  )
}