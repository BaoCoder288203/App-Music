import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faShuffle } from '@fortawesome/free-solid-svg-icons';
import { Footer } from '../layout/Footer';
import { useMusic } from './MusicProvider';
import Playing from './Playing';

const songs = [
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
]

const PlayListScreen = ({ navigation ,route}) => {
    const { img,text } = route?.params;
    const { songCurrent, playSong} = useMusic();

    const renderSongItem = ({ item }) => (
        <TouchableOpacity style={styles.songItem} onPress={()=>{
            playSong(item);
        }}>
            <Image source={item.artwork} style={styles.songImage} />
            <View style={styles.songDetails}>
                <Text style={styles.songTitle}>{item.title}</Text>
                <Text style={styles.songArtist}>{item.artist}</Text>
                <Text style={styles.songStats}>{item.plays} • {item.duration}</Text>
            </View>
            <TouchableOpacity>
                <FontAwesome name="ellipsis-v" size={24} color="gray" />
            </TouchableOpacity>
        </TouchableOpacity>
    );
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={img} style={styles.coverImage} />
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerTitle}>{text}</Text>
                    <Text style={styles.headerInfo}>
                    <FontAwesome name="heart-o" size={13} color="blue" /> 1,234 • 05:10:18</Text>
                    <Text style={styles.headerUpdate}>Daily chart-toppers update</Text>
                </View>

            </View>
            <View style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection:'row',
                padding:20,
            }}>
                <View style={{
                    alignItems: 'center',
                    flexDirection:'row',
                    gap:50,
                }}>
                    <TouchableOpacity>
                        <FontAwesome name="heart-o" size={20} color="grey" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome name="ellipsis-h" size={20} color="grey" />
                    </TouchableOpacity> 
                </View>
                <View style={{
                    alignItems: 'center',
                    flexDirection:'row',
                    gap:50,
                }}>
                    <TouchableOpacity>
                        <FontAwesomeIcon icon={faShuffle} size={20} color="grey"/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome name="play-circle" size={45} color="black" />
                    </TouchableOpacity> 
                </View>
            </View>
            <FlatList
                data={songs}
                renderItem={renderSongItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.songList}
            />
            <Playing/>
            <Footer/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        height:130,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginVertical:10,
    },
    coverImage: {
        width: 150,
        height: 150,
        borderRadius: 8,
        marginRight: 16,
    },
    headerTextContainer: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    headerInfo: {
        fontSize: 14,
        color: 'gray',
    },
    headerUpdate: {
        fontSize: 12,
        color: 'gray',
    },
    songList: {
        paddingHorizontal: 16,
        paddingBottom: 80,
    },
    songItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    songImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 16,
    },
    songDetails: {
        flex: 1,
    },
    songTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    songArtist: {
        fontSize: 14,
        color: 'gray',
    },
    songStats: {
        fontSize: 12,
        color: 'gray',
    },
    nowPlayingBar: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        backgroundColor: '#fff',
    },
    nowPlayingImage: {
        width: 40,
        height: 40,
        borderRadius: 8,
        marginRight: 8,
    },
    nowPlayingDetails: {
        flex: 1,
    },
    nowPlayingTitle: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    nowPlayingArtist: {
        fontSize: 12,
        color: 'gray',
    },
    nowPlayingIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottomNavigation: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
});

export default PlayListScreen;
