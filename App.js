import React, { useState } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView
} from 'react-native'
import apiCep from './services/apiCep'

export default function App() {
  const [searchCep, setSearchCep] = useState('')
  const [address, setAddress] = useState({})
  const [isCEPValid, setIsCEPValid] = useState(false)
  const [errorText, setErrorText] = useState('Informe um CEP')

  const getAdressByCep = async () => {
    //Replace all non-numeric digits from string
    let formattedCep = searchCep.replace(/[^0-9]/g, '')
    if (formattedCep.length == 8) {
      const { data } = await apiCep.get(`${searchCep}/json/`)
      if (data.erro) {
        setIsCEPValid(false)
        setErrorText('CEP inválido informado')
      } else {
        setIsCEPValid(true)
        setAddress(data)
      }
    } else {
      setIsCEPValid(false)
      setErrorText('O CEP precisa conter 8 dígitos numéricos.')
    }
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Text> Busca CEP </Text>
      <TextInput
        value={searchCep}
        onChangeText={text => setSearchCep(text)}
        style={styles.cepInput}
        placeholder=''
        keyboardType='numeric'
      />
      {
      isCEPValid ?
        <View>
          <Text>{address.logradouro}</Text>
          <Text>Bairro: {address.bairro}</Text>
          <Text>Cidade: {address.localidade}</Text>
          <Text>UF: {address.uf}</Text>
        </View>
      : <Text>{errorText}</Text>
      }
      <TouchableOpacity style={styles.searchButton} onPress={getAdressByCep}>
        <Text style={styles.searchButtonText}> Buscar Endereço</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'skyblue',
    padding: 20,
    paddingTop: 60,
  },
  cepInput: {
    backgroundColor: 'white'
  },
  searchButton: {
    backgroundColor: 'blue',
  },
  searchButtonText: {
    color: 'white',
  }
})