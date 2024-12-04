import {
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Image,
    Text,
    View,
    StyleSheet,
    FlatList,
  } from 'react-native';
  import { useNavigation } from '@react-navigation/native';
  import React, { useEffect,useState } from 'react';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { useDispatch, useSelector } from 'react-redux';
  import { fetchAlbumsOfArtists, resetArtistStatus } from '../../Redux_Toolkit/songSlice';
  
  export default function SuggestionsScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { popularArtists, albumsOfArtists, status } = useSelector((state) => state.song);
    const [randomArtistId, setRandomArtistId] = useState(null);

    useEffect(() => {
        if (popularArtists.length > 0) {
        const newArtistId = Math.floor(Math.random() * popularArtists.length);
        setRandomArtistId(newArtistId);
        }
    }, [popularArtists]);

    const artistAlbums =
      randomArtistId !== null
        ? albumsOfArtists[popularArtists[randomArtistId]?.id] || []
        : [];
  
    const artistName =
      randomArtistId !== null
        ? popularArtists[randomArtistId]?.name
        : 'Unknown Artist';
    
    const artistImg =
    randomArtistId !== null
        ? popularArtists[randomArtistId]?.image
        : '../../all_images/elementor-placeholder-image.webp';
  
    useEffect(() => {
      if (randomArtistId !== null) {
        const selectedArtist = popularArtists[randomArtistId]?.id;
  
        if (selectedArtist && !albumsOfArtists[selectedArtist]) {
          // Chỉ fetch nếu dữ liệu chưa tồn tại
          dispatch(resetArtistStatus());
          dispatch(fetchAlbumsOfArtists(selectedArtist));
        }
      }
    }, [dispatch, randomArtistId, popularArtists, albumsOfArtists]);
  
    if (status.fetchAlbumsOfArtists === 'loading') return <Text>Loading...</Text>;
    if (status.fetchAlbumsOfArtists === 'failed') return <Text>Failed to load data</Text>;
  
    const renderSuggestionItem = ({ item }) => (
      <TouchableOpacity style={styles.albumItem} onPress={() => navigation.navigate('AlbumDetailsScreen', 
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
        <Image style={styles.image} source={{ uri: item.image }} />
        <Text style={styles.albumTitle}>{item.name}</Text>
      </TouchableOpacity>
    );
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.artistImage}
            source={{ uri: artistImg }} 
          />
          <View>
            <Text style={styles.artistLabel}>Dành cho fan</Text>
            <Text style={styles.artistName}>{artistName}</Text>
          </View>
        </View>
        <FlatList
          contentContainerStyle={styles.suggestionsList}
          data={artistAlbums}
          renderItem={renderSuggestionItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      marginTop: 30,
      backgroundColor: '#000', // Nền đen
      padding: 10,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    artistImage: {
      width: 40,
      height: 40,
      borderRadius: 40,
      marginRight: 10,
    },
    artistLabel: {
      color: '#888',
      fontSize: 14,
    },
    artistName: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    suggestionsList: {
      gap: 20,
    },
    albumItem: {
      width: 150,
    },
    image: {
      width: '100%',
      height: 150,
      borderRadius: 10,
    },
    albumTitle: {
      color: '#fff',
      textAlign: 'center',
      marginTop: 5,
      fontSize: 14,
    },
  });
  