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
import {Styles} from '../assets/Style'
import { MonoText } from '../components/StyledText';
import Form from "../components/Form";
import ButtonSubmit from "../components/ButtonSubmit";
import Wallpaper from "../components/Wallpaper";
import backgroundImage from "../assets/images/wallpaper.png"
import Logo from "../components/Logo";
import {bindActionCreators} from "redux";
import {actionCreators as actions} from "../components/Authentication/actions";
import {connect} from "react-redux";
import {Auth as firebaseAuth} from "firebase";
import * as firebase from "firebase";
import SignUpForm from "../components/SignUpForm";


export default function SignUpPage({navigation}) {
  return (
    <ImageBackground source={backgroundImage} style={{width: '100%', height: '100%'}}>
      <Logo style={styles.logo}/>
      <SignUpForm style={styles.formContainer}/>
      <TouchableOpacity onPress={() => navigation.goBack()}><Text>No account? sign UP</Text></TouchableOpacity>
    </ImageBackground>
  );
}

SignUpPage.navigationOptions = {
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
