import React, { useEffect, useState } from 'react'; // import useEffect
import { NavigationContainer } from '@react-navigation/native'; // Đừng quên import NavigationContainer
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // import Stack Navigator
import Home from './pages/Home';
import Login from './pages/Login';
import PlayListScreen from './pages/PlayListScreen';
import SongScreen from './pages/SongScreen';
import { MusicProvider } from './pages/MusicProvider';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <MusicProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="PlayListScreen" component={PlayListScreen} />
                    <Stack.Screen name="SongScreen" component={SongScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </MusicProvider>
    );
}
