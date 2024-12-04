import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity,View,Image } from 'react-native';
import { useSelector } from 'react-redux'
import { FontAwesome, MaterialIcons, AntDesign, FontAwesome6} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function FavoriteSongsScreen() {
    const navigation = useNavigation();
    const { favorites } = useSelector(state => state.user);
    console.log(favorites);
    const renderSongs = (({ item }) => {
      return (
      <View style={styles.playlistContainer}>
        <TouchableOpacity style = {{flexDirection : 'row'}}>
        <Image source={item.image} style={styles.img} />
        <View style = {{marginLeft : 20}}>
          <Text style={styles.playlistTitle}>{item.name}</Text>
          <Text style={styles.playlistArtist}>by {item.artist_name}</Text>
        </View>
        </TouchableOpacity>
      </View>
      )}
    )
  return (
    <View style={{justifyContent:'center',flex: 1,}}>
      <View style={styles.userHeader}>
        <View style = {{flexDirection : 'row', justifyContent: 'space-between', width : 100, height : 70, alignItems : 'center'}}>
          <TouchableOpacity onPress={()=> navigation.goBack()}>
            <FontAwesome name="angle-left" size={35} color="gray" style={{ right : 5,}} />
          </TouchableOpacity>
          <Text style = {{fontSize : 20,fontWeight : 'bold', width : 200,marginLeft:8}}>Favorite</Text>
        </View>
      </View> 
      <View style = {styles.favoritePlaylist}>
        <FlatList
          data={favorites}
          keyExtractor={(item,index) => index.toString() }
          renderItem={renderSongs}
        />
      </View>    
    </View>
  )
}

const styles = StyleSheet.create({
  userHeader:{
    flexDirection : 'row',
    justifyContent : 'space-between',
    marginHorizontal : 20,
    alignItems : 'center',
    marginTop: 15,
  },
  favoritePlaylist : {
    marginVertical: 10,
    flex: 1,
    marginLeft : 15,
    backgroundColor : 'white',
    width : '90%',
    borderRadius : 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
    overflow:'hidden'
},
playlistContainer: {
    width:'100%',
    paddingHorizontal: 20,
    flexDirection : 'row',
    justifyContent : 'space-between',
    marginVertical:20,
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
  img:{
    width:60,
    height:60,
  }
})