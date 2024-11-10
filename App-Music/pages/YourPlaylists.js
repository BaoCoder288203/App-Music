import { SafeAreaView,TouchableOpacity,ScrollView,TextInput,Image,Text, View, StyleSheet, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons';
import {songs} from './MusicProvider';

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
  

export default function YourPlaylists({navigation}) {
    return(
        <SafeAreaView style = {{flex : 1}}>
            <View style = {styles.headerPlaylists}>
                <TouchableOpacity 
                    onPress={()=> navigation.navigate('YourLibrary')}
                >
                    <FontAwesome name="angle-left" size={24} color="gray" />
                </TouchableOpacity>

                <Text style = {{fontSize : 16, color : 'gray'}}>Playlists</Text>

                <TouchableOpacity>
                    <MaterialIcons name="cast" size={24} color="gray" />
                </TouchableOpacity>
            </View>
            <View>
                <Text style = {{fontWeight : 'bold', fontSize : 25, margin : 20,}}>Your Playlists</Text>

                {/* FlatList for playlists */}
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
                        <TouchableOpacity 
                            onPress={()=> navigation.navigate('PlayListScreen')}
                        >
                            <FontAwesome name="angle-right" size={24} color="gray" />
                        </TouchableOpacity>
                    </View>
                )}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerPlaylists:{
        flexDirection: 'row',
        justifyContent : 'space-between',
        margin : 20,
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
      imgPlaylist:{

      },
})