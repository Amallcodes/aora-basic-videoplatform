import { View, Text, ScrollView, TouchableOpacity, Image, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/form-field'
import { useVideoPlayer, VideoView } from 'expo-video'
import { icons } from '@/constants';
import CustomButton from '@/components/custom-button'
// import * as DocumentPicker from 'expo-document-picker'
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router'
import { createVideo } from '@/lib/appwrite'
import { GlobalContext } from '@/context/globalProvider'

const Create = () => {
  const { user } = useContext(GlobalContext);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: '',
    video: null,
    thumbnail: null,
    prompt: ''
  });

  const videoSource = form.video ? form.video.uri : null;

  const player = useVideoPlayer(videoSource, player => {
    player.loop = true;
    player.muted = true;
    player.pause();
  });

  const openPicker = async (selectType) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });;

    // const result = await DocumentPicker.getDocumentAsync({
    //   type: selectType === 'image' ?
    //     ['image/png', 'image/jpeg', 'image/jpeg'] :
    //     ['video/mp4', 'video/gif']
    // });

    if (!result.canceled) {
      if (selectType === 'image') {
        setForm({ ...form, thumbnail: result.assets[0] })
      }

      if (selectType === 'video') {
        setForm({ ...form, video: result.assets[0] })
      }
    }
  }

  const submit = async () => {
    if (!form.prompt || !form.title || !form.video || !form.video) {
      return Alert.alert("please fill in all the fields")
    }

    setUploading(true)

    try {
      await createVideo({
        ...form,
        userId: user.$id
      })

      Alert.alert("Success", "Post uploaded successfully")

      router.push('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      // setForm({
      //   title: '',
      //   video: null,
      //   thumbnail: null,
      //   prompt: ''
      // })

      setUploading(false);
    }
  }

  return (
    <SafeAreaView className='h-full'>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView className='px-4 my-6 flex-1'>
          <Text className='text-2xl text-white font-psemibold mb-10'>Upload Video</Text>

          <FormField
            title='video title'
            value={form.title}
            placeholder='Give Your video a catchy title...'
            handleChangeText={(e) => setForm({ ...form, title: e })}
            otherStyles='mt-10'
          />

          <View className='mt-7 space-y-2'>
            <Text
              className='text-base text-gray-100 font-pmedium mb-6'
            >
              Upload video
            </Text>

            <TouchableOpacity onPress={() => openPicker('video')}>
              {form.video ? (
                <VideoView
                  player={player}
                  allowsFullscreen
                  allowsPictureInPicture
                  nativeControls={false}
                  style={{
                    width: "100%",
                    height: 150,
                    borderRadius: 20
                  }}
                  contentFit='fill'
                />
              ) : (
                <View className='w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center'>
                  <View className='w-14 h-14 border border-dashed border-secondary-100 justify-center items-center'>
                    <Image
                      source={icons.upload}
                      resizeMode='contain'
                      className='w-1/2 h-1/2'
                    />
                  </View>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View className='mt-7 space-y-2'>
            <Text
              className='text-base text-gray-100 font-pmedium mb-6'
            >
              Thumbnail image
            </Text>

            <TouchableOpacity className='mb-10' onPress={() => openPicker('image')}>
              {form.thumbnail ? (
                <Image
                  source={{ uri: form.thumbnail.uri }}
                  resizeMode='cover'
                  className='w-full h-32 rounded-2xl'
                />
              ) : (
                <View className='w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2'>
                  <Image
                    source={icons.upload}
                    resizeMode='contain'
                    className='w-5 h-5'
                  />

                  <Text className='text-sm text-gray-100 font-pmedium ml-2'>
                    Choose a file
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <FormField
            title='AI prompt'
            value={form.prompt}
            placeholder='The prompt used to create this video'
            handleChangeText={(e) => setForm({ ...form, prompt: e })}
            otherStyles='mt-10'
          />

          <CustomButton
            title='submit & publish'
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={uploading}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Create