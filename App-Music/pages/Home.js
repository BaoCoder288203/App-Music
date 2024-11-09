import { SafeAreaView, TouchableOpacity, ScrollView, TextInput, Image, Text, View, StyleSheet, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Footer } from '../layout/Footer';
import Playing from './Playing';
import { useNavigation } from '@react-navigation/native';

const suggestions = [
  require('../all_images/Home - Audio Listing/Container 26.png'),
  require('../all_images/Home - Audio Listing/Container 27.png'),
  require('../all_images/Home - Audio Listing/Container 26.png'),
  require('../all_images/Home - Audio Listing/Container 27.png'),
  require('../all_images/Home - Audio Listing/Container 26.png'),
  require('../all_images/Home - Audio Listing/Container 27.png'),
  require('../all_images/Home - Audio Listing/Container 26.png'),
  require('../all_images/Home - Audio Listing/Container 27.png'),
  require('../all_images/Home - Audio Listing/Container 26.png'),
  require('../all_images/Home - Audio Listing/Container 27.png'),
];

const charts = [
  { image: require('../all_images/Home - Audio Listing/Container 31.png'), text: 'Top Hits of the Week' },
  { image: require('../all_images/Home - Audio Listing/Container 32.png'), text: 'Global Charts Highlights' },
  { image: require('../all_images/Home - Audio Listing/Container 33.png'), text: 'Rising Stars' },
  { image: require('../all_images/Home - Audio Listing/Container 31.png'), text: 'Indie Favorites' },
  { image: require('../all_images/Home - Audio Listing/Container 32.png'), text: 'Chart Busters' },
  { image: require('../all_images/Home - Audio Listing/Container 33.png'), text: 'Summer Vibes' },
  { image: require('../all_images/Home - Audio Listing/Container 31.png'), text: 'Classics Revisited' },
  { image: require('../all_images/Home - Audio Listing/Container 32.png'), text: 'Best of 2023' },
  { image: require('../all_images/Home - Audio Listing/Container 33.png'), text: 'Grammy Winners' },
  { image: require('../all_images/Home - Audio Listing/Container 31.png'), text: 'Party Anthems' },
];

const trendingAlbums = [
  { image: require('../all_images/Home - Audio Listing/Image 45.png'), title: 'Lost in Time', artist: 'DJ Remix' },
  { image: require('../all_images/Home - Audio Listing/Image 46.png'), title: 'The Sound of Silence', artist: 'Simon & Garfunkel' },
  { image: require('../all_images/Home - Audio Listing/Image 47.png'), title: 'Future Nostalgia', artist: 'Dua Lipa' },
  { image: require('../all_images/Home - Audio Listing/Image 45.png'), title: 'Rumours', artist: 'Fleetwood Mac' },
  { image: require('../all_images/Home - Audio Listing/Image 46.png'), title: '21', artist: 'Adele' },
  { image: require('../all_images/Home - Audio Listing/Image 47.png'), title: 'After Hours', artist: 'The Weeknd' },
  { image: require('../all_images/Home - Audio Listing/Image 45.png'), title: 'Divide', artist: 'Ed Sheeran' },
  { image: require('../all_images/Home - Audio Listing/Image 46.png'), title: 'Red (Taylor’s Version)', artist: 'Taylor Swift' },
  { image: require('../all_images/Home - Audio Listing/Image 47.png'), title: '25', artist: 'Adele' },
  { image: require('../all_images/Home - Audio Listing/Image 45.png'), title: 'In the Lonely Hour', artist: 'Sam Smith' },
];


const popularArtists = [
  { image: require('../all_images/Home - Audio Listing/Image 39.png'), 
    name: 'Elton John',
    follows : '65100',
    albums:[
      {image: require('../all_images/Artist Profile/Image 71.png'), title:'ME', artist:'Jessica Gonzalez'},
      {image: require('../all_images/Artist Profile/Image 72.png'), title:'Magna nost', artist:'Jessica Gonzalez'},
      {image: require('../all_images/Artist Profile/Image 77.png'), title:'Proident', artist:'Jessica Gonzalez'},
    ],
    about:[
      {
        desp: 'Do in cupidatat aute et in officia aute laboris est Lorem est nisi dolor consequat voluptate duis irure. Veniam quis amet irure cillum elit aliquip sunt cillum cillum do aliqua voluptate ad non magna elit. Do ea n',
        image: require('../all_images/Artist Profile/Image 73.png'),
      }
    ],
    other:[
      {image: require('../all_images/Artist Profile/Image 74.png'), title:'Magna nost', artist:'Jessica Gonzalez'},
      {image: require('../all_images/Artist Profile/Image 75.png'), title:'Exercitatio', artist:'Brian Harris'},
      {image: require('../all_images/Artist Profile/Image 76.png'), title:'Tempor', artist:'Tyler And'},
    ],
  },
  { image: require('../all_images/Home - Audio Listing/Image 40.png'), 
    name: 'Beyoncé',
    follows : '65100',
    albums:[
      {image: require('../all_images/Artist Profile/Image 71.png'), title:'ME', artist:'Jessica Gonzalez'},
      {image: require('../all_images/Artist Profile/Image 72.png'), title:'Magna nost', artist:'Jessica Gonzalez'},
      {image: require('../all_images/Artist Profile/Image 77.png'), title:'Proident', artist:'Jessica Gonzalez'},
    ],
    about:[
      {
        desp: 'Do in cupidatat aute et in officia aute laboris est Lorem est nisi dolor consequat voluptate duis irure. Veniam quis amet irure cillum elit aliquip sunt cillum cillum do aliqua voluptate ad non magna elit. Do ea n',
        image: require('../all_images/Artist Profile/Image 73.png'),
      }
    ],
    other:[
      {image: require('../all_images/Artist Profile/Image 74.png'), title:'Magna nost', artist:'Jessica Gonzalez'},
      {image: require('../all_images/Artist Profile/Image 75.png'), title:'Exercitatio', artist:'Brian Harris'},
      {image: require('../all_images/Artist Profile/Image 76.png'), title:'Tempor', artist:'Tyler And'},
    ],
   },
  { image: require('../all_images/Home - Audio Listing/Image 41.png'), 
    name: 'Ed Sheeran',
    follows : '65100',
    albums:[
      {image: require('../all_images/Artist Profile/Image 71.png'), title:'ME', artist:'Jessica Gonzalez'},
      {image: require('../all_images/Artist Profile/Image 72.png'), title:'Magna nost', artist:'Jessica Gonzalez'},
      {image: require('../all_images/Artist Profile/Image 77.png'), title:'Proident', artist:'Jessica Gonzalez'},
    ],
    about:[
      {
        desp: 'Do in cupidatat aute et in officia aute laboris est Lorem est nisi dolor consequat voluptate duis irure. Veniam quis amet irure cillum elit aliquip sunt cillum cillum do aliqua voluptate ad non magna elit. Do ea n',
        image: require('../all_images/Artist Profile/Image 73.png'),
      }
    ],
    other:[
      {image: require('../all_images/Artist Profile/Image 74.png'), title:'Magna nost', artist:'Jessica Gonzalez'},
      {image: require('../all_images/Artist Profile/Image 75.png'), title:'Exercitatio', artist:'Brian Harris'},
      {image: require('../all_images/Artist Profile/Image 76.png'), title:'Tempor', artist:'Tyler And'},
    ],
   },
  { image: require('../all_images/Home - Audio Listing/Image 39.png'), 
    name: 'Taylor Swift',
    follows : '65100',
    albums:[
      {image: require('../all_images/Artist Profile/Image 71.png'), title:'ME', artist:'Jessica Gonzalez'},
      {image: require('../all_images/Artist Profile/Image 72.png'), title:'Magna nost', artist:'Jessica Gonzalez'},
      {image: require('../all_images/Artist Profile/Image 77.png'), title:'Proident', artist:'Jessica Gonzalez'},
    ],
    about:[
      {
        desp: 'Do in cupidatat aute et in officia aute laboris est Lorem est nisi dolor consequat voluptate duis irure. Veniam quis amet irure cillum elit aliquip sunt cillum cillum do aliqua voluptate ad non magna elit. Do ea n',
        image: require('../all_images/Artist Profile/Image 73.png'),
      }
    ],
    other:[
      {image: require('../all_images/Artist Profile/Image 74.png'), title:'Magna nost', artist:'Jessica Gonzalez'},
      {image: require('../all_images/Artist Profile/Image 75.png'), title:'Exercitatio', artist:'Brian Harris'},
      {image: require('../all_images/Artist Profile/Image 76.png'), title:'Tempor', artist:'Tyler And'},
    ],
   },
  { image: require('../all_images/Home - Audio Listing/Image 40.png'), 
    name: 'Bruno Mars',
    follows : '65100',
    albums:[
      {image: require('../all_images/Artist Profile/Image 71.png'), title:'ME', artist:'Jessica Gonzalez'},
      {image: require('../all_images/Artist Profile/Image 72.png'), title:'Magna nost', artist:'Jessica Gonzalez'},
      {image: require('../all_images/Artist Profile/Image 77.png'), title:'Proident', artist:'Jessica Gonzalez'},
    ],
    about:[
      {
        desp: 'Do in cupidatat aute et in officia aute laboris est Lorem est nisi dolor consequat voluptate duis irure. Veniam quis amet irure cillum elit aliquip sunt cillum cillum do aliqua voluptate ad non magna elit. Do ea n',
        image: require('../all_images/Artist Profile/Image 73.png'),
      }
    ],
    other:[
      {image: require('../all_images/Artist Profile/Image 74.png'), title:'Magna nost', artist:'Jessica Gonzalez'},
      {image: require('../all_images/Artist Profile/Image 75.png'), title:'Exercitatio', artist:'Brian Harris'},
      {image: require('../all_images/Artist Profile/Image 76.png'), title:'Tempor', artist:'Tyler And'},
    ],
   },
  { image: require('../all_images/Home - Audio Listing/Image 41.png'), 
    name: 'Ariana Grande',
    follows : '65100',
    albums:[
      {image: require('../all_images/Artist Profile/Image 71.png'), title:'ME', artist:'Jessica Gonzalez'},
      {image: require('../all_images/Artist Profile/Image 72.png'), title:'Magna nost', artist:'Jessica Gonzalez'},
      {image: require('../all_images/Artist Profile/Image 77.png'), title:'Proident', artist:'Jessica Gonzalez'},
    ],
    about:[
      {
        desp: 'Do in cupidatat aute et in officia aute laboris est Lorem est nisi dolor consequat voluptate duis irure. Veniam quis amet irure cillum elit aliquip sunt cillum cillum do aliqua voluptate ad non magna elit. Do ea n',
        image: require('../all_images/Artist Profile/Image 73.png'),
      }
    ],
    other:[
      {image: require('../all_images/Artist Profile/Image 74.png'), title:'Magna nost', artist:'Jessica Gonzalez'},
      {image: require('../all_images/Artist Profile/Image 75.png'), title:'Exercitatio', artist:'Brian Harris'},
      {image: require('../all_images/Artist Profile/Image 76.png'), title:'Tempor', artist:'Tyler And'},
    ],
   },
  { image: require('../all_images/Home - Audio Listing/Image 39.png'), 
    name: 'Billie Eilish',
    follows : '65100',
    albums:[
      {image: require('../all_images/Artist Profile/Image 71.png'), title:'ME', artist:'Jessica Gonzalez'},
      {image: require('../all_images/Artist Profile/Image 72.png'), title:'Magna nost', artist:'Jessica Gonzalez'},
      {image: require('../all_images/Artist Profile/Image 77.png'), title:'Proident', artist:'Jessica Gonzalez'},
    ],
    about:[
      {
        desp: 'Do in cupidatat aute et in officia aute laboris est Lorem est nisi dolor consequat voluptate duis irure. Veniam quis amet irure cillum elit aliquip sunt cillum cillum do aliqua voluptate ad non magna elit. Do ea n',
        image: require('../all_images/Artist Profile/Image 73.png'),
      }
    ],
    other:[
      {image: require('../all_images/Artist Profile/Image 74.png'), title:'Magna nost', artist:'Jessica Gonzalez'},
      {image: require('../all_images/Artist Profile/Image 75.png'), title:'Exercitatio', artist:'Brian Harris'},
      {image: require('../all_images/Artist Profile/Image 76.png'), title:'Tempor', artist:'Tyler And'},
    ],
   },
  { image: require('../all_images/Home - Audio Listing/Image 40.png'), 
    name: 'Justin Bieber',
    follows : '65100',
    albums:[
      {image: require('../all_images/Artist Profile/Image 71.png'), title:'ME', artist:'Jessica Gonzalez'},
      {image: require('../all_images/Artist Profile/Image 72.png'), title:'Magna nost', artist:'Jessica Gonzalez'},
      {image: require('../all_images/Artist Profile/Image 77.png'), title:'Proident', artist:'Jessica Gonzalez'},
    ],
    about:[
      {
        desp: 'Do in cupidatat aute et in officia aute laboris est Lorem est nisi dolor consequat voluptate duis irure. Veniam quis amet irure cillum elit aliquip sunt cillum cillum do aliqua voluptate ad non magna elit. Do ea n',
        image: require('../all_images/Artist Profile/Image 73.png'),
      }
    ],
    other:[
      {image: require('../all_images/Artist Profile/Image 74.png'), title:'Magna nost', artist:'Jessica Gonzalez'},
      {image: require('../all_images/Artist Profile/Image 75.png'), title:'Exercitatio', artist:'Brian Harris'},
      {image: require('../all_images/Artist Profile/Image 76.png'), title:'Tempor', artist:'Tyler And'},
    ],
   },
  { image: require('../all_images/Home - Audio Listing/Image 41.png'), 
    name: 'Katy Perry',
    follows : '65100',
    albums:[
      {image: require('../all_images/Artist Profile/Image 71.png'), title:'ME', artist:'Jessica Gonzalez'},
      {image: require('../all_images/Artist Profile/Image 72.png'), title:'Magna nost', artist:'Jessica Gonzalez'},
      {image: require('../all_images/Artist Profile/Image 77.png'), title:'Proident', artist:'Jessica Gonzalez'},
    ],
    about:[
      {
        desp: 'Do in cupidatat aute et in officia aute laboris est Lorem est nisi dolor consequat voluptate duis irure. Veniam quis amet irure cillum elit aliquip sunt cillum cillum do aliqua voluptate ad non magna elit. Do ea n',
        image: require('../all_images/Artist Profile/Image 73.png'),
      }
    ],
    other:[
      {image: require('../all_images/Artist Profile/Image 74.png'), title:'Magna nost', artist:'Jessica Gonzalez'},
      {image: require('../all_images/Artist Profile/Image 75.png'), title:'Exercitatio', artist:'Brian Harris'},
      {image: require('../all_images/Artist Profile/Image 76.png'), title:'Tempor', artist:'Tyler And'},
    ],
   },
  { image: require('../all_images/Home - Audio Listing/Image 39.png'), 
    name: 'Drake',
    follows : '65100',
    albums:[
      {image: require('../all_images/Artist Profile/Image 71.png'), title:'ME', artist:'Jessica Gonzalez'},
      {image: require('../all_images/Artist Profile/Image 72.png'), title:'Magna nost', artist:'Jessica Gonzalez'},
      {image: require('../all_images/Artist Profile/Image 77.png'), title:'Proident', artist:'Jessica Gonzalez'},
    ],
    about:[
      {
        desp: 'Do in cupidatat aute et in officia aute laboris est Lorem est nisi dolor consequat voluptate duis irure. Veniam quis amet irure cillum elit aliquip sunt cillum cillum do aliqua voluptate ad non magna elit. Do ea n',
        image: require('../all_images/Artist Profile/Image 73.png'),
      }
    ],
    other:[
      {image: require('../all_images/Artist Profile/Image 74.png'), title:'Magna nost', artist:'Jessica Gonzalez'},
      {image: require('../all_images/Artist Profile/Image 75.png'), title:'Exercitatio', artist:'Brian Harris'},
      {image: require('../all_images/Artist Profile/Image 76.png'), title:'Tempor', artist:'Tyler And'},
    ],
   },
];
export default function Home({ navigation }) {
  
  const renderSuggestionItem = ({ item }) => (
    <TouchableOpacity style={styles.product}>
      <Image style={styles.image} source={item} />
    </TouchableOpacity>
  );
  
  const renderChartItem = ({ item }) => (
    <TouchableOpacity style={styles.product2}
      onPress={() => navigation.navigate('PlayListScreen', {img: item.image,text: item.text})}
    >
      <Image source={item.image} />
      <Text style={styles.textImg}>{item.text}</Text>
    </TouchableOpacity>
  );
  
  const renderTrendingAlbumItem = ({ item }) => (
    <TouchableOpacity style={styles.product2}>
      <Image source={item.image} />
      <Text style={styles.albumTitle}>{item.title}</Text>
      <Text style={styles.albumArtist}>{item.artist}</Text>
    </TouchableOpacity>
  );
  
  const renderPopularArtistItem = ({ item }) => (
    <TouchableOpacity style={styles.product3}
      onPress={() => navigation.navigate('ArtistProfileScreen', {
        image: item.image,
        name: item.name,
        follows: item.follows,
        albums: item.albums,
        about: item.about,
        other: item.other
      })}
    >
      <Image source={item.image} />
      <Text style={styles.artistName}>{item.name}</Text>
      <TouchableOpacity style={{ width: 70, margin: '0 auto' }}>
        <Text style={styles.btnFollow}>Follow</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );  

  const handleFocus = () => {
    navigation.navigate("Search");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.box}>
          <View style={{
            width: '100%',
            height: 100,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Image style={{
              width: 30,
              height: 30,
              color: 'black',
            }} source={require('../all_images/Home - Audio Listing/Image 36.png')} />
            <View style={{
              height: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <FontAwesome name="bell" style={{
                marginHorizontal: 20,
              }} size={20} />
              <Image source={require('../all_images/Feed - Comment on an Audio/Avatar 8.png')} />
            </View>
          </View>
        </View>

        <View style={styles.box}>
          <View style={{
            width: '100%',
          }}>
            <Text style={{ color: 'gray' }}> Good morning,</Text>
            <Text style={{ fontSize: 25, fontWeight: 'bold' }}> Ashley Scott</Text>
          </View>
        </View>

        <View style={styles.box}>
          <View style={{ width: '100%', marginVertical: 10 }}>
            <TextInput style={{
              position: 'relative',
              padding: 10,
              paddingLeft: 40,
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 50,
            }} placeholder='What you want to listen to'
              onFocus={handleFocus} />
            <FontAwesome name="search" style={{
              marginHorizontal: 20,
              position: 'absolute',
              top: 10,
              left: -5,
            }} size={20} />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Suggestions for you</Text>
        <FlatList
          contentContainerStyle={styles.suggestionsList} 
          data={suggestions}
          renderItem={renderSuggestionItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
        />

        <Text style={styles.sectionTitle}>Charts</Text>
        <FlatList
          contentContainerStyle={styles.chartsList} 
          data={charts}
          renderItem={renderChartItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
        />

        <Text style={styles.sectionTitle}>Trending albums</Text>
        <FlatList
          contentContainerStyle={styles.trendingAlbumsList} 
          data={trendingAlbums}
          renderItem={renderTrendingAlbumItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
        />

        <Text style={styles.sectionTitle}>Popular artists</Text>
        <FlatList
          contentContainerStyle={styles.popularArtistsList} 
          data={popularArtists}
          renderItem={renderPopularArtistItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
        />
      </ScrollView>
      <Playing/>
      <Footer/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  box: {
    padding: 10,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },

  sectionTitle: {
    margin:8,
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },

  suggestionsList: {
    margin:8,
    height: 270,
    gap: 20, 
  },
  chartsList: {
    margin:8,
    height: 180,
    gap: 20, 
  },
  trendingAlbumsList: {
    margin:8,
    height: 180,
    gap: 20, 
  },
  popularArtistsList: {
    margin:8,
    height: 220,
    gap: 20, 
  },

  image: {
    width: 230,
    height: 270,
    borderRadius: 10,
  },

  textImg: {
    marginTop: 5,
    textAlign: 'center',
  },
  albumTitle: {
    margin:8,
    fontWeight: 'bold',
    marginTop: 5,
  },
  albumArtist: {
    color: 'gray',
  },
  artistName: {
    textAlign: 'center',
  },

  searchInputContainer: {
    position: 'relative',
    padding: 10,
    paddingLeft: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 50,
  },
  searchIcon: {
    position: 'absolute',
    top: 10,
    left: 15,
  },
  product3:{
    gap:6,
    alignItems:'center',
  },
  btnFollow:{
    backgroundColor:'black',
    color:'white',
    padding:5,
    textAlign:'center',
    borderRadius:20,
  }
});


