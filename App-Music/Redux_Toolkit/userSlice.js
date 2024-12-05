import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signIn, signUp, signOut } from '../firebase/firebase';

// Helper functions
const saveToStorage = async (userId, key, data) => {
  try {
    await AsyncStorage.setItem(`${key}_${userId}`, JSON.stringify(data));
  } catch (error) {
    console.error(`Failed to save ${key}:`, error);
    throw error;
  }
};

const loadFromStorage = async (userId, key) => {
  try {
    const data = await AsyncStorage.getItem(`${key}_${userId}`);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Failed to load ${key}:`, error);
    throw error;
  }
};

// Thunks
export const saveDataToStorage = createAsyncThunk(
  'user/saveDataToStorage',
  async ({ userId, key, data }, { rejectWithValue }) => {
    try {
      if (!userId) throw new Error('User ID is not set.');
      await saveToStorage(userId, key, data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loadUserData = createAsyncThunk(
  'user/loadUserData',
  async (_, { getState, rejectWithValue }) => {
    const { userId } = getState().user;
    if (!userId) return rejectWithValue('User ID is not set.');

    try {
      const [favorites, playlists, albums, artists] = await Promise.all([
        loadFromStorage(userId, 'favorites'),
        loadFromStorage(userId, 'playlists'),
        loadFromStorage(userId, 'albums'),
        loadFromStorage(userId, 'artists'),
      ]);
      return { favorites, playlists, albums, artists };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signIn(email, password);
      const userId = userCredential.user.uid;
      const token = await userCredential.user.getIdToken();

      await AsyncStorage.setItem('userId', userId);
      await AsyncStorage.setItem('userToken', token);

      return { userId, token };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signUp(email, password);
      const userId = userCredential.user.uid;
      const token = await userCredential.user.getIdToken();

      await AsyncStorage.setItem('userId', userId);
      await AsyncStorage.setItem('userToken', token);

      return { userId, token };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await signOut();
      await AsyncStorage.multiRemove(['userId', 'userToken']);
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Playlist Thunks
export const savePlaylistsToStorage = createAsyncThunk(
  'user/savePlaylistsToStorage',
  async (playlists, { getState, dispatch }) => {
    const { userId } = getState().user;
    if (userId) {
      await saveToStorage(userId, 'playlists', playlists);
      dispatch(setPlaylists(playlists));
    }
  }
);

export const loadPlaylistsFromStorage = createAsyncThunk(
  'user/loadPlaylistsFromStorage',
  async (_, { getState }) => {
    const { userId } = getState().user;
    if (userId) {
      return await loadFromStorage(userId, 'playlists');
    }
    return [];
  }
);

export const createPlaylist = createAsyncThunk(
  'user/createPlaylist',
  async (playlist, { getState, dispatch }) => {
    const { playlists } = getState().user;
    const updatedPlaylists = [...playlists, playlist];
    await dispatch(savePlaylistsToStorage(updatedPlaylists));
    return updatedPlaylists;
  }
);

export const addSongToPlaylist = createAsyncThunk(
  'user/addSongToPlaylist',
  async ({ playlistId, song }, { getState, dispatch }) => {
    const { playlists } = getState().user;
    const updatedPlaylists = playlists.map(playlist =>
      playlist.id === playlistId
        ? { ...playlist, songs: [...playlist.songs, song] }
        : playlist
    );
    await dispatch(savePlaylistsToStorage(updatedPlaylists));
    return updatedPlaylists;
  }
);

export const removeSongFromPlaylist = createAsyncThunk(
  'user/removeSongFromPlaylist',
  async ({ playlistId, songId }, { getState, dispatch }) => {
    const { playlists } = getState().user;
    const updatedPlaylists = playlists.map(playlist =>
      playlist.id === playlistId
        ? { ...playlist, songs: playlist.songs.filter(song => song.id !== songId) }
        : playlist
    );
    await dispatch(savePlaylistsToStorage(updatedPlaylists));
    return updatedPlaylists;
  }
);

export const addFavorite = createAsyncThunk(
  'user/addFavorite',
  async (item, { getState, dispatch }) => {
    const { favorites } = getState().user;
    if (!favorites.some(fav => fav.id === item.id)) {
      const updatedFavorites = [...favorites, item];
      await dispatch(saveDataToStorage({ userId: getState().user.userId, key: 'favorites', data: updatedFavorites }));
      return updatedFavorites;
    }
  }
);

export const removeFavorite = createAsyncThunk(
  'user/removeFavorite',
  async (itemId, { getState, dispatch }) => {
    const { favorites } = getState().user;
    const updatedFavorites = favorites.filter(item => item.id !== itemId);
    await dispatch(saveDataToStorage({ userId: getState().user.userId, key: 'favorites', data: updatedFavorites }));
    return updatedFavorites;
  }
);

// Slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    favorites: [],
    playlists: [],
    albums: [],
    artists: [],
    userId: '',
    token: null,
    loading: false,
    error: null,
    status: 'idle',
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    addItem: (state, action) => {
      const { itemType, item } = action.payload;
      if (!state[itemType].some(existingItem => existingItem.id === item.id)) {
        state[itemType].push(item);
      }
    },
    removeItem: (state, action) => {
      const { itemType, itemId } = action.payload;
      state[itemType] = state[itemType].filter(item => item.id !== itemId);
    },
    updateItem: (state, action) => {
      const { itemType, item } = action.payload;
      const index = state[itemType].findIndex(i => i.id === item.id);
      if (index !== -1) {
        state[itemType][index] = item;
      }
    },
    clearUser: (state) => {
      Object.assign(state, userSlice.getInitialState());
    },
    resetUserState: (state) => {
      const { userId, token } = state;
      Object.assign(state, { ...userSlice.getInitialState(), userId, token });
    },
    setPlaylists: (state, action) => {
      state.playlists = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadUserData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        Object.assign(state, action.payload);
      })
      .addCase(loadUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.userId = action.payload.userId;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.userId = action.payload.userId;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        Object.assign(state, userSlice.getInitialState());
      })
      .addCase(savePlaylistsToStorage.fulfilled, (state, action) => {
        state.playlists = action.payload;
      })
      .addCase(loadPlaylistsFromStorage.fulfilled, (state, action) => {
        state.playlists = action.payload;
      })
      .addCase(createPlaylist.fulfilled, (state, action) => {
        state.playlists = action.payload;
      })
      .addCase(addSongToPlaylist.fulfilled, (state, action) => {
        state.playlists = action.payload;
      })
      .addCase(removeSongFromPlaylist.fulfilled, (state, action) => {
        state.playlists = action.payload;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.favorites = action.payload;
      });
  },
});

export const {
  setUserId,
  setToken,
  addItem,
  removeItem,
  updateItem,
  clearUser,
  resetUserState,
  setPlaylists,
} = userSlice.actions;

export default userSlice.reducer;

