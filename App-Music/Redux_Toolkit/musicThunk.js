import { setSongCurrent, setIsPlaying, setDuration, setIsLoaded } from './songSlice';
import TrackPlayer, { Capability, Event, State } from 'react-native-track-player';


const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};



export const playSong = (song) => async (dispatch) => {
  try {
    if (!song || !song.id) {
      throw new Error('Invalid song object');
    }
    await TrackPlayer.reset();

    await TrackPlayer.add({
      id: song.id.toString(),
      url: song.audio,
      title: song.name,
      artist: song.artist_name,
      artwork: song.image,
    });

    dispatch(setIsLoaded(true));
    dispatch(setSongCurrent(song));
    
    await TrackPlayer.play();
    dispatch(setIsPlaying(true));

    const duration = await TrackPlayer.getDuration();
    dispatch(setDuration(formatDuration(duration)));

    TrackPlayer.addEventListener(Event.PlaybackState, async (event) => {
      if (event.state === State.Playing) {
        dispatch(setIsPlaying(true));
      } else if (event.state === State.Paused) {
        dispatch(setIsPlaying(false));
      }
    });

    TrackPlayer.addEventListener(Event.PlaybackTrackChanged, async () => {
      const duration = await TrackPlayer.getDuration();
      dispatch(setDuration(formatDuration(duration)));
    });

  } catch (error) {
    console.error('Error playing song:', error);
  }
};

export const playPauseSong = () => async (dispatch, getState) => {
  try {
    const { isPlaying } = getState().song; // Lấy trạng thái isPlaying từ Redux

    if (isPlaying) {
      await TrackPlayer.pause(); // Dừng bài hát
      dispatch(setIsPlaying(false)); // Cập nhật Redux để báo rằng bài hát đã bị dừng
    } else {
      await TrackPlayer.play(); // Phát bài hát
      dispatch(setIsPlaying(true)); // Cập nhật Redux để báo rằng bài hát đang phát
    }
  } catch (error) {
    console.error('Error toggling play/pause:', error);
  }
};



export const playNextSong = () => async (dispatch, getState) => {
  try {
    await ensurePlayerReady();
    await TrackPlayer.skipToNext();
    const currentTrack = await TrackPlayer.getCurrentTrack();
    const { songList } = getState().song;
    const nextSong = songList.find(song => song.id.toString() === currentTrack);
    if (nextSong) {
      dispatch(playSong(nextSong));
    }
  } catch (error) {
    console.error('Error playing next song:', error);
  }
};

export const playBackSong = () => async (dispatch, getState) => {
  try {
    await ensurePlayerReady();
    await TrackPlayer.skipToPrevious();
    const currentTrack = await TrackPlayer.getCurrentTrack();
    const { songList } = getState().song;
    const previousSong = songList.find(song => song.id.toString() === currentTrack);
    if (previousSong) {
      dispatch(playSong(previousSong));
    }
  } catch (error) {
    console.error('Error playing previous song:', error);
  }
};

export const playRandomSong = () => async (dispatch, getState) => {
  try {
    const { songList } = getState().song;
    const randomIndex = Math.floor(Math.random() * songList.length);
    const randomSong = songList[randomIndex];
    dispatch(playSong(randomSong));
  } catch (error) {
    console.error('Error playing random song:', error);
  }
};

export const repeatCurrentSong = () => async (dispatch, getState) => {
  try {
    const { songCurrent } = getState().song;
    if (songCurrent) {
      await TrackPlayer.seekTo(0);
      dispatch(playSong(songCurrent));
    }
  } catch (error) {
    console.error('Error repeating current song:', error);
  }
};

