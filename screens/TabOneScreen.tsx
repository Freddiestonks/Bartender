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
    const [missingDrinkList,setMissingDrinkList] = React.useState<any[]>([])

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
                setDrinks(Drinks.en.filter(({ingredients}) => checkArray(ingredients,r)));
                setMissingDrinkList(Drinks.en.filter(({ingredients}) => !checkArray(ingredients,r)));

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
                    <DrinkCardComplete name={item.Name} alcoholPercentage={item.percentage} ingredients={item.ingredients} />
                )} />: <Text>There are no available drinks</Text>}
        <View style={styles.separator} lightColor="#ff6f61" darkColor="rgba(255,255,255,0.1)" />
        <Text style={{fontWeight:"bold",paddingVertical:10}}>You're still missing:</Text>
        <FlatList data={missingDrinkList
        } renderItem={({item}) => (
            <DrinkCardMissing name={item.Name} alcoholPercentage={item.percentage} ingredients={item.ingredients} />
        )} />
            </View>

            {/*<DrinkCardMissing/>*/}
        {/*<Text style={styles.title}>Tab One</Text>*/}
      {/*<EditScreenInfo path="/screens/TabOneScreen.tsx" />*/}
        </ScrollView>
    </View>
  );
}




async function loadItem() {
    try {
        const jsonValue = await AsyncStorage.getItem('bar')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
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

// function DrinkCard({name,alcoholPercentage,ingredients}:{ name: string, alcoholPercentage: string, ingredients: any }) {
//     const [isOpen, setOpen] = React.useState(false);
//     const width = Dimensions.get('window').width;
//     return (
//         <View>
//             { isOpen ?
//                 <Overlay isVisible={isOpen} onBackdropPress={() => setOpen(false)}>
//                     <View>
//                         <Text style={{fontWeight:"bold", color: "#000",fontSize: 24,alignSelf:"center",paddingVertical:10}}>{name}</Text>
//                         {/*<Image source={{uri: imageSrc}} style={{resizeMode: 'contain',alignSelf:"center", height: width / 3, width: width / 3}}/>*/}
//                         <AirbnbRating/>
//                         <Text style={{fontWeight:"bold",paddingVertical:5}}>Ingredients:</Text>
//                         <FlatList data={ingredients} renderItem={({item}) => <Text>{item.Name} - {item.Quantity}</Text>}/>
//                         <Text>Alcohol Percentage: {alcoholPercentage}</Text>
//                     </View>
//                 </Overlay>
//                 : null
//             }
//             <View style={{
//                 //flex: 1,
//                 paddingHorizontal: 10,
//                 borderRadius: 10,
//                 borderColor: '#aaa',
//                 borderWidth: 1,
//                 marginBottom: 2,
//                 backgroundColor: '#fff'
//             }}>
//                 <TouchableOpacity onPress={() => setOpen(true)}>
//                     <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
//                         {/*<Image source={{uri: imageSrc}} style={{resizeMode: 'contain', height: width / 4, width: width / 4}}/>*/}
//                         <View style={{
//                             flex: 1,
//                             flexDirection: 'column',
//                             width: (3 * width / 4),
//                             height: width / 4
//                         }}>
//                             <View style={{flex: 1, justifyContent: 'flex-end'}}>
//                                 <Text style={{paddingHorizontal: 10, fontWeight: "bold"}}>{name}</Text>
//                             </View>
//                             <View style={{flex: 2, borderRadius: 30}}>
//                                 <Text style={{paddingHorizontal: 10, color: "#aaa"}}>Alcohol Content: {alcoholPercentage}</Text>
//                             </View>
//                         </View>
//                     </View>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     )
// }
