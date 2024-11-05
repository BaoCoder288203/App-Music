import { SafeAreaView,TouchableOpacity,ScrollView,TextInput,Image,Text, View, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function Search() {
    return(
        <View>
            <View style={styles.box}>
                <View style={{width:'100%',marginVertical:10}}>
                    <TextInput style={{
                        position:'relative',
                        padding:10,
                        paddingLeft:40,
                        borderWidth:1,
                        borderColor:'gray',
                        borderRadius:50,
                    }} placeholder='What you want to listen to'/>
                    <FontAwesome name="search" style={{
                    }} size={20}/>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    box: {
      marginHorizontal: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    products:{
      flexDirection:'row',
    },
    product:{
      marginTop:8,
      marginRight:20
    },
    product2:{
      marginTop:8,
      width: 160,
    },
    product3:{
      marginTop:8,
      width: 160,
      justifyContent:'center',
      alignItems:'center'
    },
    textImg:{
      color:'grey',
    }
  
  });