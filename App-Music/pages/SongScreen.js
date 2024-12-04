import React, {useEffect, useRef} from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet, FlatList, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { playSong, playPauseSong, playNextSong, playBackSong, playRandomSong, repeatCurrentSong } from '../Redux_Toolkit/musicThunk';
import { addFavorite, loadUserData, removeFavorite } from '../Redux_Toolkit/userSlice';

export default function SongScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { songCurrent, isPlaying, status,currentTime} = useSelector((state) => state.song);
  const { favorites } = useSelector((state) => state.user);

  useEffect(() => {
    if (status.fetchMusicData === 'idle') {
      dispatch(loadUserData());
    }
  }, [dispatch, status]);

  const isFavorite = (song) => favorites.some((fav) => fav.id === song.id);

  const toggleFavorite = async (song) => {
    if (isFavorite(song)) {
      await dispatch(removeFavorite(song.id));
    } else {
      await dispatch(addFavorite(song));
      dispatch(loadUserData());
    }
  };
  const handlePlayPause = () => dispatch(playPauseSong());
  const handleNextSong = () => dispatch(playNextSong());
  const handleBackSong = () => dispatch(playBackSong());
  const handleRandomSong = () => dispatch(playRandomSong());
  const handleRepeatSong = () => dispatch(repeatCurrentSong());
  const handleSelectSong = (song) => { 
    if (song.id !== songCurrent?.id) dispatch(playSong(song));
  };
  const handleAddPlaylist = (song) => {
    if (song.id !== songCurrent?.id) dispatch(playSong(song));
  };

  //-----------Amination Image Song
   // Tạo Animated.Value cho việc xoay
   const rotateValue = useRef(new Animated.Value(0)).current;

   // Hàm tạo hiệu ứng xoay liên tục
   const startRotation = () => {
    rotateValue.setValue(0);
     Animated.loop(
       Animated.timing(rotateValue, {
         toValue: 1,
         duration: songCurrent.duration * 1000 , 
         useNativeDriver: true,
         easing: Easing.linear, // Đảm bảo xoay đều, không khựng
       })
     ).start();
   };
 
   // Dừng hiệu ứng xoay
   const stopRotation = () => {
     rotateValue.stopAnimation();
     rotateValue.setValue(0); // Đặt lại góc về 0 khi dừng
   };
 
   // Theo dõi trạng thái phát nhạc
   useEffect(() => {
     if (isPlaying) {
       startRotation();
     } else {
       stopRotation();
     }
   }, [isPlaying,songCurrent]);
 
   // Tạo giá trị xoay từ Animated.Value
   const rotation = rotateValue.interpolate({
     inputRange: [0, 1],
     outputRange: ['0deg', `${360 * (songCurrent.duration / 5)}deg`],
   });

   //------------Thanh Progress Bar
    // Tính toán phần trăm tiến độ bài hát
  const duration = songCurrent?.duration || 1; // Đảm bảo tránh chia cho 0
  const progress = (currentTime / duration) * 100;

  // Cập nhật currentTime theo mỗi giây
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        dispatch(updateSongTime(currentTime + 1)); // Cập nhật currentTime mỗi giây
      }, 1000);
      return () => clearInterval(interval); // Dọn dẹp interval khi không còn chơi nhạc
    }
  }, [isPlaying, currentTime, dispatch]);
console.log(currentTime);
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
  
    // Thêm 0 vào đầu nếu giây hoặc phút nhỏ hơn 10
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }
  return (
    <View style={styles.container}>
      <View style={{width:'100%'}}>
        <View style = {styles.headerPlaylists}>
          <TouchableOpacity 
            onPress={()=> navigation.goBack()}
          >
            <FontAwesome name="angle-left" size={35} color="white" />
          </TouchableOpacity>
        </View>

        {/* Hiển thị bài hát đang phát */}
        <View style={[styles.songInfoContainer]}>
          <Animated.Image
            source={{ uri: songCurrent?.image }}
            style={[styles.nowPlayingImage,{ transform: [{ rotate: rotation }] }]}
          />
        </View>
      </View>

      <View style={{width:'100%'}}>
        <View style={{
          flexDirection:'row',
          justifyContent:'space-between',
          alignItems:'center',
        }}>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => handleAddPlaylist(songCurrent)}
          >
            <Image source={require('../all_images/add-list.png')} style={{width:30,height:30,color:'white'}}/>
          </TouchableOpacity>

          <View style={styles.songDetails}>
            <Text style={styles.songTitle}>{songCurrent?.name || 'No song selected'}</Text>
            <Text style={styles.songArtist}>{songCurrent?.artist_name || 'Unknown artist'}</Text>
          </View>

          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => toggleFavorite(songCurrent)}
          >
            <Text style={styles.favoriteText}>
              {isFavorite(songCurrent) ? <FontAwesome name="heart" size={30} color="#FFF" /> : <FontAwesome name="heart-o" size={30} color="#FFF"/>}
            </Text>
          </TouchableOpacity>
        </View>

         {/* Thanh tiến trình */}
        <View style={styles.progressContainer}>
          <Animated.View
            style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>
        {/* Hiển thị thời gian */}
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(Math.floor(currentTime))}</Text>
          <Text style={styles.timeText}>{formatTime(Math.floor(duration))}</Text>
        </View>

        {/* Điều khiển phát nhạc */}
        <View style={styles.controlsContainer}>
          <TouchableOpacity onPress={handleRandomSong}>
            <FontAwesome name="random" size={24} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleBackSong}>
            <FontAwesome name="step-backward" size={28} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePlayPause}>
            <FontAwesome name={isPlaying ? 'pause' : 'play'} size={28} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNextSong}>
            <FontAwesome name="step-forward" size={28} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRepeatSong}>
            <FontAwesome name="repeat" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 20,
    paddingTop: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerPlaylists:{
    marginBottom:20,
  },
  songInfoContainer: {
    width:'100%',
    alignItems: 'center',
    justifyContent:'center',
    marginBottom: 30,
  },
  nowPlayingImage: {
    width: 300,
    height: 300,
    borderRadius: 200,
  },
  songDetails: {
    flex: 1,
  },
  songTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
    textAlign:'center',
  },
  songArtist: {
    fontSize: 18,
    color: '#AAA',
    textAlign:'center',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  extraControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  songList: {
    marginTop: 20,
  },
  songItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#333',
    marginBottom: 10,
  },
  songItemActive: {
    backgroundColor: '#555',
  },
  songItemText: {
    fontSize: 16,
    color: '#FFF',
  },
  progressContainer: {
    width: '100%',
    height: 5,
    backgroundColor: '#333', // Màu nền của thanh thời gian
    borderRadius: 5,
    marginVertical: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#1DB954', // Màu của thanh tiến trình
    borderRadius: 5,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  timeText: {
    color: '#FFF',
    fontSize: 14,
  },
});
