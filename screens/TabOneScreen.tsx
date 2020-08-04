import * as React from 'react';
import {Dimensions, FlatList, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {Divider, AirbnbRating, Overlay} from "react-native-elements";
import DrinkCardComplete from "../components/DrinkCardComplete";
import DrinkCardMissing from "../components/DrinkCardMissing";
import * as Drinks from "../assets/Drinks.json"
export default function TabOneScreen() {
    const [fridge,setFridge] = React.useState([]);
    return (
    <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{alignItems:"center"}}>
        { fridge.length >0 ?
            <FlatList
                data={fridge}
                renderItem={({item}) => (
                    <View style={styles.cardElement}>
                        <TouchableOpacity onPress={() => {
                        }}>
                            <Text style={{
                                color: '#ff6f61',
                                fontWeight: "bold",
                                paddingVertical: 15,
                                paddingHorizontal: 5
                            }}>{item}</Text>
                        </TouchableOpacity>
                    </View>

                )}
            /> : <Text style={{fontWeight:"bold",paddingVertical:10}} >There are no available drinks with your ingredients</Text>
        }

            {/**/}

                <FlatList data={Drinks.en
                } renderItem={({item}) => (
                    <DrinkCardComplete name={item.Name} alcoholPercentage={item.percentage} ingredients={item.ingredients} />
                )} />

            {/**/}



            {/*<DrinkCard alcoholPercentage={"22%"} ingredients={[{"Name" :"Jessica",*/}
            {/*    "Quantity" : 20*/}
            {/*},*/}
            {/*    {"Name" :"Malibù",*/}
            {/*        "Quantity" : 20*/}
            {/*    },{"Name" :"Lime Juice",*/}
            {/*        "Quantity" : 20*/}
            {/*    }]} name={"pino"}/>*/}
        <View style={styles.separator} lightColor="#ff6f61" darkColor="rgba(255,255,255,0.1)" />
        <Text style={{fontWeight:"bold",paddingVertical:10}}>You're still missing:</Text>
        <FlatList data={Drinks.en
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
