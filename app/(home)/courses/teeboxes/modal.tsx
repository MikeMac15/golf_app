import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {Picker} from '@react-native-picker/picker';
import { Platform, StyleSheet, TextInput, Button, Switch } from 'react-native';

import EditScreenInfo from '../../../../components/EditScreenInfo';
import { Text, View } from '../../../../components/Themed';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { create_new_tee } from '../../../(auth)/api';

export default function TeeModalScreen() {
    const params = useLocalSearchParams();
    const { courseID, courseName } = params;

    console.log(params)
    
    const [teeColor1, setTeeColor1] = useState('White');
    // const [teeColor2, setTeeColor2] = useState('');
    // const [combo, setCombo] = useState(false)
    // const toggleCombo = () => {
    //     setCombo(previousState => !previousState);
    //     combo ? setTeeColor2('') : setTeeColor2('White')
    // }

   
  // const handleSubmit = async() => {
  //   const coursePK = courseKey[0];
  //   console.log(coursePK)
  //   // if (teeColor2 === ''){
  //   await create_new_tee(coursePK, teeColor1)
       
  //   // } else {
  //   //     await create_new_tee(coursePK, teeColor1, teeColor2)
        
  //   // }
  // }


  const handleSubmit = async () => {
    if (!courseID) {
      console.error('Course key is undefined.');
      return; // or handle the error in an appropriate way
    }
  
    const coursePK = courseID[0];
  
    await create_new_tee(coursePK, teeColor1);
  };


  const teeboxColors = [
    'Black', 'Blue', 'White', 'Red', 'Gold', 'Silver', 'Green'
  ]

  return (
    
    <View style={styles.container}>

    {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={styles.title}>Playing Combos?</Text>
      <Switch
          style={{marginBottom: 15, marginLeft: 10}}
          trackColor={{false: '#767577', true: '#748f45'}}
          // thumbColor={combo ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          // onValueChange={toggleCombo}
          // value={combo}
          />
    </View> */}

    {/* {combo
    ? */}
    {/* <> */}

      {/* <Text style={[styles.title, {marginTop: 20}]}>Select Starting TeeColors</Text>
      
        <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center'}}>
        
        <View style={styles.pickers}>
        <Text style={{textAlign: 'center'}}>Back Tee:</Text>
            <Picker
            style={{ height: 200, width: '100%'}}
            selectedValue={teeColor1}
            onValueChange={(itemValue) => (
                setTeeColor1(itemValue))}
                >
                {teeboxColors.map((color) => (
                    <Picker.Item key={color} label={color} value={color} />
                    ))}
            </Picker>
        </View>

        <View style={styles.pickers}>
        <Text style={{textAlign: 'center'}}>Front Tee:</Text>
        <Picker
        style={{ height: 200, width: '100%'}}
        selectedValue={teeColor2}
        onValueChange={(itemValue) => (
            setTeeColor2(itemValue))}
            >
            {teeboxColors.map((color) => (
                <Picker.Item key={color} label={color} value={color} />
                ))}
        </Picker>
      
                </View>
                </View>
     </> 
    */}
  
    
        <Text style={[styles.title, {marginTop: 20}]}>Select Starting TeeColor:</Text>
        <Picker
        style={{ height: 200, width: '50%' }}
        selectedValue={teeColor1}
        onValueChange={(itemValue) => (
          setTeeColor1(itemValue))}
          >
            {teeboxColors.map((color) => (
              <Picker.Item key={color} label={color} value={color} />
              ))}
        </Picker>
      {/* </>
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
  },
  pickers: {
    
   width: '40%',
   alignItems: 'center',
   justifyContent: 'center'
    
  }
});
