import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Alert } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import supabase from './database/database'; // Importa o supabase configurado
import Header from './components/Header';
import Footer from './components/Footer';

export default function CadastroMedicoScreen() {
  const navigation = useNavigation();

  // Estados para nome e CPF
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [loading, setLoading] = useState(false);

  // Função para criar o médico no Supabase
  const createMedico = async (nome, cpf) => {
    try {
      const { data, error } = await supabase
        .from('medicos') // Nome da tabela no Supabase
        .insert([{ nome, cpf }]);

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Lida com o submit do formulário
  const handleSubmit = async () => {
    if (nome.trim() === '' || cpf.trim() === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    try {
      await createMedico(nome, cpf); // Chama a função createMedico
      Alert.alert('Sucesso', 'Médico cadastrado com sucesso!');
      navigation.navigate('CadastroSucesso');
    } catch (error) {
      Alert.alert('Erro', `Falha ao cadastrar o médico: ${error.message}`);
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

      <ScrollView contentContainerStyle={styles.formContainer}>
        <Card style={styles.formCard}>
          <Card.Title
            title="Cadastro Médico"
            titleStyle={styles.formTitle}
            left={(props) => <Ionicons name="person-add" size={32} color="#FFF" />}
          />
          <Card.Content>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              placeholderTextColor="#888"
              value={nome}
              onChangeText={setNome} // Atualiza o estado do nome
            />
            <TextInput
              style={styles.input}
              placeholder="CPF"
              placeholderTextColor="#888"
              keyboardType="numeric" // Garante que apenas números sejam inseridos
              value={cpf}
              onChangeText={setCpf} // Atualiza o estado do CPF
            />
            <Button
              mode="contained"
              style={styles.submitButton}
              onPress={handleSubmit}
              loading={loading} // Mostra um spinner enquanto a requisição é processada
            >
              <Text style={styles.submitButtonText}>Cadastrar Médico</Text>
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
});
