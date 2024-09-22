import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Appbar } from 'react-native-paper';

export default function Header() {
  return (
    <Appbar.Header style={styles.appbar}>
      <View style={styles.headerContent}>
        <Image
          source={{
            uri: 'https://img.freepik.com/fotos-gratis/jovem-mulher-trabalhando-no-escritorio-com-laptop-e-fones-de-ouvido-na-parede-branca-atendimento-ao-cliente-e-call-center_231208-8601.jpg?w=1380&t=st=1724717085~exp=1724717685~hmac=c0df740124bfb9cd1c047f4c069f68c58dbf45ef00d76c6e66fda7765b8d3337',
          }}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.name}>Mariana Maia</Text>
          <Text style={styles.position}>Atendente</Text>
        </View>
      </View>
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: '#5978E5',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  position: {
    color: '#FFF',
    fontSize: 14,
  },
});
