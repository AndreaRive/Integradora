import * as React from 'react';
import { View } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const LeftContent = (props) => <Avatar.Icon {...props} icon='qrcode' />;

const MiQr = (props) => (
  <Card>
    <View
      style={{
        alignItems: 'center',
      }}
    >
      <Card.Title
        title='Mi codigo QR'
        subtitle='Para acceder a cualquier plaza muestre este codigo.'
        left={LeftContent}
      />
      <Card.Cover
        source={require('./../../../assets/images/qr.png')}
        style={{
          width: 300,
          height: 300,
        }}
      />
      <Card.Actions>
        <Button
          mode='text'
          onPress={() => {
            props.navigation.navigate('Inicio');
          }}
        >
          Ir a plazas
        </Button>
      </Card.Actions>
    </View>
  </Card>
);

export default MiQr;
