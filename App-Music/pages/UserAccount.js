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

const playlists = [
    {
      title: "Chill Beats",
      artist: "Various Artists",
      img: require('../all_images/My Playlists/Image 110.png'),
      songs: [
        {
          id: 1,
          title: "Calm Waves",
          duration: "3:15",
        },
        {
          id: 2,
          title: "Mellow Breeze",
          duration: "4:20",
        },
        {
          id: 3,
          title: "Soft Sunset",
          duration: "5:05",
        },
      ],
    },
    {
      title: "Workout Hits",
      artist: "Various Artists",
      img: require('../all_images/My Playlists/Image 111.png'),
      songs: [
        {
          id: 4,
          title: "High Energy",
          duration: "3:45",
        },
        {
          id: 5,
          title: "Power Surge",
          duration: "4:00",
        },
        {
          id: 6,
          title: "Full Speed",
          duration: "3:30",
        },
      ],
    },
  ];

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
                    <View>
                        <Text>UserAccount</Text>
                    </View>
                    <View style = {{flexDirection: 'row', justifyContent : 'space-between', width : 100}}>
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
                        <FontAwesome name="user" size={30} color="black"/>
                    </View>
                    <Text>UserName</Text>
                    <View></View>
                </View>
                <View style={styles.followStats}>
                    <View style = {{alignItems : 'center', width : 60}}>
                        <Text>16</Text>
                        <Text>Following</Text>
                    </View>
                </View>
                <View style={styles.premiumNavigation}>
                    <Text>Premium</Text>
                    <TouchableOpacity 
                    onPress={()=> navigation.navigate('PremiumScreen')}
                    >
                        <FontAwesome name="angle-right" size={24} color="gray" style = {{bottom : 1, left : 10}} />
                    </TouchableOpacity>
                </View>

                <View style = {styles.favoriteSongs}>
                    <TouchableOpacity style={styles.favoriteSongsButton}>
                        <View style = {{backgroundColor : 'pink', width : 50, height : 50, justifyContent : 'center', alignItems : 'center', borderRadius : 10,}}>
                            <FontAwesome name="heart" size={24} color="white" />
                        </View>
                        <View style = {{margin : 5}}>
                            <Text>Favorite</Text>
                            <Text>Number of songs</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style = {styles.favoritePlaylist}>
                    <View style = {{flexDirection : 'row', justifyContent : 'space-between', margin : 10}}>
                        <Text>Playlist (number of playlist)</Text>

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
                    data={playlists}
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
                        <Text>Album (number of Album)</Text>

                        <View style = {{flexDirection : 'row'}}>
                            <TouchableOpacity>
                                <FontAwesome6 name="list-check" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/*Them flatlist album*/}

                </View>
                  
            </ScrollView>
            <Playing/>
            <Footer/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex : 1,
        marginTop : 20,
        marginLeft : 20, 
    },
    userHeader:{
        flexDirection : 'row',
        justifyContent : 'space-between',
        marginHorizontal : 20,
    },
    userInfo: {
        margin : 20,
        justifyContent : 'center',
    }, 
    userIcon : {
        width : 50,
        height : 50,
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 50,
        backgroundColor : 'lightgray',
        marginBottom : 20,
    },
    followStats : {
        marginLeft : 20,
    },
    premiumNavigation : {
        flexDirection : 'row',
        margin : 20,
    },
    favoriteSongs:{
        marginLeft : 20,
        paddingLeft : 10,
        paddingTop : 5,
        backgroundColor : 'lightgray',
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
        backgroundColor : 'lightgray',
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
        backgroundColor : 'lightgray',
        width : '95%',
        borderRadius : 20,
    }
});

export default UserAccount;