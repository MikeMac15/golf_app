import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {Picker} from '@react-native-picker/picker';
import { Platform, StyleSheet, TextInput, Button, Switch } from 'react-native';

import EditScreenInfo from '../../../components/EditScreenInfo';
import { Text, View } from '../../../components/Themed';
import { Stack, router } from 'expo-router';
import { createNewCourse } from '../../(auth)/api';

export default function ModalScreen() {
    const [text, setText] = useState('');
    const [teeColor, setTeeColor] = useState();
    const [combo, setCombo] = useState(false)
    const toggleCombo = () => setCombo(previousState => !previousState)

  const handleInputChange = (input: string) => {
    setText(input);
  }

  const handleSubmit = async() => {
    await createNewCourse(text)
    router.replace('/(home)/courses/')
  }

  const teeboxColors = [
    'Black', 'Blue', 'White', 'Red', 'Gold', 'Silver', 'Green'
  ]

  return (
    
    <View style={styles.container}>

    <Text style={styles.title}>Enter Course Name:</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={handleInputChange}
        value={text}
        
      />

    {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={styles.title}>Playing Combos?</Text>
      <Switch
          style={{marginBottom: 15, marginLeft: 10}}
          trackColor={{false: '#767577', true: '#748f45'}}
          thumbColor={combo ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleCombo}
          value={combo}
          />
    </View> */}

    {/* {combo
    ?
    <>
      <Text style={styles.title}>Select Starting TeeColors</Text>

      
        <Text style={styles.title}>Back Tee</Text>
        <Picker
        style={{ height: 200, width: '50%'}}
        selectedValue={teeColor}
        onValueChange={(itemValue) => (
          setTeeColor(itemValue))}
          >
            {teeboxColors.map((color) => (
              <Picker.Item key={color} label={color} value={color} />
              ))}
        </Picker>
      
    </>
  
    : <>
        <Text style={styles.title}>Select Starting TeeColor:</Text>
        <Picker
        style={{ height: 200, width: '50%' }}
        selectedValue={teeColor}
        onValueChange={(itemValue) => (
          setTeeColor(itemValue))}
          >
            {teeboxColors.map((color) => (
              <Picker.Item key={color} label={color} value={color} />
              ))}
        </Picker>
      </>
    } */}
      <Button
        title="Submit"
        onPress={handleSubmit}
      />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
    
  },
  title: {
    fontSize: 15,
    marginBottom: 15,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  textInput: { 
    height: 40,
    borderColor: 'gray', 
    borderRadius: 20, 
    borderWidth: .25, 
    width: '50%', 
    textAlign:'center',
    marginBottom: 10
  }
});
