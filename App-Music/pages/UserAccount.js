import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { FontAwesome, MaterialIcons, AntDesign, FontAwesome6 } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { loadUserData, resetUserState, logoutUser } from '../Redux_Toolkit/userSlice';
import Playing from './Playing';
import { Footer } from '../layout/Footer';
import SongOptionsMenu from './SongOptionsMenu';
import CreatePlaylistModal from './CreatePlaylistModal';

const UserAccount = () => {
    const dispatch = useDispatch();
    const { favorites, playlists, albums, artists, userId, name, avatarUrl } = useSelector((state) => state.user);
    const [modalVisible, setModalVisible] = useState(false);
    const [songOptionsVisible, setSongOptionsVisible] = useState(false);
    const [selectedSong, setSelectedSong] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const loadUserDataIfTokenExists = async () => {
            const token = await AsyncStorage.getItem('userToken');
            if (token) {
                dispatch(loadUserData());
            }
        };
        loadUserDataIfTokenExists();
    }, [dispatch]);

    const handleFavoriteSongs = () => {
        navigation.navigate('FavoriteSongsScreen');
    };

    const handleLogout = async () => {
        try {
            await dispatch(logoutUser()).unwrap();
            await AsyncStorage.removeItem('userToken');
            dispatch(resetUserState());
            navigation.navigate('Login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const renderPlaylistItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.playlistContainer}
            onPress={() => navigation.navigate('PlaylistDetail', { playlist: item })}
        >
            <Image 
                source={item.songs[0]?.image ? { uri: item.songs[0].image } : ''}
                style={styles.imgPlaylist}
            />
            <View style={{ marginLeft: 20 }}>
                <Text style={styles.playlistTitle}>{item?.name}</Text>
                <Text style={styles.playlistArtist}>by You</Text>
                <Text style={styles.songCount}>{item.songs?.length} songs</Text>
            </View>
        </TouchableOpacity>
    );

    const renderAlbumItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.albumContainer}
            onPress={() => navigation.navigate('AlbumDetail', { albumId: item.albumId })}
        >
            <Image source={{ uri: item.img }} style={styles.imgPlaylist} />
            <View style={{ marginLeft: 20 }}>
                <Text style={styles.playlistTitle}>{item.title}</Text>
                <Text style={styles.playlistArtist}>by {item.artist}</Text>
                <Text style={styles.songCount}>{item.songsCount} songs</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView 
                style={styles.container}
                showsVerticalScrollIndicator={false} 
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View style={styles.userHeader}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <FontAwesome name="angle-left" size={35} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>User Account</Text>
                    <View style={styles.headerIcons}>
                        <TouchableOpacity>
                            <FontAwesome name="gear" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <MaterialIcons name="notifications" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                            <FontAwesome name="search" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.userInfo}>
                    <Image source={{ uri: avatarUrl }} style={styles.userAvatar} />
                    <View style={styles.userDetails}>
                        <Text style={styles.userName}>{name}</Text>
                        <View style={styles.followStats}>
                            <View style={styles.statItem}>
                                <Text style={styles.statNumber}>{artists.length}</Text>
                                <Text style={styles.statLabel}>Following</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Text style={styles.statNumber}>{artists.length}</Text>
                                <Text style={styles.statLabel}>Follower</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={styles.premiumNavigation} onPress={() => navigation.navigate('PremiumScreen')}>
                    <Text style={styles.premiumText}>Premium</Text>
                    <FontAwesome name="angle-right" size={24} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.favoriteSongs} onPress={handleFavoriteSongs}>
                    <View style={styles.favoriteIcon}>
                        <FontAwesome name="heart" size={24} color="white" />
                    </View>
                    <View>
                        <Text style={styles.favoriteTitle}>Favorite</Text>
                        <Text style={styles.favoriteCount}>{favorites.length} songs</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Playlist ({playlists?.length || 0})</Text>
                        <View style={styles.sectionIcons}>
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <AntDesign name="pluscircleo" size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <FontAwesome6 name="list-check" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{flex:1, height:300}}>
                        <FlatList
                            data={playlists}
                            keyExtractor={(item) => item.id}
                            renderItem={renderPlaylistItem}
                            scrollEnabled={false}
                        />
                    </View>
                </View>

                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Album ({albums?.length || 0})</Text>
                        <TouchableOpacity>
                            <FontAwesome6 name="list-check" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={albums}
                        keyExtractor={(item) => item.albumId}
                        renderItem={renderAlbumItem}
                        scrollEnabled={false}
                    />
                </View>

                <TouchableOpacity style={styles.signOutButton} onPress={handleLogout}>
                    <Text style={styles.signOutText}>Sign out</Text>
                    <FontAwesome name="sign-out" size={24} color="red" />
                </TouchableOpacity>
            </ScrollView>

            <CreatePlaylistModal
                visible={modalVisible} 
                onClose={() => setModalVisible(false)} 
                userId={userId} 
            />
            <SongOptionsMenu 
                visible={songOptionsVisible} 
                onClose={() => setSongOptionsVisible(false)} 
                song={selectedSong} 
            />
            <Playing />
            <Footer />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 7,
        marginRight: 5,
        paddingTop:20,
    },
    userHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 15,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    headerIcons: {
        flexDirection: 'row',
        width: 100,
        justifyContent: 'space-between',
    },
    userInfo: {
        margin: 15,
        borderRadius: 20,
        backgroundColor: 'white',
        padding: 20,
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 1,
    },
    userAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    userDetails: {
        marginLeft: 20,
        justifyContent: 'space-between',
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    followStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 130,
    },
    statItem: {
        alignItems: 'center',
        width: 60,
    },
    statNumber: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    statLabel: {
        fontSize: 14,
    },
    premiumNavigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 15,
        borderRadius: 20,
        backgroundColor: '#BF3EFF',
        padding: 10,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 1,
    },
    premiumText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    favoriteSongs: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 20,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 1,
    },
    favoriteIcon: {
        backgroundColor: 'pink',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginRight: 15,
    },
    favoriteTitle: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    favoriteCount: {
        fontSize: 15,
        color: 'gray',
    },
    sectionContainer: {
        marginVertical: 10,
        marginHorizontal: 15,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 1,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    sectionIcons: {
        flexDirection: 'row',
        width: 70,
        justifyContent: 'space-between',
    },
    playlistContainer: {
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    albumContainer: {
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    imgPlaylist: {
        width: 60,
        height: 60,
        borderRadius: 10,
    },
    playlistTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    playlistArtist: {
        fontSize: 14,
        color: 'gray',
    },
    songCount: {
        fontSize: 14,
        color: 'gray',
    },
    signOutButton: {
        margin: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'lightgray',
        padding: 15,
        borderRadius: 20,
    },
    signOutText: {
        fontSize: 18,
    },
});

export default UserAccount;
