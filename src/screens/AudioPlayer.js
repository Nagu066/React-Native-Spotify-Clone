import { View, Text, SafeAreaView, Dimensions, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import TrackPlayer, { State, usePlaybackState, useProgress,  } from 'react-native-track-player';
import { track1 } from '../services/audioList';
import Slider from '@react-native-community/slider';
import { colors } from '../constants/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function AudioPlayer() {
    const { position, duration } = useProgress();
    const playerState = usePlaybackState();
    const isPlaying = playerState.state === State.Playing;
    const [progress, setProgress] = useState(0);
    const [currentTrack, setCurrentTrack] = useState('');

    useEffect(() => {
        setAudioPLayer();
        getTrack();
    }, []);

    const getTrack = async () => {
        await TrackPlayer.getActiveTrack().then((response) => {
            console.log('Currently playing:', response);
            setCurrentTrack(response)
        });
    }

    const setAudioPLayer = async () => {
        await TrackPlayer.setupPlayer();
        try {
            await TrackPlayer.add(track1);
            await TrackPlayer.play();
        } catch (e) {
            console.log("Error setting up audio player", e);
        }
    }

    const handleSliderChange = async (value) => {
        await TrackPlayer.seekTo(value);
        setProgress(value);
    };

    const handlePlayPause = async () => {
        if (isPlaying) {
          await TrackPlayer.pause();
        } else {
          await TrackPlayer.play();
        }
    };

    const formatTime = (seconds) => {
        // Convert seconds to minutes and seconds
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);

        // Pad with leading zeros if needed
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');

        // Return the formatted time as "00:00"
        return `${formattedMinutes}:${formattedSeconds}`;
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LinearGradient
                colors={['#EAD0D0', '#000000']}
                style={{ flex: 1 }}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
            >
                <View style={{ flex:1, marginHorizontal: 15, marginTop:40, alignItems: 'center', }}>
                    <Image
                        source={{uri:currentTrack?.artwork}}
                        resizeMode='cover'
                        style={{ width: '90%', height: 400, borderRadius: 10 }}
                    />
                    <Text style={styles.trackTitle}>{currentTrack?.title}</Text>
                </View>
                <View style={{position:'absolute', bottom:20, flex:1, width:'100%', paddingHorizontal:15}}>
                    <Slider
                        style={{ width: "100%", marginTop: 10, height: 25, borderRadius: 5 }}
                        minimumValue={0}
                        maximumValue={duration}
                        value={position}
                        onValueChange={handleSliderChange}
                        thumbTintColor={colors.textWhite}
                        minimumTrackTintColor={colors.textWhite}
                        maximumTrackTintColor={colors.textWhite}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.duration}>{formatTime(position)}</Text>
                        <Text style={styles.duration}>{formatTime(duration)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical:20, alignItems:'center' , justifyContent:'center'}}>
                        {/* Play and Pause, Next and Previous Button */}
                        <TouchableOpacity onPress={()=>console.log('Previous pressed')}>
                            <Image
                                source={require('../assets/images/previous.png')}
                                style={[styles.imageStyle]}
                                // tintColor={colors.textBlack}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.playImage} onPress={()=>handlePlayPause()}>
                            <Image
                                source={isPlaying ? require('../assets/images/pause.png') : require('../assets/images/play.png')}
                                style={[styles.imageStyle, {marginLeft: isPlaying ? 0 : 5}]}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>console.log('Next pressed')}>
                            <Image
                                source={require('../assets/images/next.png')}
                                style={[styles.imageStyle]}
                                // tintColor={colors.textBlack}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    trackTitle:{
        color:colors.textWhite,
        fontSize:18,
        marginTop:20,
        textAlign:'center'
    },
    duration:{
        fontSize:14,
        color: colors.textWhite,
        fontWeight:'400'
    },
    playImage: {
        marginHorizontal:30,
        backgroundColor: colors.textWhite,
        height: 55,
        width: 55,
        borderRadius: 55,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    imageStyle:{
        height:24,
        width:24,
    }
});