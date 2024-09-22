import '@testing-library/jest-native/extend-expect';
import mockAsyncStorage from './async-storage'; // Ajuste o caminho conforme necessário

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);