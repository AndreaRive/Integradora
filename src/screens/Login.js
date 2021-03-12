import React, { useState, useLayoutEffect } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { ActivityIndicator, Image, Text, View, ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import firebase from './../database/firebase';
import estilos from '../styles/estilos';
import get_error from '../helpers/errores_es_mx';

const Login = (props) => {
  const [email, setEmail] = useState('juancamilovs123@gmail.com');
  const [pin, setPin] = useState('123456');
  const [btnVisible, setBtnVisible] = useState(true);
  const [aiVisible, setAiVisible] = useState(false);
  const [tiHab, setTiHab] = useState(true);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={estilos.inicio}
          onPress={() => {
            props.navigation.navigate('Inicio');
          }}
        >
          <AntDesign name='home' size={20} />
        </TouchableOpacity>
      ),
    });
  }, []);
  const validaLogin = async () => {
    if (email.length < 5) {
      Alert.alert(
        'ERROR',
        'Teléfono incorrecto',
        [
          {
            text: 'Corregir',
            onPress: () => {
              setEmail('');
            },
          },
        ],
        { cancelable: false }
      );
      return;
    }

    if (pin.length !== 6) {
      Alert.alert(
        'ERROR',
        'Pin incorrecto',
        [
          {
            text: 'Corregir',
            onPress: () => {
              setPin('');
            },
          },
        ],
        { cancelable: false }
      );

      return;
    }

    setAiVisible(true);
    setBtnVisible(false);
    setTiHab(false);

    try {
      const usuarioFirebase = await firebase.auth.signInWithEmailAndPassword(
        email,
        pin
      );

      let mensaje = `Bienvenido ${usuarioFirebase.user.email}\n`;
      mensaje += usuarioFirebase.user.emailVerified
        ? '***Usuario verificado***'
        : 'xxx Por favor valida tu cuenta xxx';

      Alert.alert('Hola de nuevo', mensaje, [
        {
          text: 'Ingresar',
          onPress: () => {
            setAiVisible(false);
            setBtnVisible(true);
            setTiHab(true);
            props.navigation.navigate('Home');
          },
        },
      ]);
    } catch (e) {
      Alert.alert('ERROR', get_error(e.code), [
        {
          text: 'Corregir',
          onPress: () => {
            setAiVisible(false);
            setBtnVisible(true);
            setTiHab(true);
          },
        },
      ]);
    }
  };

  return (
    <ScrollView>
      <View>
        <View
          style={{
            alignItems: 'center',
            marginTop: 30,
          }}
        >
          <Image
            source={require('./../../assets/images/Logo.png')}
            style={estilos.imgLogin}
          />

          <Text style={estilos.titulo}>Iniciar sesión</Text>
        </View>

        <TextInput
          label='E-mail'
          keyboardType='email-address'
          maxLength={70}
          style={estilos.input}
          onChangeText={(val) => setEmail(val)}
          value={email}
          editable={tiHab}
        />

        <TextInput
          label='Pin (6 dígitos)'
          keyboardType='number-pad'
          secureTextEntry
          maxLength={6}
          style={estilos.input}
          onChangeText={(val) => setPin(val)}
          value={pin}
          editable={tiHab}
        />

        <View style={estilos.botones}>
          <Button mode='contained' onPress={validaLogin}>
            Continuar
          </Button>

          <Button
            mode='text'
            onPress={() => {
              props.navigation.navigate('Registro');
            }}
          >
            ¿No tienes una cuenta?
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;
