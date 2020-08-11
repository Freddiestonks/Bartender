import * as React from 'react';
import {
  Button,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  ToastAndroidStatic as ToastAndroid,
  TouchableOpacity,
  View
} from 'react-native';
import * as Facebook from 'expo-facebook';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import { MonoText } from '../components/StyledText';
import Form from "../components/Form";
import backgroundImage from '../assets/images/wallpaper.jpg';
import * as logo from '../assets/images/logo.png';

//import Logo from "../components/Logo";

import * as firebase from "firebase";
import Logo from "../components/Logo";
import SignUpForm from "../components/SignUpForm";


export default function LoginPage() {

    const [loginPage, setLoginPage] = React.useState<boolean>(true);

    return (
    <ImageBackground source={backgroundImage} style={{flex:1
    }} >
        <View style={styles.logo}>
      <Logo />
        </View>
      <View style={styles.formContainer}>
          { loginPage?
        <Form/> :       <SignUpForm/>

          }
      </View>
      <TouchableOpacity style={{alignItems:"center"}} onPress={() => setLoginPage(!loginPage)}>
          {loginPage?
              <Text>No account? Sign Up</Text>:<Text>Already have an account? Log In</Text>
          }
      </TouchableOpacity>
      <Button
        onPress={() => facebookLogIn() }
        title="Sign in with facebook"
        color="#3c50e8"
      />

      <Button title={"anonymous"} onPress={() => anonymousLogin() }/>
    </ImageBackground>
  );
}

LoginPage.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    paddingTop: 10,
  },
  logo:{
    flex: 4,
  },
  formContainer:{
    flex: 2,
  },
  buttonContainer:{
    flex: 1,
  },


});

function anonymousLogin() {
  // firebase.auth().signInAnonymously();
}


// TODO: implement facebook login after first build

async function facebookLogIn() {
  // try {
  //   await Facebook.initializeAsync('2264856513810160');
  //   const {
  //     type,
  //     token,
  //     expires,
  //     permissions,
  //     declinedPermissions,
  //   } = await Facebook.logInWithReadPermissionsAsync({
  //   });
  //
  //   if (type === 'success') {
  //     // Get the user's name using Facebook's Graph API
  //     const credential = firebase.auth.FacebookAuthProvider.credential(token);
  //
  //     // Sign in with credential from the Facebook user.
  //     firebase.auth().signInWithCredential(credential).catch((error) => {
  //       // Handle Errors here.
  //     });
  //   } else {
  //     // type === 'cancel'
  //   }
  // } catch ({ message }) {
  //   alert(`Facebook Login Error: ${message}`);
  // }
}
