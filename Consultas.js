import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Header from './components/Header';
import Footer from './components/Footer';
import { useNavigation } from '@react-navigation/native';
import supabase from './database/database'; // Importa a configuração do Supabase

export default function ConsultasScreen() {
  const navigation = useNavigation();
  const [consultas, setConsultas] = useState([]); // Estado para armazenar as consultas
  const [idMedico, setIdMedico] = useState(''); // Estado para ID Médico
  const [idPaciente, setIdPaciente] = useState(''); // Estado para ID Paciente
  const [hora, setHora] = useState(''); // Estado para Hora
  const [data, setData] = useState(''); // Estado para Data

  // Função para buscar as consultas no Supabase
  const fetchConsultas = async () => {
    const { data, error } = await supabase
      .from('consultas')
      .select('*');

    if (error) {
      console.error('Erro ao buscar consultas:', error);
    } else {
      setConsultas(data);
    }
  };

  // Função para deletar uma consulta pelo ID
  const deleteConsulta = async (id) => {
    const { error } = await supabase
      .from('consultas')
      .delete()
      .eq('id', id);

    if (error) {
      Alert.alert('Erro', 'Não foi possível deletar a consulta.');
    } else {
      Alert.alert('Sucesso', 'Consulta deletada com sucesso.');
      fetchConsultas(); // Atualiza a lista após deletar
    }
  };

  // Função para filtrar as consultas
  const filterConsultas = () => {
    const filteredConsultas = consultas.filter(consulta => {
      return (
        (idMedico ? consulta.id_medico === idMedico : true) &&
        (idPaciente ? consulta.id_paciente === idPaciente : true) &&
        (hora ? consulta.horario === hora : true) &&
        (data ? consulta.data === data : true)
      );
    });
    setConsultas(filteredConsultas);
  };

  // Função para limpar os campos
  const clearFields = () => {
    setIdMedico('');
    setIdPaciente('');
    setHora('');
    setData('');
    fetchConsultas(); // Recarregar as consultas após limpar
  };

  // Buscar as consultas ao carregar a tela
  useEffect(() => {
    fetchConsultas();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header
        name="Mariana Maia"
        position="Atendente"
        profileImageUrl="https://img.freepik.com/fotos-gratis/jovem-mulher-trabalhando-no-escritorio-com-laptop-e-fones-de-ouvido-na-parede-branca-atendimento-ao-cliente-e-call-center_231208-8601.jpg?w=1380&t=st=1724717085~exp=1724717685~hmac=c0df740124bfb9cd1c047f4c069f68c58dbf45ef00d76c6e66fda7765b8d3337"
      />

      {/* Formulário de Consultas */}
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Card style={styles.formCard}>
          <Card.Title
            title="Consultas"
            titleStyle={styles.formTitle}
            left={(props) => <MaterialCommunityIcons name="clipboard-text" size={32} color="#FFF" />}
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
              placeholder="Hora"
              placeholderTextColor="#888"
              value={hora}
              onChangeText={setHora}
            />
            <TextInput
              style={styles.input}
              placeholder="Data"
              placeholderTextColor="#888"
              value={data}
              onChangeText={setData}
            />

            {/* Botões */}
            <View style={styles.buttonContainer}>
              <Button mode="contained" style={styles.clearButton} onPress={clearFields}>
                <Text style={styles.clearButtonText}>Limpar</Text>
              </Button>
              <Button mode="contained" style={styles.applyButton} onPress={filterConsultas}>
                <Text style={styles.applyButtonText}>Filtrar</Text>
              </Button>
            </View>
            <View style={styles.singleButtonContainer}>
              <Button
                mode="contained"
                style={styles.applyButton}
                onPress={() => navigation.navigate('CadastroConsulta')} // Navegar para CadastroConsulta
              >
                <Text style={styles.applyButtonText}>Cadastrar Consulta</Text>
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* Tabela de Resultados */}
        <View style={styles.tableContainer}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>ID Med</Text>
            <Text style={styles.tableHeader}>ID Pac</Text>
            <Text style={styles.tableHeader}>Hora</Text>
            <Text style={styles.tableHeader}>Data</Text>
            <View style={styles.tableActions}></View>
          </View>

          {/* Exibir os dados da tabela */}
          {consultas.length > 0 ? (
            consultas.map((consulta) => (
              <View key={consulta.id} style={styles.tableRow}>
                <Text style={styles.tableCell}>{consulta.id_medico}</Text> {/* ID Med */}
                <Text style={styles.tableCell}>{consulta.id_paciente}</Text> {/* ID Pac */}
                <Text style={styles.tableCell}>{consulta.horario}</Text> {/* Hora */}
                <Text style={styles.tableCell}>{consulta.data}</Text> {/* Data */}
                <View style={styles.tableActions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => deleteConsulta(consulta.id)} // Função de deletar consulta
                  >
                    <Ionicons name="trash" size={24} color="#5978E5" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>Nenhuma consulta encontrada.</Text>
          )}
        </View>
      </ScrollView>

      {/* Footer */}
      <Footer
        navigation={navigation}
        footerImageUrl="https://img.freepik.com/vetores-gratis/hospital-logo-design-vector-medical-cross_53876-136743.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1723939200&semt=ais_hybrid"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B7FAFE',
  },
  formContainer: {
    flex: 1,
    padding: 20,
    paddingRight: 0,
  },
  formCard: {
    backgroundColor: '#5978E5',
    borderRadius: 10,
    padding: 15,
  },
  formTitle: {
    color: '#FFF',
    fontSize: 18,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  singleButtonContainer: {
    marginTop: 10,
  },
  clearButton: {
    backgroundColor: '#A1A9A9',
    flex: 1,
    marginRight: 10,
  },
  applyButton: {
    backgroundColor: '#2DAD2B',
    flex: 1,
  },
  clearButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  applyButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  tableContainer: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#5978E5',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#FFF',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
  },
  tableHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5978E5',
    marginRight: 20,
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    marginRight: 10,
  },
  tableActions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 10,
  },
  noDataText: {
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});
