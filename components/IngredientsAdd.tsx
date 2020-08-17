import React  from "react";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Ingredients from "./Ingredients";

function AddIngredients({ingredientName,imgSrc}:{ingredientName:string,imgSrc:any}) {
    return (
        <View style={[styles.container]}>
            <View style={styles.harambeStack}>
                <Ingredients props={styles.harambe} ingredientName={ingredientName} imageSrc={imgSrc}/>
                <Icon name="ios-add" style={styles.icon}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    harambe: {
        position: "absolute",
        top: 0,
        width: 375,
        height: 83,
        left: 0
    },
    icon: {
        top: 25,
        left: 330,
        position: "absolute",
        color: "rgba(255,111,97,1)",
        fontSize: 40
    },
    harambeStack: {
        width: 375,
        height: 83
    }
});

export default AddIngredients;
