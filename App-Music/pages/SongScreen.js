import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { FontAwesome } from '@expo/vector-icons';
import { faShuffle } from '@fortawesome/free-solid-svg-icons';
import { songs, useMusic } from './MusicProvider';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';

export default function SongScreen({ navigation, route }) {
  const { songCurrent, isPlaying, playPauseSong, setIsPlaying, playSong, duration } = useMusic();
  const [currentTime, setCurrentTime] = useState(0);
  const [sound, setSound] = useState();
  
  useEffect(() => { 
    if (isPlaying && songCurrent) {
      const playAudio = async () => {
        const { sound } = await Audio.Sound.createAsync(
          { uri: songCurrent.url },
          {
            onPlaybackStatusUpdate: (status) => {
              if (status.isLoaded) {
                setCurrentTime(status.positionMillis);
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

  const handleSeek = async (value) => {
    if (sound) {
      await sound.setPositionAsync(value);
      setCurrentTime(value);
    }
  };

  return (
    <View style={styles.nowPlayingBar}>
      <View style={{ flex: 4, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Image source={songCurrent.artwork} style={styles.nowPlayingImage} />
        <View>
          <Text style={styles.nowPlayingTitle}>{songCurrent.title}</Text>
          <Text style={styles.nowPlayingArtist}>{songCurrent.artist}</Text>
        </View>
      </View>

      <View style={{ flex: 1, width: '100%', height: '100%', padding: 20, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.progressContainer}>
          <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={0}
            maximumValue={duration} 
            value={currentTime}
            onSlidingComplete={handleSeek}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />
          <Text>{Math.floor(currentTime / 1000)}s / {duration}</Text> 
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
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#bbb',
  },
  nowPlayingImage: {
    width: 300,
    height: 300,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 20,
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
    flex: 1,
    width: '100%',
    height: '100%',
    marginHorizontal: 30,
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
});
