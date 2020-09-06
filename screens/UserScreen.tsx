import * as React from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {dbh} from "../database/Firebase";
import UserScreenElement from "../components/UserScreenElement";
//import {LoadingObject} from "../components/LoadingObject";
import {Avatar, Divider} from 'react-native-elements';
import Colors from "../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import * as Constants from "expo-constants";
import * as firebase from "firebase";
import {Entypo, MaterialIcons} from "@expo/vector-icons";



export default function UserScreen ({navigation}:{navigation: any}) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [userImage, setUserImage] = React.useState('data:image/png;base64,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');
  const [name, setName] = React.useState("");
  const [food, setFood] = React.useState("");
  const [username, setUsername] = React.useState("");
  // @ts-ignore
  const [userID, setUID] = React.useState<any|null>(firebase.auth().currentUser);



  if(!isLoadingComplete&&firebase.auth().currentUser!=null) {


      dbh
      .collection('Users')
          // @ts-ignore
          .doc(firebase.auth().currentUser.uid)
      .get()
      .then(
        function (doc) {
          if (doc.exists) {
              // @ts-ignore

              if(doc.data().name !== undefined && doc.data().name !== null) {
                  // @ts-ignore

                  setName(doc.data().name.toString());
            }
              // @ts-ignore

              if(doc.data().username !== undefined && doc.data().username !== null) {
                  // @ts-ignore

                  setUsername(doc.data().username.toString());

            }
              // @ts-ignore

              if(doc.data().food !== undefined && doc.data().food !== null) {
                  // @ts-ignore

                  setFood(doc.data().food.toString());
            }
              // @ts-ignore

              if(doc.data().image !== undefined && doc.data().image !== null) {
                  // @ts-ignore

                  if(doc.data().image !== "") {
                      // @ts-ignore

                      setUserImage(doc.data().image);
              }
            }
            setLoadingComplete(true);
          } else {
              dbh
                  .collection('Users')
                  // @ts-ignore
                  .doc(firebase.auth().currentUser.uid)
                  .set({}).then(() => {setLoadingComplete(true);});
          }
        });
  }

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1,1],
      base64: true,
      quality: 0.1
    });
    if (pickerResult.cancelled) {
      return;
    }
    console.log(pickerResult);
    let output = handleImage(pickerResult.base64,pickerResult.uri,pickerResult.type);
    postNewValues(output,userID.uid.toString());
    setUserImage(output);

  };


    return (
        <View style={styles.container}>
            <MaterialIcons style={{paddingTop: 40, position:"absolute", left: 20, zIndex: 1,color:"#ff6f61"}} name="arrow-back" size={24}
                           onPress={() => navigation.navigate('Root')}/>
            <Entypo style={{paddingTop: 40, position:"absolute", right: 20, zIndex: 1,color:"#ff6f61"}} name="log-out" size={20}
                           onPress={() => {firebase.auth().signOut().then(() => setLoadingComplete(false))}}/>
            {isLoadingComplete ?

          <View style={styles.bottomContainer}>
            <View style={styles.userImageContainer}>

              <Avatar
                source={{uri: userImage}}
                onPress={() => openImagePickerAsync()}
                rounded
                size="xlarge"
              />
            </View>
            <Divider style={{ backgroundColor: "#ff6f61" }}/>
            <UserScreenElement Type={"Name"} Value={name} UserId={userID.uid.toString()}/>
            <Divider style={{ backgroundColor:  "#ff6f61"  }}/>
            <UserScreenElement Type={"Username"} Value={username} UserId={userID.uid.toString()}/>
          </View> : <View style={{flex: 1,
                    justifyContent: "center",    flexDirection: "row",padding:10}}><ActivityIndicator size="large" color="#ff6f61" /></View>
          }
        </View>
  );

}

function handleImage(base64: string | null | undefined, uri: string, type: string | undefined){
  //In web environments the functions returns null and base 64 is returned in the uri with all correct headers
  if(base64 == null || type == undefined){
    return uri;
  }
  //we need to transform base64 to a uri by adding the header
  else if (type.toLowerCase() === "image"){
      let imgType = typeExtractor(uri);

    if(imgType === ""){
        alert("Unsupported image type");
        return "";
      }
      return 'data:image/' + imgType + ";base64," + base64.toString();
  }
  //In case a bad image is added default image is added
  else {
    alert("Media is not an image");
    return "";
  }
}
UserScreen.navigationOptions = {
  header: null,
};

function postNewValues(value: any, userID: string | undefined) {
    dbh
      .collection('Users')
      .doc(userID)
      .update({
        image: value
      }).then(() => {return true;});
}

function typeExtractor(uri: string | any[]) {
  let length = uri.length - 1;
  let count = 0;
  let done = false;
  while (count !== length && !done){
    if(uri[length -count] === "."){
      done = true;
    }
    else {
      count++;
    }
  }
  count--;
  return uri.toString().substr(length-count,count)

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    userTextContainer:{
        flex: 1,
        paddingHorizontal: 5,
        paddingVertical: 5,
        flexDirection: 'column',
        justifyContent: 'center',

        alignItems: 'flex-start',
    },
    userInputTextContainer:{
        paddingHorizontal: 5,
        paddingVertical: 5,
        flexDirection: 'row',
        //alignItems: 'center',

        justifyContent: 'space-between',
    },
    userImage: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        borderRadius: 200 / 2
    },
    userImageContainer: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        flex: 7,
        justifyContent: 'center',
        alignItems: 'center',

    },
    textContainer:{
        paddingHorizontal: 20,
        paddingVertical: 20,
        flex: 2,
        alignItems: 'flex-start',
    },
    bottomContainer: {
        backgroundColor: '#fff',
        flex: 16,
    },
    categoryContainer:{
        alignItems: 'stretch',
        backgroundColor: '#fff',
        height: 100,
    },
    userElementContainer:{
        paddingHorizontal: 20,
        paddingVertical: 20,
        flex: 2,
        alignItems: 'stretch',
    },
    textInput:{
        borderBottomWidth: 1,
        borderColor: "#ff6f61",
    }
});



