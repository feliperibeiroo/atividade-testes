import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import supabase from './database/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    setMsg('');
    console.log('Email:', email);
    console.log('Senha:', password);
    let { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error === null) {
      // Simular o login e navegar para a HomeScreen
      navigation.navigate('Home');
    } else {
      setMsg('Usuário ou Senha Incorretos');
    }
  };

  const handleCreateUser = () => {
    // Navegar para a tela de cadastro de atendente
    navigation.navigate('CadastroAtendente');
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://img.freepik.com/vetores-gratis/hospital-logo-design-vector-medical-cross_53876-136743.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1723939200&semt=ais_hybrid' }}
            style={styles.logo}
          />
          <Text style={styles.title}>Portal Med</Text>
        </View>

        <Text style={styles.subtitle}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        <View style={styles.buttonContainer}>
          <Button title="Entrar" onPress={handleLogin} />
        </View>

        {msg !== '' && (
          <View style={styles.msg}>
            <Text style={styles.errorMsg}>{msg}</Text>
          </View>
        )}

        {/* Adicionando o texto "Cadastrar Usuário" abaixo do botão Entrar */}
        <TouchableOpacity onPress={handleCreateUser}>
          <Text style={styles.registerText}>Cadastrar Usuário</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5978E5',
  },
  loginBox: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 22,
    color: '#333',
    marginTop: 10,
    marginBottom: 30, // Adds spacing below "Login"
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
  },
  buttonContainer: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  msg: {
    margin: 10,
  },
  errorMsg: {
    color: 'red',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  registerText: {
    color: 'blue', // Cor do texto
    fontSize: 12, // Tamanho do texto
    textAlign: 'center',
    marginTop: 10, // Espaçamento acima do texto
  },
});
