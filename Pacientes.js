import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Header from './components/Header';
import Footer from './components/Footer';
import { useNavigation } from '@react-navigation/native';
import supabase from './database/database';

export default function PacienteScreen() {
  const [pacientes, setPacientes] = useState([]);
  const [filteredPacientes, setFilteredPacientes] = useState([]);
  const [idFilter, setIdFilter] = useState('');
  const [nomeFilter, setNomeFilter] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPacientes = async () => {
      const { data, error } = await supabase
        .from('pacientes')
        .select('id, nome');

      if (error) {
        console.error('Erro ao buscar pacientes:', error);
      } else {
        setPacientes(data);
        setFilteredPacientes(data); // Inicialmente, os pacientes filtrados são todos
      }
    };

    fetchPacientes();
  }, []);

  // Função para deletar um paciente
  const deletePaciente = async (id) => {
    const { error } = await supabase
      .from('pacientes')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erro ao deletar paciente:', error);
    } else {
      const updatedPacientes = pacientes.filter((paciente) => paciente.id !== id);
      setPacientes(updatedPacientes);
      setFilteredPacientes(updatedPacientes); // Atualiza a lista filtrada
    }
  };

  // Função para aplicar o filtro
  const applyFilter = () => {
    const filtered = pacientes.filter((paciente) =>
      (idFilter ? paciente.id.toString().includes(idFilter) : true) &&
      (nomeFilter ? paciente.nome.toLowerCase().includes(nomeFilter.toLowerCase()) : true)
    );
    setFilteredPacientes(filtered);
  };

  // Função para limpar os filtros
  const clearFilters = () => {
    setIdFilter('');
    setNomeFilter('');
    setFilteredPacientes(pacientes); // Reseta a lista filtrada para todos os pacientes
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header
        name="Mariana Maia"
        position="Atendente"
        profileImageUrl="https://img.freepik.com/fotos-gratis/jovem-mulher-trabalhando-no-escritorio-com-laptop-e-fones-de-ouvido-na-parede-branca-atendimento-ao-cliente-e-call-center_231208-8601.jpg?w=1380&t=st=1724717085~exp=1724717685~hmac=c0df740124bfb9cd1c047f4c069f68c58dbf45ef00d76c6e66fda7765b8d3337"
      />

      {/* Formulário de Pacientes */}
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Card style={styles.formCard}>
          <Card.Title
            title="Cadastro de Pacientes"
            titleStyle={styles.formTitle}
            left={(props) => <MaterialCommunityIcons name="account" size={32} color="#FFF" />}
          />
          <Card.Content>
            <TextInput
              style={styles.input}
              placeholder="ID Paciente"
              placeholderTextColor="#888"
              value={idFilter}
              onChangeText={setIdFilter}
            />
            <TextInput
              style={styles.input}
              placeholder="Nome Paciente"
              placeholderTextColor="#888"
              value={nomeFilter}
              onChangeText={setNomeFilter}
            />

            {/* Botões */}
            <View style={styles.buttonContainer}>
              <Button mode="contained" style={styles.clearButton} onPress={clearFilters}>
                <Text style={styles.clearButtonText}>Limpar</Text>
              </Button>
              <Button mode="contained" style={styles.applyButton} onPress={applyFilter}>
                <Text style={styles.applyButtonText}>Filtrar</Text>
              </Button>
            </View>
            <View style={styles.singleButtonContainer}>
              <Button
                mode="contained"
                style={styles.applyButton}
                onPress={() => navigation.navigate('CadastroPaciente')}
              >
                <Text style={styles.applyButtonText}>Cadastrar Paciente</Text>
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* Tabela de Resultados */}
        <View style={styles.tableContainer}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>ID Pac</Text>
            <Text style={styles.tableHeader}>Nome</Text>
            <View style={styles.tableActions}></View>
          </View>

          {/* Exibir dados dos pacientes filtrados */}
          {filteredPacientes.map((paciente) => (
            <View style={styles.tableRow} key={paciente.id}>
              <Text style={styles.tableCell}>{paciente.id}</Text>
              <Text style={styles.tableCell}>{paciente.nome}</Text>
              <View style={styles.tableActions}>
                <TouchableOpacity style={styles.actionButton} onPress={() => deletePaciente(paciente.id)}>
                  <Ionicons name="trash" size={24} color="#5978E5" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
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
    padding: 5,
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
  clearButton: {
    backgroundColor: '#A1A9A9',
    flex: 1,
    marginRight: 10,
  },
  singleButtonContainer: {
    marginTop: 10,
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
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5978E5',
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  tableActions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 10,
  },
});
