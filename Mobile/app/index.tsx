import { View, Text, TouchableOpacity } from 'react-native'

import NLW_logo from '../src/assets/NLW_logo.svg'

import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import { useEffect } from 'react'
import { api } from '../src/lib/api'
import { useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint:
    'https://github.com/settings/connections/applications/e3cf5d4b663e560a30d3',
}
export default function App() {
  const rauter = useRouter()

  const [, response, signInWithGithub] = useAuthRequest(
    {
      clientId: 'e3cf5d4b663e560a30d3',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'nlwspacetime',
      }),
    },
    discovery,
  )

  async function handleGithunOAuthCode(code: string) {
    const response = await api.post('/register', {
      code,
    })
    const { token } = response.data

    await SecureStore.setItemAsync('token', token)
    rauter.push('/memories')
  }

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params

      handleGithunOAuthCode(code)
    }
  }, [response])

  return (
    <View className=" flex-1 items-center px-8 py-10">
      <View className="flex-1 items-center justify-center gap-6">
        <NLW_logo />
        <View className=" space-y-2">
          <Text className=" text-center font-title text-2xl leading-tight text-gray-50">
            Sua cápsula do tempo
          </Text>
          <Text className="text-center font-body text-base leading-relaxed text-gray-100">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          className=" rounded-full bg-green-500 px-5 py-2 "
          onPress={() => signInWithGithub()}
        >
          <Text className="font-alt text-sm uppercase text-black ">
            Cadastrar Lembrança
          </Text>
        </TouchableOpacity>
      </View>
      <Text className="text-center font-body text-sm leading-relaxed text-gray-200 ">
        Feito com 💜 no NLW da Rocketseat
      </Text>
    </View>
  )
}
