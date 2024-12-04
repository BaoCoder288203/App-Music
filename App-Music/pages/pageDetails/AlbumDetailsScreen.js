import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import {TouchableOpacity,SafeAreaView,StatusBar,ScrollView} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAlbumTracks, fetchArtistAlbums, fetchCountOfAlbums, resetAlbumsStatus, resetArtistStatus, setSongCurrent } from '../../Redux_Toolkit/songSlice';
import { FontAwesome } from '@expo/vector-icons';
import { ArrowLeft, MoreHorizontal, Download, Heart } from 'react-native-feather'
import { useNavigation } from '@react-navigation/native';
import { Footer } from '../../layout/Footer';
import Playing from '../Playing';
import { playSong } from '../../Redux_Toolkit/musicThunk';

export const AlbumDetailsScreen = ({ route }) => {
  const { albumId,artistId,artistImg, albumName,albumImg,albumArtist,albumRelease,albumDownLoad } = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { artistAlbumsCount,tracksByAlbum, status, error } = useSelector((state) => state.song);

  const tracks = tracksByAlbum[albumId] || []; // Lấy tracks từ Redux

  useEffect(() => {
    dispatch(resetAlbumsStatus());
    dispatch(fetchAlbumTracks(albumId));
    dispatch(fetchCountOfAlbums(artistId));
  }, [dispatch, artistId, albumId, tracks.length]);

  const isLoading = status.fetchAlbumTracks === 'loading' || status.fetchCountOfAlbums === 'loading';
  const isFailed = status.fetchAlbumTracks === 'failed' || status.fetchCountOfAlbums === 'failed';

  if (isLoading) return <Text>Loading...</Text>; 
  if (isFailed) return <Text>Error: {error}</Text>;
  
  const handleSongPress = (song) => {
    dispatch(setSongCurrent(song));
    dispatch(playSong(song));
  };

  const renderTrackItem = ({ item,index=1}) => (
    <TouchableOpacity style={styles.trackInfo} onPress={() => handleSongPress(item)}>
      <Text style={styles.trackNumber}>{index+1}</Text>
      <View style={styles.trackDetails}>
        <Text style={styles.trackTitle}>{item.name}</Text>
        <Text style={styles.trackArtist}>{albumArtist}</Text>
      </View>
      <TouchableOpacity>
        <MoreHorizontal stroke="#000" width={17} height={17} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={{ flex: 1,paddingTop:30, }}>
      <ScrollView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        
        <View style={styles.header}>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
            <ArrowLeft stroke="#000" width={24} height={24} />
          </TouchableOpacity>
          <TouchableOpacity>
            <MoreHorizontal stroke="#000" width={24} height={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.artworkContainer}>
          <Image
            source={{ uri: albumImg }}
            style={styles.artwork}
            resizeMode="cover"
          />
        </View>

        <View style={styles.titleSection}>
          <Text style={styles.title}>{albumName}</Text>
          <Text style={styles.artist}>{albumArtist}</Text>
          <Text style={styles.albumInfo}>Album • 2024</Text>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.iconButton}>
            <Download stroke="#000" width={24} height={24} />
            <Text style={styles.buttonText}>Download</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.playButton}>
            <Text style={styles.playButtonText}>RANDOM PLAY</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.iconButton}>
            <Heart stroke="#000" width={24} height={24} />
            <Text style={styles.buttonText}>Like</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={tracks}
          renderItem={renderTrackItem}
          keyExtractor={(item,index)=>index.toString()}
          style={styles.songs}
        />

        <View style={styles.infoAlbum}>
          <Text style={styles.releaseInfo}>Release {albumRelease}</Text>
          <Text style={styles.duration}>{tracks.length} songs</Text>
          <Text style={styles.provider}>Provide for BaoCoder</Text>
        </View>

        <Text style={{fontSize:18,fontWeight:'bold',margin:10}}>About artist</Text>
        <TouchableOpacity style={styles.artistAlbum} onPress={()=>navigation.navigate('ArtistProfileScreen',{artistId:artistId,artistName:albumArtist,artistImg:artistImg})}>
          <View style={{alignItems:'center',gap:7,flexDirection:'row'}}>
            <Image source={{ uri: albumImg }} style={{width:40,height:40,borderRadius:50,margin:5}}/>
            <View>
              <Text style={styles.nameArtist}>{albumArtist}</Text>
              <Text>{artistAlbumsCount} albums </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.btnFollow}>
            <Text style={styles.txtFollow}>Follow</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </ScrollView>
      <Playing/>
      <Footer/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  nameArtist:{
    fontWeight:'bold',
    fontSize:16,
  },
  btnFollow:{
    backgroundColor:'black',
    paddingVertical:8,
    paddingHorizontal:12,
    borderRadius:12,
  },
  txtFollow:{
    fontSize:13,
    fontWeight:'bold',
    color:'white',
  },
  artistAlbum:{
    padding:5,
    margin:10,
    borderRadius:6,
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#d3d3d3',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position:'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  artworkContainer: {
    justifyContent:'center',
    alignItems:'center',
    padding: 16,
  },
  artwork: {
    width: '70%',
    aspectRatio: 1,
    borderRadius: 8,
  },
  titleSection: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  artist: {
    fontSize: 18,
    color: '#666',
    marginTop: 4,
  },
  albumInfo: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 16,
  },
  iconButton: {
    alignItems: 'center',
  },
  buttonText: {
    marginTop: 4,
    fontSize: 12,
  },
  playButton: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  playButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  trackInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  trackNumber: {
    fontSize: 16,
    marginRight: 16,
    color: '#666',
  },
  trackDetails: {
    flex: 1,
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  trackArtist: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  songs:{
    height:200,
  },
  releaseInfo: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  duration: {
    fontSize: 14,
    color: '#666',
  },
  provider: {
    fontSize: 14,
    color: '#666',
  },
  infoAlbum:{
    padding: 10,
  },
});
