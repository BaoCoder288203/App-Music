import React from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addSongToPlaylist } from '../Redux_Toolkit/userSlice'; // Import đúng từ userSlice

const SongOptionsMenu = ({ visible, onClose, song }) => {
  const dispatch = useDispatch();
  const { playlists } = useSelector((state) => state.user);

  const handleAddToPlaylist = (playlistId) => {
    dispatch(addSongToPlaylist({ playlistId, song })); // Thêm bài hát vào playlist
    onClose(); // Đóng modal sau khi thêm bài hát
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add to Playlist</Text>
          <FlatList
            data={playlists}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.playlistOption}
                onPress={() => handleAddToPlaylist(item.id)}
              >
                <Text style={styles.playlistName}>{item.name}</Text>
                <Text style={styles.songCount}>{item.songs.length} songs</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={onClose}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  playlistOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  playlistName: {
    fontSize: 16,
    marginBottom: 4,
  },
  songCount: {
    fontSize: 14,
    color: '#666',
  },
  cancelButton: {
    marginTop: 15,
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: 'bold',
  },
});

export default SongOptionsMenu;
