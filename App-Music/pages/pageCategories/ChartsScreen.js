import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {  fetchMusicData, fetchTracks, resetArtistStatus, setSongCurrent } from '../../Redux_Toolkit/songSlice';
import { addFavorite, loadUserData, removeFavorite } from '../../Redux_Toolkit/userSlice';
import { FontAwesome } from '@expo/vector-icons';
import { playSong } from '../../Redux_Toolkit/musicThunk';
 
export const ChartsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { charts, status} = useSelector((state) => state.song);
  const { favorites } = useSelector((state) => state.user);

  useEffect(() => {
    if (status.fetchMusicData === 'idle') {
      dispatch(fetchMusicData());
      dispatch(loadUserData());
    }
  }, [dispatch, status]);

  if (status.fetchMusicData === 'loading') return <Text>Loading...</Text>;
  if (status.fetchMusicData === 'failed') return <Text>Failed to load data</Text>;

  const isFavorite = (song) => favorites.some((fav) => fav.id === song.id);

  const toggleFavorite = async (song) => {
    if (isFavorite(song)) {
      await dispatch(removeFavorite(song.id));
    } else {
      await dispatch(addFavorite(song));
      dispatch(loadUserData());
    }
  };

  const handleSongPress = (song) => {
    dispatch(setSongCurrent(song));
    dispatch(playSong(song));
  };

  const renderChartItem = ({ item }) => (
    <TouchableOpacity
      style={styles.product2}
      onPress={() => handleSongPress(item, item.name, item.image)}
    >
      <Image source={{ uri: item.image || item.album_image }} style={styles.image} />
      <View style={styles.boxCharts}>
        <View style={{width:'70%'}}>
          <Text style={styles.textImg} numberOfLines={1}>{item.name}</Text>  
        </View>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item)}
        >
          <Text style={styles.favoriteText}>
            {isFavorite(item) ? <FontAwesome name="heart" size={15} /> : <FontAwesome name="heart-o" size={15} />}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <Text style={styles.sectionTitle}>Top Songs</Text>
      <FlatList
        contentContainerStyle={styles.chartsList}
        data={charts}
        renderItem={renderChartItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chartsList: {
    margin: 8,
    height: 200,
    gap: 20,
  },
  textImg: {
    marginTop: 5,
  },
  sectionTitle: {
    margin: 8,
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  product2: {
    width:150,
    justifyContent: 'center',
  },
  favoriteButton: {
    marginTop: 5,
    padding: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  favoriteText: {
    color: 'red',
    fontWeight: 'bold',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  boxCharts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
