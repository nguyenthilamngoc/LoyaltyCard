/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TextInput,
  TouchableHighlight
} from "react-native";
import firebaseConfig from "./FirebaseConfig";
import { graphql } from "react-apollo";
import Icon from "react-native-vector-icons/Ionicons";

import styles from "./styles";
import { CARD_CREATION_QUERY } from "./GraphqlQueries";

const atob = require("base-64").decode;
const ImagePicker = require("react-native-image-picker");
import RNFetchBlob from "react-native-fetch-blob";
// Create the client as outlined in the setup guide

// More info on all the options is below in the README...just some common use cases shown here
const options = {
  title: "Select Photo",
  customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};
type Props = {
  cardCreation: any,
  navigation: any
};
type State = {
  name: string,
  number: string,
  imageUri: string,
  imageSource: any
};

const imageRef = firebaseConfig
  .storage()
  .ref("cards")
  .child(new Date().getTime() + ".jpeg");

class CreateCard extends Component<Props, State> {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      title: "Cards Wallet",
      headerStyle: { backgroundColor: "#f06292" },
      headerRight: (
        <TouchableHighlight onPress={params.createCard}>
          <View>
            <Icon name="md-done-all" size={30} style={styles.saveButtonIcon} />
          </View>
        </TouchableHighlight>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      number: "",
      imageUri: "",
      imageSource: null
    };
  }

  render() {
    let img =
      this.state.imageSource === null ? null : (
        <Image
          source={this.state.imageSource}
          style={{ height: 163, width: 255 }}
        />
      );
    return (
      <View style={styles.container}>
        <View style={styles.flowRight}>
          <TextInput
            underlineColorAndroid={"transparent"}
            style={styles.input}
            value={this.state.name}
            onChangeText={name => this.setState({ name })}
            placeholder="Name"
          />
          <TextInput
            underlineColorAndroid={"transparent"}
            style={styles.input}
            value={this.state.number}
            onChangeText={number => this.setState({ number })}
            placeholder="Number"
          />

          <TouchableHighlight onPress={this.pickImage}>
            <Icon name="md-camera" size={40} color="#f50057" />
          </TouchableHighlight>
        </View>
        {img}
      </View>
    );
  }

  createCard = async () => {
    const { name, number, imageUri } = this.state;
    console.log("...start");
    await this.props.cardCreation({
      variables: {
        name,
        number,
        imageUri
      }
    });
    console.log("...end");
    this.props.navigation.navigate("Home");
  };

  componentDidMount() {
    this.props.navigation.setParams({ createCard: this.createCard });
  }

  pickImage = () => {
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const Blob = RNFetchBlob.polyfill.Blob;
        const fs = RNFetchBlob.fs;
        const temp = window.XMLHttpRequest; 
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
        window.Blob = Blob;
        let source = { uri: response.uri };
        this.setState({
          imageSource: source
        });

        var contentType = "image/jpeg";

        const image = response.uri;

        let uploadBlob: any = null;
        let mime = "image/jpg";
        fs
          .readFile(image, "base64")
          .then(data => {
            return Blob.build(data, { type: `${mime};BASE64` });
          })
          .then(blob => {
            uploadBlob = blob;
            return imageRef.put(blob, { contentType: mime });
          })
          .then(() => {
            uploadBlob.close();
            return imageRef.getDownloadURL();
          })
          .then(url => {
            // URL of the image uploaded on Firebase storage
            url = url.split("&token")[0];
            console.log(url);
            this.setState({
              imageUri: url
            });
          })
          .catch(error => {
            console.log(error);
          });

      }
    });
  };
}

export default graphql(CARD_CREATION_QUERY, { name: "cardCreation" })(
  CreateCard
);
