import { SafeAreaView, TouchableOpacity, ScrollView, TextInput, Image, Text, View, StyleSheet, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Footer } from '../layout/Footer';
import Playing from './Playing';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { ChartsScreen } from './pageCategories/ChartsScreen';
import { AlbumsScreen } from './pageCategories/AlbumsScreen';
import { ArtistsScreen } from './pageCategories/ArtistsScreen';
import { loadUserData,clearUser } from '../Redux_Toolkit/userSlice';
import SuggestionsScreen from './pageCategories/SuggestionsScreen';

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const loadUserDataIfTokenExists = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        // Token tồn tại, nên tải lại dữ liệu người dùng
        dispatch(loadUserData());  // Tải lại dữ liệu người dùng từ API hoặc AsyncStorage
      }
    };

    loadUserDataIfTokenExists();
  }, [dispatch]);

  const handleFocus = () => {
    navigation.navigate("Search");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.box}>
          <View style={{
            width: '100%',
            height: 100,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Image style={{
              width: 30,
              height: 30,
              color: 'black',
            }} source={require('../all_images/Home - Audio Listing/Image 36.png')} />
            <View style={{
              height: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <FontAwesome name="bell" style={{
                marginHorizontal: 20,
              }} size={20} />
              <TouchableOpacity 
                onPress={()=> navigation.navigate('UserAccount')}
              >
                <Image source={require('../all_images/Feed - Comment on an Audio/Avatar 8.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.box}>
          <View style={{
            width: '100%',
          }}>
            <Text style={{ color: 'gray' }}> Good morning,</Text>
            <Text style={{ fontSize: 25, fontWeight: 'bold' }}> Ashley Scott</Text>
          </View>
        </View>

        <View style={styles.box}>
          <View style={{ width: '100%', marginVertical: 10 }}>
            <TextInput style={{
              position: 'relative',
              padding: 10,
              paddingLeft: 40,
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 50,
            }} placeholder='What you want to listen to'
              onFocus={handleFocus} />
            <FontAwesome name="search" style={{
              marginHorizontal: 20,
              position: 'absolute',
              top: 10,
              left: -5,
            }} size={20} />
          </View>
        </View>

        <SuggestionsScreen/>

        <ChartsScreen/>

        <AlbumsScreen/>

        <ArtistsScreen/>
      </ScrollView>
      <Playing/>
      <Footer/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    marginTop:30,
  },
  box: {
    padding: 10,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },

  sectionTitle: {
    margin:8,
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },

  suggestionsList: {
    margin:8,
    height: 270,
    gap: 20, 
  },
  chartsList: {
    margin:8,
    height: 180,
    gap: 20, 
  },
  trendingAlbumsList: {
    margin:8,
    height: 180,
    gap: 20, 
  },
  popularArtistsList: {
    margin:8,
    height: 220,
    gap: 20, 
  },

  image: {
    width: 230,
    height: 270,
    borderRadius: 10,
  },

  textImg: {
    marginTop: 5,
    textAlign: 'center',
  },
  albumTitle: {
    fontWeight: 'bold',
    marginTop: 5,
  },
  albumArtist: {
    color: 'gray',
  },
  artistName: {
    textAlign: 'center',
  },

  searchInputContainer: {
    position: 'relative',
    padding: 10,
    paddingLeft: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 50,
  },
  searchIcon: {
    position: 'absolute',
    top: 10,
    left: 15,
  },
  product3:{
    gap:6,
    alignItems:'center',
  },
  btnFollow:{
    backgroundColor:'black',
    color:'white',
    padding:5,
    textAlign:'center',
    borderRadius:20,
  }
});


