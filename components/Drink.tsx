import React  from "react";
import { StyleSheet, View, Image, Text } from "react-native";

function Drink(  {name,alcoholPercentage, props}:{ name: string, alcoholPercentage: string, props:any }) {
    return (
        <View style={[styles.container, props]}>
            <View style={styles.rect}>
                <View style={styles.imageRow}>
                    <Image
    source={require("../assets/images/negroni.jpg")}
    resizeMode="contain"
    style={styles.image}
    />
                    <View style={styles.dvxDrinkColumn}>
                        <Text style={styles.dvxDrink}>{name}</Text>
                        <Text style={styles.percentage}>Percentage: {alcoholPercentage}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 3
    },
    rect: {
        borderRadius: 29,
        width: 375,
        backgroundColor: "rgba(204,204,204,0.38)",
        flex: 1
    },
    image: {
        width: 73,
        height: 73,
        borderRadius: 100
    },
    dvxDrink: {
        //fontFamily: "roboto-700",
        color: "#121212",
        fontSize: 17,
        fontWeight: "bold"
    },
    percentage: {
        //fontFamily: "roboto-regular",
        color: "rgba(74,74,74,1)",
        fontSize: 13,
        marginTop: 3
    },
    dvxDrinkColumn: {
        width: 120,
        marginLeft: 16,
        marginBottom: 27
    },
    imageRow: {
        height: 73,
        flexDirection: "row",
        marginTop: 16,
        marginLeft: 15,
        marginRight: 186
    }
});

export default Drink;
