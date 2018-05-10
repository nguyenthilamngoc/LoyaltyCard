/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StackNavigator,
} from 'react-navigation';
import CreateCard from './CreateCard';
import ListOfCards from './ListOfCards';

const App = StackNavigator({
  Home: { screen: ListOfCards },
  CreateCard: { screen: CreateCard },
});
export default App;
