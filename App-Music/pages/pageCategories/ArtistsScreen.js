import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchArtists, fetchMusicData, resetArtistStatus } from '../../Redux_Toolkit/songSlice';

export const ArtistsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { popularArtists, status } = useSelector((state) => state.song); // Lấy đúng state

  useEffect(() => {
    if (status.fetchMusicData === 'idle') {
      dispatch(fetchMusicData());
    }
  }, [dispatch, status]);

  if (status.fetchMusicData === 'loading') return <Text>Loading...</Text>;
  if (status.fetchMusicData === 'failed') return <Text>Failed to load data</Text>;

  // Render mỗi item trong danh sách
  const renderPopularArtistItem = ({ item }) => {
    if (item && item.image !== '') {
      return (
        <TouchableOpacity style={styles.product3} onPress={()=>navigation.navigate('ArtistProfileScreen',{artistId:item.id,artistName:item.name,artistImg:item.image})}>
          <Image
            source={{ uri: item.image }}
            style={{
              width: 150,
              height: 150,
              borderRadius: 100,
            }}
          />
          <Text style={styles.artistName}>{item.name}</Text>
          <TouchableOpacity style={{ width: 70 }}>
            <Text style={styles.btnFollow}>Follow</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      );
    }
    return null; // Không render nếu dữ liệu không hợp lệ
  };

  return (
    <View>
      <Text style={styles.sectionTitle}>Popular artists</Text>
      <FlatList
        contentContainerStyle={styles.popularArtistsList}
        data={popularArtists}
        renderItem={renderPopularArtistItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  product3: {
    gap: 6,
    alignItems: 'center',
  },
  popularArtistsList: {
    margin: 8,
    height: 220,
    gap: 20,
  },
  artistName: {
    textAlign: 'center',
  },
  btnFollow: {
    backgroundColor: 'black',
    color: 'white',
    padding: 5,
    textAlign: 'center',
    borderRadius: 30,
  },
  sectionTitle: {
    margin: 8,
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});
