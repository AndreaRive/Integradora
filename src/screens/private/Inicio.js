import React, { useEffect, useLayoutEffect, useState } from 'react';
import firebase from './../../database/firebase';
import {
  Alert,
  BackHandler,
  TouchableOpacity,
  View,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { Entypo, AntDesign } from '@expo/vector-icons';
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  IconButton,
} from 'react-native-paper';

/** props es una referencia a las variables, const, obj, componentes, etc
 * que comparte el componente padre conmigo
 */
const Inicio = (props) => {
  const [plazas, setPlazas] = useState([]);
  const backAction = () => {
    Alert.alert(
      '¡Bienvenido!',
      'Rowait',
      [
        {
          text: 'Registrate',
          onPress: () => {
            props.navigation.reset({
              index: 0,
              routes: [{ name: 'Registro' }],
            });
            props.navigation.navigate('Registro');
          },
        },
        {
          text: 'Logear',
          onPress: () => {
            props.navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
            props.navigation.navigate('Login');
          },
        },
        {
          text: 'Cancelar',
          onPress: () => null,
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
    return true;
  };
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            paddingVertical: 10,
            paddingLeft: 30,
            paddingRight: 10,
          }}
          onPress={backAction}
        >
          <AntDesign name='user' size={20} />
        </TouchableOpacity>
      ),
    });
  }, []);

  //Efecto para sobreescribir el funcionamiento del boton back
  //este código sólo se ejecutará la primera vez que cargue
  //el componente
  useEffect(() => {
    //Vincular el evento back del SO a mi alerta Back
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
    //Al salir de Home eliminamos el evento del backbutton del SO
    return () => backHandler.remove();
  }, []);
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
      <FlatList
        style={{ margin: 15 }}
        data={plazas}
        keyExtractor={(item) => item.id}
        renderItem={(item) => (
          <View style={{ marginVertical: 10 }}>
            <TouchableOpacity onPress={() => {}}>
              <Card>
                <Card.Cover source={{ uri: item.item.imagen }} />

                <Card.Actions>
                  <Button>{item.item.nombre}</Button>

                  <View style={{ float: 'right' }}>
                    <Button>
                      Población:{item.item.poblacionActual}/
                      {item.item.poblacionGeneral}
                    </Button>
                  </View>
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
