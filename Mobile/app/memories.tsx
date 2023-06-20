import { TouchableOpacity, View, ScrollView, Text, Image } from 'react-native'
import Icon from '@expo/vector-icons/Feather'
import * as SecureStore from 'expo-secure-store'

import { Link, useRouter } from 'expo-router'
import NLW_logo from '../src/assets/NLW_logo.svg'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useEffect, useState } from 'react'
import { api } from '../src/lib/api'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'

dayjs.locale(ptBr)

interface Memory {
  coverURL: string
  excerpt: string
  createdAt: string
  id: string
}

export default function NewMemory() {
  const { bottom, top } = useSafeAreaInsets()
  const rauter = useRouter()
  const [memories, setMemories] = useState<Memory[]>([])

  async function signOut() {
    await SecureStore.deleteItemAsync('token')

    rauter.push('/')
  }
  async function loadMemories() {
    const token = await SecureStore.getItemAsync('token')

    const response = await api.get('/memories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setMemories(response.data)
  }

  useEffect(() => {
    loadMemories()
  }, [])

  return (
    <ScrollView
      className=" flex-1"
      contentContainerStyle={{ paddingTop: top, paddingBottom: bottom }}
    >
      <View className="mt-4 flex-row items-center justify-between px-8">
        <NLW_logo />

        <TouchableOpacity
          onPress={signOut}
          className="h-10 w-10 items-center justify-center rounded-full bg-red-500"
        >
          <Icon name="log-out" size={16} />
        </TouchableOpacity>
      </View>

      <View className="mt-6 space-y-10">
        {memories.map((memories) => {
          return (
            <View key={memories.id} className="space-y-4">
              <View className="flex-row items-center gap-2">
                <View className="h-px w-5 bg-gray-50" />
                <Text className="font-body  text-gray-100">
                  {dayjs(memories.createdAt).format('D[ de ]MMMM[, ] YYYY')}
                </Text>
              </View>

              <View className="space-y-4 px-8">
                <Image
                  source={{
                    uri: memories.coverURL,
                  }}
                  className="aspect-video w-full rounded-lg"
                  alt=""
                />
                <Text className="font-body text-base leading-relaxed text-gray-200">
                  {memories.excerpt}
                </Text>

                <Link href="/memories/id">
                  <TouchableOpacity className="flex-row items-center gap-2">
                    <Text className="font-body text-sm text-gray-200">
                      Ler mais
                    </Text>
                    <Icon name="arrow-right" size={16} color="#9e9ea0" />
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          )
        })}
      </View>
      <View className="mt-5 self-end p-8">
        <Link href="/new" asChild>
          <TouchableOpacity className="h-14 w-14 items-center justify-center rounded-full bg-green-500">
            <Icon name="plus" size={24} />
          </TouchableOpacity>
        </Link>
      </View>
    </ScrollView>
  )
}
