import React from 'react';
import { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Appbar, Menu } from 'react-native-paper';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function HomeScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState('');

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const navigateToConsultas = () => {
    navigation.navigate('Consultas');
  };

  const navigateToCadastroMedico = () => {
    navigation.navigate('Médicos');
  };

  const navigateToCadastroPaciente = () => {
  navigation.navigate('Pacientes'); // Garante que está chamando a tela "Pacientes"
  };

  return (
    <View style={styles.container}>
      {/* Barra Superior */}
      <Appbar.Header style={styles.appbar}>
        <View style={styles.headerContent}>
          <Image
            source={{ uri: 'https://img.freepik.com/fotos-gratis/jovem-mulher-trabalhando-no-escritorio-com-laptop-e-fones-de-ouvido-na-parede-branca-atendimento-ao-cliente-e-call-center_231208-8601.jpg?w=1380&t=st=1724717085~exp=1724717685~hmac=c0df740124bfb9cd1c047f4c069f68c58dbf45ef00d76c6e66fda7765b8d3337' }}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.name}>Bem-Vindo(a)</Text>
            <Text style={styles.position}>Atendente</Text>
          </View>
        </View>
      </Appbar.Header>

      {/* Quadrados com Ícones */}
      <ScrollView contentContainerStyle={styles.squareContainer}>
        <TouchableOpacity style={styles.square} onPress={navigateToConsultas}>
          <MaterialCommunityIcons name="clipboard-text" size={50} color="#FFF" />
          <Text style={styles.squareText}>Consultas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.square} onPress={navigateToCadastroPaciente}>
          <MaterialCommunityIcons name="account-heart-outline" size={50} color="#FFF" />
          <Text style={styles.squareText}>Pacientes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.square} onPress={navigateToCadastroMedico}>
          <MaterialCommunityIcons name="doctor" size={50} color="#FFF" />
          <Text style={styles.squareText}>Médicos</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Rodapé */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={32} color="#FFF" />
        </TouchableOpacity>
        <Image
          source={{ uri: 'https://img.freepik.com/vetores-gratis/hospital-logo-design-vector-medical-cross_53876-136743.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1723939200&semt=ais_hybrid' }}
          style={styles.footerImage}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B7FAFE',
  },
  appbar: {
    backgroundColor: '#5978E5',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  position: {
    color: '#FFF',
    fontSize: 14,
  },
  menuButton: {
    marginLeft: 'auto',
  },
  menuIcon: {
    color: '#FFF',
    fontSize: 24,
  },
  squareContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
  },
  square: {
    backgroundColor: '#5978E5',
    borderRadius: 10,
    width: 150,
    height: 150,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  squareText: {
    color: '#FFF',
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#5978E5',
    padding: 10,
  },
  footerImage: {
    width: 40,
    height: 40,
  },
});

