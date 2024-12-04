import React, { useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import Playing from './Playing';
import { Footer } from '../layout/Footer';

const PlayListScreen = ({ route }) => {
  const dispatch = useDispatch();
  const { img, text } = route.params || {};
  const songs = useSelector((state) => state.song.charts); // Sử dụng đúng state
  const { songCurrent, isPlaying } = useSelector((state) => state.song); // Sử dụng state từ slice

  useEffect(() => {
    dispatch(fetchMusicData()); // Gọi API để lấy danh sách bài hát
  }, [dispatch]);

  const renderSongItem = ({ item }) => (
    <TouchableOpacity
      style={styles.songItem}
      onPress={() => {
        dispatch(setSongCurrent(item)); // Cập nhật bài hát hiện tại
      }}
    >
      <Image source={{ uri: item.image }} style={styles.songImage} />
      <View style={styles.songDetails}>
        <Text style={styles.songTitle}>{item.name}</Text>
        <Text style={styles.songArtist}>{item.artist_name}</Text>
        <Text style={styles.songStats}>{item.plays} • {item.duration}</Text>
      </View>
      <TouchableOpacity>
        <FontAwesome name="ellipsis-v" size={24} color="gray" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: img }} style={styles.coverImage} />
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>{text}</Text>
          <Text style={styles.headerInfo}>
            <FontAwesome name="heart-o" size={13} color="blue" /> 1,234 • 05:10:18
          </Text>
          <Text style={styles.headerUpdate}>Daily chart-toppers update</Text>
        </View>
      </View>
      <FlatList
        data={songs}
        renderItem={renderSongItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.songList}
      />
      <Playing />
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 130,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginVertical: 10,
  },
  coverImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginRight: 16,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerInfo: {
    fontSize: 14,
    color: 'gray',
  },
  headerUpdate: {
    fontSize: 12,
    color: 'gray',
  },
  songList: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  songImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  songDetails: {
    flex: 1,
  },
  songTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  songArtist: {
    fontSize: 14,
    color: 'gray',
  },
  songStats: {
    fontSize: 12,
    color: 'gray',
  },
  controlContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 20,
  },
  iconContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 50,
  },
});

export default PlayListScreen;


