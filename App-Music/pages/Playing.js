import React from 'react'
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useMusic } from './MusicProvider';
import { useNavigation } from '@react-navigation/native';

export default function Playing() {
    const navigation = useNavigation();
    const { songCurrent, isPlaying, playSong, playPauseSong } = useMusic();
  return (
    <View>
    {
        songCurrent === null ? 
        null : (<TouchableOpacity 
                    style={styles.nowPlayingBar} 
                    onPress={()=> navigation.navigate('SongScreen')}>
            <Image source={songCurrent.artwork} style={styles.nowPlayingImage} />
            <View style={styles.nowPlayingDetails}>
                <Text style={styles.nowPlayingTitle}>{songCurrent.title}</Text>
                <Text style={styles.nowPlayingArtist}>{songCurrent.artist}</Text>
            </View>
            <View style={styles.nowPlayingIcons}>
                <TouchableOpacity>
                    <FontAwesome name="heart" size={24} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity onPress={playPauseSong}>
                    <FontAwesome
                        name={isPlaying ? "pause" : "play"}
                        size={24}
                        color="black"
                        style={{ marginHorizontal: 16 }}
                    />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>) 
    }
  </View>
  )
}

const styles = StyleSheet.create({
    nowPlayingBar: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        backgroundColor: '#fff',
    },
    nowPlayingImage: {
        width: 40,
        height: 40,
        borderRadius: 8,
        marginRight: 8,
    },
    nowPlayingDetails: {
        flex: 1,
    },
    nowPlayingTitle: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    nowPlayingArtist: {
        fontSize: 12,
        color: 'gray',
    },
    nowPlayingIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})