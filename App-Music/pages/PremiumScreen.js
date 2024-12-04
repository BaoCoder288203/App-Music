import React from 'react';
import { ScrollView, View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
export default function PremiumScreen({ navigation }) {

    return(
        <SafeAreaView style={styles.container}>
            <View style={{flex:1}}>
                <Image style={styles.imgBack} source={require('../all_images/Launch Screen - Premium/Image 112.png')} />
                <TouchableOpacity 
                    style={styles.backButton} 
                    onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={40} color="white" />
                </TouchableOpacity>
                <View style={styles.imageContainer}>
                    <Image style={styles.imgFront} source={require('../all_images/Launch Screen - Premium/Image 113.png')} />
                </View>
                <View style={styles.imageContainer}>
                    <Image style={styles.imgDown} source={require('../all_images/Launch Screen - Premium/Welcome toPremium.png')} />
                </View>
                <TouchableOpacity style={styles.buttonContainer} 
                    onPress={() => navigation.navigate('PremiumChoiceScreen')}
                >
                    <Image source={require('../all_images/Launch Screen - Premium/Button 14.png')} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container:{
        flex : 1,
    },
    backButton: {
        width: 50,
        height: 50,
        marginTop:25,
        marginLeft:20,
    },
    imgBack: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        resizeMode: 'cover',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',  
    },
    imgFront: {
        width: 150,
        height: 150,
        resizeMode: 'contain', 
    },
    buttonContainer: {
        flex: 0.25,
        justifyContent: 'center', 
        alignItems: 'center',  
        marginBottom : 30,
    },
});