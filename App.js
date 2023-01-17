import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Keyboard } from "react-native";
import api from "./src/services/api";


export default function App() {
  const [cep, setCep] = useState('');
  const inputRef = useRef(null);
  const [cepUser, setCepUser] = useState(null);

  async function buscar() {
    if (cep == '') {
      alert('Digite um cep valido');
      setCep('')
      return;
    }

    try {
      const response = await api.get(`/${cep}/json`);
      console.log(response.data)
      setCepUser(response.data)


      Keyboard.dismiss(); // garantir que o teclado sera fechado
    } catch (error) {
      console.log('ERRO: ' + error);
    }

  }

  function limpar() {
    setCep('');
    inputRef.current.focus();
  }

  return (

    <SafeAreaView styles={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.text}>Digite o cep desejavel</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 79560000"
          value={cep}
          onChangeText={(texto) => setCep(texto)}
          keyboardType="numeric"
          ref={inputRef}
        />
      </View >

      <View style={styles.areaBtn}>
        <TouchableOpacity
          style={[styles.botao, { backgroundColor: '#1d75cd' }]}
          onPress={buscar}

        >
          <Text style={styles.botaoText}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botao, { backgroundColor: '#cd3e1d' }]}
          onPress={limpar}

        >
          <Text style={styles.botaoText}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {cepUser &&
        <View style={styles.resultado}>
          <Text style={styles.itemText}>CEP: {cepUser.cep}</Text>
          <Text style={styles.itemText}>Logradouro: {cepUser.logradouro}</Text>
          <Text style={styles.itemText}>Bairro: {cepUser.bairro} </Text>
          <Text style={styles.itemText}>Cidade: {cepUser.localidade} </Text>
          <Text style={styles.itemText}>Estado: {cepUser.uf} </Text>
        </View>
      }

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    width: '90%',
    padding: 10,
    fontSize: 18
  },
  areaBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around'

  },
  botao: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,

  },
  botaoText: {
    fontSize: 22,
    color: '#fff',
  },
  resultado: {
    marginTop: 60,
    alignItems: 'center',

  },
  itemText: {
    fontSize: 22
  }
});
