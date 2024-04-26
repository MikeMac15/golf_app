import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, Pressable, StyleSheet, Text, Button } from 'react-native';

interface CreateHoleProps {
  holeNumber: number;
  teeColor1: string;
}

const CreateHole: React.FC<CreateHoleProps> = ({ holeNumber, teeColor1 }) => {
    const [par, setPar] = useState(4)
    const [distance, setDistance] = useState(0)
    const [color, setColor] = useState('')
    const [combos, setCombos] = useState(false)
    
    useEffect(()=>{
        
      setColor(teeColor1)
        
    },[])
  
    const handleSubmit = () => {
      alert(`par: ${par}, distance: ${distance}, color: ${color}`)
    };
  
    return (
    <View style={styles.container}>
        
        <View style={{flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
            <View style={{alignItems:'center', marginRight: combos ? 10 : 30}}>
                <Text>Par</Text>

            <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>

                    <Button title='-' onPress={()=>{if(par > 3 ){ setPar(par-1) } }}/>

                    <Text style={{paddingHorizontal:5, fontSize:20}}>{par}</Text>
                    
                    <Button title='+' onPress={()=>{if(par < 5 ){ setPar(par+1) } }}/>
            </View>
            </View>    
        
        </View>
        <View style={{alignItems:'center', marginRight: 10}}>
            <Text>Distance</Text>
            <TextInput
            style={styles.input}
            placeholder="yardage"
            keyboardType="number-pad"
            returnKeyType="next"
            onChangeText={newText => setDistance(Number(newText))}
            />
        </View>


{/* {combos
?
            <View style={{ justifyContent:'center', alignItems:'center'}}>
                
                    <Text >Tee Color</Text>
                    <View style={{flexDirection:'row', alignItems:'center'}}>

                <Button title={`Blue`} />
                <Button title={`White`} />
                    </View>
            </View>

:
<></>} */
}
        
    </View>
        
    );
  };



  

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 75,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    // marginBottom: 10,
    padding: 10,
  },
});

export default CreateHole;