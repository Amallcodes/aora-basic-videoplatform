import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'react-native'
import { icons } from '@/constants'
import { useVideoPlayer, VideoView } from 'expo-video'

// {video: {title, thumbnail, video, creator: {username, avatar}}}
const VideoCard = ({ video }) => {
  const creator = video.creator;
  const [play, setPlay] = useState(false);

  const videoSource = video.video;
  // const videoSource = item.video;

  const player = useVideoPlayer(videoSource, player => {
    player.loop = true;
    player.muted = true;
    player.pause();
  });

  return (
    <View className='flex-col items-center px-4 mb-14'>
      <View className='flex-row gap-3 items-start'>
        <View className='justofy-center items-center flex-row flex-1'>
          <View className='w-[40px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5'>
            <Image
              source={{ uri: creator?.avatar }}
              className='w-full h-full rounded-lg'
              resizeMode='cover'
            />
          </View>
          <View className='justify-center flex-1 ml-3 gap-y-1'>
            <Text className='text-white font-psemibold text-sm'>
              {video.title}
            </Text>
            <Text className='text-xs text-gray-100 font-pregular' numberOfLines={1}>
              {creator.username}
            </Text>
          </View>
        </View>

        <View className='pt-2'>
          <Image
            source={icons.menu}
            className='w-5 h-5'
            resizeMode='contain'
          />
        </View>
      </View>

      {play ? (
        <View className='w-full h-60 rounded-xl mt-3 relative justify-center items-center'>
          <VideoView
            player={player}
            allowsFullscreen
            allowsPictureInPicture
            style={{
              width: "100%",
              height: 200,
              marginTop: 20
            }}
            contentFit='fill'
          />
        </View>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {{
            setPlay(true);
            player.muted = false; // Unmute when playing
            player.play();
          }}}
          className='w-full h-60 rounded-xl mt-3 relative justify-center items-center'>
          <Image
            source={{ uri: video.thumbnail }}
            className='w-full h-full rounded-xl mt-3'
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className='w-12 h-12 absolute'
            resizeMode='contain'
          />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default VideoCard