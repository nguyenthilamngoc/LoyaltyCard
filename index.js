/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import { AppRegistry } from 'react-native';
import React, { Component } from 'react';
import App from './src/components/App';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { YellowBox } from 'react-native';
import { ApolloLink, split } from 'apollo-client-preset'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjdbryqzk130b0127pni1toz7' })
const wsLink = new WebSocketLink({
  uri: `wss://subscriptions.graph.cool/v1/cjdbryqzk130b0127pni1toz7`,
  options: {
    reconnect: true,

  }
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink,
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

export default function Main() {
    return (
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    );
}



AppRegistry.registerComponent('LoyaltyCard', () => Main);
