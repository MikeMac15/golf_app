import { View, StyleSheet, Pressable, Text, Image, Button, TouchableOpacity } from "react-native"
import { Stack, Link, } from "expo-router"
import { useEffect, useState } from "react";

export default function PlayScreen(){
    const image = require('../../../assets/images/backgroundGrass.png');
    return (
        <View style={styles.container}>
            <Stack.Screen  
            options={{
              title: 'Git Gooder',
        //   headerStyle: { backgroundColor: '#e8b923' },
          headerBackground: ()=> (
            <Image
            style={{flex:1, justifyContent:'center', resizeMode:'cover'}}
            source={image }/>),
          headerTintColor: '#fff',
          headerBackTitle: 'Back',
          headerBackTitleStyle: {fontSize:15},
        }}/>

            <Link href={{ pathname: "/" }} asChild>
                <TouchableOpacity activeOpacity={0.6} style={styles.courseContEven} >
                    <Text style={styles.courseText}>Play Your Courses</Text> 
                </TouchableOpacity>
            </Link>

            <Link href={{ pathname: "/(home)/play/SimpleCounter" }} asChild>
                <TouchableOpacity activeOpacity={0.6} style={styles.courseContEven} >
                    <Text style={styles.courseText}>Play w/ Simple Counter</Text> 
                </TouchableOpacity>
            </Link>

            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center', 
        backgroundColor: "#fff",
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center', 
        backgroundColor: "#ccc",
        padding: 10,
    },
    courseContOdd: {
        
        backgroundColor: '#dddedc',
        paddingVertical: 20,
        width: '100%',
        
        
    },
    courseContEven: {
        
        backgroundColor: '#c5c7c3',
        paddingVertical: 20,
        width: '100%',
        
        
    },
    courseText: {
        textAlign: 'center'
    },
    addBtn: {
        fontSize: 25,
        marginRight: 10,
        color: 'white',
    },
    addReminder: {
        
        marginTop: 50,
        color: 'grey',
        textAlign: 'center',
        
        
    }
});