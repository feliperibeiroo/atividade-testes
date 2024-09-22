import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Importar useNavigation

export default function Footer() {
  const navigation = useNavigation(); // Hook para navegação

  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => navigation.goBack()}> {/* Navegar para a página anterior */}
        <Ionicons name="arrow-back" size={32} color="#FFF" />
      </TouchableOpacity>
      <Image
        source={{
          uri: 'https://img.freepik.com/vetores-gratis/hospital-logo-design-vector-medical-cross_53876-136743.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1723939200&semt=ais_hybrid',
        }}
        style={styles.footerImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#5978E5',
    padding: 10,
  },
  footerImage: {
    width: 40,
    height: 40,
  },
});
