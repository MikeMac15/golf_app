import { get_hole_list, create_new_hole } from "../../../(auth)/api";
import CreateHole from "./CreateHole";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

interface NewHole {
    number: number;
    par: number;
    distance: number;
    teeColor: string;
}
interface Hole {
    id: number;
    user: number;
    teebox: number;
    number: number;
    par: number;
    distance: number;
    teeColor: string;
}

export default function newHoles(){
    const params = useLocalSearchParams();
    const { teeKey, teeColor1, teeColor2 } = params;
    const [par, setPar] = useState(4)
    const [distance, setDistance] = useState(0)
    const [color, setColor] = useState(typeof teeColor1 === 'string' ? teeColor1 : (Array.isArray(teeColor1) ? teeColor1[0] : ''));
    const [holeNumber, setHoleNumber] = useState(1)
    const oneColor = String(teeColor1)
    const [holesList, setHolesList] = useState<Hole[]>([]);


    const teePK = Array.isArray(teeKey)
        ? parseInt(teeKey[0], 10)  // If it's an array, use the first element
        : parseInt(teeKey, 10);    // If not then not

    useEffect(()=>{
        const fetchHoleList = async() => {
            try{
                let listOfHoles = await get_hole_list(teePK)
                if (listOfHoles){
                    setHolesList(listOfHoles)
                }
            } catch(e){
                console.error('error geting holes holes/index.tsx ')
            }
        }
        fetchHoleList()
        
        
        
    },[])
    
    const handleSubmit = async() => {
        if (distance > 0){
            setColor(oneColor)
            const holeNumber = holesList.length + 1
            await create_new_hole(teePK, holeNumber, par, distance, color)
        }
    };



    return (
        <View style={styles.container}>
            
            <View style={{flexDirection: 'column', justifyContent:'center', alignItems:'center'}}>
                <Text style={{alignItems:'center', marginBottom:  30}}>Hole {holesList.length + 1}</Text>
                <View style={{alignItems:'center', marginBottom:  30}}>
                    <Text>Par</Text>
    
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
    
                        <Button title='-' onPress={()=>{if(par > 3 ){ setPar(par-1) } }}/>
    
                        <Text style={{paddingHorizontal:5, fontSize:20}}>{par}</Text>
                        
                        <Button title='+' onPress={()=>{if(par < 5 ){ setPar(par+1) } }}/>
                </View>
                </View>    
            
            </View>
            <View style={{alignItems:'center', marginRight: 10}}>
                <Text>Distance</Text>
                <TextInput
                style={styles.input}
                placeholder="yardage"
                keyboardType="number-pad"
                returnKeyType="next"
                onChangeText={newText => setDistance(Number(newText))}
                />
            </View>
    
    
    {/* {combos
    ?
                <View style={{ justifyContent:'center', alignItems:'center'}}>
                    
                        <Text >Tee Color</Text>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
    
                    <Button title={`Blue`} />
                    <Button title={`White`} />
                        </View>
                </View>
    
    :
    <></>} */
    }
            <Button title="Submit" onPress={handleSubmit}/>
        </View>
            
        );
      };
    
    
    
      
    
    const styles = StyleSheet.create({
      container: {
        // flex: 1,
        marginVertical: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
      input: {
        width: 75,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        // marginBottom: 10,
        padding: 10,
      },
    });
    