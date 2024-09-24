import React, { useEffect, useState, useContext } from 'react';
import { View, ScrollView, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Header from './components/Header';
import Footer from './components/Footer';
import { useNavigation } from '@react-navigation/native';
import { SupabaseContext } from './database/database'; // Importando o contexto do Supabase

export default function MedicosScreen() {
  const navigation = useNavigation();
  const supabase = useContext(SupabaseContext); // Usando o contexto do Supabase
  const [medicos, setMedicos] = useState([]); // Estado para armazenar os médicos
  const [idFilter, setIdFilter] = useState(''); // Estado para filtro de ID
  const [nomeFilter, setNomeFilter] = useState(''); // Estado para filtro de Nome

  // Função para buscar os médicos do banco de dados
  const fetchMedicos = async () => {
    const { data, error } = await supabase
      .from('medicos') // Nome da tabela que contém os dados dos médicos
      .select('*'); // Selecionando todos os campos

    if (error) {
      console.error('Erro ao buscar médicos:', error);
    } else {
      setMedicos(data); // Atualizando o estado com os dados dos médicos
    }
  };

  // Função para excluir médico
  const deleteMedico = async (id) => {
    const { error } = await supabase
      .from('medicos') // Nome da tabela
      .delete() // Método para deletar
      .eq('id', id); // Condição para excluir o médico com o ID especificado

    if (error) {
      console.error('Erro ao excluir médico:', error);
    } else {
      // Atualiza a lista de médicos
      setMedicos(medicos.filter((medico) => medico.id !== id));
    }
  };

  // Função para filtrar médicos
  const applyFilter = () => {
    const filteredMedicos = medicos.filter((medico) => {
      const matchesId = idFilter ? medico.id.toString().includes(idFilter) : true; // Verifica se o ID corresponde ao filtro
      const matchesNome = nomeFilter ? medico.nome.toLowerCase().includes(nomeFilter.toLowerCase()) : true; // Verifica se o Nome corresponde ao filtro
      return matchesId && matchesNome; // Retorna verdadeiro se ambos os filtros correspondem
    });

    setMedicos(filteredMedicos); // Atualiza a lista de médicos com os filtrados
  };

  // Função para limpar filtros
  const clearFilters = () => {
    setIdFilter(''); // Limpa o filtro de ID
    setNomeFilter(''); // Limpa o filtro de Nome
    fetchMedicos(); // Recarrega todos os médicos
  };

  useEffect(() => {
    fetchMedicos(); // Chamando a função ao montar o componente
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header
        name="Mariana Maia"
        position="Atendente"
        profileImageUrl="https://img.freepik.com/fotos-gratis/jovem-mulher-trabalhando-no-escritorio-com-laptop-e-fones-de-ouvido-na-parede-branca-atendimento-ao-cliente-e-call-center_231208-8601.jpg?w=1380&t=st=1724717085~exp=1724717685~hmac=c0df740124bfb9cd1c047f4c069f68c58dbf45ef00d76c6e66fda7765b8d3337"
      />

      {/* Formulário de Médicos */}
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Card style={styles.formCard}>
          <Card.Title
            title="Cadastro de Médicos"
            titleStyle={styles.formTitle}
            left={(props) => <MaterialCommunityIcons name="doctor" size={32} color="#FFF" />}
          />
          <Card.Content>
            <TextInput
              style={styles.input}
              placeholder="ID Médico"
              placeholderTextColor="#888"
              value={idFilter}
              onChangeText={setIdFilter} // Atualiza o estado do filtro de ID
            />
            <TextInput
              style={styles.input}
              placeholder="Nome do Médico"
              placeholderTextColor="#888"
              value={nomeFilter}
              onChangeText={setNomeFilter} // Atualiza o estado do filtro de Nome
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
                onPress={() => navigation.navigate('CadastroMedico')} // Navegar para CadastroMedico
              >
                <Text style={styles.applyButtonText}>Cadastrar Médico</Text>
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* Tabela de Resultados */}
        <View style={styles.tableContainer}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>ID Médico</Text>
            <Text style={styles.tableHeader}>Nome</Text>
            <Text style={styles.tableHeader}>Especialidade</Text>
            <View style={styles.tableActions}></View>
          </View>

          {/* Renderizando os dados dos médicos */}
          {medicos.map((medico) => (
            <View key={medico.id} style={styles.tableRow}>
              <Text style={styles.tableCell}>{medico.id}</Text>
              <Text style={styles.tableCell}>{medico.nome}</Text>
              <Text style={styles.tableCell}>{medico.especialidade}</Text>
              <View style={styles.tableActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="pencil" size={24} color="#5978E5" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="print" size={24} color="#5978E5" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => deleteMedico(medico.id)} // Chamando a função de exclusão
                >
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
    marginTop: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
  },
  tableHeader: {
    flex: 1,
    fontWeight: 'bold',
  },
  tableCell: {
    flex: 1,
  },
  tableActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    marginLeft: 10,
  },
});
