import { View, Text, Pressable } from "react-native"
import { Stack } from "expo-router"
import { LogOut } from "../(auth)/api"

export default function Settings(){

    return(
        <>
        <Stack.Screen
        
            options={{
                // https://reactnavigation.org/docs/headers#setting-the-header-title
                title: 'Settings',
                // https://reactnavigation.org/docs/headers#adjusting-header-styles
                headerStyle: { backgroundColor: 'green' },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    }
                }}
                />
        <View>

            <Pressable onPress={()=> LogOut()}>
                <Text>Log Out</Text>
            </Pressable>
                
        </View>
        </>
    )
}