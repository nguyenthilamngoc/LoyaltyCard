/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    backgroundColor: 'pink'
  },
  flowRight: {
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginBottom: 20,
  },
  input: {
    height: 36,
    width: 255,
    marginTop: 25,
    marginBottom: 25,
    padding: 4,
    marginRight: 5,
    flexGrow: 1,
    borderWidth: 1,
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.8,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: '#48BBEC',
  },
  saveButton: {
    backgroundColor: '#f50057',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#fff'
    //backgroundImage: 'url(' + x.image + ')',
  },
  thumb: {
    width: 80,
    height: 80,
    marginRight: 5
  },
  textContainer: {
    flex: 1,
    marginLeft: 10
  },
  separator: {
    height: 1,
    backgroundColor: 'white'
  },
  name: {
    fontSize: 20,
    fontWeight: 'normal',
    color: 'blue'
  },
  number: {
    fontSize: 15,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    backgroundColor: '#f48fb1',
    padding: 10
  },
   TouchableOpacityStyle:{
     position: 'absolute',
     width: 50,
     height: 50,
     alignItems: 'center',
     justifyContent: 'center',
     right: 30,
     bottom: 30,
   },
  
   FloatingButtonStyle: {
     resizeMode: 'contain',
     width: 50,
     height: 50,
   },
   saveButtonIcon: {
     marginRight :10,
   }
});

export default styles;
