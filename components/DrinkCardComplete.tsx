import React  from "react";
import {StyleSheet, View, Text, TouchableOpacity, FlatList, Dimensions, ScrollView} from "react-native";
import Drink from "./Drink";
// import {  AirbnbRating } from 'react-native-ratings';
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import {Image, Overlay, AirbnbRating} from "react-native-elements";
import * as firebase from "firebase";
import {dbh} from "../database/Firebase";



function DrinkCardComplete({name,alcoholPercentage,ingredients,imageSrc, recipe}:{ name: string, alcoholPercentage: string, ingredients: any ,imageSrc:any,recipe:string}) {
    const [isOpen, setOpen] = React.useState(false);
    const [defaultImage, setUserImage] = React.useState('data:image/png;base64,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bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgeG1sbnM6cGx1cz0iaHR0cDovL25zLnVzZXBsdXMub3JnL2xkZi94bXAvMS4wLyIKICAgIHhtbG5zOkdJTVA9Imh0dHA6Ly93d3cuZ2ltcC5vcmcveG1wLyIKICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgeG1wTU06RG9jdW1lbnRJRD0iZ2ltcDpkb2NpZDpnaW1wOjY3NDRiMTdlLWEzNmMtNGIwYS1hODAxLWQ2MDFmNjIxNDQ4YiIKICAgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1ZTQ4MmFlZS05YTAwLTQyMzAtYjBhOC05MGE3YTFkNjA3NDIiCiAgIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplZmM0ZDgzMi0zZGFlLTQ4NDMtYmM2Ni1hMWU5NjYzM2VlN2EiCiAgIEdJTVA6QVBJPSIyLjAiCiAgIEdJTVA6UGxhdGZvcm09IkxpbnV4IgogICBHSU1QOlRpbWVTdGFtcD0iMTU5NzU5NzUxNDkzNjkwNiIKICAgR0lNUDpWZXJzaW9uPSIyLjEwLjIwIgogICBkYzpGb3JtYXQ9ImltYWdlL3BuZyIKICAgeG1wOkNyZWF0b3JUb29sPSJHSU1QIDIuMTAiPgogICA8aXB0Y0V4dDpMb2NhdGlvbkNyZWF0ZWQ+CiAgICA8cmRmOkJhZy8+CiAgIDwvaXB0Y0V4dDpMb2NhdGlvbkNyZWF0ZWQ+CiAgIDxpcHRjRXh0OkxvY2F0aW9uU2hvd24+CiAgICA8cmRmOkJhZy8+CiAgIDwvaXB0Y0V4dDpMb2NhdGlvblNob3duPgogICA8aXB0Y0V4dDpBcnR3b3JrT3JPYmplY3Q+CiAgICA8cmRmOkJhZy8+CiAgIDwvaXB0Y0V4dDpBcnR3b3JrT3JPYmplY3Q+CiAgIDxpcHRjRXh0OlJlZ2lzdHJ5SWQ+CiAgICA8cmRmOkJhZy8+CiAgIDwvaXB0Y0V4dDpSZWdpc3RyeUlkPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iLyIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo5NWNiODdkMi0zNTNmLTQwYTktYjFlMC00NzBlMzZmMjg3OGYiCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkdpbXAgMi4xMCAoTGludXgpIgogICAgICBzdEV2dDp3aGVuPSIrMDI6MDAiLz4KICAgIDwvcmRmOlNlcT4KICAgPC94bXBNTTpIaXN0b3J5PgogICA8cGx1czpJbWFnZVN1cHBsaWVyPgogICAgPHJkZjpTZXEvPgogICA8L3BsdXM6SW1hZ2VTdXBwbGllcj4KICAgPHBsdXM6SW1hZ2VDcmVhdG9yPgogICAgPHJkZjpTZXEvPgogICA8L3BsdXM6SW1hZ2VDcmVhdG9yPgogICA8cGx1czpDb3B5cmlnaHRPd25lcj4KICAgIDxyZGY6U2VxLz4KICAgPC9wbHVzOkNvcHlyaWdodE93bmVyPgogICA8cGx1czpMaWNlbnNvcj4KICAgIDxyZGY6U2VxLz4KICAgPC9wbHVzOkxpY2Vuc29yPgogIDwvcmRmOkRlc2NyaXB0aW9uPgogPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+Ey8SYgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QI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');
    const [userID, setUID] = React.useState<any|null>(firebase.auth().currentUser);
    const [rating,setRating] = React.useState<any>(0);
    const [isLoadingComplete,setLoading] = React.useState<boolean>(false);
    const [hadRating,setHadRating] = React.useState<boolean>(false);
    if(!isLoadingComplete&&userID!=null){

        dbh
            .collection('DrinkRatings')
            // @ts-ignore
            .doc(name).get().then((doc)=>{
            if(!doc.exists){
                setRating(0);
                setLoading(true);

            }
            else {
                // @ts-ignore
                if(doc.data().ratings!=undefined){
                    // @ts-ignore
                    let newData = doc.data().ratings.filter(({userId}) => userId.includes(userID.uid.toString()));
                    // @ts-ignore
                    let diffData = doc.data().ratings;

                    // @ts-ignore
                    if(newData.length>0){
                        setRating(parseInt(newData[0].rating));
                        setHadRating(true);
                        setLoading(true);
                    }
                    else if(diffData.length>0){
                        console.log(diffData);
                        var total = 0;
                        for(var i = 0; i < diffData.length; i++) {
                            total += parseInt(diffData[i].rating);
                            var avg = total / diffData.length;
                            setRating(avg);
                        }
                        setLoading(true);
                    }
                    else
                   {    setRating(0);
                        setLoading(true);
                    }
                    // @ts-ignore
                    //return (doc.data().ratings.filter(({userId}) => userId.includes(uid))).toInt();
                }
                else {
                    setRating(0);
                    setLoading(true);

                }
            }
        })
        // loadRating({uid:userID.uid.toString(),drinkName:name}).then(r => {alert(r);setRating(r);})

    }
    React.useEffect(()=>{
        return firebase.auth().onAuthStateChanged(
            (authUser) => {
                if (authUser) {
                    setUID(authUser);
                } else {
                    setUID(null);
                }
            }
        );

    },[]);
    return (
        <View style={styles.container}>
            { isOpen ?
                // @ts-ignore
                <Overlay  overlayStyle={{marginVertical:50, marginHorizontal:50, minWidth:"70%",alignContent:"center",alignItems:"center",justifyContent:"flex-start"} } isVisible={isOpen} onBackdropPress={() => setOpen(false)}>
                    <ScrollView contentContainerStyle={{alignContent:"center",alignItems:"center"}}>
                    <Text style={styles.drinkName}>{name}</Text>
                    <Image source={imageSrc == null? {uri: defaultImage} : {uri: imageSrc}}   style={{ width: 100, height: 100, margin:20}}/>
                        { alcoholPercentage == null ? null :
                            <Text style={{fontSize: 17, paddingVertical:5, color: "#000"}}>Alcohol percentage: {alcoholPercentage}</Text>
                        }
                        {isLoadingComplete?
                    <AirbnbRating  isDisabled={userID==null} count={5} showRating={false} defaultRating={rating} onFinishRating={(value)=>{publishRating({userId:userID.uid,rating:value.toString(),drinkName:name,hadRating:hadRating});setRating(value);setHadRating(true)}}/>
                        : null}
                    { ingredients == null ? null :
                        <Text style={{fontSize: 17, fontWeight: "bold", color: "#000"}}>Ingredients:</Text>
                    }
                    {ingredients == null ? null :
                    <FlatList data={ingredients
                    } renderItem={({item}) => (
                        <Text>{item.Name} - {item.Quantity} {item.Unit != null ? item.Unit : "ml"}</Text>
                    )} />}
                    {recipe==null ? null:
                    <Text style={{fontWeight:"bold"}}>
                        Recipe:
                    </Text>
                    }
                    {recipe==null ? null:
                        <Text>
                            {recipe}
                        </Text>
                    }

                    </ScrollView>
                    {/*<InsideCard/>*/}
                </Overlay>
                : null
            }
            <TouchableOpacity onPress={() => setOpen(true)}>
            <View style={styles.drinkStack}>

                <Drink name={name} alcoholPercentage={alcoholPercentage} props={styles.drink} imageSrc={imageSrc}/>
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

function publishRating({userId,rating,drinkName,hadRating}:{userId:string,rating:string,drinkName:string,hadRating:boolean}){
    let uid = userId;
    dbh
        .collection('DrinkRatings')
        // @ts-ignore
        .doc(drinkName).get().then((doc)=>{
        if (!doc.exists){
        dbh
                .collection('DrinkRatings')
                .doc(drinkName)
                .set({
                    ratings: [{
                        userId: uid.toString(),
                        rating: rating,
                    }]
                }).then(() => {return true;
        });}
        else {
            if (hadRating) {
                // @ts-ignore
                let newData = doc.data().ratings.filter(({userId}) => !userId.includes(uid.toString()));
                newData.push({userId: userId.toString(),
                    rating: rating,})
                dbh
                    .collection('DrinkRatings')
                    .doc(drinkName)
                    // @ts-ignore
                    .update(
                        // @ts-ignore
                        {ratings: newData}
                        /*doc.ratings.push({userId: userId.toString(),
                        rating: rating,})*/).then(() => {
                    return true;
                });
            } else {
                // @ts-ignore
                let ratings =doc.data().ratings;
                ratings.push({userId: userId.toString(),
                    rating: rating,})
                // @ts-ignore
                console.log(ratings)
                dbh
                    .collection('DrinkRatings')
                    .doc(drinkName)
                    // @ts-ignore
                    .update(
                        // @ts-ignore
                        {ratings: ratings}
                        /*doc.ratings.push({userId: userId.toString(),
                        rating: rating,})*/).then(() => {
                    return true;
                });
            }
        }
        })


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
    },
    drinkName: {
        color: "rgba(255,111,97,1)",
        textAlign: "center",
        fontSize: 25,
        fontWeight: "bold"
    },
});

export default DrinkCardComplete;
