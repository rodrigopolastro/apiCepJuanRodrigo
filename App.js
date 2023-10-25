import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  SafeAreaView,
} from "react-native";
import apiCep from "./services/apiCep";

export default function App() {
  const [searchCep, setSearchCep] = useState("");
  const [address, setAddress] = useState({});
  const [isCEPValid, setIsCEPValid] = useState(false);
  const [errorText, setErrorText] = useState("");

  const getAdressByCep = async () => {
    //Replace all non-numeric digits from string
    let formattedCep = searchCep.replace(/[^0-9]/g, "");
    if (formattedCep.length == 8) {
      setErrorText("Carregando endereço...")
      const { data } = await apiCep.get(`${formattedCep}/json/`);
      if (data.erro) {
        setIsCEPValid(false);
        setErrorText("CEP inválido informado.");
      } else {
        setIsCEPValid(true);
        setAddress(data);
      }
    } else {
      setIsCEPValid(false);
      setErrorText("O CEP precisa conter 8 dígitos numéricos.");
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}> Busca de Endereço </Text>
      <View style={styles.searchBox}>
        <TextInput
          value={searchCep}
          onChangeText={(text) => setSearchCep(text)}
          style={styles.cepInput}
          placeholder="Informe o CEP"
          inputMode="numeric"
        />
        <Pressable style={styles.searchButton} onPress={getAdressByCep}>
          <Text style={styles.searchButtonText}>Buscar</Text>
        </Pressable>
      </View>
      {isCEPValid ? (
        <View style={styles.addressBox}>
          <Text style={styles.addressTitle}>Endereço encontrado</Text>
          <Text style={styles.addressLabel}>
            Logradouro:{" "}
            <Text style={styles.addressResult}>{address.logradouro}</Text>
          </Text>
          <Text style={styles.addressLabel}>
            Bairro: <Text style={styles.addressResult}>{address.bairro}</Text>
          </Text>
          <Text style={styles.addressLabel}>
            Cidade:{" "}
            <Text style={styles.addressResult}>{address.localidade}</Text>
          </Text>
          <Text style={styles.addressLabel}>
            UF: <Text style={styles.addressResult}>{address.uf}</Text>
          </Text>
        </View>
      ) : (
          <Text style={styles.errorText}>{errorText}</Text>
        )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#1d2430",
    padding: 5,
    paddingTop: 60,
    alignItems: 'center'
  },
  title: {
    color: '#f1623f',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold'
  },
  searchBox: {
    flexDirection: 'row',
    padding: '20px',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginBottom: 20
  },
  cepInput: {
    flex: 3,
    backgroundColor: "white",
    height: '30px',
    borderRadius: 5,
    paddingLeft: 5,
  },
  searchButton: {
    flex: 1,
    backgroundColor: "#f1623f",
    fontWeight: "bold",
    height: 40,
    justifyContent: 'center',
    borderRadius: 10,
    marginStart: 10,
  },
  searchButtonText: {
    textAlign: 'center',
    fontWeight: '500',
    color: "white",
  },
  addressBox: {
    backgroundColor: "#293241",
    padding: 15,
    borderRadius: 15,
    width: '80%'
  },
  addressTitle: {
    fontSize: 20,
    color: "#f1623f",
    fontWeight: 'bold',
    textAlign: "center",
    marginBottom: 10
  },
  addressLabel: {
    color: "#f1623f",
    fontSize: 16
  },
  addressResult: {
    color: "white",
    fontWeight: '400',
  },
  errorText: {
    fontSize: 15,
    color: "white",
  },
});
