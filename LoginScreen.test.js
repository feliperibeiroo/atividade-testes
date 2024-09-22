import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './LoginScreen'; // ajuste o caminho conforme necessário
import supabase from './database/database'; // ajuste o caminho conforme necessário

// Mock do método navigation.navigate
const mockNavigate = jest.fn();

// Mock do Supabase
jest.mock('./database/database', () => ({
  auth: {
    signInWithPassword: jest.fn(),
  },
}));

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNavigate, // Aqui está o mock do navigate
    }),
  };
});

test('testa se o login falha com dados incorretos', async () => {
  // Mock da função de login para simular falha
  supabase.auth.signInWithPassword.mockResolvedValueOnce({
    data: null,
    error: { message: 'Usuário ou Senha Incorretos' },
  });

  const { getByPlaceholderText, getByText, findByText } = render(
    <NavigationContainer>
      <LoginScreen />
    </NavigationContainer>
  );

  fireEvent.changeText(getByPlaceholderText('Email'), 'invalidoo@teste.com');
  fireEvent.changeText(getByPlaceholderText('Senha'), 'senhaErrada');

  // Dispara a ação de login
  fireEvent.press(getByText('Entrar'));

  // Verifica o estado da mensagem de erro
  const errorMessage = await findByText('Usuário ou Senha Incorretos');
  expect(errorMessage).toBeTruthy();

  // Verifica se a navegação para 'Home' não ocorreu
  expect(mockNavigate).not.toHaveBeenCalledWith('Home');
});

test('testa se o login é bem-sucedido com dados corretos', async () => {
  // Mock da função de login para simular sucesso
  supabase.auth.signInWithPassword.mockResolvedValueOnce({
    data: { user: { email: 'atendente01@ufca.teste.com' } },
    error: null,
  });

  const { getByPlaceholderText, getByText } = render(
    <NavigationContainer>
      <LoginScreen />
    </NavigationContainer>
  );

  fireEvent.changeText(getByPlaceholderText('Email'), 'atendente01@ufca.teste.com');
  fireEvent.changeText(getByPlaceholderText('Senha'), '12345');

  // Dispara a ação de login
  fireEvent.press(getByText('Entrar'));

  // Verifica se a navegação para 'Home' foi chamada
  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith('Home');
  });
});