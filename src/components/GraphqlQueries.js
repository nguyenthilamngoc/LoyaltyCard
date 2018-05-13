/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import gql from 'graphql-tag'

export const CARD_LIST_QUERY = gql`
  query{
  allCards{
    id,
    name,
    imageUri
    number,
  }
}
`

export const CARD_CREATION_QUERY = gql`
  mutation CardMutation($name: String!, $number: String!, $imageUri: String!) {
  createCard(name:$name, number:$number, imageUri :$imageUri ){
    id
    name
    number
    imageUri
  }
}
`
export const SUBSCRIBE_TO_NEW_CARD = gql`
      subscription {
        Card(filter: {
        mutation_in: [CREATED]
      }){
          node {
            id
            name
            number
            imageUri
          }
        }
      }
    `
