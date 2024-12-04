import { SafeAreaView,TouchableOpacity,ScrollView,TextInput,Image,Text, View, StyleSheet, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Footer } from '../layout/Footer';
import Playing from './Playing';

export default function PlaylistDetail() {
    const navigation = useNavigation();
    return(
        <SafeAreaView style = {{flex : 1, paddingTop:30}}>
           <ScrollView style = {{flex : 1,position:'relative'}}>
            <View style = {styles.headerPlaylists}>
                  <TouchableOpacity 
                    onPress={()=> navigation.goBack()}
                  >
                      <FontAwesome name="angle-left" size={35} color="black" />
                  </TouchableOpacity>
            </View>
              <View>
                  <Text style = {{fontWeight : 'bold', fontSize : 25, margin : 20,}}>Your Playlists</Text>
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
              </View>
              <View style = {{position : 'absolute', bottom : 80, right : 50,}}>
                <TouchableOpacity style = {{backgroundColor : 'black', width : 60, height : 60, borderRadius : 30, justifyContent : 'center', alignItems : 'center'}}>
                  <Text style = {{color : 'white', fontSize : 50, textAlignVertical : 'center', marginBottom : 10}}>+</Text>
                </TouchableOpacity>
              </View>
           </ScrollView>
          <Playing/>
          <Footer/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerPlaylists:{
        flexDirection: 'row',
        alignItems : 'center',
        marginHorizontal: 20,  
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