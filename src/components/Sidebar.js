import React from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import { AntDesign, MaterialIcons } from '@expo/vector-icons';

const Sidebar = (props) => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ImageBackground
        source={require('./../../assets/images/fondo.jpg')}
        style={{
          width: '100%',
          paddingBottom: 30,
        }}
      >
        <Text
          style={{
            marginTop: 20,
            width: '100%',
            textAlign: 'center',
            fontSize: 18,
            fontWeight: '500',
            color: '#000',
          }}
        >
          B I E N V E N I D O
        </Text>

        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
            }}
          >
            <ImageBackground
              source={require('./../../assets/images/Logo.png')}
              style={{
                width: 60,
                height: 60,
                overflow: 'hidden',
                marginTop: 20,
                backgroundColor: '#FFF',
              }}
            />
          </View>

          <View style={{ flex: 2 }}>
            <View
              style={{
                flex: 1,
                marginLeft: 10,
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  marginBottom: 5,
                  color: '#000',
                }}
              >
                CAMILO SILVA
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>

      <DrawerContentScrollView {...props}>
        <DrawerItem
          icon={() => <AntDesign name='home' size={20} color='#000' />}
          label='Inicio'
          onPress={() => {
            props.navigation.navigate('InicioUser');
          }}
        />

        <DrawerItem
          icon={() => <AntDesign name='qrcode' size={20} color='#000' />}
          label='Mi QR'
          onPress={() => {
            props.navigation.navigate('MiQr');
          }}
        />

        <DrawerItem
          icon={() => <AntDesign name='user' size={20} color='#000' />}
          label='Perfíl'
          onPress={() => {
            props.navigation.navigate('Perfil');
          }}
        />

        <DrawerItem
          icon={() => <AntDesign name='user' size={20} color='#000' />}
          label='Empleado'
          onPress={() => {
            props.navigation.navigate('Empleado');
          }}
        />
      </DrawerContentScrollView>
    </View>
  );
};

export default Sidebar;
