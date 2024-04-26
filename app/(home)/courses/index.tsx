import { View, StyleSheet, Pressable, Text, Image, Button, TouchableOpacity } from "react-native"
import { Stack, Link, } from "expo-router"
import { useEffect, useState } from "react";
import { get_user_courses } from "../../(auth)/api";
// import { LinearGradient } from 'expo-linear-gradient';

interface Course {
    id: number;
    user: number;
    name: string;
}

export default function CoursesMenu() {
    const [userCourseList, setUserCourseList] = useState<Course[]>([])
    useEffect(()=>{
        const fetchCourseList = async() => {
            let courseList = await get_user_courses()
            if (courseList){
                setUserCourseList(courseList)
            }
        }
        fetchCourseList()
    },[])

    const image = require('../../../assets/images/backgroundGrass.png');

    return (
        <View style={styles.container}>
            <Stack.Screen  
            options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: 'My Courses',
          // https://reactnavigation.org/docs/headers#adjusting-header-styles
        //   headerStyle: { backgroundColor: '#e8b923' },
          headerBackground: ()=> (
            <Image
            style={{flex:1, justifyContent:'center', resizeMode:'cover'}}
            source={image }/>),
          headerTintColor: '#fff',
          headerBackTitle: 'Back',
          headerBackTitleStyle: {fontSize:15},
          headerRight: () => (<Link href='/(home)/courses/modal'> <Text style={styles.addBtn}>+</Text></Link>)
              
          
        }}/>

        {/* <Link href='/courses/modal' style={styles.button}>Create a new course</Link> */}
            
            {userCourseList
            ? userCourseList.map((course, index)=>(
               
                    <Link key={index} 
                    href={{ pathname: "/(home)/courses/teeboxes/", 
                    params:{courseID: course.id, courseName: course.name}}} asChild>
                <TouchableOpacity activeOpacity={0.6} style={index %2 == 0 ? styles.courseContEven : styles.courseContOdd} >


                        <Text style={styles.courseText}>{course.name}</Text>
                        
                    
                </TouchableOpacity>
                    </Link>
            ))
            : <>
                <Text>View created courses here.</Text>
                <Text>Press the "+" button on the top right to add a new course.</Text>
            </>}

            <Text style={styles.addReminder}>Press the "+" button to add a new course. (top right)</Text>
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

{/* {favoritePics
                        ?
                            favoritePics.map((pic, index)=>(
                                <SpaceLI key={index} onClick={()=> accessFav(index)}>
                                    {pic.date}
                                    <DeleteBtn onClick={() => deleteFavPic(pic.id)}>Delete</DeleteBtn>
                                </SpaceLI>
                            ))
                        :   <SpaceLI>View saved pictures here</SpaceLI>
                            
                        } */}