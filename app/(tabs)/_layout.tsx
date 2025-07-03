import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Image } from 'react-native'

import { icons, images } from "../../constants";
import { SafeAreaView } from 'react-native-safe-area-context';

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className='bg-primary h-full'>
        <Image
          source={icon}
          resizeMode="contain"
          tintColor={color}
          className='w-6 h-6'
        />
    </View>
  )
}

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        // tabBarShowLabel: false
        tabBarInactiveTintColor: "#cdcde0",
        tabBarActiveTintColor: "#ffa001",
        tabBarStyle: {
          backgroundColor: "#161622",
          borderTopWidth: 1,
          borderTopColor: "#232533",
          height: 84
        }
      }}
    >
      <Tabs.Screen
        name='home'
        options={{
          headerShown: false,
          title: "home",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.home}
              color={color}
              name="home"
              focused={focused}
            />
          )
        }}
      />

      <Tabs.Screen
        name='bookmark'
        options={{
          headerShown: false,
          title: "bookmark",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.bookmark}
              color={color}
              name="bookmark"
              focused={focused}
            />
          )
        }}
      />

      <Tabs.Screen
        name='create'
        options={{
          headerShown: false,
          title: "create",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.plus}
              color={color}
              name="create"
              focused={focused}
            />
          )
        }}
      />

      <Tabs.Screen
        name='profile'
        options={{
          headerShown: false,
          title: "profile",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.profile}
              color={color}
              name="profile"
              focused={focused}
            />
          )
        }}
      />
    </Tabs>
  )
}

export default TabsLayout