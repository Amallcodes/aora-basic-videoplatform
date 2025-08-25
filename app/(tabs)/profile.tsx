import { View, Text, Button, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { getUserPosts, signOut } from '@/lib/appwrite'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from "../../components/empty-state"
import { GlobalContext } from '@/context/globalProvider'
import useAppwrite from '@/hooks/useAppwrite'
import VideoCard from '@/components/video-card'
import { VideoPost } from '@/app/models'
import { router } from 'expo-router'
import { icons } from '@/constants';
import InfoBox from '@/components/info-box'

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useContext(GlobalContext);

  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace('/sign-in')
  }

  return (
    <SafeAreaView className='bg-primary flex-1'>
      <FlatList
        data={posts as VideoPost[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            video={item}
          />
        )}
        ListHeaderComponent={() => (
          <View className='w-full justify-center items-center mt-6 mb-12 px-4'>
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={logout}
            >
              <Image
                source={icons.logout}
                resizeMode='contain'
                className='w-6 h-6'
              />
            </TouchableOpacity>

            <View className='w-16 h-16 border-secondary rounded-lg justify-center items-center'>
              <Image
                source={{ uri: user?.avatar }}
                resizeMode='cover'
                className='w-[90%] h-[90%] rounded-lg'
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles='mt-5'
              titleStyles='text-lg'
            />

            <View className='mt-5 flex-row items-center'>
              <InfoBox
                title={posts.length || 0}
                subtitle="Posts"
                containerStyles='mr-10'
                titleStyles='text-xl'
              />
              
              <InfoBox
                title="1.2k"
                subtitle="followers"
                titleStyles='text-xl'
              />
            </View>

          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found!"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Profile