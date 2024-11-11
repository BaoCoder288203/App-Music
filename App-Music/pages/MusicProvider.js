import React, { createContext, useContext, useState, useEffect } from 'react';
import { Audio } from 'expo-av';

const MusicContext = createContext();

export const songs = [
    {
        title: "Death Bed",
        artist: "Powfu",
        artwork: require('../all_images/Playlist Details - Audio Listing/Image 51.png'),
        url: "https://samplesongs.netlify.app/Death%20Bed.mp3",
        id: '1',
        plays: '2.1M',
    },
    {
        title: "Bad Liar",
        artist: "Imagine Dragons",
        artwork: require('../all_images/Playlist Details - Audio Listing/Image 52.png'),
        url: "https://samplesongs.netlify.app/Bad%20Liar.mp3",
        id: '2',
        plays: '68M', 
    },
    {
        title: "Faded",
        artist: "Alan Walker",
        artwork: require('../all_images/Playlist Details - Audio Listing/Image 53.png'),
        url: "https://samplesongs.netlify.app/Faded.mp3",
        id: '3', 
        plays: '93M', 
    },
    {
        title: "Hate Me",
        artist: "Ellie Goulding",
        artwork: require('../all_images/Playlist Details - Audio Listing/Image 54.png'),
        url: "https://samplesongs.netlify.app/Hate%20Me.mp3",
        id: '4', 
        plays: '9M', 
    },
    {
        title: "Solo",
        artist: "Clean Bandit",
        artwork: require('../all_images/Playlist Details - Audio Listing/Image 55.png'),
        url: "https://samplesongs.netlify.app/Solo.mp3",
        id: '5', 
        plays: '23M', 
    },
    {
        title: "Without Me",
        artist: "Halsey",
        artwork: require('../all_images/Playlist Details - Audio Listing/Image 56.png'),
        url: "https://samplesongs.netlify.app/Without%20Me.mp3",
        id: '6', 
        plays: '10M', 
    },
]

export const MusicProvider = ({ children }) => {
    const [songCurrent, setSongCurrent] = useState(null);
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState('0:00'); // Đặt mặc định là chuỗi "0:00"
    const [isLoaded, setIsLoaded] = useState(false);

    const formatDuration = (millis) => {
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000).toFixed(0);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const playSong = async (song) => {
        if (sound) {
            await sound.unloadAsync(); 
        }

        const { sound: newSound, status } = await Audio.Sound.createAsync(
            { uri: song.url },
            { 
                shouldPlay: true,
                onPlaybackStatusUpdate: (status) => {
                    if (status.isLoaded) {
                        if (status.durationMillis > 0 && !isLoaded) {
                            setDuration(formatDuration(status.durationMillis)); 
                            setIsLoaded(true);
                        }
                    }
                }
            }
        );

        setSound(newSound);
        setSongCurrent(song);

        if (isLoaded) {
            await newSound.playAsync();
            setIsPlaying(true);
        }
    };

    const playPauseSong = async () => {
        if (sound) {
            if (isPlaying) {
                await sound.pauseAsync();
                setIsPlaying(false);
            } else {
                await sound.playAsync();
                setIsPlaying(true);
            }
        }
    };
    
    useEffect(() => {
        return sound ? () => { sound.unloadAsync(); } : undefined;
    }, [sound]);

    return (
        <MusicContext.Provider value={{ songCurrent, isPlaying, setIsPlaying, playSong, playPauseSong, duration, setDuration }}>
            {children}
        </MusicContext.Provider>
    );
};


export const useMusic = () => useContext(MusicContext);