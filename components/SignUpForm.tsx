import React from 'react';
import {
    Text,
  StyleSheet,
  KeyboardAvoidingView,
  View,
  TouchableOpacity,
   Button, TextInput, Dimensions,
} from 'react-native';

import * as firebase from "firebase";
import {Ionicons} from "@expo/vector-icons";
import {dbh} from "../database/Firebase";





export default function SignUpForm (){

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [check, setCheck] = React.useState("");
  const [hidden, setHidden] = React.useState(true);
  const [text, setText] = React.useState("");

  const [showPass, setVisibility] = React.useState(false);

  return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.inputWrapper}>
          <Ionicons name={"md-contact"} size={25} color="#fff" style={styles.inlineImg} />
          <TextInput
            style={styles.input}
            placeholder={"Username"}
            autoCapitalize={'none'}
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
            onChangeText={text => setEmail(text)}

          />
        </View>
        <View style={styles.inputWrapper}>
          <Ionicons name={"md-lock"} size={25} color="#fff" style={styles.inlineImg} />
          <TextInput
            style={styles.input}
            placeholder={"Password"}
            secureTextEntry={!showPass}
            // autoCorrect={this.props.autoCorrect}
            autoCapitalize={'none'}
            // returnKeyType={this.props.returnKeyType}
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
            onChangeText={text => setPassword(text)}
          />

            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.leftInlineImg}
              onPress={() => setVisibility(!showPass)}
            >
              <Ionicons name="md-eye" size={25} color="#fff"/>
            </TouchableOpacity>

        </View>
        <View style={styles.inputWrapper}>
          <Ionicons name={"md-lock"} size={25} color="#fff" style={styles.inlineImg} />
          <TextInput
            style={styles.input}
            placeholder={"ConfPassword"}
            secureTextEntry={!showPass}
            // autoCorrect={this.props.autoCorrect}
            autoCapitalize={'none'}
            // returnKeyType={this.props.returnKeyType}
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
            onChangeText={text => setCheck(text)}
          />

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.leftInlineImg}
            onPress={() => setVisibility(!showPass)}
          >
            <Ionicons name="md-eye" size={25} color="#fff"/>
          </TouchableOpacity>

        </View>
          <Button title={'Sign Up'} onPress={() => {
            if(!emailIsValid(email.toString())){
                setHidden(false);
                console.log(email);
                setText("Email is not valid");
              }

          else if(check.toString()!==password.toString()){
              setHidden(false);
              console.log("B");
              setText("The passwords don't match");
            }
          else if(password.toString().length < 6){
            setHidden(false);
            setText("Password is too short");
          }
          else{
              console.log("SHEEE");
              signUp(email,password);
            }
          }


          }/>
        {hidden?
          <View/>:<View><Text>{text.toString()}</Text></View>
        }
      </KeyboardAvoidingView>


    );
  }

const DEVICE_WIDTH = Dimensions.get('window').width;


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
    flex: 5
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: DEVICE_WIDTH - 40,
    height: 40,
    marginHorizontal: 20,
    paddingLeft: 45,
    borderRadius: 20,
    color: '#ffffff',
  },
  inputWrapper: {
    flex: 1,
    padding: 10,
  },
  inlineImg: {
    position: 'absolute',
    zIndex: 99,
    width: 22,
    height: 22,
    left: 40,
    top: 16,
  },
  leftInlineImg: {
    position: 'absolute',
    zIndex: 99,
    width: 22,
    height: 22,
    right: 40,
    top: 16,
  },

});
function signUp(email: string, password: string){

  try {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    }).then(function () {
      if(firebase.auth().currentUser!=null){
        dbh
            .collection('Users')
            // @ts-ignore
            .doc(firebase.auth().currentUser.uid)
            .set({}).then(() => {return true;});
    }});
  }catch (e) {
    console.log(e);
  }

}

function emailIsValid (email: string) {
  //Regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
