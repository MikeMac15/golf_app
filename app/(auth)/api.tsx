import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect, router } from 'expo-router';

import { createContext } from 'react';

export const userContext = createContext(null);

const axios = require('axios').default;

const api = axios.create({
    baseURL:'http://127.0.0.1:8000/api/'
});

// Courses API /////////////////////////////////////////////////////
    export const get_user_courses = async() => {
        try {
            let token = await getTokenFromStorage();

            if (token) {
                api.defaults.headers.common["Authorization"] = `Token ${token}`
                let response = await api.get('golf/course/user-courses/')
                if (response.status == 200){
                    if (response.data && response.data.length > 0) {
                        return response.data
                    }
                }
            }
        } catch(e) {
            console.error("Error fetching user courses:", e);
        }
    }
    export const createNewCourse = async(courseName: string) => {
        try{
            let token = await getTokenFromStorage()
            if (token) {
                api.defaults.headers.common["Authorization"] = `Token ${token}`
                let response = api.post('golf/course/user-courses/', 
                {
                    name: courseName
                })

                if (response.status === 201){
                     router.back()
                }
            }
        } catch (e) {
            console.error("Error creating new course:", e);
        }
    }

// Teeboxes API /////////////////////////////////////////////////////
    export const get_course_tees = async (courseKey: number) => {
        try {
            let token = await getTokenFromStorage()
            
            if (token){
                api.defaults.headers.common["Authorization"] = `Token ${token}`
                let response = await api.get(`golf/teebox/${courseKey}/`)
                if (response.status == 200){
                    if (response.data && response.data.length > 0) {
                        return response.data
                    }
                }
            }
        } catch(e) {
            console.error("Error fetching userCourse Tee's:", e);
        }
    }
    export const create_new_tee = async(courseKey: string, color1: string, color2: string|null = null) => {
        try{
            let token = await getTokenFromStorage()
            if (token){
                api.defaults.headers.common['Authorization'] = `Token ${token}`
                let response = await api.post(`golf/teebox/${courseKey}/`,
                {
                    color1: color1,
                    color2: color2
                })
                if(response.status === 201){
                    router.back()
                }
            }
        } catch(e){
            console.error("Error creating course tee's:", e);
        }
    }

// Holes API  ///////////////////////////////////////////////////////
    export const get_hole_list = async(teePK:number) => {
        try{
            let token = await getTokenFromStorage()
            if(token){
                api.defaults.headers.common['Authorization'] = `Token ${token}`
                let response = await api.get(`golf/hole/${teePK}/`)
                if (response.status == 200){
                    if (response.data && response.data.length > 0) {
                        return response.data
                    }
                }
            }
        } catch(e) {
            console.error("Error fetching userCourse Tee's:", e);
        }
    }
    //fields = ['id','user','teebox','number','par','distance','color']
    export const create_new_hole = async(teePk:number, holeNumber: number, par: number, distance: number, color: string) => {
        try{
            let token = await getTokenFromStorage()
            if (token){
                api.defaults.headers.common['Authorization'] = `Token ${token}`
                let response = await api.post(`golf/hole/${teePk}/`,
                {
                    number: holeNumber,
                    par: par,
                    distance: distance,
                    color: color
                })
                if (response.status === 201){
                    router.back()
                }
            }
        } catch(e){
            console.error('error creating new hole', e);
        }
    }

// Helpers//////////////////////////////////////////////////////////
    export const getDisplayName = async(): Promise<string>  => {
        try {
            let token = await getTokenFromStorage();
            if (token) {
                api.defaults.headers.common["Authorization"] = `Token ${token}`
                let response = await api.get('users/')
                return response.data['username']
            } else {
                router.replace('/(auth)/signup')
            }


        } catch(e) {

            return 'error1'
        }
        return 'error2'
    }
    export const checkTokenOnLaunch = async () => {
        try {
            let token = await getTokenFromStorage();
            
            if (!token) {
            return <Redirect href='/(auth)/signup'/>
            } 
        } catch (error) {
            console.error('Error checking token on app launch:', error);
        }
    }
////////////////////////////////////////////////////////////////////

// Data storage ///////////////////////////////////////////////////
    export const storeData = async( key: string, value: string ): Promise<void> => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch(e){
            console.error(`Error storing data for key ${key}:`, e);
        }
    }
    export const delDataStorage = async() => {
        try {
            await AsyncStorage.removeItem('Token')
        } catch (error){
            console.error("error removing key/values on logout", error)
        }
    }
    export const getTokenFromStorage = async (): Promise<string | null | undefined> => {
        try {
            const token = await AsyncStorage.getItem('Token');
            if (token !== null) {
                return token;
            }
        } catch (e) { 
            console.error('Error getting token from storage:', e); 
            return null;
        }
    }
/////////////////////////////////////////////////////////////////
// user api {
    export const SignUp = async(email: string, display_name: string, password: string) => {
        try{
            let response = await api.post('users/signup/', 
            {
                email: email,
                display_name: display_name,
                password: password
            });
            
            let token = response.data.token;
            
            api.defaults.headers.common["Authorization"] = `Token ${token}`
            await storeData('Token', token);
            
            router.replace('/(home)/')
        } catch(error){
            console.error("error signing up", error)
        }
    }
    export const LogIn = async(email: string, password: string) => {
        try {
            let response = await api.post('users/login/',
            {
                email: email,
                password: password
            })
            let token = response.data.token;
            
            api.defaults.headers.common["Authorization"] = `Token ${token}`
            await storeData('Token', token);
            
            router.replace('/(home)/')
        } catch(error) {
            console.error("error loging in", error)
        }
    }
    export const LogOut = async() => {
        try {
            let token = await getTokenFromStorage()
            
            if (token) {
                api.defaults.headers.common['Authorization'] = `Token ${token}`
                
                let response = await api.post('users/logout/')
                if (response.status === 204){
                    await delDataStorage()
                    delete api.defaults.headers.common['Authorization']
                    router.back()
                    checkTokenOnLaunch()
                }}
                
            } catch(error) {
                console.log(error, 'error removing token')
            }
        }
// }


//(    // export const getAllKeys = async () => {
    //     let keys = []
    //     try {
        //       keys = await AsyncStorage.getAllKeys()
        
        //     } catch(e) {
        //       // read key error
        //     }
        
        //     console.log(keys)
        //     // example console.log result:
        //     // ['@MyApp_user', '@MyApp_key']
        //   }
        
        // export const removeFew = async () => {
        //     const keys = ["email", "Token", "display_name", "token"]
        //     try {
        //       await AsyncStorage.multiRemove(keys)
        //     } catch(e) {
        //       console.error(e)
        //     }
        
        //     console.log('Done')
        //   })