import * as React from 'react';
import {Platform, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import * as firebase from "firebase";
import UserScreen from "./UserScreen";
import LoginPage from "./LoginPage";


export default function ProfileScreen ({navigation}:{navigation: any}) {

    const [authUser,setAuthUser] = React.useState<any>(null);
    const [isUserAuthenticated, setIsUserAuthenticated] = React.useState<boolean>(false);

    React.useEffect(()=>{
        return firebase.auth().onAuthStateChanged(
            (authUser) => {
                if (authUser) {
                    setAuthUser(authUser);
                    setIsUserAuthenticated(true);
                } else {
                    setAuthUser(null);
                    setIsUserAuthenticated(false);
                }
            }
        );

    },[]);
    return (
        <View style={styles.container}>
            {!isUserAuthenticated ?
            <LoginPage navigation={navigation}/> : <UserScreen navigation={navigation}/>

            }
        </View>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});



