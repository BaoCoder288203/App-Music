import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider, useDispatch } from 'react-redux';
import store from './Redux_Toolkit/store';
import { loadUserData, setUserId } from './Redux_Toolkit/userSlice';

// Import screens
import Home from './pages/Home';
import Launch from './pages/Launch';
import PlayListScreen from './pages/PlayListScreen';
import SongScreen from './pages/SongScreen';
import Search from './pages/Search';
import Feed from './pages/Feed';
import PremiumScreen from './pages/PremiumScreen';
import PremiumChoiceScreen from './pages/PremiumChoiceScreen';
import ArtistProfileScreen from './pages/pageDetails/ArtistProfileScreen';
import Register from './pages/pageLogin/Register';
import Login from './pages/pageLogin/Login';
import UserAccount from './pages/UserAccount';
import FavoriteSongsScreen from './pages/FavoriteSongsScreen';
import Playing from './pages/Playing';
import { AlbumDetailsScreen } from './pages/pageDetails/AlbumDetailsScreen';
import PlaylistDetail from './pages/PlaylistDetail';
import TrackPlayer, { Capability } from 'react-native-track-player';
import { setupPlayer } from 'react-native-track-player/lib/src/trackPlayer';
import YourLibrary from './pages/YourLibrary';

const Stack = createNativeStackNavigator();

export default function App() {
    const [initialRoute, setInitialRoute] = useState('Launch');
    const [isPlayerReady, setIsPlayerReady] = useState(false);

    useEffect(() => {
        const initializeApp = async () => {
            try {
                // Khởi tạo TrackPlayer 
                await setupPlayer();
                setIsPlayerReady(true);

                const userId = await AsyncStorage.getItem('userId');
                if (userId) {
                    store.dispatch(setUserId(userId));
                    store.dispatch(loadUserData());
                    setInitialRoute('Home');
                } else { 
                    setInitialRoute('Launch'); 
                }
            } catch (error) {
                console.error('Error initializing app:', error);
            }
        };

        initializeApp();  
    }, []);  

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName={initialRoute}>
                    <Stack.Screen name="Launch" component={Launch} options={{ headerShown: false }} />
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                    <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                    <Stack.Screen name="UserAccount" component={UserAccount} options={{ headerShown: false }} />
                    <Stack.Screen name="PlayListScreen" component={PlayListScreen} />
                    <Stack.Screen name="FavoriteSongsScreen" component={FavoriteSongsScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="SongScreen" component={SongScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Playing" component={Playing} /> 
                    <Stack.Screen name="AlbumDetailsScreen" component={AlbumDetailsScreen} options={{ headerShown: false }} /> 
                    <Stack.Screen name="ArtistProfileScreen" component={ArtistProfileScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
                    <Stack.Screen name="PlaylistDetail" component={PlaylistDetail} options={{ headerShown: false }} />
                    <Stack.Screen name="Feed" component={Feed} options={{ headerShown: false }} />
                    <Stack.Screen name="PremiumScreen" component={PremiumScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="YourLibrary" component={YourLibrary} options={{ headerShown: false }} />
                    <Stack.Screen name="PremiumChoiceScreen" component={PremiumChoiceScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

