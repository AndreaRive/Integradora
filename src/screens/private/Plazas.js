import React, { useEffect, useLayoutEffect, useState } from 'react';
import firebase from './../../database/firebase';
import { View, SafeAreaView, FlatList, Image, ScrollView } from 'react-native';
import { Entypo, AntDesign } from '@expo/vector-icons';
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  IconButton,
  Text,
  Banner,
} from 'react-native-paper';

/** props es una referencia a las variables, const, obj, componentes, etc
 * que comparte el componente padre conmigo
 */
const Plazas = (props) => {
  const [plazas, setPlazas] = useState([]);
  const [visible, setVisible] = React.useState(true);

  useEffect(() => {
    firebase.db
      .collection('plazas')
      .where('nombre', '==', 'Antea')
      .onSnapshot((querySnapshot) => {
        const arrPlazas = [];
        querySnapshot.docs.map((doc) => {
          arrPlazas.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setPlazas(arrPlazas);
      });
  }, []);
  return (
    <ScrollView>
      <SafeAreaView>
        <Banner
          visible={visible}
          actions={[
            {
              label: 'Cancelar',
              onPress: () => setVisible(false),
            },
            {
              label: 'Visitar',
              onPress: () => setVisible(false),
            },
          ]}
          icon={({ size }) => (
            <Image
              source={require('./../../../assets/images/google.png')}
              style={{
                width: 50,
                height: 50,
              }}
            />
          )}
        >
          Quieres abrir google maps?
        </Banner>
        <FlatList
          style={{ margin: 15 }}
          data={plazas}
          keyExtractor={(item) => item.id}
          renderItem={(item) => (
            <View style={{ marginVertical: 10 }}>
              <Card>
                <Card.Cover source={{ uri: item.item.imagen }} />

                <Card.Content>
                  <Title style={{ alignItems: 'center', marginVertical: 10 }}>
                    {item.item.nombre}
                  </Title>
                  <Paragraph style={{ color: '#4F289D' }}>Dirección:</Paragraph>
                  <Paragraph>{item.item.direccion}</Paragraph>
                  <Paragraph style={{ color: '#4F289D' }}>Telefono:</Paragraph>
                  <Paragraph>{item.item.telefono}</Paragraph>
                  <Paragraph style={{ color: '#4F289D' }}>
                    Poblacion actual:
                  </Paragraph>
                  <Text>{item.item.poblacionActual}</Text>
                  <Paragraph style={{ color: '#4F289D' }}>
                    Poblacion general:
                  </Paragraph>
                  <Paragraph>{item.item.poblacionGeneral}</Paragraph>
                </Card.Content>
              </Card>
            </View>
          )}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default Plazas;
