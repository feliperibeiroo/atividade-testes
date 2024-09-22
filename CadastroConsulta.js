import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Alert } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import supabase from './database/database'; // Importa o Supabase
import Footer from './components/Footer';

export default function CadastroConsultaScreen() {
  const navigation = useNavigation();

  // Estados para armazenar os valores do formulário
  const [data, setData] = useState('');
  const [idPaciente, setIdPaciente] = useState('');
  const [idMedico, setIdMedico] = useState('');
  const [horario, setHorario] = useState('');
  const [loading, setLoading] = useState(false);

  // Função para enviar os dados ao Supabase e navegar para a tela de sucesso
  const handleCadastroConsulta = async () => {
    if (!data || !idPaciente || !idMedico || !horario) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);

    try {
      // Envia os dados para o Supabase
      const { error } = await supabase
        .from('consultas') // Nome da tabela no Supabase
        .insert([{ data, id_paciente: idPaciente, id_medico: idMedico, horario }]);

      if (error) {
        throw error;
      }

      // Se o cadastro for bem-sucedido, navega para a tela de sucesso
      Alert.alert('Sucesso', 'Consulta cadastrada com sucesso!');
      navigation.navigate('CadastroSucesso');
    } catch (error) {
      Alert.alert('Erro', `Falha ao cadastrar a consulta: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Card style={styles.formCard}>
          <Card.Title
            title="Cadastro de Consulta"
            titleStyle={styles.formTitle}
            left={(props) => <Ionicons name="calendar" size={32} color="#FFF" />}
          />
          <Card.Content>
            <TextInput
              style={styles.input}
              placeholder="ID Médico"
              placeholderTextColor="#888"
              value={idMedico}
              onChangeText={setIdMedico}
            />
            <TextInput
              style={styles.input}
              placeholder="ID Paciente"
              placeholderTextColor="#888"
              value={idPaciente}
              onChangeText={setIdPaciente}
            />
            <TextInput
              style={styles.input}
              placeholder="Horário"
              placeholderTextColor="#888"
              value={horario}
              onChangeText={setHorario}
            />
            <TextInput
              style={styles.input}
              placeholder="Data (aaaa-mm-dd)"
              placeholderTextColor="#888"
              value={data}
              onChangeText={setData}
            />

            {/* Botão para cadastrar a consulta */}
            <Button
              mode="contained"
              style={styles.submitButton}
              onPress={handleCadastroConsulta}
              loading={loading}
            >
              <Text style={styles.submitButtonText}>Cadastrar Consulta</Text>
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
      <Footer style={styles.footer}>
        <Text style={styles.footerText}>Footer Content</Text>
      </Footer>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    padding: 0,
    backgroundColor: '#B7FAFE',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#B7FAFE',
  },
  formCard: {
    backgroundColor: '#5978E5',
    borderRadius: 10,
    padding: 20,
  },
  formTitle: {
    color: '#FFF',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#FFF',
    color: '#000',
    borderRadius: 8,
    padding: 12,
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
