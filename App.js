import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import supabase, { SupabaseContext } from './database/database'; // Certifique-se de importar corretamente
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import ConsultasScreen from './Consultas';
import CadastroPacienteScreen from './CadastroPaciente'; 
import CadastroMedicoScreen from './CadastroMedico'; 
import CadastroConsultaScreen from './CadastroConsulta'; 
import CadastroSucessoScreen from './CadastroSucesso'; 
import CadastroAtendenteScreen from './CadastroAtendente'; 
import PacientesScreen from './Pacientes'; 
import MedicosScreen from './Medicos'; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <SupabaseContext.Provider value={supabase}> {/* Fornecendo o supabase */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }} 
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }} 
          />
          <Stack.Screen
            name="Consultas"
            component={ConsultasScreen}
            options={{ headerShown: false }} 
          />
          <Stack.Screen
            name="Pacientes"
            component={PacientesScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen
            name="Médicos"
            component={MedicosScreen}
            options={{ headerShown: false }} 
          />
          <Stack.Screen
            name="CadastroConsulta"
            component={CadastroConsultaScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen
            name="CadastroSucesso"
            component={CadastroSucessoScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen
            name="CadastroAtendente"
            component={CadastroAtendenteScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen
            name="CadastroPaciente"
            component={CadastroPacienteScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen
            name="CadastroMedico"
            component={CadastroMedicoScreen} 
            options={{ headerShown: false }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SupabaseContext.Provider>
  );
}
