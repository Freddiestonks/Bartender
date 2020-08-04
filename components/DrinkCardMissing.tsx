import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import Drink from "./Drink";
import EntypoIcon from "react-native-vector-icons/Entypo";

function DrinkCardMissing({name,alcoholPercentage,ingredients}:{ name: string, alcoholPercentage: string, ingredients: any }) {
    return (
        <View style={styles.container}>
            <View style={styles.drinkStack}>
                <Drink name={name} alcoholPercentage={alcoholPercentage}   props={styles.drink}/>
                <View style={styles.group2}>
                    <View style={styles.rect2}>
                        <View style={styles.icon2Row}>
                            <EntypoIcon
    name="cross"
    style={styles.icon2}
    />
                            <Text style={styles.whiskey2}>+11</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.group}>
                    <View style={styles.rect}>
                        <View style={styles.iconRow}>
                            <EntypoIcon
    name="cross"
    style={styles.icon}
    />
                            <Text style={styles.whiskey}>Whiskey</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.group3}>
                    <View style={styles.rect3}>
                        <View style={styles.icon3Row}>
                            <EntypoIcon
    name="cross"
    style={styles.icon3}
    />
                            <Text style={styles.whiskey3}>Whiskey</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    drink: {
        position: "absolute",
        top: 0,
        left: 0,
        height: 105,
        width: 375
    },
    group2: {
        top: 68,
        left: 306,
        width: 58,
        height: 24,
        position: "absolute"
    },
    rect2: {
        width: 58,
        height: 24,
        backgroundColor: "rgba(255,111,97,0.89)",
        borderRadius: 100,
        flexDirection: "row"
    },
    icon2: {
        color: "rgba(255,255,255,1)",
        fontSize: 17,
        height: 19,
        width: 17
    },
    whiskey2: {

        // fontFamily: "roboto-700",
        color: "rgba(255,255,255,1)",
        fontSize: 14,
        fontWeight: "bold",
        marginLeft: 5
    },
    icon2Row: {
        height: 19,
        flexDirection: "row",
        flex: 1,
        marginRight: 11,
        marginLeft: 6,
        marginTop: 2
    },
    group: {
        top: 68,
        left: 102,
        width: 94,
        height: 24,
        position: "absolute"
    },
    rect: {
        width: 92,
        height: 24,
        backgroundColor: "rgba(255,111,97,0.89)",
        borderRadius: 100,
        flexDirection: "row"
    },
    icon: {
        color: "rgba(255,255,255,1)",
        fontSize: 17,
        height: 19,
        width: 17
    },
    whiskey: {
        //fontFamily: "roboto-700",
        color: "rgba(255,255,255,1)",
        fontSize: 14,
        fontWeight: "bold",
        marginLeft: 5
    },
    iconRow: {
        height: 19,
        flexDirection: "row",
        flex: 1,
        marginRight: 27,
        marginLeft: 6,
        marginTop: 2
    },
    group3: {
        top: 68,
        left: 206,
        width: 94,
        height: 24,
        position: "absolute"
    },
    rect3: {
        width: 92,
        height: 24,
        backgroundColor: "rgba(255,111,97,0.89)",
        borderRadius: 100,
        flexDirection: "row"
    },
    icon3: {
        color: "rgba(255,255,255,1)",
        fontSize: 17,
        height: 19,
        width: 17
    },
    whiskey3: {
        //fontFamily: "roboto-700",
        color: "rgba(255,255,255,1)",
        fontSize: 14,
        fontWeight: "bold",
        marginLeft: 5
    },
    icon3Row: {
        height: 19,
        flexDirection: "row",
        flex: 1,
        marginRight: 27,
        marginLeft: 6,
        marginTop: 2
    },
    drinkStack: {
        width: 375,
        height: 105
    }
});

export default DrinkCardMissing;
