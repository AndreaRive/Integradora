import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    marginVertical: 20,
    fontSize: 26,
    color: '#0267c1',
    fontWeight: 'bold',
    paddingVertical: 14,
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: '95%',
    borderWidth: 2,
    borderColor: '#0075c4',
    fontSize: 16,
    borderRadius: 10,
    marginVertical: 10,
  },
  imgLogin: {
    height: 200,
    width: 200,
    resizeMode: 'contain',
  },
  imgRegis: {
    height: 150,
    width: 150,
    resizeMode: 'contain',
    marginTop: 30,
  },
  tituloRegis: {
    marginVertical: 20,
    fontSize: 26,
    color: '#0267c1',
    fontWeight: 'bold',
    paddingVertical: 14,
  },
  contenedorImgCircular: {
    width: 200,
    height: 200,
    overflow: 'hidden',
    borderRadius: 100,
  },
  row: {
    flexDirection: 'row',
    width: '95%',
  },
  col: {
    flex: 1,
  },
  button: {
    width: '100%',
    marginVertical: 10,
    color: '#0267c1',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
  input: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  botones: {
    alignItems: 'center',
    marginHorizontal: 45,
  },
});
