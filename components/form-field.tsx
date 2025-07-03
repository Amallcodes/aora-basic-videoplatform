import { View, Text, TextInput, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants';

interface FormProp {
    title: string;
    value: string;
    handleChangeText: (e: string) => void;
    otherStyles?: string;
    keyboardType?: string;
    placeholder?: string;
}

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, keyboardType }: FormProp) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
       
            <View className='mb-4'>
             
                <Text className='text-base text-gray-100 font-p-medium mb-2'>{title}</Text>

                <View className='border-2  border-black-200 w-full h-16 px-4 bg-black-200 rounded-2xl focus:border-secondary items-center flex-row'>
                    <TextInput className={`flex-1 text-white text-base w-full h-full`}
                        style={{ backgroundColor: "transparent" }}
                        value={value}
                        placeholder={placeholder}
                        placeholderTextColor="#7b7b8b"
                        onChangeText={handleChangeText}
                        secureTextEntry={title === 'Password' && !showPassword}
                        autoComplete='off'
                        textContentType='none'
                        importantForAutofill='no'
                        autoCorrect={false}
                    />

                    {title === 'Password' && (
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Image
                                source={!showPassword ? icons.eyeHide : icons.eye}
                                className='w-6 h-6'
                                resizeMode='contain'
                            />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
    )
}

export default FormField