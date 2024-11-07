import React, { createContext, useContext, useState, useEffect } from 'react';
import { SafeAreaView, TouchableOpacity, ScrollView, TextInput, Image, Text, View, StyleSheet, FlatList } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { FontAwesome } from '@expo/vector-icons';
import { faShuffle } from '@fortawesome/free-solid-svg-icons';
import { songs, useMusic } from './MusicProvider';
import Slider from '@react-native-community/slider';
import Video from 'react-native-video';
import { Audio } from 'expo-av';

export default function SongScreen({ navigation, route }) {
  const { songCurrent, isPlaying, playPauseSong, setIsPlaying, playSong, duration ,setDuration} = useMusic();
  const [currentTime, setCurrentTime] = useState(0);
  const [sound, setSound] = useState();
  
  useEffect(() => {
    if (isPlaying && songCurrent) {
      const playAudio = async () => {
        const { sound } = await Audio.Sound.createAsync(
          { uri: songCurrent.uri },
          {
            onPlaybackStatusUpdate: (status) => {
              if (status.isLoaded) {
                setCurrentTime(status.position);
                if (duration !== status.duration) {
                  setDuration(status.duration); 
                }
              }
            },
          }
        );
        setSound(sound);
        await sound.playAsync();
      };
      
      playAudio();

      return () => {
        if (sound) {
          sound.unloadAsync();
        }
      };
    }
  }, [isPlaying, songCurrent]);

  const playNextSong = (id) => {
    const indexSong = songs.findIndex((song) => song.id === id);
    const nextSong = indexSong === songs.length - 1 ? songs[0] : songs[indexSong + 1];
    playSong(nextSong);
    setIsPlaying(true);
  };

  const playBackSong = (id) => {
    const indexSong = songs.findIndex((song) => song.id === id);
    const prevSong = indexSong === 0 ? songs[songs.length - 1] : songs[indexSong - 1];
    playSong(prevSong);
    setIsPlaying(true);
  };

  const handleLoad = (meta) => {
    setDuration(meta.duration); 
  };

  return (
    <View style={styles.nowPlayingBar}>
      <View style={{ flex: 4, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Image source={songCurrent.artwork} style={styles.nowPlayingImage} />
        <View style={styles.nowPlayingDetails}>
          <Text style={styles.nowPlayingTitle}>{songCurrent.title}</Text>
          <Text style={styles.nowPlayingArtist}>{songCurrent.artist}</Text>
        </View>
      </View>

      <View style={{ flex: 1, width: '100%', height: '100%', padding: 20, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.progressContainer}>
          <Text>{formatTime(currentTime)}</Text>
          <Slider
            style={{ flex: 1 }}
            minimumValue={0}
            maximumValue={duration}
            value={currentTime}
            onValueChange={handleSeek}
            minimumTrackTintColor="#1DB954"
            maximumTrackTintColor="#D3D3D3"
            thumbTintColor="#1DB954"
          />
          <Text>{formatTime(duration)}</Text>
        </View>

        <View style={styles.nowPlayingIcons}>
          <TouchableOpacity>
            <FontAwesomeIcon icon={faShuffle} size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => playBackSong(songCurrent.id)}>
            <FontAwesome name="step-backward" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => playPauseSong()}>
            <FontAwesome name={isPlaying ? 'pause' : 'play'} size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => playNextSong(songCurrent.id)}>
            <FontAwesome name="step-forward" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="ellipsis-h" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nowPlayingBar: {
    height:'100%',
    justifyContent:'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  nowPlayingImage: {
      width: 100,
      height: 100,
      borderRadius: 8,
      marginRight: 8,
  },
  nowPlayingDetails: {
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
    flex:1,
    width:'100%',
    height:'100%',
    marginHorizontal:30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 8,
  },
})
