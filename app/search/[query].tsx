import { View, Text, Button, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { getAllPosts, getLatestPosts, logout, searchPosts } from '@/lib/appwrite'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import SearchInput from '@/components/search-input'
import Trending from '@/components/trending'
import EmptyState from "../../components/empty-state"
import { GlobalContext } from '@/context/globalProvider'
import useAppwrite from '@/hooks/useAppwrite'
import VideoCard from '@/components/video-card'
import { VideoPost } from '@/app/models'
import { useLocalSearchParams } from 'expo-router'

const Search = () => {
  const { query } = useLocalSearchParams();

  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));
  
  useEffect(() => {
    refetch();
  }, [query])

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
          <View className='my-6 px-4 space-y-6'>
            <View className='flex-row justify-between items-start mb-6'>
              <View>
                <Text className='text-sm font-bold text-gray-100'>
                  Search Results
                </Text>
                <Text className='text-2xl font-psemibold text-white'>
                  {query}
                </Text>
              </View>

              <View className='mt-1.5'>
                <Image
                  source={images.logoSmall}
                  className='w-9 h-10'
                  resizeMode='contain'
                />
              </View>
            </View>


            <SearchInput initialQuery={query} />

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

export default Search