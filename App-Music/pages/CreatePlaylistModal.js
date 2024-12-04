import React, { useState } from 'react';
import { Modal, View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createPlaylist } from '../Redux_Toolkit/userSlice';

const CreatePlaylistModal = ({ visible, onClose, userId }) => {
  const [playlistName, setPlaylistName] = useState('');
  const dispatch = useDispatch();

  const handleCreate = () => {
    if (playlistName.trim()) {
        const newPlaylist = {
            id: Date.now().toString(),
            name: playlistName,
            songs: [],
            createdAt: new Date().toISOString(),
        };
        dispatch(createPlaylist(newPlaylist));
        setPlaylistName('');
        onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Create New Playlist</Text>
          <TextInput
            style={styles.input}
            placeholder="Playlist name"
            value={playlistName}
            onChangeText={setPlaylistName}
            autoFocus
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.createButton]} 
              onPress={handleCreate}
            >
              <Text style={[styles.buttonText, styles.createButtonText]}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    minWidth: 70,
    alignItems: 'center',
  },
  createButton: {
    backgroundColor: '#1DB954',
  },
  buttonText: {
    color: '#666',
  },
  createButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CreatePlaylistModal;
