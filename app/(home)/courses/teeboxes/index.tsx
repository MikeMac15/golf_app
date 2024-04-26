import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { useLocalSearchParams, useRouter, Link,  } from "expo-router";
import { Stack } from "expo-router";
import { get_course_tees } from "../../../(auth)/api";

interface Teebox {
    id: number;
    user: number;
    course: number;
    color1: string;
    color2: string;
}

export default function CourseTeebox() {

    const params = useLocalSearchParams();
    const {courseID, courseName} = params;
    const [courseTees, setCourseTees] = useState<Teebox[]>([]);
    const [refresh, setRefresh] = useState(0)
    const [showRefresh, setShowRefresh] = useState(false);
    
    const coursePK = Array.isArray(courseID)
        ? parseInt(courseID[0], 10)  // If it's an array, use the first element
        : parseInt(courseID, 10);    // If not then not
    

    const refreshClick = () => {setRefresh(prevState => prevState + 1); setShowRefresh(!showRefresh);}

    
    useEffect(()=>{
        const fetchCourseTees = async() => {
            let courseTees = await get_course_tees(coursePK)
            if (courseTees){
                setCourseTees(courseTees)
                
            }
        }
        fetchCourseTees()
    }, [refresh])

    return (
        <View style={styles.container}>
            <Stack.Screen  
            options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: `${courseName}`,
          // https://reactnavigation.org/docs/headers#adjusting-header-styles
          headerStyle: { backgroundColor: '#748f45' },
          headerTintColor: '#fff',
          headerBackTitle: 'Back',
          headerBackTitleStyle: {fontSize:15},
          headerRight: () => (<Link href={{pathname: '/(home)/courses/teeboxes/modal',
          params:{courseID: courseID, courseName: courseName}}} onPress={()=>setShowRefresh(!showRefresh)}> <Text style={styles.addBtn}>+</Text></Link>)
              
          
        }}/>
        {courseTees && courseTees.length > 0
            ? courseTees.map((tee, index)=>(
               
                    <Link key={index} 
                    href={{ pathname: "/courses/holes/", 
                    params:{teeKey: tee.id, teeColor1: tee.color1, teeColor2: tee.color2 }}} asChild>
                <TouchableOpacity activeOpacity={0.6} style={index %2 == 0 ? styles.courseContEven : styles.courseContOdd}>
                    
                        <Text style={styles.courseText}>{`${tee.color1}${tee.color2 ? '/' + tee.color2 + ' combos' : " tees"}`}</Text>
                        
                </TouchableOpacity>
                    </Link>
            ))
            : <>
                <Text style={styles.addReminder}>View created course teeboxes here.</Text>
            </>}
                <Text style={{color:'grey', marginTop: 20}}>Press the "+" button to add a new teebox.</Text>
                
                {showRefresh &&
                    <Button title="Refresh Tee List" onPress={()=> refreshClick()}/>
                }
            
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center', 
        backgroundColor: "#b2c78d",
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