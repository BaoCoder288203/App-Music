import React, {useState} from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome, MaterialIcons, AntDesign, FontAwesome6} from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faShuffle } from '@fortawesome/free-solid-svg-icons';
import { songs } from './MusicProvider';
import { useMusic } from './MusicProvider';
import Playing from './Playing';
import { Footer } from '../layout/Footer';
import { SafeAreaView, ScrollView } from 'react-native-web';

const dataUser = {
    userId: "1",
    name: "John Doe",
    email: "johndoe@example.com",
    avatarUrl: "../all_images/Feed - Audio Listing/Avatar 4.png",
    playlists: [
      {
        title: "Chill Beats",
        artist: "Various Artists",
        img: require('../all_images/My Playlists/Image 110.png'),
        songs: [
          { id: 1, title: "Calm Waves", duration: "3:15" },
          { id: 2, title: "Mellow Breeze", duration: "4:20" },
          { id: 3, title: "Soft Sunset", duration: "5:05" },
        ]
      },
      {
        title: "Workout Hits",
        artist: "Various Artists",
        img: require('../all_images/My Playlists/Image 111.png'),
        songs: [
          { id: 4, title: "High Energy", duration: "3:45" },
          { id: 5, title: "Power Surge", duration: "4:00" },
          { id: 6, title: "Full Speed", duration: "3:30" },
        ]
      }
    ],
    favoriteAlbums: [
      {
        albumId: "album1",
        title: "Relaxing Vibes",
        artist: "Calm Collective",
        img: require('../all_images/My Playlists/Image 110.png'),
        songsCount: 12
      },
      {
        albumId: "album2",
        title: "Pop Hits",
        artist: "Various Artists",
        img: require('../all_images/My Playlists/Image 111.png'),
        songsCount: 15
      }
    ],
    likedSongs: [
        {
            title: "Death Bed",
            artist: "Powfu",
            artwork: require('../all_images/Playlist Details - Audio Listing/Image 51.png'),
            url: "https://samplesongs.netlify.app/Death%20Bed.mp3",
            id: '1',
            plays: '2.1M',
            duration: '3:36'
        },
        {
            title: "Bad Liar",
            artist: "Imagine Dragons",
            artwork: require('../all_images/Playlist Details - Audio Listing/Image 52.png'),
            url: "https://samplesongs.netlify.app/Bad%20Liar.mp3",
            id: '2',
            plays: '68M', 
            duration: '3:35'
        },
        {
            title: "Faded",
            artist: "Alan Walker",
            artwork: require('../all_images/Playlist Details - Audio Listing/Image 53.png'),
            url: "https://samplesongs.netlify.app/Faded.mp3",
            id: '3', 
            plays: '93M', 
            duration: '4:39'
        },
        {
            title: "Hate Me",
            artist: "Ellie Goulding",
            artwork: require('../all_images/Playlist Details - Audio Listing/Image 54.png'),
            url: "https://samplesongs.netlify.app/Hate%20Me.mp3",
            id: '4', 
            plays: '9M', 
            duration: '7:48'
        },
        {
            title: "Solo",
            artist: "Clean Bandit",
            artwork: require('../all_images/Playlist Details - Audio Listing/Image 55.png'),
            url: "https://samplesongs.netlify.app/Solo.mp3",
            id: '5', 
            plays: '23M', 
            duration: '3:36'
        },
        {
            title: "Without Me",
            artist: "Halsey",
            artwork: require('../all_images/Playlist Details - Audio Listing/Image 56.png'),
            url: "https://samplesongs.netlify.app/Without%20Me.mp3",
            id: '6', 
            plays: '10M', 
            duration: '6:22'
        },
    ],
    favoriteArtists: [
        {
          artistId: "artist1",
          name: "Lo-fi Chill",
          followers: 120000,
        },
        {
          artistId: "artist2",
          name: "The Classics",
          followers: 95000,
        }
      ]
  };
  

const UserAccount = ({navigation}) => {
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView 
                style={styles.container}
                showsVerticalScrollIndicator={false} 
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View style={styles.userHeader}>
                    <View style = {{flexDirection : 'row', justifyContent: 'space-between', width : 100, height : 70, alignItems : 'center'}}>
                    <TouchableOpacity onPress={()=> navigation.navigate('Home')}>
                        <FontAwesome name="angle-left" size={45} color="gray" style={{ right : 10,}} />
                    </TouchableOpacity>
                        <Text style = {{fontSize : 20, marginLeft : 10,fontWeight : 'bold'}}>UserAccount</Text>
                    </View>
                    <View style = {{flexDirection: 'row', justifyContent : 'space-between', width : 100, marginRight : 45,}}>
                        <TouchableOpacity>
                            <FontAwesome name="gear" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <MaterialIcons name="notifications" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={()=> navigation.navigate('Search')}
                        >
                            <FontAwesome name="search" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.userInfo}>
                    <View style={styles.userIcon}>
                        <Image source={dataUser.avatarUrl} style = {{width : 60, height : 60}}/>
                    </View>
                    
                    <View style = {{marginLeft : 20, justifyContent : 'space-between'}}>
                        <Text style = {{fontSize : 20, fontWeight : 'bold'}}>{dataUser.name}</Text>
                        <View style={styles.followStats}>
                            <View style = {{alignItems : 'center', width : 60}}>
                                <Text style = {{fontSize : 14}}>{dataUser.favoriteArtists.length}</Text>
                                <Text style = {{fontSize : 14}}>Following</Text>
                            </View>
                            <View style = {{alignItems : 'center', width : 60}}>
                                <Text style = {{fontSize : 14}}>{dataUser.favoriteArtists.length}</Text>
                                <Text style = {{fontSize : 14}}>Follower</Text>
                            </View>
                        </View>
                    </View>
                </View>
                
                <TouchableOpacity style={styles.premiumNavigation} onPress={()=> navigation.navigate('PremiumScreen')}>
                    <Text style = {{color : 'white', fontWeight : 'bold', fontSize : 16,}}>Premium</Text>
                    <FontAwesome name="angle-right" size={24} color="white" style = {{right : 10}} />
                </TouchableOpacity>

                <View style = {styles.favoriteSongs}>
                    <TouchableOpacity style={styles.favoriteSongsButton}>
                        <View style = {{backgroundColor : 'pink', width : 50, height : 50, justifyContent : 'center', alignItems : 'center', borderRadius : 10,}}>
                            <FontAwesome name="heart" size={24} color="white" />
                        </View>
                        <View style = {{margin : 5}}>
                            <Text style = {{fontSize : 15, marginLeft : 10, fontWeight : 'bold', color : 'white'}}>Favorite</Text>
                            <Text style = {{fontSize : 15, marginLeft : 10, color : 'white'}}>{dataUser.likedSongs.length} songs</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style = {styles.favoritePlaylist}>
                    <View style = {{flexDirection : 'row', justifyContent : 'space-between', margin : 10}}>
                        <Text style = {{fontSize : 20, marginLeft : 10, fontWeight : 'bold'}}>Playlist ({dataUser.playlists.length})</Text>

                        <View style = {{flexDirection : 'row', justifyContent : 'space-around', width : 100}}>
                            <TouchableOpacity>
                                <AntDesign name="pluscircleo" size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <FontAwesome6 name="list-check" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <FlatList
                    data={dataUser.playlists}
                    keyExtractor={(item) => item.title}
                    renderItem={({ item }) => (
                        <View style={styles.playlistContainer}>
                            <TouchableOpacity style = {{flexDirection : 'row'}}>
                                <Image source={item.img} style={styles.imgPlaylist} />
                                <View style = {{marginLeft : 20}}>
                                    <Text style={styles.playlistTitle}>{item.title}</Text>
                                    <Text style={styles.playlistArtist}>by {item.artist}</Text>
                                    <Text style={styles.songCount}>{item.songs.length} songs</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                    />
                </View>
                <View style = {styles.favoriteAlbum}>
                    <View style = {{flexDirection : 'row', justifyContent : 'space-between', margin : 10}}>
                        <Text style = {{fontSize : 20, marginLeft : 10, fontWeight : 'bold'}} >Album ({dataUser.favoriteAlbums.length})</Text>

                        <View style = {{flexDirection : 'row', marginRight : 10}}>
                            <TouchableOpacity>
                                <FontAwesome6 name="list-check" size={24} color="black"  />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/*Them flatlist album*/}
                    <FlatList
                        data={dataUser.favoriteAlbums}
                        keyExtractor={(item) => item.albumId}
                        renderItem={({ item }) => (
                        <View style={styles.albumContainer}>
                            <TouchableOpacity style={{ flexDirection: 'row' }}>
                            <Image source={item.img} style={styles.imgPlaylist} />
                            <View style={{ marginLeft: 20 }}>
                                <Text style={styles.playlistTitle}>{item.title}</Text>
                                <Text style={styles.playlistArtist}>by {item.artist}</Text>
                                <Text style={styles.songCount}>{item.songsCount} songs</Text>
                            </View>
                            </TouchableOpacity>
                        </View>
                        )}
                    />
                </View>
                <TouchableOpacity style = {styles.signOutButton}>
                    <Text>Sign out</Text>
                    <FontAwesome name="sign-out" size={24} color="red" />
                </TouchableOpacity>
                  
            </ScrollView>
            <Playing/>
            <Footer/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex : 1,
        marginTop : 30,
        marginLeft : 20, 
    },
    userHeader:{
        flexDirection : 'row',
        justifyContent : 'space-between',
        marginHorizontal : 20,
    },
    userInfo: {
        margin : 20,
        borderRadius : 20,
        backgroundColor : '#FFC1C1',
        padding : 20,
        width : '95%',
        flexDirection : 'row',
        
    }, 
    userIcon : {
        justifyContent : 'center',
    },
    followStats : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        width : 130,
    },
    premiumNavigation : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        margin : 20,
        borderRadius : 20,
        backgroundColor : '#BF3EFF',
        width : '95%',
        height : 40,
        padding : 10,
        alignItems : 'center',
        paddingLeft : 20,
    },
    favoriteSongs:{
        marginLeft : 20,
        paddingLeft : 10,
        paddingTop : 5,
        backgroundColor : '#FF69B4',
        height : 80,
        width : '95%',
        borderRadius : 20,
    },
    favoriteSongsButton : {
        flexDirection : 'row',
        margin : 10,
    },
    favoritePlaylist : {
        marginTop : 20,
        marginLeft : 20,
        backgroundColor : '#00F5FF',
        width : '95%',
        borderRadius : 20,
    },
    playlistContainer: {
        marginBottom: 20,
        paddingHorizontal: 20,
        flexDirection : 'row',
        justifyContent : 'space-between'
      },
      playlistTitle: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      playlistArtist: {
        fontSize: 14,
        color: 'gray',
      },
      songCount: {
        fontSize: 14,
        color: 'gray',
      },
    favoriteAlbum : {
        marginTop : 20,
        marginLeft : 20,
        backgroundColor : '#EEDD82',
        width : '95%',
        borderRadius : 20,
    },
    albumContainer: { marginBottom: 20, paddingHorizontal: 20, flexDirection: 'row' },
    signOutButton :{
        margin : 20,
        flexDirection : 'row',
        justifyContent : 'space-between',
        backgroundColor : 'lightgray',
        width : '95%',
        height : 50,
        alignItems : 'center',
        padding : 20,
        borderRadius : 20,
    }
});

export default UserAccount;