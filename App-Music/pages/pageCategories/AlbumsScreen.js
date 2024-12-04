import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, Image,ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAlbums, fetchMusicData, resetArtistStatus} from '../../Redux_Toolkit/songSlice';

export const AlbumsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {trendingAlbums} = useSelector((state) => state.song);
  const {status} = useSelector((state) => state.song);

  useEffect(() => {
    if (status.fetchMusicData === 'idle') {
      dispatch(fetchMusicData());
    }
  }, [dispatch, status]);


  if (status.fetchMusicData === 'loading') return <Text>Loading...</Text>;
  if (status.fetchMusicData === 'failed') return <Text>Failed to load data</Text>;
 
  const renderTrendingAlbumItem = ({ item }) => (
    <TouchableOpacity style={{width:150}} onPress={() => navigation.navigate('AlbumDetailsScreen', 
    { 
      albumId: item.id,
      artistId: item.artist_id, 
      artistName: item.artist_name, 
      artistImg: item.image, 
      albumName: item.name, 
      albumImg: item.image,
      albumArtist: item.artist_name,
      albumRelease: item.releasedate,
      albumDownLoad: item.zip ,
    })}>
      <Image source={{uri: item.image}} style={styles.image} />
      <View style={{width:'80%'}}>
          <Text style={styles.textImg} numberOfLines={1}>{item.name}</Text>  
      </View>
      <Text style={styles.albumArtist}>{item.artist_name}</Text>
    </TouchableOpacity>
    );

    return (
        <ScrollView>
            <Text style={styles.sectionTitle}>Trending albums</Text>
            <FlatList
            contentContainerStyle={styles.trendingAlbumsList} 
            data={trendingAlbums}
            renderItem={renderTrendingAlbumItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            />
        </ScrollView>
    );
    };

const styles = StyleSheet.create({
    product3:{
        gap:6,
        alignItems:'center',
      },
      sectionTitle: {
        margin:8,
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
      },
      trendingAlbumsList: {
        margin:8,
        height: 195,
        gap: 20, 
      },
      albumTitle: {
        fontWeight: 'bold',
        marginTop: 5,
      },
  chartsList: {
    margin: 8,
    height: 200,
    gap: 20,
  },
  textImg: {
    fontWeight: 'bold',
    fontSize: 15,
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
