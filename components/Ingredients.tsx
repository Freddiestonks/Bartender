import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";

function Ingredients({ingredientName,props}:{ingredientName:string,props:any}) {
    return (
        <View style={[styles.container, props]}>
            <View style={styles.rect}>
                <View style={styles.imageRow}>
                    <Image
    source={require("../assets/images/negroni.jpg")}
    resizeMode="contain"
    style={styles.image}
    />
                    <Text style={styles.text}>{ingredientName}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {paddingTop:5},
    rect: {
        backgroundColor: "#E6E6E6",
        borderRadius: 20,
        width: 375,
        flexDirection: "row",
        flex: 1
    },
    image: {
        width: 67,
        height: 67,
        borderRadius: 100
    },
    text: {
        fontWeight: "bold",
        color: "#121212",
        fontSize: 15,
        marginLeft: 22,
        marginTop: 24
    },
    imageRow: {
        height: 69  ,
        flexDirection: "row",
        flex: 1,
        marginRight: 178,
        marginLeft: 26,
        marginTop: 8
    }
});

export default Ingredients;
