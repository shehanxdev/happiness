import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';
import { samplePosts } from '@vs/data';
import ReactNativeModal from 'react-native-modal';
import { TextInput } from 'react-native-paper';
import ConfettiCannon from 'react-native-confetti-cannon';
import Toast from 'react-native-toast-message';
import { launchImageLibrary } from 'react-native-image-picker';
import { getCurrentDate } from '../../../utils/time.util';
import { executeQuery } from './../../../services/DB.service';
import { useFocusEffect } from '@react-navigation/native';
import RNFS from 'react-native-fs';
interface PostData {
  id: number;
  title: string;
  post: string;
  Image: string;
  date: string;
}
export const CommunityScreen = () => {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [title, setTitle] = useState('');
  const [post, setPost] = useState('');
  const [showConfetti, setShowConfetti] = React.useState(false);
  const [imagePath, setImagePath] = useState<string | null>(null);
  const [postList, setPostList] = useState<PostData[]>();

  useEffect(
    React.useCallback(() => {
      const getData = async () => {
        const sql = `
      SELECT * FROM Posts;

    `;
        const result = await executeQuery<PostData>(sql, [], false);
        if (Array.isArray(result)) {
          setPostList([...result]);
        } else {
          console.log('No records found or unexpected result format');
        }
      };
      getData();
    }, [])
  );
  // Function to save image to the local assets folder
  const saveImageToLocalAssets = async (originalPath: string) => {
    try {
      const newImagePath =
        `${RNFS.DocumentDirectoryPath}/images/` + `image_${Date.now()}.jpg`;

      // Create directory if it doesn't exist
      const dirExists = await RNFS.exists(
        `${RNFS.DocumentDirectoryPath}/images`
      );
      if (!dirExists) {
        await RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/images`);
      }

      // Move the file to the new directory
      await RNFS.copyFile(originalPath, newImagePath);
      console.log('Image saved to:', newImagePath);
      return newImagePath;
    } catch (error) {
      console.log('Error saving image:', error);
      return null;
    }
  };
  const handleImageUpload = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });

    if (!result.didCancel && result.assets && result.assets[0].uri) {
      const originalPath = result.assets[0].uri;
      const newFilePath = await saveImageToLocalAssets(originalPath);
      if (newFilePath) {
        setImagePath(newFilePath);
      }
    }
  };
  const onPost = async () => {
    const sql = `
    INSERT INTO Posts (title, post,Image,date) 
    VALUES ('${title}', '${post}','${imagePath}','${getCurrentDate()}')
  `;
    const result = await executeQuery(sql, [], true);
    if (result) {
      Toast.show({ type: 'success', text1: 'Posted' });
    } else {
      Toast.show({ type: 'error', text1: 'Post failed' });
    }
  };

  const handleOnCancel = () => {
    setModalVisibility(false);
    setImagePath('');
  };
  return (
    <View style={tw`flex-1`}>
      {showConfetti && (
        <ConfettiCannon
          count={200}
          origin={{ x: -10, y: 0 }}
          autoStart={true}
          fadeOut={true}
          onAnimationEnd={() => setShowConfetti(false)}
        />
      )}
      <ReactNativeModal
        backdropColor="#000000"
        backdropOpacity={0.9}
        coverScreen={false}
        isVisible={modalVisibility}
        onBackdropPress={() => setModalVisibility(false)}>
        <View
          style={tw`flex-1 justify-center items-center bg-opacity-50 bg-black p-4`}>
          <View style={tw`bg-white p-4 rounded-lg w-full`}>
            <Text style={tw`text-lg font-bold mb-4`}>Create a Post</Text>
            <TextInput
              style={tw`border border-gray-300 rounded-lg p-2 mb-4`}
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={tw`border border-gray-300 rounded-lg p-2 mb-4`}
              placeholder="Post"
              multiline={true}
              numberOfLines={4}
              value={post}
              onChangeText={setPost}
            />
            <TouchableOpacity
              style={tw`bg-green-500 text-white py-2 px-4 rounded-lg mb-8`}
              onPress={handleImageUpload}>
              <Text style={tw`text-center text-white `}>Upload an image </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`bg-blue-500 text-white py-2 px-4 rounded-lg`}
              onPress={onPost}>
              <Text style={tw`text-center text-white `}>post </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleOnCancel}
              style={tw`mt-2 bg-red-500  py-2 px-4 rounded-lg`}>
              <Text style={tw`text-center text-white `}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ReactNativeModal>

      <ScrollView>
        {postList?.map((post, index) => (
          <View key={index} style={tw`p-4 border-b border-gray-300`}>
            <Text style={tw`text-lg font-bold`}>{post.title}</Text>
            <Image
              style={tw`w-100 h-70 m-auto`}
              source={{ uri: 'file://' + post.Image }}
            />
            <Text style={tw`text-base mb-4`}>{post.post}</Text>
            <View style={tw`flex-row justify-between items-center`}>
              <TouchableOpacity style={tw`flex-row items-center`}>
                <Text style={tw`text-blue-500 mr-2`}>187</Text>
                <Text style={tw`text-gray-500`}>Likes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={tw`flex-row items-center`}>
                <Text style={tw`text-gray-500 mr-2`}>{post.date}</Text>
                <Text style={tw`text-gray-500`}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      {/* Add a button to navigate to the new post screen */}
      <TouchableOpacity
        onPress={() => setModalVisibility(true)}
        style={tw`bg-[#199169] p-4 absolute bottom-0 right-0 rounded-full m-4`}>
        <Text style={tw`text-white`}>Add your thoughts</Text>
      </TouchableOpacity>
    </View>
  );
};
