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

  //try it with the fetch api and see if it works
  const getAdressByCep = async () => {
    const { data } = await apiCep.get(`${searchCep}/json/`)
    console.log(data)
    setAddress(data)
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Text> Busca CEP </Text>
      <TextInput
        value={searchCep}
        onChangeText={text => setSearchCep(text)}
        style={styles.cepInput}
        placeholder='Informe o CEP'
        keyboardType='numeric'
      />
      <TouchableOpacity style={styles.searchButton} onPress={getAdressByCep}>
        <Text style={styles.searchButtonText}> Buscar Endereço</Text>
      </TouchableOpacity>
      <View>
        <Text>{address.logradouro}</Text>
        <Text>Bairro: {address.bairro}</Text>
        <Text>Cidade: {address.localidade}</Text>
        <Text>UF: {address.uf}</Text>
      </View>
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