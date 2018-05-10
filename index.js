import { AppRegistry } from 'react-native';
import React, { Component } from 'react';
import App from './App';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory'

const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjdbryqzk130b0127pni1toz7' })

const client = new ApolloClient({
  link: httpLink,
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
