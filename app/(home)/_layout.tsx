import { Stack } from 'expo-router';


export default function Layout() {
  return (
  <Stack>

  
      <Stack.Screen
        name="index"
        options={{
          // Hide the header for all other routes.
          headerShown: false,
        }}
        />
      <Stack.Screen
        name="courses/modal"
        options={{
          // Set the presentation mode to modal for our modal route.
          presentation: 'modal',
          headerTitle: 'Create a new course'
        }}
        />
        <Stack.Screen
        name="courses/teeboxes/modal"
        options={{
          // Set the presentation mode to modal for our modal route.
          presentation: 'modal',
          headerTitle: 'Create a new teebox'
        }}
        />
       
  </Stack>
)}
