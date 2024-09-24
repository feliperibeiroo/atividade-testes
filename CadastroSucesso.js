import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from './components/Header'; // Importando o componente Header
import { useNavigation } from '@react-navigation/native'; // Importar useNavigation

export default function CadastroSucessoScreen() {
  const navigation = useNavigation(); // Hook para navegação

  return (
    <View style={styles.container}>
      {/* Barra Superior */}
      <Header />

      {/* Mensagem de Sucesso */}
      <View style={styles.messageContainer}>
        <View style={styles.successBox}>
          <Ionicons name="checkmark-circle" size={80} color="#31A83E" />
          <Text style={styles.successTitle}>Cadastro realizado com sucesso!</Text>
        </View>
      </View>

      {/* Rodapé com ícone de casa */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}> {/* Navegar para a HomeScreen */}
          <Ionicons name="home" size={32} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B7FAFE',
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  successBox: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#31A83E',
    marginTop: 20,
    textAlign: 'center',
  },
  footer: {
    backgroundColor: '#5978E5',
    padding: 10,
    alignItems: 'center', // Centralizar o conteúdo do rodapé
  },
});
