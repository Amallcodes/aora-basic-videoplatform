import { View, Text, TextInput, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants';

interface inputProp {
    title: string;
    value: string;
    handleChangeText: (e: string) => void;
    otherStyles?: string;
    keyboardType?: string;
}

const SearchInput = ({ title, value, handleChangeText, otherStyles, keyboardType }: inputProp) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <View className='border-2  border-black-200 w-full h-16 px-4 bg-black-200 rounded-2xl focus:border-secondary
         items-center flex-row space-x-4'
        >
            <TextInput className={`flex-1 text-white font-pregular text-base mt-0.5`}
                style={{ backgroundColor: "transparent" }}
                value={value}
                placeholder='Search for a video topic'
                placeholderTextColor="#7b7b8b"
                onChangeText={handleChangeText}
                secureTextEntry={title === 'Password' && !showPassword}
                autoComplete='off'
                textContentType='none'
                importantForAutofill='no'
                autoCorrect={false}
            />

            <TouchableOpacity>
                <Image
                    source={icons.search}
                    className='w-5 h-5'
                    resizeMode='contain'
                />
            </TouchableOpacity>
        </View>
    )
}

export default SearchInput