import { SafeAreaView,TouchableOpacity,ScrollView,TextInput,Image,Text, View, StyleSheet,FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useEffect,useState } from 'react';
import {songs, useMusic} from './MusicProvider';
import Playing from './Playing';

const data = songs;
export default function Search({ navigation }) {
  const [query, setQuery] = useState('');
  const [songs, setSongs] = useState(data);
  const { songCurrent, playSong} = useMusic();

  const filteredSongs = query
  ? songs.filter(song => song.title.toLowerCase().includes(query.toLowerCase()))
  : null;

  const handlePlaying = ()=>{
    navigation.navigate('Playing');  
  }

  const renderSongs = ({item})=>{
    return(
      <TouchableOpacity style={styles.item} onPress={()=>{
        handlePlaying
        playSong(item)
      }}>  
        <Image source={item.artwork} style={styles.img}/>
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.albumArtist}>{item.artist}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  const handleCanel =()=>{
    navigation.goBack();
  }
  const handleInputChange = (text) => {
    setQuery(text);
  };
    return(
      <View style={{
        flex: 1,
        justifyContent:'space-between'
      }}>
          <View style={styles.box}>
                <View style={{width:'100%',marginVertical:10,position:'relative',}}>
                    <TextInput style={{
                        position:'absolute',
                        width:'100%',
                        padding:10,
                        paddingLeft:10,
                        borderWidth:1,
                        borderColor:'gray',
                        borderRadius:50,
                    }} 
                      placeholder='What you want to listen to'
                      value={query}
                      onChangeText={handleInputChange}
                      autoFocus={true}
                    />
                    <TouchableOpacity onPress={handleCanel}>
                      <FontAwesome style={{
                        position:'absolute',
                        top:7,
                        right:12,
                      }} name="times" size={25} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.boxSongs}>
                  {
                    filteredSongs ?
                  <FlatList
                    data={filteredSongs}
                    renderItem={renderSongs}  
                    keyExtractor={(item,index) => index.toString()}
                    contentContainerStyle={styles.list} 
                  /> : ''
                  }
                </View>
            </View>
        <Playing/>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    box: {
      flex: 1,
      marginHorizontal: 20,
      justifyContent: 'flex-start',
    },
    textImg:{
      color:'grey',
    },
    boxSongs:{
      marginTop: 50,
      borderWidth: 1,
      borderColor:'#bbbbbb',
      borderRadius: 20,
    },
    item:{
      flexDirection:'row',
      justifyContent:'flex-start',
      alignItems:'center',
    },
    title:{
      fontSize:17,
      fontWeight:'bold',
    },
    img:{
      width: 60,
      height: 60,
      margin:5,
    },
    list:{
      margin:8,
      height: '100%',
      gap:10,
    },
  
  });