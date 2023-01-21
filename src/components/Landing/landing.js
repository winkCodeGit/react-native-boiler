import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button  } from 'react-native';

const Landing = ()=> {
    const [hasPermission, setHasPermission] = useState(null);
    

    useEffect(() => {
        
      }, []);
    
      
  return (
    <>
      <View style={styles.container}>
        <Text>Landing page</Text>
      </View>
    </>
    
  );
}

export default Landing

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
 
});
