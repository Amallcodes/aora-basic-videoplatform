import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'

interface customButtonProps {
    title: string;
    textStyles?: string;
    containerStyles?: string;
    isLoading?: boolean;
    handlePress: () => void;
}

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }: customButtonProps) => {
    return (
        <TouchableOpacity className={`bg-secondary 
        rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <Text className={`text-white text-lg ${textStyles}`}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton