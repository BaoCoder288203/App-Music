import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { playPauseSong } from '../Redux_Toolkit/musicThunk';

export default function Playing() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { songCurrent ,isPlaying } = useSelector((state) => state.song);
  if (!songCurrent) {
    console.log('No current song selected');
    return;
  }
  const playPause = () => {
    dispatch(playPauseSong());
  };

  return (
    <SafeAreaView>
      {songCurrent === null ? null : (
      <TouchableOpacity 
        style={styles.nowPlayingBar}
        onPress={() => navigation.navigate('SongScreen')}
      >
        <Image 
          source={{ uri: songCurrent.image }} 
          style={styles.nowPlayingImage}
        />
        
        <View style={styles.nowPlayingDetails}>
          <Text style={styles.nowPlayingTitle}>{songCurrent.name || 'Unknown Artist'}</Text>
          <Text style={styles.nowPlayingArtist}>{songCurrent.artist_name || 'Unknown Artist'}</Text>
        </View>
        
        <View style={styles.nowPlayingIcons}>
          <TouchableOpacity>
            <FontAwesome name="heart" size={24} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity onPress={playPause}>
            <FontAwesome
              name={isPlaying ? 'pause' : 'play'} 
              size={24}
              color="black"
              style={{ marginHorizontal: 16 }}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

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
});
