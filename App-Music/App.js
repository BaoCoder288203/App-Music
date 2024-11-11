import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { MusicProvider } from './pages/MusicProvider';
import Home from './pages/Home';
import Login from './pages/Login';
import PlayListScreen from './pages/PlayListScreen';
import SongScreen from './pages/SongScreen';
import Search from './pages/Search';
import Feed from './pages/Feed';
import PremiumScreen from './pages/PremiumScreen';
import PremiumChoiceScreen from './pages/PremiumChoiceScreen';
import ArtistProfileScreen from './pages/ArtistProfileScreen';
import YourLibrary from './pages/YourLibrary';
import YourPlaylists from './pages/YourPlaylists';

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
                    <Stack.Screen name="Search" component={Search} options={{ headerShown: false }}/>
                    <Stack.Screen name="Feed" component={Feed} options={{ headerShown: false }}/>
                    <Stack.Screen name="ArtistProfileScreen" component={ArtistProfileScreen}/>
                    <Stack.Screen name="YourLibrary" component={YourLibrary}/>
                    <Stack.Screen name="YourPlaylists" component={YourPlaylists}/>
                    <Stack.Screen name="PremiumScreen" component={PremiumScreen} options={{headerShown: false}} />
                    <Stack.Screen name="PremiumChoiceScreen" component={PremiumChoiceScreen} options={{headerShown: false}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </MusicProvider>
    );
}
