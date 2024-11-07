import { SafeAreaView, TouchableOpacity, ScrollView, TextInput, Image, Text, View, StyleSheet, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export const Footer = () => {
    return(
        <View style={styles.footer}>
        {['Home', 'Search', 'Feed', 'Library'].map((item) => (
            <TouchableOpacity key={item} style={styles.footerButton}>
            <FontAwesome name={item.toLowerCase()} size={20} style={styles.footerIcon} />
            <Text style={styles.footerText}>{item}</Text>
            </TouchableOpacity>
        ))}
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
  