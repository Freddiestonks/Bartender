import * as React from 'react';
import {View, Text, TextInput, StyleSheet} from "react-native";
import {TouchableOpacity} from "react-native";
import Colors from "../constants/Colors";
import { Ionicons } from '@expo/vector-icons';
import {dbh} from "../database/Firebase";

export default function UserScreenElement({ Type, Value, UserId}:{ Type: any,Value:any,UserId:any}) {
  const [isEditable, setEditability] = React.useState(false);
  const [value, onChangeText] = React.useState(Value);
  return (
          <View style={styles.userElementContainer}>
              { isEditable ?
                 <View style={styles.userInputTextContainer}>
                   <View style={styles.userTextContainer}>
                     <Text style={{color: "#ff6f61"}}>{Type.toString()}</Text>
                     <TextInput style={styles.textInput} placeholder={Type.toString()} defaultValue={value.toString()} onChangeText={text => onChangeText(text)}/>
                   </View>
                   <Ionicons   onPress={() => {if(postNewValues(Type,value,UserId)){setEditability(!isEditable)}}} name="md-checkmark-circle" size={32} color= {"#ff6f61"} />
                </View>
                :
                <TouchableOpacity onPress={() => setEditability(!isEditable)}>
                  <View style={styles.userInputTextContainer}>
                    <View style={styles.userTextContainer}>
                      <Text style={{color: "#ff6f61"}}>{Type.toString()}</Text>
                      <Text style={{color:'#000'}}>{value.toString()}</Text>
                    </View>
                    <Ionicons name="md-create" size={26} color= {"#ff6f61"} />
                  </View>
                </TouchableOpacity>

              }
          </View>
    );
};



function postNewValues( type: { toString: () => string; }, value: { toString: () => any; }, userId: any) {
  if(type.toString() === "Name") {
    dbh
      .collection('Users')
      .doc(userId)
      .update({
        name: value.toString()
      });
    return true;

  }
  else if(type.toString() === "Username") {
    dbh
      .collection('Users')
      .doc(userId)
      .update({
        username: value.toString()
      });
    return true;

  }
  else if(type.toString() === "Favorite Food") {
    dbh
      .collection('Users')
      .doc(userId)
      .update({
        food: value.toString()
      });
    return true;
  }

}

const styles = StyleSheet.create({
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


