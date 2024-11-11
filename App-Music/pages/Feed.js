import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const data = [
  {
    id: '1',
    username: 'Jessica Gonzalez',
    userImage: '../all_images/Feed - Audio Listing/Avatar 4.png', 
    postedAt: '3d',
    trackImage: '../all_images/Feed - Audio Listing/Image 93.png', 
    trackTitle: 'FLOWER',
    listens:125,
    duration:'05:15',
    likes: 28,
    repost: 1,
    comments: [
      { id: '1', username: 'Sally Rooney', text: 'Do duis cul', likes: 1, time: '17h', avatar: '../all_images/Feed - Comment on an Audio/Avatar 11.png' },
      { id: '2', username: 'Jason', text: 'Minim magna exc', likes: 1, time: '48m', avatar: '../all_images/Feed - Comment on an Audio/Avatar 13.png' },
      { id: '3', username: 'Michael Key', text: '@Jason Smith Deserunt officia consectetur adipi', likes: 2, time: '40m', avatar: '../all_images/Feed - Comment on an Audio/Avatar 8.png' },
    ],
  },
  {
    id: '2',
    username: 'William King',
    userImage: '../all_images/Feed - Audio Listing/Avatar 5.png', 
    postedAt: '5d',
    trackImage: '../all_images/Feed - Audio Listing/Image 94.png', 
    trackTitle: 'ME',
    listens:225,
    duration:'05:15',
    likes: 35,
    repost: 2,
    comments: [
      { id: '1', username: 'Sally Rooney', text: 'Do duis cul', likes: 1, time: '17h', avatar: '../all_images/Feed - Comment on an Audio/Avatar 11.png' },
      { id: '2', username: 'Jason', text: 'Minim magna exc', likes: 1, time: '48m', avatar: '../all_images/Feed - Comment on an Audio/Avatar 13.png' },
      { id: '3', username: 'Michael Key', text: '@Jason Smith Deserunt officia consectetur adipi', likes: 2, time: '40m', avatar: '../all_images/Feed - Comment on an Audio/Avatar 8.png' },
    ],
  },
];

const Feed = () => {
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [flatLike,setFlatLike] = useState(false);

  const toggleComments = (postId) => {
    setSelectedPostId(selectedPostId === postId ? null : postId);
  };

  const toggleLike = ()=>{
    setFlatLike(!flatLike);
  };

  const toggleShare = (postId)=>{
    
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.userInfo}>
        <Image source={{ uri: item.userImage }} style={styles.avatar} />
        <View style={styles.userDetails}>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.postedAt}>Posted a track • {item.postedAt}</Text>
        </View>
      </View>
      <View style={{
      }}>
        <Image source={{ uri: item.trackImage }} style={styles.trackImage} />
        <View style={styles.trackDetails}>
          <View>
            <Text style={styles.trackTitle}>{item.trackTitle}</Text>
            <Text style={styles.namePost}>{item.username}</Text>
          </View>
          <View style={{
            flexDirection: 'row',
          }}>
            <Text style={styles.listens}>
              <FontAwesome name="play" size={24} color="black" />
              {item.listens}
            </Text>
            <Text style={styles.duration}> • {item.duration}</Text>
          </View>
        </View>
      </View>
      <View style={styles.interactions}>
        <View style={{
          flexDirection: 'row',
          gap:20,
        }}> 
          <TouchableOpacity onPress={() => toggleLike(item.id)} style={styles.interactionButton}>
            {
              flatLike ? <FontAwesome name="heart" color="#f00" size={20} onPress={toggleLike}/>
              :  <FontAwesome name="heart-o" color="#888" size={20} onPress={toggleLike}  />
            }
            <Text style={styles.interactionText}>{item.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleComments(item.id)} style={styles.interactionButton}>
            <FontAwesome name="comment-o" color="#888" size={20} />
            <Text style={styles.interactionText}>{item.comments.length}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleShare(item.id)} style={styles.interactionButton}>
            <FontAwesome name="share-alt" size={20} color="#888" />
            <Text style={styles.interactionText}>{item.repost}</Text>
          </TouchableOpacity> 
        </View>
        <FontAwesome name="ellipsis-h" size={24} color="#888" />
      </View>

      {selectedPostId === item.id && (
        <View style={styles.commentsSection}>
          <Text style={styles.commentCount}>{item.comments.length} comments</Text>
          {item.comments.map((comment) => (
            <View key={comment.id} style={styles.comment}>
              <Image source={{ uri: comment.avatar }} style={styles.commentAvatar} />
              <View style={styles.commentContent}>
                <Text style={styles.commentUsername}>{comment.username}</Text>
                <Text>{comment.text}</Text>
                <View style={styles.commentInfo}>
                  <Text style={styles.commentTime}>{comment.time}</Text>
                  <Text style={styles.commentLikes}>{comment.likes} likes</Text>
                </View>
              </View>
              <FontAwesome name="thumbs-o-up" color="#888" size={16} />
            </View>
          ))}
          <View style={styles.addComment}>
            <Image source={{ uri: 'https://example.com/your-avatar.jpg' }} style={styles.commentAvatar} />
            <TextInput style={styles.commentInput} placeholder="Write a comment..." />
          </View>
        </View>
      )}
    </View>
  );

  return (
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.container}
      />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    margin: 10,
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
    paddingBottom: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  userDetails: {
    flex: 1,
    marginLeft: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    color:'black',
  },
  namePost:{
    fontWeight: 'bold',
    fontSize: 16,
    color:'white',
  },
  postedAt: {
    color: '#888',
    fontSize: 12,
  },
  avatar: {
    width: 40,
    height: 40,
  },
  trackImage: {
    width: '100%',
    height: 300,
    zIndex:1,
  },
  trackDetails: {
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'flex-end',
    padding: 20,
    position:'absolute',
    color:'white',
    backgroundColor:'black',
    opacity:0.6,
    zIndex:10,
    bottom:0,
    left:0,
  },
  trackTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'white',
  },
  listens:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    color:'white',
  },
  duration:{
    color:'white',
  },
  interactions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    padding: 10,
  },
  commentsSection: {
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  commentCount: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  comment: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  commentContent: {
    flex: 1,
    marginLeft: 10,
  },
  commentUsername: {
    fontWeight: 'bold',
  },
  commentInfo: {
    flexDirection: 'row',
    marginTop: 4,
  },
  commentTime: {
    color: '#888',
    fontSize: 12,
    marginRight: 10,
  },
  commentLikes: {
    color: '#888',
    fontSize: 12,
  },
  addComment: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  commentAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  commentInput: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  interactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  interactionText: {
    marginLeft: 5,
    color: '#888',
    fontSize: 14,
  },
});

export default Feed;
