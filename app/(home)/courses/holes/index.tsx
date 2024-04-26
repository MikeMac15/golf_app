import { Stack, useLocalSearchParams, Link } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native"
import { get_hole_list } from "../../../(auth)/api";

interface Hole {
    id: number;
    user: number;
    teebox: number;
    number: number;
    par: number;
    distance: number;
    teeColor: string;
}

export default function CourseTeeboxHoles() {
    const params = useLocalSearchParams();
    const { teeKey, teeColor1, teeColor2 } = params;
    const [holesList, setHolesList] = useState<Hole[]>([]);
    let totalPar = 0
    let totalDist = 0

    const teePK = Array.isArray(teeKey)
        ? parseInt(teeKey[0], 10)  // If it's an array, use the first element
        : parseInt(teeKey, 10);    // If not then not

    useEffect(()=>{
        const fetchHoleList = async() => {
            try{
                let listOfHoles = await get_hole_list(teePK)
                if (listOfHoles){
                    setHolesList(listOfHoles)
                }
            } catch(e){
                console.error('error geting holes holes/index.tsx ')
            }
        }
        fetchHoleList()
    },[])

    useEffect(()=>{
        totalPar = holesList.reduce((acc, hole) => acc + hole.par, 0)
        totalDist = holesList.reduce((acc, hole) => acc + hole.distance, 0)
    }, [holesList])
    
    return(<>
        
        <Stack.Screen
        options={{
            // https://reactnavigation.org/docs/headers#setting-the-header-title
            title: teeColor2 ? `${teeColor1} ${teeColor2} combos` : `${teeColor1} tee's`,
            // https://reactnavigation.org/docs/headers#adjusting-header-styles
            headerStyle: { backgroundColor: '#748f45' },
            headerTintColor: '#fff',
            headerBackTitle: 'Back',
            headerBackTitleStyle: {fontSize:15},
            headerRight: () => (
                        holesList.length < 18 
                            ?
                                <Link href={{pathname: '/courses/holes/newHoles',
                                              params:{teeKey: teeKey, teeColor1: teeColor1, teeColor2: teeColor2}}}> <Text style={{
                                                fontSize: 25,
                                                marginRight: 10,
                                                color: 'white',
                                            }}>+</Text></Link>
                                            
                            :
                                <Text></Text>)
                                            
          }}/>
    

    <Text>Holes Info</Text>
    <Text>{teeColor1}</Text>
    <Text>{teeColor2 ? teeColor2 : ''}</Text>
    <Text>Hole List:</Text>

    {
        holesList && holesList.length > 0
        ? holesList.map((hole, index)=>(
            <View key={index} style={{flexDirection: "row",}}>
            <Text>{`Hole: ${hole.number}, `}</Text>
            <Text>{`Par: ${hole.par}, `}</Text>
            <Text>{`Yardarge: ${hole.distance}`}</Text>
            </View>
        ),
        <View>
            <Text>
                
                {totalDist}
                </Text>
        <Text>{totalPar}</Text>
        </View>
        )
        :
        <Text>add holes via the '+' button</Text>

    }
    </>);
}