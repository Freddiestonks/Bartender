import * as React from 'react';
import {Dimensions, FlatList, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {useFocusEffect} from "@react-navigation/core";
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {Divider, AirbnbRating, Overlay} from "react-native-elements";
import DrinkCardComplete from "../components/DrinkCardComplete";
import DrinkCardMissing from "../components/DrinkCardMissing";
import * as Drinks from "../assets/Drinks.json"
import AsyncStorage from "@react-native-community/async-storage";

export default function TabOneScreen() {
    const [drinksList,setDrinks] = React.useState<any[]>([]);
    const [missingDrinkList,setMissingDrinkList] = React.useState<any[]>([]);

    function checkArray(ingredients:any,f:string[]) {
        let test = true;
        ingredients.forEach((ingredient: { Name: string; }) => {
            if(!f.includes(ingredient.Name)){
                test = false;
            }});
        return test;
    }

    useFocusEffect(
        React.useCallback(() => {
            loadItem().then(r  => {
                if (r!=null){
                    setDrinks(Drinks.en.filter(({ingredients}) => checkArray(ingredients,nameRetriever(r))));
                    setMissingDrinkList(Drinks.en.filter(({ingredients}) => !checkArray(ingredients,nameRetriever(r))));}
            })
        }, [])
    );

    return (
    <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{alignItems:"center"}}>
                {drinksList.length>0?
                <FlatList data={drinksList
                } renderItem={({item}) => (
                    <DrinkCardComplete name={item.Name} alcoholPercentage={item.percentage} ingredients={item.ingredients} imageSrc={item.image} recipe={item.recipe} />
                )} />: <Text>There are no available drinks</Text>}
        <View style={styles.separator} lightColor="#ff6f61" darkColor="rgba(255,255,255,0.1)" />
        <Text style={{fontWeight:"bold",paddingVertical:10}}>You're still missing:</Text>
        <FlatList data={missingDrinkList
        } renderItem={({item}) => (
            <DrinkCardMissing name={item.Name} alcoholPercentage={item.percentage} ingredients={item.ingredients} imageSrc={item.image} />
        )} />
            </View>
        </ScrollView>
    </View>
  );
}


function nameRetriever(list: any[]) {
    let i;
    let newList = [];
    for (i=0; i < list.length; i++){
        newList.push(list[i].Name);
    }
    return newList;
}

async function loadItem() {
    try {
        const jsonValue = await AsyncStorage.getItem('bar');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginTop: 20,
    height: 1,
    width: '100%',
  },
  cardElement: {
    backgroundColor: '#fff',
  },
});
