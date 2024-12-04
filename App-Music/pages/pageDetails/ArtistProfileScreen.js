import React, { useEffect } from 'react';
import { SafeAreaView,StatusBar, ScrollView, View, Text, Image, FlatList, TouchableOpacity,StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faShuffle } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import Playing from '../Playing';
import { Footer } from '../../layout/Footer';
import { fetchAlbumsOfArtists, fetchAlbumTracks, fetchTracksOfArtists, resetArtistStatus, setSongCurrent } from '../../Redux_Toolkit/songSlice';
import { ArrowLeft, MoreHorizontal, Download, Heart } from 'react-native-feather';
import { useNavigation } from '@react-navigation/native';
import { playSong } from '../../Redux_Toolkit/musicThunk';

const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const ArtistProfileScreen = ({ route }) => {
  const navigation = useNavigation();
  const { artistId, artistName, artistImg } = route?.params;
  const dispatch = useDispatch();
  const { tracksOfArtists, albumsOfArtists, status } = useSelector((state) => state.song);

  const tracks = tracksOfArtists[artistId] || [];
  const albums = albumsOfArtists[artistId] || [];

  useEffect(() => {
    dispatch(resetArtistStatus());
      dispatch(fetchTracksOfArtists(artistId));
      dispatch(fetchAlbumsOfArtists(artistId));
  }, [dispatch, artistId]);

  const isLoading = status.fetchTracksOfArtists === 'loading' || status.fetchAlbumsOfArtists === 'loading';
  const isFailed = status.fetchTracksOfArtists === 'failed' || status.fetchAlbumsOfArtists === 'failed';

  if (isLoading) return <Text>Loading...</Text>;
  if (isFailed) return <Text>Failed to load data</Text>;

  const handleSongPress = (song) => {
    dispatch(setSongCurrent(song));
    dispatch(playSong(song));
  };

    const renderSongItem = (({ item }) => (
      <TouchableOpacity style={styles.songItem} onPress={() => handleSongPress(item)}>
      <Image source={{ uri: item.image }} style={styles.songImage} />
      <View style={styles.songDetails}>
        <View style={styles.titleContainer}>
          <Text style={styles.songTitle} numberOfLines={1}>
            {item.name}
          </Text>
        </View>
        <Text style={styles.songArtist}>{artistName}</Text>
        <Text style={styles.songStats}>
          Time • {formatDuration(item.duration)}
        </Text>
      </View>
      <TouchableOpacity style={styles.moreButton}>
        <FontAwesome name="ellipsis-v" size={20} color="gray" />
      </TouchableOpacity>
    </TouchableOpacity>
    ));

  const renderAlbumItem = (({ item }) => (
    <TouchableOpacity style={styles.albumItem} onPress={()=>navigation.navigate('AlbumDetailsScreen',{
      albumId: item.id,
      artistId: artistId,
      artistImg: artistImg,
      albumName: item.name,
      albumImg: item.image,
      albumArtist:artistName,
      albumRelease:item.releasedate,
    })}>
      <Image source={{ uri:item.image}} style={{height:200,width:200,marginVertical:10,}} />
      <View style={{width:'70%'}}><Text style={styles.songTitle} numberOfLines={1}>{item.name}</Text></View>
      <Text style={styles.albumArtist}>{artistName}</Text>
    </TouchableOpacity>
  ));

  if (status === 'loading') return <Text>Loading...</Text>;
  if (status === 'failed') return <Text>Failed to load data</Text>;
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <StatusBar barStyle="dark-content" />
        
        <View style={styles.header}>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
            <ArrowLeft stroke="#000" width={24} height={24} />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Image source={{ uri: artistImg }} style={styles.artistImage} />
          <Text style={styles.artistName}>{artistName}</Text>
          <Text style={styles.songCount}>{tracksOfArtists.length} Songs</Text>
          <View style={styles.controlsContainer}>
            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.followButton}>
                <Text style={styles.followButtonText}>Follow</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <FontAwesome name="ellipsis-h" size={20} color="grey" />
              </TouchableOpacity>
            </View>
            <View style={styles.buttonGroup}>
              <TouchableOpacity>
                <FontAwesomeIcon icon={faShuffle} size={20} color="grey" />
              </TouchableOpacity>
              <TouchableOpacity>
                <FontAwesome name="play-circle" size={45} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Popular</Text>
        <FlatList
          data={tracks}
          renderItem={renderSongItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.songList}
        />

        <Text style={styles.sectionTitle}>Albums</Text>
        <FlatList
          data={albums}
          renderItem={renderAlbumItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          style={{ marginHorizontal: 20 }}
        />
      </ScrollView>
      <Playing />
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:30,
  },
  header: {
    flexDirection: 'row',
    alignItems:'center',
    padding: 16,
  },
  songList: {
    height:300,
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  songImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 16,
  },
  songDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
  },
  songTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  songArtist: {
    fontSize: 14,
    color: 'gray',
  },
  songStats: {
    fontSize: 12,
    color: 'gray',
  },
  moreButton: {
    padding: 8,
  },
  artistImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    margin: 20,
  },
  artistName: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  songCount: {
    color: 'gray',
  },
  controlsContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 20,
    width: '100%',
  },
  buttonGroup: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 50,
  },
  followButton: {
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: 'center',
  },
  followButtonText: {
    color: 'gray',
    fontSize: 13,
    textAlign: 'center',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  albumItem: {
    marginRight: 16,
  },
  albumArtist: {
    color: 'gray',
  },
});


export default ArtistProfileScreen;

