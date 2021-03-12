import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';
import firebase from './../../../database/firebase';
import estilos from './../../../styles/estilos';
import ProgressDialog from '../../../components/ProgressDialog';
import Snack from 'react-native-snackbar-component';
import AppModal from '../../../components/AppModal';
import * as ImagePicker from 'expo-image-picker';

const MisDatos = (props) => {
  const [usuarioFirebase, setUsuarioFirebase] = useState({});
  const [docUsuario, setDocUsuario] = useState({});
  const [loading, setLoading] = useState(true);
  const [snackUpdate, setSnackUpdate] = useState(false);
  const [snackError, setSnackError] = useState(false);
  const [modalImg, setModalImg] = useState(false);

  const [image, setImage] = React.useState(null);
  const [status, setStatus] = React.useState(null);
  const [permissions, setPermissions] = React.useState(false);

  const askPermissionsAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    } else {
      setPermissions(true);
    }
  };

  const takePictureAsync = async () => {
    const { cancelled, uri, base64 } = await ImagePicker.launchCameraAsync({
      base64: true,
    });

    if (!cancelled) {
      setImage(uri);
      setStatus('Loading...');
      try {
        const result = await callGoogleVisionAsync(base64);
        setStatus(result);
      } catch (error) {
        setStatus(`Error: ${error.message}`);
      }
    } else {
      setImage(null);
      setStatus(null);
    }
  };

  useEffect(() => {
    /* tomamos los datos del usuario que ha iniciado sesión */
    setUsuarioFirebase(firebase.auth.currentUser);

    /* invocamos la consulta */
    getDocUsuario(firebase.auth.currentUser.uid);
  }, []);

  /**
   * Función flecha que ejecuta una consulta sobre la colección
   * usuarios
   */
  const getDocUsuario = async (uid) => {
    try {
      const query = await firebase.db
        .collection('usuarios')
        .where('authId', '==', uid)
        .get();

      /**
       * Si la consulta no esta vacía
       */
      if (!query.empty) {
        /* cuando esperamos solo un registro */
        const snapshot = query.docs[0];

        setDocUsuario({
          ...snapshot.data(),
          id: snapshot.id,
        });

        setLoading(false);
      }
    } catch (e) {
      console.warn(e.toString());
    }
  };

  const getImagenGaleria = async () => {
    /**
     * Preguntamos por el permiso para acceder a
     * los elementos multimedia de la galería
     */
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    /**
     * Si el usuario nos da permiso de ingresar a su galería
     * Mostramos todas sus fotos y esperamos que seleccione una
     */
    if (status === 'granted') {
      const imgGaleria = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      console.log(imgGaleria);
    }
  };

  return (
    /**
     * SafeAreaView calcula el espacio donde el texto
     * no se visualiza y lo recorre
     */
    <SafeAreaView style={{ flex: 1 }}>
      <Snack
        textMessage='Datos actualizados'
        messageColor='#fff'
        backgroundColor='#376e37'
        actionText='Entendido'
        accentColor='#5cb85c'
        actionHandler={() => setSnackUpdate(false)}
        visible={snackUpdate}
      />

      <Snack
        textMessage='Ocurrió un error'
        messageColor='#fff'
        backgroundColor='red'
        actionText='Entendido'
        accentColor='#fff'
        actionHandler={() => setSnackError(false)}
        visible={snackError}
      />

      {modalImg ? (
        <AppModal
          show={modalImg}
          layerBgColor='#333'
          layerBgOpacity={0.5}
          modalBgColor='#fff'
          modalOpacity={1}
          modalContent={
            <View>
              <Text
                style={{
                  alignSelf: 'center',
                  marginBottom: 20,
                  fontSize: 20,
                  fontWeight: '500',
                }}
              >
                <FontAwesome5 name='camera-retro' size={20} /> Actualizar foto
                de perfíl
              </Text>
              <View>
                <View>
                  {image && <Image source={{ uri: image }} />}
                  {status && <Text>{status}</Text>}
                  <Button mode='contained' onPress={takePictureAsync}>
                    Tomar foto
                  </Button>
                </View>
              </View>

              {Platform.OS === 'android' ? (
                <View
                  style={{
                    marginVertical: 10,
                  }}
                />
              ) : null}

              <Button mode='contained' onPress={getImagenGaleria}>
                Galería
              </Button>

              {Platform.OS === 'android' ? (
                <View
                  style={{
                    marginVertical: 10,
                  }}
                />
              ) : null}

              <Button
                mode='contained'
                color='red'
                onPress={() => setModalImg(false)}
              >
                Cancelar
              </Button>
            </View>
          }
        />
      ) : null}

      {/**
       * Si loading es verdadero, mostramos la modal
       */}

      {loading ? <ProgressDialog /> : null}

      <ScrollView>
        <TouchableOpacity onPress={() => setModalImg(true)}>
          <ImageBackground
            source={require('./../../../../assets/images/image_placeholder.png')}
            style={{
              width: 200,
              height: 200,
              alignSelf: 'center',
              marginVertical: 15,
              borderRadius: 25,
              overflow: 'hidden',
            }}
          >
            <Text
              style={{
                backgroundColor: '#000',
                color: '#fff',
                width: '100%',
                paddingBottom: 20,
                paddingTop: 10,
                textAlign: 'center',
                opacity: 0.6,
                position: 'absolute',
                bottom: 0,
              }}
            >
              <FontAwesome5 name='camera' color='#fff' /> Cambiar imagen
            </Text>
          </ImageBackground>
        </TouchableOpacity>

        <View style={{ marginBottom: 30, marginVertical: 20 }}>
          <View>
            <TextInput
              style={estilos.input}
              label='Correo electrónico'
              keyboardType='email-address'
              value={usuarioFirebase.email}
              editable={false}
            />
          </View>
          <TextInput
            style={estilos.input}
            label='nombre'
            keyboardType='default'
            value={docUsuario.nombre}
            onChangeText={(val) =>
              setDocUsuario({
                ...docUsuario,
                ['nombre']: val,
              })
            }
          />

          <TextInput
            style={estilos.input}
            label='Apellido 1'
            keyboardType='default'
            value={docUsuario.apellido1}
            onChangeText={(val) =>
              setDocUsuario({
                ...docUsuario,
                ['apellido1']: val,
              })
            }
          />

          <TextInput
            style={estilos.input}
            label='Apellido 2'
            keyboardType='default'
            value={docUsuario.apellido2}
            onChangeText={(val) =>
              setDocUsuario({
                ...docUsuario,
                ['apellido2']: val,
              })
            }
          />

          <TextInput
            style={estilos.input}
            label='Telefono'
            keyboardType='default'
            value={docUsuario.telefono}
            onChangeText={(val) =>
              setDocUsuario({
                ...docUsuario,
                ['telefono']: val,
              })
            }
          />

          <Button
            style={{ marginHorizontal: 60, width: 250 }}
            mode='contained'
            onPress={async () => {
              setLoading(true);

              try {
                //Seleccionamos de toda la coleccion
                //solo el elemento del id de ese
                //documento
                await firebase.db
                  .collection('usuarios')
                  .doc(docUsuario.id)
                  .update({
                    nombre: docUsuario.nombre,
                    apellido1: docUsuario.apellido1,
                    apellido2: docUsuario.apellido2,
                    telefono: docUsuario.telefono,
                  });
                setLoading(false);
                setSnackUpdate(true);
              } catch (e) {
                setLoading(false);
                setSnackError(true);
              }
            }}
          >
            Guardar Cambios
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MisDatos;
