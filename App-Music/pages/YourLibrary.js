import { SafeAreaView,TouchableOpacity,ScrollView,TextInput,Image,Text, View, StyleSheet, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const data = [
    { id: '1', title: 'Playlists' },
    { id: '2', title: 'Item 2' },
    { id: '3', title: 'Item 3' },
    { id: '4', title: 'Item 4' },
  ];
const verticalData = [
    { id: '5', title: 'Vertical Item 1' },
    { id: '6', title: 'Vertical Item 2' },
    { id: '7', title: 'Vertical Item 3' },
    { id: '8', title: 'Vertical Item 4' },
    { id: '9', title: 'Vertical Item 5' },
    { id: '10', title: 'Vertical Item 6' },
];

export default function YourLibrary() {
    return(
        <SafeAreaView style={{flex:1}}>
            <View style={styles.headerLibrary}>
                <Text style = {{marginLeft : 100}}>Your Library</Text>
                <TouchableOpacity style = {{marginRight : 100}}>
                    <FontAwesome name="search" style={{
                        marginHorizontal:20,
                        position:'absolute',
                        top:10,
                        left:-5,
                    }} size={20}/>
                </TouchableOpacity>
            </View>
            <View>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style = {styles.item}>
                            <Text>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                    horizontal={true} // Cài đặt để hiển thị theo chiều ngang
                    showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang (nếu muốn)
                />
            </View>

            <View style={{ paddingHorizontal: 10, marginBottom: 10 }}>
                <FlatList
                    data={verticalData}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.verticalItem}>
                            <Text>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </View>

            <ScrollView 
                style={styles.container}
                showsVerticalScrollIndicator={false} 
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={{ flexGrow: 1 }}
            >
            
            </ScrollView>


            <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-around', 
                padding: 20,
                borderTopWidth:1,
                borderColor:'grey',
                height:75 }}>
                <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}}>
                <FontAwesome name="home" size={20} style={{color:'grey',}} />
                <Text style={{
                    fontSize:13,
                    fontWeight:500,
                    color:'grey',
                }}>
                    Home
                </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}}>
                <FontAwesome name="search" size={20} style={{color:'grey',}}/>
                <Text style={{
                    fontSize:13,
                    fontWeight:500,
                    color:'grey',
                }}
                onPress={() => navigation.navigate('Search')}
                >
                    Search
                </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}}>
                <FontAwesome name="newspaper-o" size={20} style={{color:'grey',}}/> 
                <Text style={{
                    fontSize:13,
                    fontWeight:500,
                    color:'grey',
                }}>
                    Feed
                </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}}>
                <FontAwesome name="book" size={20} style={{color:'grey',}}/>
                <Text style={{
                    fontSize:13,
                    fontWeight:500,
                    color:'grey',
                }}>
                    Library
                </Text>
                </TouchableOpacity>
            </View>
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
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginHorizontal: 10,
        borderRadius: 10,
      },
});    