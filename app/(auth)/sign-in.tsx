import { View, Text, ScrollView, Image, Pressable, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import FormField from '@/components/form-field'
import CustomButton from '@/components/custom-button'
import { Link, router } from 'expo-router'
import { signIn, getCurrentUser } from '@/lib/appwrite'
import { GlobalContext } from '@/context/globalProvider'

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useContext(GlobalContext);
  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'please fill in all the fields!')
      return;
    }

    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password);

      router.replace('/home')

      // set global state
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  // async function submit() {
  //   await logout();
  // }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          keyboardShouldPersistTaps='handled'
        >
          <View className='w-full pt-10 justify-center h-full px-4 my-6'>
            <Image
              source={images.logo}
              resizeMode='contain'
              className='w-[115px] h-[35]'
            />

            <Text className='text-2xl text-white font-semibold mt-10 font-psemibold mb-14'>
              Log in to Aora
            </Text>

            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-2"
              keyboardType="email-address"
              placeholder='your email'
            />

            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-2"
              placeholder='your password'
            />

            <CustomButton
              title="Sign-in"
              handlePress={submit}
              containerStyles='mt-7'
              isLoading={isSubmitting}
            />

            <View className='justify-center pt-5 flex-row gap-2 mb-4'>
              <Text className='text-lg text-gray-100'>
                Don't have an account?
              </Text>
              <Link href="/sign-up" className='text-lg text-secondary'>Sign up</Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default SignIn