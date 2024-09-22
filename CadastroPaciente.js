import React, { useState } from 'react';
import { View, TextInput, ScrollView, StyleSheet, Text, Alert } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import supabase from './database/database'; // Importa o supabase do arquivo supabase.js
import Header from './components/Header';
import Footer from './components/Footer';

export default function CadastroPaciente() {
  const navigation = useNavigation();

  // Definindo os estados para armazenar os campos do formulário
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [loading, setLoading] = useState(false); // Para o estado de carregamento

  const handleSubmit = async () => {
    if (nome.trim() === '' || cpf.trim() === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);

    try {
      // Inserindo os dados do paciente na tabela "pacientes"
      const { data, error } = await supabase
        .from('pacientes') // Nome da tabela no Supabase
        .insert([{ nome, cpf }]);

      if (error) throw error;

      // Exibe uma mensagem de sucesso e navega para a tela de sucesso
      Alert.alert('Sucesso', 'Paciente cadastrado com sucesso!');
      navigation.navigate('CadastroSucesso');
    } catch (error) {
      Alert.alert('Erro', `Falha ao cadastrar o paciente: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        name="Mariana Maia"
        position="Atendente"
        profileImageUrl="https://img.freepik.com/fotos-gratis/jovem-mulher-trabalhando-no-escritorio-com-laptop-e-fones-de-ouvido-na-parede-branca-atendimento-ao-cliente-e-call-center_231208-8601.jpg?w=1380&t=st=1724717085~exp=1724717685~hmac=c0df740124bfb9cd1c047f4c069f68c58dbf45ef00d76c6e66fda7765b8d3337"
      />

      <ScrollView contentContainerStyle={styles.scrollContent} style={styles.scrollView}>
        <Card style={styles.formCard}>
          <Card.Title
            title="Cadastro Paciente"
            titleStyle={styles.formTitle}
            left={(props) => <Ionicons name="person-add" size={32} color="#FFF" />}
          />
          <Card.Content>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              placeholderTextColor="#888"
              value={nome}
              onChangeText={setNome} // Atualiza o nome
            />
            <TextInput
              style={styles.input}
              placeholder="CPF"
              placeholderTextColor="#888"
              value={cpf}
              keyboardType="numeric" // Garante que apenas números sejam inseridos
              onChangeText={setCpf} // Atualiza o CPF
            />
            
            <Button
              mode="contained"
              style={styles.submitButton}
              onPress={handleSubmit}
              loading={loading} // Mostra um spinner enquanto a requisição está sendo processada
            >
              <Text style={styles.submitButtonText}>Cadastrar Paciente</Text>
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B7FAFE',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  formCard: {
    backgroundColor: '#5978E5',
    borderRadius: 10,
    marginBottom: 20,
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
});
