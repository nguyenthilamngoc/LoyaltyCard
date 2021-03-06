/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
  Text,
  Platform,
  ActivityIndicator
} from 'react-native'
import ActionButton from 'react-native-action-button'
import { graphql } from 'react-apollo'
import Icon from 'react-native-vector-icons/Ionicons'

import { CARD_LIST_QUERY, SUBSCRIBE_TO_NEW_CARD } from './GraphqlQueries'

import styles from './styles'
import floatingButton from '../../Resource/img/Floating_Button.png'

type Props = {
  cardsQuery: any,
  navigation: any,
  feedQuery: any,
}
type State = {
  isLoading: boolean,
}
class ListOfCards extends Component<Props, State> {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {}

    return {
      title: 'Cards Wallet',
      headerStyle: { backgroundColor: '#f06292' }
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      isLoading: false
    }
  }

   componentWillMount() {
    this.props.cardsQuery.subscribeToMore({
      document: SUBSCRIBE_TO_NEW_CARD,
      updateQuery: (prev, {subscriptionData}) => {
        if (!subscriptionData) {
          return prev;
        }
        const { node } = subscriptionData.data.Card
        return {
          ...prev,
          allCards: [...prev.allCards, node],
        }
      }
    })
  }

  onPress = () => {}

  keyExtractor = (item, index) => item.id

  renderItem = ({ item }) => {
    return (
      <TouchableHighlight onPress={this.onPress} underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{ uri: item.imageUri }} />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.number}>{item.number}</Text>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    )
  }

  render () {

    const spinner = this.props.cardsQuery && this.props.cardsQuery.loading
      ? <ActivityIndicator size='large' />
      : null
    return (
      <View
        style={{
          backgroundColor: 'pink',
          flex: 1,
          marginTop: Platform.OS === 'ios' ? 34 : 0
        }}
      >
        {spinner}
        <FlatList
          data={this.props.cardsQuery.allCards}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={this.goToCreateCardPage}
          style={styles.TouchableOpacityStyle}
        >

          <Image source={floatingButton} style={styles.FloatingButtonStyle} />

        </TouchableOpacity>
      </View>
    )
  }

  goToCreateCardPage = () => {
    this.props.navigation.navigate('CreateCard')
  }

}
export default graphql(CARD_LIST_QUERY, { name: 'cardsQuery' })(ListOfCards)
