import React, { useEffect, useLayoutEffect, useState } from 'react';
import firebase from './../../database/firebase';
import Plazas from './Plazas';
import MiQr from './MiQr';
import {
  Alert,
  BackHandler,
  TouchableOpacity,
  View,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import { Entypo, AntDesign } from '@expo/vector-icons';
import {
  Avatar,
  Button,
  Card,
  Banner,
  Title,
  Paragraph,
  IconButton,
} from 'react-native-paper';
/** props es una referencia a las variables, const, obj, componentes, etc
 * que comparte el componente padre conmigo
 */
const Inicio = (props) => {
  const [plazas, setPlazas] = useState([]);
  const [visible, setVisible] = React.useState(true);

  useEffect(() => {
    firebase.db.collection('plazas').onSnapshot((querySnapshot) => {
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
    <SafeAreaView>
      <Banner
        visible={visible}
        actions={[
          {
            label: 'Ver mi QR',
            onPress: () => setVisible(props.navigation.navigate('MiQr')),
          },
          {
            label: 'Después',
            onPress: () => setVisible(false),
          },
        ]}
        icon={() => (
          <Image
            source={require('./../../../assets/images/qr.png')}
            style={{
              width: 30,
              height: 30,
            }}
          />
        )}
      >
        ¿Quieres ver tu codigo QR?
      </Banner>
      <FlatList
        style={{ margin: 15 }}
        data={plazas}
        keyExtractor={(item) => item.id}
        renderItem={(item) => (
          <View style={{ marginVertical: 10 }}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Plazas');
              }}
            >
              <Card>
                <Card.Cover source={{ uri: item.item.imagen }} />

                <Card.Actions>
                  <Button>{item.item.nombre}</Button>

                  <Button style={{ position: 'absolute', right: 0 }}>
                    Población:{item.item.poblacionActual}/
                    {item.item.poblacionGeneral}
                  </Button>
                </Card.Actions>
              </Card>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Inicio;
