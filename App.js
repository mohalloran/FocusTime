import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Alert, Platform, KeyboardAvoidingView, ScrollView ,AsyncStorage } from 'react-native';
import { Focus } from './src/features/focus/Focus';
import { FocusHistory } from './src/features/focus/FocusHistory';
import { Timer } from './src/features/timer/Timer';
import { sizes as size} from './src/utils/sizes';
import { useKeepAwake } from 'expo-keep-awake';

export default function App() {
  
  const STATUSES = {
    COMPLETE: 1,
    CANCELLED: 2
  }

  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory , setFocusHistory] = useState([]);

  const addFocusHistorySubjectWithStatus = (subject, status) => {

    setFocusHistory([...focusHistory, {key: String(focusHistory.length + 1),subject: subject, status: status}])

  }

  const saveFocusHistory = async () => {
      try {
        await AsyncStorage.setItem("focusHistory",JSON.stringify(focusHistory));
      }catch(e){
        console.log(e);
      }
  }

  const loadFocusHistory = async () => {
      try {
          const history = await AsyncStorage.getItem("focusHistory");
          if(history && JSON.parse(history).length){
              setFocusHistory(JSON.parse(history)); 
          }
      }catch (e){
        console.log(e);
      }
  }

  useEffect(() => {
    loadFocusHistory();
  },[]);//when component is mounted

  useEffect(() => {
      saveFocusHistory();
  },[focusHistory])

  console.log('foucus history is:',focusHistory)
  
  return (
    
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"} >
    <ScrollView>
      {focusSubject ? 
           (
            <Timer 
                focusSubject={focusSubject}
                onTimerEnd={() => {
                      addFocusHistorySubjectWithStatus(focusSubject, STATUSES.COMPLETE);
                      setFocusSubject(undefined);
                    }
                }
                clearSubject={() => {
                      setFocusSubject(null);
                      addFocusHistorySubjectWithStatus(focusSubject, STATUSES.CANCELLED);
                    }
                }
            />
          ):
          (
              <View style={{flex: 0.5}} >
               
                <Focus addSubject={(value) => setFocusSubject(value)}/>
                <FocusHistory focusHistory={ focusHistory } onClear={ () => setFocusHistory([])}/>
              </View>
          )
    }
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS == 'android' ? size.xxxl : size.md ,
    backgroundColor: 'blue'
    
  },
  
});
