import React, { useState } from 'react';
import { Text, View, StyleSheet, Platform, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';
import { sizes as size} from '../../utils/sizes';

export const Focus = ({addSubject}) =>  {
  const [subject, setSubject] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
         <Text style={styles.title}>What would you like to focus on?.</Text>
      
         <View style={styles.inputContainer}>
           <TextInput style={styles.textInput} value={subject} onChangeText={text => setSubject(text)}/>
           
          <RoundedButton size={50} title="+" 
              onPress={() => addSubject(subject)}/> 
         </View>
     </View>   
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:.5,
    paddingTop: size.xxxl
  },
  titleContainer: {
    
    padding: size.sm,
    justifyContent: 'center'
  },
  title: {
    color:'white',
    fontWeight: "bold",
    fontSize: size.lg

  },
  inputContainer: {
    paddingTop: size.xl,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textInput: {
    marginRight: 10,
    flex: 1
  }


  
});
