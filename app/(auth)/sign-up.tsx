import { View, Text, ScrollView, Image, KeyboardAvoidingView, Alert, Platform } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import FormField from '@/components/form-field'
import CustomButton from '@/components/custom-button'
import { Link, router } from 'expo-router'
import { createUser, getCurrentUser } from "../../lib/appwrite"
import { GlobalContext } from '@/context/globalProvider'

const SignUp = () => {
  const { setUser, setIsLoggedIn } = useContext(GlobalContext);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'please fill in all the fields!')
    }

    setIsSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username);

      router.replace('/home')

      // set global state
      setUser(result);
      setIsLoggedIn(true);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
      <ScrollView keyboardShouldPersistTaps='handled'>
        <View className='w-full pt-10 justify-center h-full px-4 my-6'>
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[35]'
          />

          <Text className='text-2xl text-white font-semibold mt-10 font-psemibold mb-14'>
            Sign Up to Aora
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            placeholder='create a username'
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            keyboardType="email-address"
            placeholder='your email'
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            placeholder='your password'
          />

          <CustomButton
            title="Sign-up"
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />

          <View className='justify-center pt-5 flex-row gap-2 mb-4'>
            <Text className='text-lg text-gray-100'>
              Have an account already?
            </Text>
            <Link href="/sign-in" className='text-lg text-secondary'>Sign in</Link>
          </View>
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default SignUp