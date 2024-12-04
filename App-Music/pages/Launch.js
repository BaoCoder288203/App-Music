import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';

export default function Launch({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: '100%' }}>
        <Image style={styles.imgBack} source={require('../all_images/Launch Screen/Image 30.png')} />
        <View style={styles.screenLanch}>
          <View style={{ 
            flex: 1,
           }}>
            <Image style={styles.imgLogo} source={require('../all_images/Launch Screen/Image 33.png')} />
          </View>
          <View style={{
            flex: 1,
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <View style={{  
            flex: 1,
            width: 180  
            }}>
              <Text style={{
                fontSize: 35,
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'white'
              }}>
                Your music Your artists
              </Text>
            </View>
            <View style={styles.btns}>
              <TouchableOpacity
                style={styles.btn1}
                onPress={() => navigation.navigate('Home')}>  
                <Text style={styles.textBtn1}> Start with Premium </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn2}
                onPress={() => navigation.navigate('Register')}>  
                <Text style={styles.textBtn1}> Create an account </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn3}
                onPress={() => navigation.navigate('Login')}>  
                <Text style={styles.textBtn2}> I already have an account </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenLanch: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgBack: {
    width: '100%',
    position: 'absolute',
  },
  imgLogo: {
    width: 90,
    height: 50,
    marginTop: 70,
  },
  btns: {
    flex: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    gap:10,
  },
  textBtn1: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  textBtn2: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  btn1: {
    flex: 1,
    backgroundColor: '#1d1d1d',
    borderRadius: 50,
    width: '100%',
    marginTop: 50,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  btn2: {
    flex: 1,
    backgroundColor: '#1d1d1d',
    borderRadius: 50,
    width: '100%',
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  btn3: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 50,
    width: '100%',
    paddingHorizontal:15,
    justifyContent: 'center', 
    alignItems: 'center', 
  }
});
