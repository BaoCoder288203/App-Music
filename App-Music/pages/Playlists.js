import { SafeAreaView,TouchableOpacity,ScrollView,TextInput,Image,Text, View, StyleSheet, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons';

export default function Playlists(navigation) {
    return(
        <SafeAreaView style = {{flex : 1}}>
            <View style = {styles.headerPlaylists}>
                <TouchableOpacity>
                    <FontAwesome name="angle-left" size={24} color="gray" />
                </TouchableOpacity>

                <Text style = {{fontSize : 16, color : 'gray'}}>Playlists</Text>

                <TouchableOpacity>
                    <MaterialIcons name="cast" size={24} color="gray" />
                </TouchableOpacity>
            </View>
            <View>
                <Text style = {{fontWeight : 'bold', fontSize : 20, margin : 20,}}>Your Playlists</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerPlaylists:{
        flexDirection: 'row',
        justifyContent : 'space-between',
        margin : 20,
    }
})