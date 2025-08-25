import { View, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React, {  useState } from 'react'
import * as Animatable from 'react-native-animatable';
import { icons } from '@/constants';
import { useVideoPlayer, VideoView } from 'expo-video';

const zoomIn = {
    0: {
        scale: 0.9
    },
    1: {
        scale: 1.1
    }
}

const zoomOut = {
    0: {
        scale: 1.1
    },
    1: {
        scale: 0.9
    }
}

const TrendingItem = ({ activeItem, item }) => {
    const [play, setPlay] = useState(false);
    const videoSource = item.video;

    const player = useVideoPlayer(videoSource, player => {
        player.loop = true;
        player.muted = true;
        player.pause();
    });

    // const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });


    return (
        <Animatable.View
            className='mr-5'
            animation={activeItem === item.$id ? zoomIn : zoomOut}
            duration={500}
        >
            {play ? (
                <View
                    className='w-52 h-72 bg-black rounded-[35px] my-5 overflow-hidden shadow-lg shadow-blue-500'>
                    <VideoView
                        player={player}
                        allowsFullscreen
                        allowsPictureInPicture
                        style={{
                            width: 180,
                            height: 288,
                        }}
                        contentFit='fill'
                    />


                    {/* <View className='w-52 h-72'>
                            <WebView
                                source={{
                                    uri: videoSource
                                }}
                                className='w-full h-full'
                            />
                        </View> */}

                </View>
            ) : <TouchableOpacity
                className='relative justify-center items-center'
                activeOpacity={0.7}
                onPress={() => {
                    setPlay(true);
                    player.muted = false; // Unmute when playing
                    player.play();
                }}
            >
                <ImageBackground
                    source={{ uri: item.thumbnail }}
                    className='w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-blue-500'
                    resizeMode='cover'
                />

                <Image
                    source={icons.play}
                    className='w-12 h-12 absolute'
                    resizeMode='contain'
                />
            </TouchableOpacity>}
        </Animatable.View>
    )
}

const Trending = ({ posts }: any) => {
    const [activeItem, setActiveItem] = useState(posts[0]);

    const viewableItemsChanged = ({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0].key)
        }
    }

    return (
        <View>
            <FlatList
                data={posts}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <TrendingItem
                        activeItem={activeItem}
                        item={item}
                    />
                )}
                horizontal
                onViewableItemsChanged={viewableItemsChanged}
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 70
                }}
                contentOffset={{ x: 170, y: 0 }}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default Trending