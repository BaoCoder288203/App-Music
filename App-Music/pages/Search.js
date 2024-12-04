import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilteredAlbums, selectFilteredArtists, selectFilteredSongs, setSongCurrent } from '../Redux_Toolkit/songSlice';
import { playSong } from '../Redux_Toolkit/musicThunk';
import { useNavigation } from '@react-navigation/native';

export default function Search() {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('songs'); // Quản lý tab đang chọn
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Lấy dữ liệu được lọc dựa trên query và tab đang chọn
  const filteredSongs = useSelector((state) => selectFilteredSongs(state, query));
  const filteredAlbums = useSelector((state) => selectFilteredAlbums(state, query));
  const filteredArtists = useSelector((state) => selectFilteredArtists(state, query));

  const handlePlaying = (song) => {
    dispatch(setSongCurrent(song.id));
    dispatch(playSong(song));
  };

  const renderSong = ({ item }) => (
    <TouchableOpacity style={styles.itemChart} onPress={() => handlePlaying(item)}>
      <Image source={{ uri: item.image }} style={styles.img} />
      <View>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.albumArtist}>{item.artist_name}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderAlbum = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('AlbumDetailsScreen', 
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
        <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Image source={item.image ? { uri: item.image } : require('../all_images/elementor-placeholder-image.webp')} style={styles.img} />
            <View>
                <View style={{width:250}}><Text style={styles.title} numberOfLines={1}>{item.name}</Text></View>
                <Text style={styles.artist}>Albums · {item.artist_name}</Text>
            </View>
        </View>
      <FontAwesome name="chevron-right" size={20} color="black" />
    </TouchableOpacity>
  );

  const renderArtist = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={()=>navigation.navigate('ArtistProfileScreen',{artistId:item.id,artistName:item.name,artistImg:item.image})}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Image source={{ uri: item.image }} style={styles.imgArtist} />
        <View>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.artist}>Nghệ sỹ</Text>
        </View>
      </View>
      <FontAwesome name="chevron-right" size={20} color="black" />
    </TouchableOpacity>
  );

  // Hiển thị nội dung dựa trên tab
  const renderContent = () => {
    if (activeTab === 'songs') {
      return (
        <FlatList
          data={filteredSongs}
          renderItem={renderSong}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />
      );
    }
    if (activeTab === 'albums') {
      return (
        <FlatList
          data={filteredAlbums}
          renderItem={renderAlbum}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />
      );
    }
    if (activeTab === 'artists') {
      return (
        <FlatList
          data={filteredArtists}
          renderItem={renderArtist}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        {/* Ô input tìm kiếm */}
        <View style={styles.searchBox}>
          <TextInput
            style={styles.input}
            placeholder="What you want to listen to"
            value={query}
            onChangeText={setQuery}
            autoFocus={true}
          />
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome
              style={styles.closeIcon}
              name="times"
              size={25}
              color="black"
            />
          </TouchableOpacity>
        </View>

        {/* Tabs chọn loại nội dung */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'songs' && styles.activeTab]}
            onPress={() => setActiveTab('songs')}
          >
            <Text style={[styles.tabText, activeTab === 'songs' && styles.activeTabText]}>Bài hát</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'albums' && styles.activeTab]}
            onPress={() => setActiveTab('albums')}
          >
            <Text style={[styles.tabText, activeTab === 'albums' && styles.activeTabText]}>Album</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'artists' && styles.activeTab]}
            onPress={() => setActiveTab('artists')}
          >
            <Text style={[styles.tabText, activeTab === 'artists' && styles.activeTabText]}>Nghệ sĩ</Text>
          </TouchableOpacity>
        </View>

        {/* Nội dung dựa trên tab */}
        <View style={styles.boxSongs}>{renderContent()}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  box: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: 'flex-start',
  },
  searchBox: {
    width: '100%',
    marginVertical: 10,
    position: 'relative',
  },
  input: {
    position: 'absolute',
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 50,
  },
  closeIcon: {
    position: 'absolute',
    top: 7,
    right: 12,
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 40,
    gap:10
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#ddd',
  },
  activeTab: {
    backgroundColor: '#000',
  },
  tabText: {
    color: '#000',
    fontWeight: 'bold',
  },
  activeTabText: {
    color: '#fff',
  },
  boxSongs: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#bbbbbb',
    borderRadius: 20,
    flex: 1,
  },
  itemChart: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  artist:{
    fontSize: 14,
    color:'#A0A0A0',
  },
  img: {
    width: 60,
    height: 60,
    margin: 5,
  },
  imgArtist:{
    width: 60,
    height: 60,
    borderRadius:50,
    margin: 5,
  },
  list: {
    margin: 8,
    gap: 10,
  },
});
