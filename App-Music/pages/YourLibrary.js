import { SafeAreaView,TouchableOpacity,ScrollView,TextInput,Image,Text, View, StyleSheet, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {songs} from './MusicProvider';
import Playing from './Playing';
import { Footer } from '../layout/Footer';
import { useMusic } from './MusicProvider';

const tags = [
    { id: '1', title: 'Playlists' },
    { id: '2', title: 'New tags' },
    { id: '3', title: 'Songs' },
    { id: '4', title: 'Album' },
    { id: '5', title: 'Artist' }
  ];

export default function YourLibrary({navigation}) {
    const { playSong } = useMusic();

    const handleTagPress = (tagTitle) => {
        switch(tagTitle) {
            case 'Playlists':
                navigation.navigate('YourPlaylists');
                break;
            case 'New tags':
                navigation.navigate('YourPlaylists');
                break;
            case 'Songs':
                navigation.navigate('YourPlaylists');
                break;
            case 'Album':
                navigation.navigate('YourPlaylists');
                break;
            case 'Artist':
                navigation.navigate('YourPlaylists');
                break;
            default:
                console.warn("Screen not found for this tag.");
        }
    };

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

    return(
        <SafeAreaView style={{flex:1}}>
            <ScrollView 
                style={styles.container}
                showsVerticalScrollIndicator={false} 
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={{ flexGrow: 1 }}
            >
            <View style={styles.headerLibrary}>
                <Text style = {{marginLeft : 25, fontSize : 25, fontWeight : 'bold'}}>Your Library</Text>
                <TouchableOpacity style = {{marginRight : 100}}
                    onPress={()=>navigation.navigate('Search')}
                >
                    <FontAwesome name="search" style={{
                        marginHorizontal:20,
                        position:'absolute',
                        top:10,
                        left : 20
                    }} size={20}/>
                </TouchableOpacity>
            </View>
            <View style = {{marginLeft : 15}}>
                <FlatList
                    data={tags}
                    keyExtractor={(item) => item.id}
                    
                    renderItem={({ item }) => (
                        <TouchableOpacity style = {styles.item}
                            onPress={() => handleTagPress(item.title)}
                        >
                            <Text>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                    horizontal={true} 
                    showsHorizontalScrollIndicator={false} 
                    
                />
            </View>

            <View style={{ paddingHorizontal: 10, marginBottom: 10, marginTop : 20 }}>
            <FlatList
                data={songs}
                renderItem={renderSongItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.songList}
            />
            </View>
                        
            </ScrollView>
            <Playing/>
            <Footer/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
    },
    headerLibrary:{
        flexDirection : 'row',
        justifyContent : 'space-between',
        width:'100%',
        marginVertical:10,
    },
    item: {
        backgroundColor: 'lightgray',
        padding: 20,
        marginHorizontal: 10,
        borderRadius: 10,
        width : 100,
        height : 20,
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : 20,
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
        width: 60,
        height: 60,
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
});    