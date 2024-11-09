import React, {useState} from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faShuffle } from '@fortawesome/free-solid-svg-icons';
import { songs } from './MusicProvider';
import { useMusic } from './MusicProvider';
import Playing from './Playing';
import { Footer } from '../layout/Footer';
import { SafeAreaView, ScrollView } from 'react-native-web';


const ArtistProfileScreen = ({ route }) => {
  const { image, name, follows, albums, about, other } = route.params;
  const { songCurrent, isPlaying, playSong, playPauseSong } = useMusic();

  const formattedFollows = follows >= 1000 ? `${(follows / 1000).toFixed(1)}K` : follows.toString();

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

    const [expanded, setExpanded] = useState(false);

  return (
    <SafeAreaView style={{flex : 1}}>
        <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        >
            <View>
                {/* Hiển thị thông tin nghệ sĩ */}
                <View style={{justifyContent : 'center', alignItems : 'center', width : '100%'}}>
                    <Image source={image} />
                    <Text style = {{fontWeight: 'bold', fontSize : 20}}>{name}</Text>
                    <Text style = {{color : 'gray'}}>{formattedFollows} Followers</Text>
                    <View style={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection:'row',
                        padding:20,
                        width : '100%'
                    }}>
                        <View style={{
                            alignItems: 'center',
                            flexDirection:'row',
                            gap:50,
                        }}>
                            <TouchableOpacity style = {{width : 80, height : 50, borderColor : 'gray', borderWidth : 1, borderRadius : 30, justifyContent : 'center'}}>
                                <Text style = {{color : 'gray', fontSize : 16, textAlign : 'center', alignItems : 'center'}}>Follow</Text>
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
                </View>

                <View>
                    <FlatList
                        data={songs}
                        renderItem={renderSongItem}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.songList}
                    />
                </View>
                    
                {/* Hiển thị Album */}
                <View style = {{marginHorizontal : 20,}}>
                    <Text style = {{fontWeight: 'bold', fontSize : 20}}>Albums</Text>
                    <br/>
                    <FlatList
                        data={albums}
                        renderItem={({ item }) => (
                        <TouchableOpacity style={{marginRight : 16}}>
                            <Image source={item.image} />
                            <Text>{item.title}</Text>
                            <Text style = {{color : 'gray'}}>{item.artist}</Text>
                        </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal = {true}
                    />
                </View>

                {/* Hiển thị About */}
                <View style = {{marginHorizontal : 20, marginTop : 20}}>
                    <Text style = {{fontWeight: 'bold', fontSize : 20}}>About</Text>
                    {about.map((item, index) => (
                        <View key={index}>
                            <Image source={item.image} style = {{width : 450, height : 150}} />
                            <Text style={{marginTop : 10}}>
                                {expanded ? item.desp : `${item.desp.slice(0, 100)}... `} 
                                <br/>
                                <Text 
                                    style={{color: 'blue'}}
                                    onPress={() => setExpanded(!expanded)}
                                    >
                                    {expanded ? "View Less" : "View More"}
                                </Text>
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Hiển thị Other */}
                <View style = {{marginHorizontal : 20, marginTop : 20}}>
                    <Text style = {{fontWeight: 'bold', fontSize : 20}}>Fans also like</Text>
                    <FlatList
                        data={other}
                        renderItem={({ item }) => (
                        <TouchableOpacity style={{marginRight : 16}}>
                            <Image source={item.image} />
                            <Text>{item.title}</Text>
                            <Text style = {{color : 'gray'}}>{item.artist}</Text>
                        </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal = {true}
                    />
                </View>
                
            </View>
        </ScrollView>
        <Playing/>
        <Footer/>
    </SafeAreaView>
    
        
  );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        width: 50,
        height: 50,
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

export default ArtistProfileScreen;
