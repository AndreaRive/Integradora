import React, { Component, useState, useLayoutEffect } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import firebase from './../database/firebase';

import estilos from '../styles/estilos';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import {
  ActivityIndicator,
  Image,
  Text,
  View,
  Switch,
  ScrollView,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import get_error from '../helpers/errores_es_mx';

export default class Registro extends Component {
  constructor(props) {
    super(props);
    /*Para llamar a las props utilizamos 
        this.props*/

    /*
        Las clases tiene un atributo tipo objeto reservado que se llama state
        y aqui debmos guardar todas las variables de estado que sean necesarias
        */
    this.state = {
      nombre: '',
      apellido1: '',
      apellido2: '',
      fechaNAcimiento: '',
      telefono: '',
      email: '',
      pin: '',
      terminos: false,
      aiVisible: false,
      btnVisible: true,
    };
  } // /Constructor

  /**
   * Para crear un metodo en una clase, solo agregas el nombre seguido de los parámetros
   * (Como crear una función sin la palabra function)
   */
  metodoValidaRegistro(state) {
    if (this.state.nombre.length < 3) {
      Alert.alert('ERROR', 'Nombre incorrecto', [
        {
          text: 'Corregir',
          onPress: () => this.setState({ nombre: '' }),
        },
      ]);

      return;
    }
  }

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  /**
   * RENDER
   */
  render() {
    const validaRegistro = async () => {
      if (this.state.nombre.length < 3) {
        Alert.alert('ERROR', 'Nombre incorrecto', [
          {
            text: 'Corregir',
            onPress: () => this.setState({ nombre: '' }),
          },
        ]);

        return;
      }

      if (this.state.apellido1.length < 3) {
        Alert.alert('ERROR', 'Apellido 1 incorrecto', [
          {
            text: 'Corregir',
            onPress: () =>
              this.setState({
                apellido1: '',
              }),
          },
        ]);

        return;
      }

      //Apellido 2 no es obligatorio, pero si se escribe debe tener mas de 3 caracteres
      if (this.state.apellido2.length > 0 && this.state.apellido2.length < 3) {
        Alert.alert('ERROR', 'Apellido 2 incorrecto', [
          {
            text: 'Corregir',
            onPress: () =>
              this.setState({
                apellido2: '',
              }),
          },
        ]);

        return;
      }

      if (this.state.telefono.length < 10) {
        Alert.alert('ERROR', 'Telefono incorrecto', [
          {
            text: 'Corregir',
            onPress: () =>
              this.setState({
                telefono: '',
              }),
          },
        ]);

        return;
      }

      if (
        this.state.email.length < 5 &&
        !this.validateEmail(this.state.userName)
      ) {
        Alert.alert('ERROR', 'Email incorrecto', [
          {
            text: 'Corregir',
            onPress: () =>
              this.setState({
                email: '',
              }),
          },
        ]);

        return;
      }

      if (this.state.pin.length < 6) {
        Alert.alert('ERROR', 'Pin incorrecto', [
          {
            text: 'Corregir',
            onPress: () =>
              this.setState({
                pin: '',
              }),
          },
        ]);

        return;
      }

      //Si las validaciones son coreectas
      // this.setState({ aiVisible: true });
      // this.setState({ btnVisible: false });
      this.setState({
        aiVisible: true,
        btnVisible: false,
      });
      /**
       * Crear un nuevo documento en la coleccion usuarios
       */
      try {
        /**
         * Creamos un usuario desde el servicio de auth de Firebase
         */
        const usuarioFirebase = await firebase.auth.createUserWithEmailAndPassword(
          this.state.email,
          this.state.pin
        );
        /**
         *Creamos un correo electronico para validar la existencia 
         de la cuenta
         */
        await usuarioFirebase.user.sendEmailVerification().then(() => {
          Alert.alert(
            'Usuario registrado',
            `${usuarioFirebase.user.uid}\nTe enviamos un correo para validar tu cuenta`,
            [
              {
                text: 'Continuar',
                onPress: () => {
                  this.setState({ aiVisible: false, btnVisible: true });
                },
              },
            ]
          );
        });
        const docUsuario = await firebase.db.collection('usuarios').add({
          authId: usuarioFirebase.user.uid,
          nombre: this.state.nombre,
          apellido1: this.state.apellido1,
          apellido2: this.state.apellido2,
          fechaNAcimiento: this.state.fechaNAcimiento,
          telefono: this.state.telefono,
        });
      } catch (e) {
        console.log(e.toString());
        Alert.alert('ERROR', get_error(e.code), [
          {
            text: 'Corregir',
            onPress: () => {
              this.setState({
                aiVisible: false,
                btnVisible: true,
              });
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
            }}
          >
            <Image
              source={require('./../../assets/images/Logo.png')}
              style={estilos.imgRegis}
            />
            <Text style={estilos.tituloRegis}>Registro</Text>
          </View>
          <View>
            <TextInput
              style={estilos.input}
              label='Nombre'
              keyboardType='default'
              value={this.state.nombre}
              onChangeText={(val) => {
                this.setState({ nombre: val });
              }}
            />
            <TextInput
              style={estilos.input}
              label='Apellido 1'
              keyboardType='default'
              value={this.state.apellido1}
              onChangeText={(val) => {
                this.setState({
                  apellido1: val,
                });
              }}
            />
            <TextInput
              style={estilos.input}
              label='Apellido 2'
              keyboardType='default'
              value={this.state.apellido2}
              onChangeText={(val) => {
                this.setState({
                  apellido2: val,
                });
              }}
            />
            <TextInput
              style={estilos.input}
              label='Telefono (10)'
              keyboardType='phone-pad'
              maxLength={10}
              value={this.state.telefono}
              onChangeText={(val) => {
                this.setState({ telefono: val });
              }}
            />

            <TextInput
              style={estilos.input}
              label='Email'
              keyboardType='email-address'
              value={this.state.email}
              autoCapitalize='none'
              onChangeText={(val) => {
                this.setState({ email: val });
              }}
            />

            <TextInput
              style={estilos.input}
              label='Pin (6)'
              keyboardType='number-pad'
              secureTextEntry
              maxLength={6}
              value={this.state.pin}
              onChangeText={(val) => {
                this.setState({ pin: val });
              }}
            />
          </View>

          <View style={estilos.botones}>
            <Button mode='outlined' onPress={validaRegistro}>
              <AntDesign name='save' size={20} color='#4F289D' />
              {'  '}
              Registrarse
            </Button>

            <Button
              mode='text'
              Type='boolean'
              onPress={() => {
                this.props.navigation.navigate('Login');
              }}
            >
              ¿Ya tienes una cuenta?
            </Button>
          </View>
        </View>
      </ScrollView>
    );
  }
}
