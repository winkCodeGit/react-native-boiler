import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Button ,TextInput,ActivityIndicator} from 'react-native';
import { getTrainDetails ,getLiveDetails} from '../api/pnr';

const Landing = ()=> {
    const [trainNumber, SetTrainNumber] = useState(0);
    const [trainData,setTrainData]= useState("");
    const [liveDatas,setLiveDatas]=useState([])
    const [progressCount,setProgressCount] = useState(0)
    const [isLoading, setIsLoading] = useState(false);
    

    const getLiveData = async (trainId)=>{
      //const url = `https://indian-railway-irctc.p.rapidapi.com/getTrainId?trainno=${trainNumber}`;
      
        try{
          setIsLoading(true)
            let currentDate = new Date().toJSON().slice(0, 10);
            const params = {
              id:trainId,
              date:currentDate
            } 
            const response = await getLiveDetails(params)

              var stationCompleted = 0
              var per = 1/(response?.stations?.length);
              if(response?.stations?.length > 0){
                response.stations?.map((data)=>{
                  if(data.is_departed =="1"){
                    stationCompleted++;
                  }
                })
                setProgressCount(per*(response.stations?.length - stationCompleted))
              }
              setLiveDatas(response.stations)
              setIsLoading(false)
        }catch(error){
            setIsLoading(false)
        }  
    }
    useEffect(() => {
      
        //getData()
      }, []);

      const getTrainDetail = async ()=>{

        const params ={
          trainNo:trainNumber
        }
        try{
          const res = await getTrainDetails(params)
          setTrainData(res[0])
          if(res[0]?.id){
            getLiveData(res[0].id)
          }
          //
        }catch(error){
          console.log(error)
        }
        
      }
    
      const handleSubmit = () => {
        //getData()
        getTrainDetail()
        
        // Do something with the text input, like sending it to an API
      };
  return (
    <>
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.headerText} >Train Information</Text>
       
          <TextInput
          keyboardType='numeric'
          style={{ height: 40, width:200, borderColor: 'gray', borderWidth: 1,borderRadius:4,paddingLeft:7 }}
          onChangeText={text => SetTrainNumber(text)}
          value={trainNumber}
          placeholder="Enter Train Number"
        />
         
        <Text style={styles.buttonText}>
              <Button
              title="Submit"
              onPress={handleSubmit}
            />
        </Text>
        {trainData!=="" && trainData !== undefined && trainData!=="P" &&  <Text style={{marginTop:10,color:'blue', fontSize:16,fontWeight:"600"}}>
              Train Details
        </Text>}
        {trainData == undefined && trainData=="P" && <Text style={{marginTop:10,color:'blue', fontSize:16,fontWeight:"600"}}>
             No Train found
        </Text>}

        {trainData !==""  && trainData !== undefined && trainData!=="P" && <View>
            <Text >
              {trainData?.display}
            </Text>
            <Text style={{}}>
              source : {trainData?.source_code}{" "}({trainData?.source_name_hi})
            </Text>
            <Text style={{}}>
              Destination : {trainData?.destination_name }{" "}({trainData?.destination_name_hi})
            </Text>
           
        </View>}
    </View>

        {/*---------------------------*/}
        {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          <Text style={[styles.headerText,styles.ml110]}>
            Train Live Status
          </Text>
          <View style={{flexDirection: 'row',marginLeft:15}}>
            <View style={{flex: 1}}>
                <View style={styles.ps}>
                    <View style={[styles.progressBar, { height: `${progressCount * 100}%` }]} />
                    
                  </View>
            </View>
            <View style={{flex: 3}}>
              {liveDatas.length > 0 &&  liveDatas.map((data,index)=>{
                  return(
                    <>
                      <View style={{marginBottom:10}} key={index}>
                        <Text>{data.source_name}({data.source_name_hi})</Text>
                        <Text>Arrival Time: {data.arrival_time}</Text>
                        <Text >Departure Time: {data.departure_time}</Text>
                        <Text>{data.delay_arrival =="-1"?<Text style={{color:"green"}}>On Time</Text>:<Text style={{color:"red"}}>Delay: {data.delay_arrival+" mints"}</Text>}</Text>
                        <Text>Distance Covered : {data.distance} KM</Text>
                        <Text>Departed from Station : {data.is_departed =="1"?<Text style={{color:"green"}}>Yes</Text>:<Text style={{color:"red"}}>No</Text>}</Text>
                      </View>
                    </>
                    )
                  })}
            </View>
          </View>
        </View>

      )}
    

    <View>
    </View>

    </ScrollView>
    </>

    
  );
}

export default Landing

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop:80
  },
 headerText:{
  color :"blue",
  fontSize:20,
  padding:10,
  fontWeight:"600"

 },
 buttonText:{
  padding:10

 },
 ps: {
  width: 20,
  height: 100,
  backgroundColor: 'green',
  borderRadius: 10,
  transform: [{ rotate: '-180deg'}],
  height:'100%'
  
},
progressBar: {
  backgroundColor: '#2196f3',
  borderRadius: 10
},
ml110:{
  marginLeft:110
}
 
});
