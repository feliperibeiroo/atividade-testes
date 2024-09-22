import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Importar useNavigation
import Header from './components/Header';
import Footer from './components/Footer';
import supabase from './database/database'; // Importe a configuração do Supabase

export default function CadastroAtendenteScreen() {
  const navigation = useNavigation(); // Hook para navegação
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [msg, setMsg] = useState('');

  const handleCadastro = async () => {
    // Limpa a mensagem anterior
    setMsg('');

    // Tenta inserir os dados no Supabase
    const { data, error } = await supabase
      .from('atendente')
      .insert([{ nome, cpf, email, senha }]);

    if (error) {
      setMsg('Erro ao cadastrar: ' + error.message);
    } else {
      setMsg('Usuário cadastrado com sucesso!');
      // Limpa os campos após o cadastro
      setNome('');
      setCpf('');
      setEmail('');
      setSenha('');

      // Atraso antes de navegar para a tela de Login
      setTimeout(() => {
        navigation.navigate('Login');
      }, 2000); // Atraso de 2 segundos (2000 ms)
    }
  };

  return (
    <View style={styles.container}>
      {/* Barra Superior */}
      <Header
        name="Mariana Maia"
        position="Atendente"
        profileImageUrl="https://img.freepik.com/fotos-gratis/jovem-mulher-trabalhando-no-escritorio-com-laptop-e-fones-de-ouvido-na-parede-branca-atendimento-ao-cliente-e-call-center_231208-8601.jpg?w=1380&t=st=1724717085~exp=1724717685~hmac=c0df740124bfb9cd1c047f4c069f68c58dbf45ef00d76c6e66fda7765b8d3337"
      />

      {/* Formulário */}
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Card style={styles.formCard}>
          <Card.Title
            title="Cadastro Atendente"
            titleStyle={styles.formTitle}
            left={(props) => <Ionicons name="person-add" size={32} color="#FFF" />}
          />
          <Card.Content>
            <TextInput
              style={styles.input}
              placeholder="Nome Completo"
              placeholderTextColor="#888"
              value={nome}
              onChangeText={setNome}
            />
            <TextInput
              style={styles.input}
              placeholder="CPF"
              placeholderTextColor="#888"
              keyboardType="numeric"
              value={cpf}
              onChangeText={setCpf}
            />
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor="#888"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#888"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />

            {/* Botão de Submit */}
            <Button mode="contained" style={styles.submitButton} onPress={handleCadastro}>
              <Text style={styles.submitButtonText}>Cadastrar Usuário</Text>
            </Button>

            {/* Mensagem de feedback */}
            {msg !== '' && (
              <Text style={styles.message}>{msg}</Text>
            )}
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Footer positioned at the bottom */}
      <Footer style={styles.footer}>
        <Text style={styles.footerText}>Footer Content</Text>
      </Footer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B7FAFE',
  },
  formContainer: {
    padding: 20,
  },
  formCard: {
    backgroundColor: '#5978E5',
    borderRadius: 10,
  },
  formTitle: {
    color: '#FFF',
  },
  input: {
    backgroundColor: '#FFF',
    color: '#888',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#5978E5',
  },
  submitButton: {
    backgroundColor: '#2DAD2B',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#5978E5',
    padding: 10,
  },
  message: {
    marginTop: 10,
    color: '#FFF',
    textAlign: 'center',
  },
});
