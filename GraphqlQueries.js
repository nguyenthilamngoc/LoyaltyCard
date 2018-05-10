import gql from 'graphql-tag'

export const CARD_LIST_QUERY = gql`
  query{
  allCards{
    id,
    name,
    number,
    imageUri
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
