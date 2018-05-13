/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TextInput,
  TouchableHighlight
} from 'react-native'

import styles from './styles'
import Icon from 'react-native-vector-icons/Ionicons'
import { CARD_CREATION_QUERY } from './GraphqlQueries'
import { graphql } from 'react-apollo'

var ImagePicker = require('react-native-image-picker')
// Create the client as outlined in the setup guide

// More info on all the options is below in the README...just some common use cases shown here
var options = {
  title: 'Select Photo',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
}
type Props = {
  cardCreation: any,
  navigation: any,
}
type State = {
  name: string,
  number: string,
  imageUri: any,
}

class CreateCard extends Component<Props, State> {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {}

    return {
      title: 'Cards Wallet',
      headerStyle: { backgroundColor: '#f06292' },
      headerRight: (
        <TouchableHighlight onPress={params.createCard}>
          <View>
            <Icon name='md-done-all' size={30} style={styles.saveButtonIcon} />
          </View>
        </TouchableHighlight>
      )
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      name: '',
      number: '',
      imageUri: null
    }
  }

  render () {
    let img = this.state.imageUri == null
      ? null
      : <Image
        source={this.state.imageUri}
        style={{ height: 163, width: 255 }}
        />
    return (
      <View style={styles.container}>
        <View style={styles.flowRight}>
          <TextInput
            underlineColorAndroid={'transparent'}
            style={styles.input}
            value={this.state.name}
            onChangeText={name => this.setState({ name })}
            placeholder='Name'
          />
          <TextInput
            underlineColorAndroid={'transparent'}
            style={styles.input}
            value={this.state.number}
            onChangeText={number => this.setState({ number })}
            placeholder='Number'
          />

          <TouchableHighlight onPress={this.pickImage}>
            <Icon name='md-camera' size={40} color='#f50057' />
          </TouchableHighlight>

        </View>
        {img}

      </View>
    )
  }

  createCard = async () => {
    const { name, number } = this.state
    const imageUri =  this.state.imageUri ? this.state.imageUri.uri : '';
    await this.props.cardCreation({
      variables: {
        name,
        number,
        imageUri
      }
    })
    this.props.navigation.navigate('Home')
  }

  componentDidMount () {
    this.props.navigation.setParams({ createCard: this.createCard })
  }

  pickImage = () => {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response)

      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        let source = { uri: response.uri }

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          imageUri: source
        })
      }
    })
  }
}

export default graphql(CARD_CREATION_QUERY, { name: 'cardCreation' })(
  CreateCard
)
