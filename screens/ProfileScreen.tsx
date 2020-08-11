import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as firebase from "firebase";
import UserScreen from "./UserScreen";
import LoginPage from "./LoginPage";


export default function ProfileScreen () {

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
            <LoginPage/> : <UserScreen/>

            }
        </View>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});



