//@flow
import React, { Component } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import firebaseConfig from "./FirebaseConfig";

type Props = {
  cardCreation: any,
  navigation: any
};
type State = {
  email: string,
  password: string
};
export default class Login extends Component<Props, State> {
  static navigationOptions = ({ navigation }: any) => {

    return {
      title: "Cards Wallet",
      headerStyle: { backgroundColor: "#f06292" }
    };
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  login = () => {
    firebaseConfig
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(()=>{
        this.props.navigation.navigate('Home');
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  };
  register = () => {
    firebaseConfig
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  };
  render() {
    return (
      <View
        style={{ flex: 1, backgroundColor: "pink", justifyContent: "center" }}
      >
        <TextInput
          style={{ margin: 5 }}
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
          placeholder="Name"
        />
        <TextInput
          style={{ margin: 5 }}
          value={this.state.password}
          secureTextEntry={true}
          onChangeText={password => this.setState({ password })}
          placeholder="Password"
        />
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Button
            style={styles.buttonLogin}
            onPress={this.login}
            title="Login"
            color="#841584"
          />
          <Button onPress={this.register} title="Register" color="#841584" />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  buttonLogin: {
    width: 100,
    margin: 10,
    borderRadius: 5
  }
});
