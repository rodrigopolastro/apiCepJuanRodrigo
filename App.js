import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
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
      const { data } = await apiCep.get(`${formattedCep}/json/`);
      if (data.erro) {
        setIsCEPValid(false);
        setErrorText("CEP inválido informado");
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
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.searchButton} onPress={getAdressByCep}>
          <Text style={styles.searchButtonText}>Buscar</Text>
        </TouchableOpacity>
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
    padding: 20,
    paddingTop: 60,
  },
  title: {
    color: "#f1623f",
    fontSize: "30px",
    textAlign: "center",
  },
  searchBox:{
    // flex: 1,
    flexDirection: 'row',
    // height: '50px'
    // width: '80%',
    padding: '20px',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cepInput: {
    flex: 3,
    backgroundColor: "white",
    // width: "80%",
    height: '30px'
  },
  searchButton: {
    flex: 1,
    backgroundColor: "#f1623f",
    fontWeight: "bold",
    height: '40px'
  },
  searchButtonText: {
    color: "white",
  },
  addressBox: {
    backgroundColor: "#293241",
    padding: '10px'
  },
  addressTitle:{
    fontSize: '18px',
    color: "#f1623f",
    fontWeight: 'bold',
    textAlign: "center",
  },
  addressLabel: {
    color: "#f1623f",
    fontWeight: 'bold'
  },
  addressResult: {
    color: "white",
    fontWeight: '300'
    // fontWeight: 'regular'
  },
  errorText: {
    color: "white",
  },
});
