import React  from "react";
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import Drink from "./Drink";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import {Overlay,AirbnbRating} from "react-native-elements";
function DrinkCardComplete({name,alcoholPercentage,ingredients}:{ name: string, alcoholPercentage: string, ingredients: any }) {
    const [isOpen, setOpen] = React.useState(false);
    return (

        <View style={styles.container}>
            { isOpen ?
                <Overlay isVisible={isOpen} onBackdropPress={() => setOpen(false)}>
                    <View>
                        {/*<Text style={{fontWeight:"bold", color:Colors.appAccent,fontSize: 24,alignSelf:"center",paddingVertical:10}}>{name}</Text>*/}
                        {/*<Image source={{uri: imageSrc}} style={{resizeMode: 'contain',alignSelf:"center", height: width / 3, width: width / 3}}/>*/}
                        <AirbnbRating
                            //type='heart'
                            //showRating
                            onFinishRating={() => {}}
                        />
                        <Text style={{fontWeight:"bold",paddingVertical:5}}>Ingredients:</Text>
                        {/*<FlatList data={ingredients} renderItem={({item}) => <Text>{item.Name} - {item.Quantity}</Text>}/>*/}
                        <Text>Alcohol Percentage: {alcoholPercentage}</Text>
                    </View>
                </Overlay>

                : null
            }
            <TouchableOpacity onPress={() => setOpen(true)}>
            <View style={styles.drinkStack}>

                <Drink name={name} alcoholPercentage={alcoholPercentage} props={styles.drink}/>
                <View style={styles.group5}>
                    <View style={styles.rect5}>
                        <View style={styles.icon5Row}>
                            <MaterialCommunityIconsIcon
    name="check"
    style={styles.icon5}
    />
                            <Text style={styles.whiskey5}>{textShortener(ingredients[0].Name)}</Text>
                        </View>
                    </View>
                </View>
                { ingredients.length>2 ? <View style={styles.group4}>
                    <View style={styles.rect4}>
                        <View style={styles.icon4Row}>
                            <MaterialCommunityIconsIcon
    name="check"
    style={styles.icon4}
    />
                            <Text style={styles.whiskey4}>+{(ingredients.length - 2).toString()}</Text>
                        </View>
                    </View>
                </View> : null}
                { ingredients.length>1?
                <View style={styles.group2}>
                    <View style={styles.rect2}>
                        <View style={styles.icon3Row}>
                            <MaterialCommunityIconsIcon
    name="check"
    style={styles.icon3}
    />
                            <Text style={styles.whiskey2}>{textShortener(ingredients[1].Name)}</Text>
                        </View>
                    </View>
                </View> : null}
            </View>
            </TouchableOpacity>
        </View>

    );
}

function textShortener(text:string){
    if(text.length>7){
        return text[0] + text[1] + text[2] + text[3] + text[4] + "..";
    }
    else
        return text;
}
const styles = StyleSheet.create({
    container: {},

    drink: {
        position: "absolute",
        top: 0,
        width: 375,
        height: 105,
        left: 0
    },
    group5: {
        top: 67,
        left: 101,
        width: 94,
        height: 24,
        position: "absolute"
    },
    rect5: {
        width: 92,
        height: 24,
        backgroundColor: "rgba(106,237,121,1)",
        borderRadius: 100,
        flexDirection: "row"
    },
    icon5: {
        color: "rgba(255,239,239,1)",
        fontSize: 17,
        height: 19,
        width: 17
    },
    whiskey5: {
        fontWeight: "bold",
        //fontFamily: "roboto-700",
        color: "rgba(255,255,255,1)",
        fontSize: 14,
        marginLeft: 4
        //marginTop: 0
    },
    icon5Row: {
        height: 19,
        flexDirection: "row",
        flex: 1,
        marginRight: 27,
        marginLeft: 7,
        marginTop: 2
    },
    group4: {
        top: 67,
        left: 309,
        width: 58,
        height: 24,
        position: "absolute"
    },
    rect4: {
        width: 58,
        height: 24,
        backgroundColor: "rgba(106,237,121,0.89)",
        borderRadius: 100,
        flexDirection: "row"
    },
    icon4: {
        color: "rgba(255,239,239,1)",
        fontSize: 17,
        height: 19,
        width: 17
    },
    whiskey4: {
        //fontFamily: "roboto-700",
        color: "rgba(255,255,255,1)",
        fontSize: 14,
        fontWeight: "bold",
        marginLeft: 5
    },
    icon4Row: {
        height: 19,
        flexDirection: "row",
        flex: 1,
        marginRight: 11,
        marginLeft: 6,
        marginTop: 2
    },
    group2: {
        top: 67,
        left: 206,
        width: 94,
        height: 24,
        position: "absolute"
    },
    rect2: {
        width: 92,
        height: 24,
        backgroundColor: "rgba(106,237,121,1)",
        borderRadius: 100,
        flexDirection: "row"
    },
    icon3: {
        color: "rgba(255,239,239,1)",
        fontSize: 17,
        height: 19,
        width: 17
    },
    whiskey2: {
        //fontFamily: "roboto-700",
        color: "rgba(255,255,255,1)",
        fontSize: 14,
        fontWeight: "bold",
        marginLeft: 4
        //marginTop: 4
    },
    icon3Row: {
        height: 19,
        flexDirection: "row",
        flex: 1,
        marginRight: 27,
        marginLeft: 7,
        marginTop: 2
    },
    drinkStack: {
        width: 375,
        height: 105
    }
});

export default DrinkCardComplete;
