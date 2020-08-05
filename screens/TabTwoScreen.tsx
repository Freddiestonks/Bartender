import * as React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {  View } from '../components/Themed';
import AddIngredients from "../components/IngredientsAdd";
import RemoveIngredient from "../components/IngredientsRemove";
import * as Drinks from "../assets/Foods.json";
import DrinkCardComplete from "../components/DrinkCardComplete";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>

        <FlatList data={Drinks.en
        } renderItem={({item}) => (
            <RemoveIngredient ingredientName={item.Name}/>
        )} />
      {/*  */}
      {/*<AddIngredients/>*/}
      {/*<RemoveIngredient/>*/}
    </View>
  );
}

const storeData = async (value: string) => {
    try {
        await AsyncStorage.setItem('@storage_Key', value)
    } catch (e) {
        // saving error
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
});
