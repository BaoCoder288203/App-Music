import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  songList: [], 
  songCurrent: null, 
  currentTime: 0,
  sound: null,
  isPlaying: false,
  isLoaded: false, 
  status: {
    fetchMusicData: 'idle',
    fetchAlbumTracks: 'idle',
    fetchCountOfAlbums: 'idle',
    fetchTracksOfArtists: 'idle',
    fetchAlbumsOfArtists: 'idle',
  },
  charts: [], 
  duration: 0,
  trendingAlbums: [], 
  tracksByAlbum: {},
  artistAlbumsCount: 0, 
  popularArtists: [], 
  tracksOfArtists: {}, 
  albumsOfArtists:{},
};

// Hàm filterSongsByQuery để thực hiện việc lọc bài hát trong Redux.
export const selectFilteredSongs = createSelector(
  [(state) => state.song.charts, (_, query) => query],
  (charts, query) => {
    if (!query) return charts;
    return charts.filter((song) =>
      song.name.toLowerCase().includes(query.toLowerCase())
    );
  }
);

export const selectFilteredAlbums = createSelector(
  [(state) => state.song.trendingAlbums, (_, query) => query],
  (trendingAlbums, query) => {
    if (!query) return trendingAlbums;
    return trendingAlbums.filter((song) =>
      song.name.toLowerCase().includes(query.toLowerCase())
    );
  }
);

export const selectFilteredArtists = createSelector(
  [(state) => state.song.popularArtists, (_, query) => query],
  (popularArtists, query) => {
    if (!query) return popularArtists;
    return popularArtists.filter((song) =>
      song.name.toLowerCase().includes(query.toLowerCase())
    );
  }
);

// Lấy tracks theo artist
export const fetchTracksOfArtists = createAsyncThunk(
  'song/fetchTracksOfArtists',
  async (artistId, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://api.jamendo.com/v3.0/artists/tracks', {
        params: {
          client_id: '4f4d5a7c',
          id: artistId,
        },
      });

      const tracks = response.data.results[0]?.tracks || [];
      
      if (tracks.length === 0) {
        console.log(`No tracks found for artist ID ${artistId}`);
      }

      return { artistId, tracks };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch tracks');
    }
  }
);

export const fetchAlbumsOfArtists = createAsyncThunk(
  'song/fetchAlbumsOfArtists',
  async (artistId, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://api.jamendo.com/v3.0/artists/albums', {
        params: {
          client_id: '4f4d5a7c',
          id: artistId,
        },
      });

      return { artistId, albums: response.data.results[0]?.albums || [] };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch albums');
    }
  }
);

// Lấy số lượng albums theo artist
export const fetchCountOfAlbums = createAsyncThunk(
  'song/fetchCountOfAlbums',
  async (artistId, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://api.jamendo.com/v3.0/albums', {
        params: {
          client_id: '4f4d5a7c', // Thay bằng client_id của bạn
          artist_id: artistId,
        },
      });

      // Trả về số lượng albums
      return response.data.results.length;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Lấy songs theo albums
export const fetchAlbumTracks = createAsyncThunk(
  'song/fetchAlbumTracks',
  async (albumId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://api.jamendo.com/v3.0/albums/tracks`, {
        params: {
          client_id: '4f4d5a7c',
          id: albumId,
        },
      });
      return { albumId, tracks: response.data.results[0].tracks };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Thunk để fetch dữ liệu từ API
export const fetchMusicData = createAsyncThunk('song/fetchData', async () => {
  try {
    const tokenUser = await AsyncStorage.getItem('userToken');
    if (!tokenUser) {
      throw new Error('Token không tồn tại, vui lòng đăng nhập lại.');
    }
    const [tracksResponse, albumsResponse, artistsResponse] = await Promise.all([
      axios.get('https://api.jamendo.com/v3.0/tracks', {
        params: { client_id: '4f4d5a7c', token: tokenUser },
      }),
      axios.get('https://api.jamendo.com/v3.0/albums', {
        params: { client_id: '4f4d5a7c', token: tokenUser },
      }),
      axios.get('https://api.jamendo.com/v3.0/artists', {
        params: { client_id: '4f4d5a7c', token: tokenUser },
      }),
    ]);

    return {
      tracks: tracksResponse.data.results, 
      albums: albumsResponse.data.results, 
      artists: artistsResponse.data.results, 
    };
  } catch (error) {
    console.error('Lỗi khi gọi API:', error.response?.data || error.message);
    throw error;
  }
});

// Slice để quản lý trạng thái âm nhạc
const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    setSongList: (state, action) => {
      state.songList = action.payload;
    },
    setSongCurrent: (state, action) => {
      state.songCurrent = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;  // Cập nhật duration
    },
    setSound: (state, action) => {
      state.sound = action.payload;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setIsLoaded: (state, action) => {
      state.isLoaded = action.payload;
    },
    resetArtistStatus: (state) => {
      state.status.fetchTracksOfArtists = 'idle';
      state.status.fetchAlbumsOfArtists = 'idle';
    },
    resetAlbumsStatus: (state) => {
      state.status.fetchAlbumTracks = 'idle';
      state.status.fetchCountOfAlbums = 'idle';
    },
    resetsongState: (state) => {
      state.songCurrent = null;
      state.sound = null;
      state.isPlaying = false;
      state.isLoaded = false;
    },
    updateSongTime: (state, action) => {
      state.songCurrent.currentTime = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchMusicData.pending, (state) => {
      state.status.fetchMusicData = 'loading';
    })
    .addCase(fetchMusicData.fulfilled, (state, action) => {
      state.status.fetchMusicData = 'succeeded';
      state.charts = action.payload.tracks;
      state.trendingAlbums = action.payload.albums;
      state.popularArtists = action.payload.artists;
    })
    .addCase(fetchMusicData.rejected, (state, action) => {
      state.status.fetchMusicData = 'failed';
      state.error = action.error.message;
    })
    .addCase(fetchAlbumTracks.pending, (state) => {
      state.status.fetchAlbumTracks = 'loading';
    })
    .addCase(fetchAlbumTracks.fulfilled, (state, action) => {
      const { albumId, tracks } = action.payload;
      state.tracksByAlbum[albumId] = tracks;
      state.status.fetchAlbumTracks = 'succeeded';
    })
    .addCase(fetchAlbumTracks.rejected, (state, action) => {
      state.status.fetchAlbumTracks = 'failed';
      state.error = action.payload;
    })
    .addCase(fetchCountOfAlbums.pending, (state) => {
      state.status.fetchCountOfAlbums = 'loading';
    })
    .addCase(fetchCountOfAlbums.fulfilled, (state, action) => {
      state.artistAlbumsCount = action.payload;
      state.status.fetchCountOfAlbums = 'succeeded';
    })
    .addCase(fetchCountOfAlbums.rejected, (state, action) => {
      state.status.fetchCountOfAlbums = 'failed';
      state.error = action.payload || 'Failed to fetch albums';
    })
    .addCase(fetchTracksOfArtists.pending, (state) => {
      state.status.fetchTracksOfArtists = 'loading';
    })
    .addCase(fetchTracksOfArtists.fulfilled, (state, action) => {
      const { artistId, tracks } = action.payload;
      state.tracksOfArtists[artistId] = tracks;
      state.status.fetchTracksOfArtists = 'succeeded';
    })
    .addCase(fetchTracksOfArtists.rejected, (state, action) => {
      state.status.fetchTracksOfArtists = 'failed';
      state.error = action.payload || 'Failed to fetch tracks';
    })
    .addCase(fetchAlbumsOfArtists.pending, (state) => {
      state.status.fetchAlbumsOfArtists = 'loading';
    })
    .addCase(fetchAlbumsOfArtists.fulfilled, (state, action) => {
      const { artistId, albums } = action.payload;
      state.albumsOfArtists[artistId] = albums;
      state.status.fetchAlbumsOfArtists = 'succeeded';
    })
    .addCase(fetchAlbumsOfArtists.rejected, (state, action) => {
      state.status.fetchAlbumsOfArtists = 'failed';
      state.error = action.payload || 'Failed to fetch albums';
    });
  },
  
});

export const {
  setSongList,
  setSongCurrent,
  setSound,
  setDuration,
  setIsPlaying,
  setIsLoaded,
  resetsongState,
  resetArtistStatus,
  resetAlbumsStatus,
  nextSong,
  previousSong,
  updateSongTime,
} = songSlice.actions;

export default songSlice.reducer;