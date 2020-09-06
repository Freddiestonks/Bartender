import * as React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, Text, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {  View } from '../components/Themed';
import AddIngredients from "../components/IngredientsAdd";
import RemoveIngredient from "../components/IngredientsRemove";
import * as ingredients from "../assets/Ingredients.json";
import {SearchBar} from "react-native-elements";
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default function TabTwoScreen() {
    const [isBottomOpened, setBottomOpened] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const [foodList, setFoodList] = React.useState(ingredients.en);
    const [items, addItem] = React.useState<any[]>([]);
    const [isLoadingComplete, setLoadingComplete] = React.useState<boolean>(false);

    if (!isLoadingComplete) {
        loadItem().then(r => {
                if(r!=null)
                    addItem(r)}
                );
        setLoadingComplete(true);
    }

    return (

        <View style={styles.container}>

            <FlatList
                showsVerticalScrollIndicator={false}
                data={items
                }
                renderItem={({item}) => (
                    <TouchableOpacity onPress={ async () => {
                        if (items.includes(item)) {
                            try {
                                let filtered: string[] = items.filter(function (value) {
                                    return value != item;
                                });
                                const jsonValue = JSON.stringify(filtered);
                                await AsyncStorage.setItem('bar', jsonValue).then(() => {addItem(filtered)});
                            } catch (e) {
                                // saving error
                            }
                            setBottomOpened(false);
                        } else {
                            alert("This product is already in the fridge");
                        }
                    } }>
                        <RemoveIngredient ingredientName={item.Name} imgSrc={item.image}/>
                    </TouchableOpacity>
            )}/>
            <TouchableOpacity onPress={() => setBottomOpened(true)} style={styles.button}>
                <Text style={styles.plus}>+</Text>
            </TouchableOpacity>


            {isBottomOpened ?
                <View style={styles.cardBack}>
                    <TouchableOpacity style={{flex: 1}} onPress={() => setBottomOpened(false)}/>
                    <View style={styles.cardContainer}>
                        <SearchBar
                            containerStyle={{
                                borderBottomWidth: 1, borderColor: '#999', borderRadius: 20
                            }}
                            placeholder="Search Ingredients..."
                            onChangeText={text => {
                                setSearch(text);
                                setFoodList(ingredients.en.filter(({Name}) => Name.toLowerCase().includes(text.toLowerCase())))
                            }}
                            platform={"android"}
                            value={search}
                        />
                        {/*List of all possible foods*/}
                        <FlatList
                            data={foodList}
                            contentContainerStyle={{alignItems:"center"}}
                            renderItem={({item}) => (
                                <TouchableOpacity onPress={async () => {
                                    if (!items.includes(item) && isLoadingComplete) {
                                        try {
                                            const jsonValue = JSON.stringify(items.concat(item));
                                            await AsyncStorage.setItem('bar', jsonValue).then(() => addItem(items.concat(item)));
                                        } catch (e) {
                                            // saving error
                                        }
                                        // storeData(items.concat(item.Name)).then(r => addItem(items.concat(item.Name)));
                                        setBottomOpened(false);
                                    } else {
                                        alert("This product is already in the fridge");
                                    }
                                }}>
                                    <AddIngredients ingredientName={item.Name} imgSrc={item.image}/>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
                : null
            }
        </View>
    );
}

async function loadItem() {
    try {
        const jsonValue = await AsyncStorage.getItem('bar');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
    }
}

const buttonRadius = 60;
const buttonDistance = 20;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
    button:{
        justifyContent: 'center',
        alignContent: 'center',
        position: 'absolute',
        right: buttonDistance,
        bottom: buttonDistance,
        height: buttonRadius,
        width: buttonRadius,  //The Width must be the same as the height
        borderRadius:buttonRadius*2, //Then Make the Border Radius twice the size of width or Height
        backgroundColor:"#ff6f61",
    },
    plus:{
        alignSelf: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: buttonRadius/2,
    },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
    cardContainer: {
        backgroundColor: '#fff',
        flex:2,
        justifyContent: 'flex-start',
        alignContent: 'center',
        flexDirection: 'column',
        borderRadius: 20,
        width: DEVICE_WIDTH,
        paddingBottom:60,
        // height: DEVICE_HEIGHT*3/4,
    },
    cardBack: {
        position: 'absolute',
        backgroundColor: 'rgba(111, 111, 111, 0.8)',
        width: DEVICE_WIDTH,
        height: DEVICE_HEIGHT,
    }
});
