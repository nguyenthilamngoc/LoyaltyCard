import * as firebase from "firebase";

  // Initialize Firebase
let config = {
    apiKey: "AIzaSyAPu6XfYr_iTAUJ2RbfdMr4HrGL2qmZaFY",
    authDomain: "loyaltycardapp-76417.firebaseapp.com",
    databaseURL: "https://loyaltycardapp-76417.firebaseio.com",
    projectId: "loyaltycardapp-76417",
    storageBucket: "loyaltycardapp-76417.appspot.com",
    messagingSenderId: "325815101688"
  };
 export default firebaseConfig = firebase.initializeApp(config);
