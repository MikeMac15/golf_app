import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import { Stack } from "expo-router"


export default function SimpleCounter(){
// Shot variables
    const [strokes, setStrokes] = useState(0)
    const [pure, setPure] = useState(0)
    const [good, setGood] = useState(0)
    const [bad, setBad] = useState(0)
    const [putt, setPutt] = useState(0)


// Function to add a shot based on type
    const addShot = (shotType: string) => {
// Increment total strokes
        setStrokes(strokes + 1)
// Update the corresponding shot count based on shot type
        switch (shotType) {
            case 'pure':
                setPure(pure + 1)
                break;
            case 'good':
                setGood(good + 1)
                break;
            case 'bad':
                setBad(bad + 1)
                break;
            case 'putt':
                setPutt(putt + 1)
                break;
        }
    }


    return (
    <View style={styles.container}>
        <Stack.Screen options={{title:'Simple Counter', headerTransparent: true, headerBackTitle: 'Menu', headerTitleStyle:{color: 'whitesmoke'} }} />

        <View style={styles.container}>

            <View style={{ display:'flex', flexDirection:'row',  justifyContent: 'space-around', width: "100%", paddingBottom: 50, marginTop: 100 }}>
                <View>
                    <Text style={styles.titleText}>Total Strokes</Text>
                    <Text style={{textAlign: 'center', fontSize: 40, color: 'whitesmoke', fontStyle: 'italic', fontWeight:'700'}}>{strokes}</Text>
                </View>

                <View>
                    <Text style={styles.titleText}>Total Putts</Text>
                    <Text style={{textAlign: 'center', fontSize: 40, color: 'whitesmoke', fontStyle: 'italic', fontWeight:'700'}}>{putt}</Text>
                </View>
            </View>

            <View style={{ display:'flex', flexDirection:'row',  justifyContent: 'space-around', width: "100%", paddingBottom: 50 }}>
                <View style={{height:100, width:100, justifyContent:'center', alignItems: 'center', backgroundColor: `hwb(190, ${(100 - Math.round(pure / (strokes - putt) * 100)*3)}%, 10%)`, borderRadius: 50,}}>
                    <Text style={styles.Text1}>{pure}</Text>
                    <Text>{ pure > 0 ? Math.round(pure / (strokes - putt) * 100): 0}%</Text>
                </View>

                <View style={{ height:100, width:100, justifyContent:'center', alignItems: 'center', backgroundColor:`hwb(94, ${(100 - Math.round(good / (strokes ) * 100)*2)}%, 10%)`, borderRadius: 50,}}>
                    <Text style={styles.Text1}>{good}</Text>
                    <Text>{ good > 0 ? Math.round(good / (strokes - putt) * 100): 0}%</Text>
                </View>

                <View style={{height:100, width:100, justifyContent:'center', alignItems: 'center', backgroundColor:`hwb(0, ${(100 - Math.round(bad / (strokes) * 100)*2)}%, 10%)`, borderRadius: 50,}}>
                    <Text style={styles.Text1}>{bad}</Text>
                    <Text>{ bad > 0 ? Math.round(bad / (strokes - putt) * 100): 0}%</Text>
                </View>
            </View>

            {/* pure shot counter */}
            <TouchableOpacity activeOpacity={0.6} style={styles.pureBtn} onPress={()=>addShot('pure')} >
                <Text style={styles.Text}>Pure</Text> 
            </TouchableOpacity>

            {/* good shot counter */}
            <TouchableOpacity activeOpacity={0.6} style={styles.goodBtn} onPress={()=>addShot('good')} >
                <Text style={styles.Text}>Good</Text> 
            </TouchableOpacity>

            {/* bad shot counter */}
            <TouchableOpacity activeOpacity={0.6} style={styles.badBtn} onPress={()=>addShot('bad')} >
                <Text style={styles.Text}>Bad</Text> 
            </TouchableOpacity>

            {/* putt shot counter */}
            <TouchableOpacity activeOpacity={0.6} style={styles.puttBtn} onPress={()=>addShot('putt')} >
                <Text style={styles.Text}>Putt</Text> 
            </TouchableOpacity>
            
        </View>

    </View>)}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', 
        backgroundColor: "#444",
        // paddingBottom:100,
        width: '100%'
    },

    titleText: {
        color: 'white',
        fontSize: 20,
        fontStyle: 'italic',
        fontWeight: '600',
        marginBottom: 5
    },
    
    pureBtn: {
        
        backgroundColor: 'lightblue',
        paddingVertical: 30,
        marginVertical: 5,
        width: '100%',
        
        
    },
    goodBtn: {
        
        backgroundColor: 'lightgreen',
        paddingVertical: 30,
        marginVertical: 5,
        width: '100%',
        
        
    },
    badBtn: {
        
        backgroundColor: 'salmon',
        paddingVertical: 30,
        marginVertical: 5,
        width: '100%',
        
        
    },
    puttBtn: {
        
        backgroundColor: 'tan',
        paddingVertical: 30,
        marginTop: 5,
        width: '100%',
        marginBottom:80,
        
        
    },
    Text: {
        textAlign: 'center',
        // color: 'white',
        fontSize: 20,
        fontStyle: 'italic',
        fontWeight: '600',
        
    },
    Text1: {
        textAlign: 'center',
        // color: 'white',
        fontSize: 30,
        fontStyle: 'italic',
        fontWeight: '600',
        
    },
    
    
});