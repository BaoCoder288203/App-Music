import { SafeAreaView, TouchableOpacity, ScrollView, TextInput, Image, Text, View, StyleSheet, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const Footer = () => {
  const navigation = useNavigation();
    return(
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
            <FontAwesome name="home" size={20} style={styles.footerIcon} onPress={()=>navigation.navigate('Home')}/>
            <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>
    
        <TouchableOpacity style={styles.footerButton}>
            <FontAwesome name="search" size={20} style={styles.footerIcon} onPress={()=>navigation.navigate('Search')}/>
            <Text style={styles.footerText}>Search</Text>
        </TouchableOpacity>
    
        <TouchableOpacity style={styles.footerButton} onPress={()=>navigation.navigate('Feed')}>
            <FontAwesome name="feed" size={20} style={styles.footerIcon} />
            <Text style={styles.footerText}>Feed</Text>
        </TouchableOpacity>
    
        <TouchableOpacity style={styles.footerButton} onPress={()=>navigation.navigate('YourLibrary')}>
            <FontAwesome name="book" size={20} style={styles.footerIcon} />
            <Text style={styles.footerText}>Library</Text>
        </TouchableOpacity>
    </View>
    )
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#fff',
    borderTopColor: '#ccc',
    borderTopWidth: 1,
  },
  footerButton: {
    alignItems: 'center',
  },
  footerIcon: {
    marginBottom: 5,
  },
  footerText: {
    fontSize: 12,
  },
})
  