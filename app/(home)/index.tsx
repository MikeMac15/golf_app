import { useEffect, useRef, useState } from 'react';
import { Link, Stack } from 'expo-router';
import { Image, Text, View, StyleSheet, Animated, Easing, TouchableOpacity, ImageBackground } from 'react-native';
import { useFonts, PlayfairDisplay_800ExtraBold_Italic } from '@expo-google-fonts/playfair-display'
import { checkTokenOnLaunch, getDisplayName} from '../(auth)/api';



// TouchableOpacity.defaultProps = { activeOpacity: 0.8 };



const image = require('../../assets/images/grassed.png');

export default function Home() {
  const [displayName, setDisplayName] = useState('')

    useEffect(()=>{
      checkTokenOnLaunch()
      const fetchUserName = async() => {
        try {

          let username = await getDisplayName()
          setDisplayName(username)
          
        } catch(e){

        }
      }
      fetchUserName()
    
    },[])

    const fadeAnim = useRef(new Animated.Value(0)).current;

    let [fontsLoaded] = useFonts({
        PlayfairDisplay_800ExtraBold_Italic,
      });


    useEffect(()=>{
        const animate = async () => {
            if (fontsLoaded){
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true
            }).start();    
        }}
        
        animate()

      
    }, [fadeAnim, fontsLoaded])

    if (!fontsLoaded) {
        // Return a placeholder or loading screen until fonts are loaded
        return null;
      }


    
  


  return (
    <ImageBackground source={image} style={styles.image}>

      <Animated.View style={{ flex: 1, opacity: fadeAnim}}>
      <View style={styles.container}>
      <Stack.Screen
      options={{ headerShown: false }}
      // options={{
        //   // https://reactnavigation.org/docs/headers#setting-the-header-title
        //   title: 'My home',
        //   // https://reactnavigation.org/docs/headers#adjusting-header-styles
        //   headerStyle: { backgroundColor: 'green' },
        //   headerTintColor: '#fff',
        //   headerTitleStyle: {
          //     fontWeight: 'bold',
          //   }
          // }}
          />



      <Text style={styles.title}>GolfGooder</Text>
      <Link href="/(home)/play/" asChild>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Go Golfing</Text>
        </TouchableOpacity>
      </Link>

      <Link href='/courses/' asChild>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Courses</Text>
        </TouchableOpacity>
      </Link>

      <Link href='/golf' asChild>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Golf Bag</Text>
        </TouchableOpacity>
      </Link>

      <Link href='/golf' asChild>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Statistics</Text>
        </TouchableOpacity>
      </Link>

      <Link href='/settings' asChild>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Settings</Text>
        </TouchableOpacity>
      </Link>


    </View>
      <Text style={styles.footer}>{`Welcome ${displayName}`}</Text>
        </Animated.View>
    </ImageBackground>
      );
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
            alignItems: 'center',
            justifyContent: 'center', 
            
        },
        title: {
            fontFamily: "PlayfairDisplay_800ExtraBold_Italic",
            fontSize: 50,
            lineHeight: 21,
            // fontWeight: 'bold',
            letterSpacing: 1,
            color: '#333', //rgb(255,200,70)  ->#6B8E23
            paddingTop: 35,
            paddingBottom: 50
        },
        button: {
            width: 200,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 25,
            elevation: 3,
            // opacity: 0.6,
            backgroundColor: 'rgba(250,255,150,.8)', //-> rgb(174,205,70)
            marginVertical: 15,
          },
        text: {
          fontFamily: "PlayfairDisplay_800ExtraBold_Italic",
            fontSize: 20,
            // lineHeight: 21,
            
            letterSpacing: 0.5,
            color: 'black',
            
          },
          image: {
            flex: 1,
            resizeMode: 'center',
            // justifyContent: 'center',
          },
          footer: {
            fontFamily: "PlayfairDisplay_800ExtraBold_Italic",
            color: 'whitesmoke',
          }
    })
