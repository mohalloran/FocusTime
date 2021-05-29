import React ,{useState} from 'react';
import {View, Text, StyleSheet, Vibration, Platform} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
import { Timing } from './Timing';
import { useKeepAwake } from 'expo-keep-awake';

import { colors } from '../../utils/colors';
import {sizes as size } from '../../utils/sizes';

const DEFAULT_TIME = 0.1;

export const Timer = ({focusSubject, onTimerEnd, clearSubject }) => {

  useKeepAwake();  //keeps you app awake.Keeps the screen on .
  const [minutes, setMinutes] = useState(DEFAULT_TIME);

  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = (progress) => {
    
    setProgress(progress)
  }

  const vibrate = () => {
    if(Platform.OS === 'ios' ){
      //start vibrating after a second and stay vibrating for 10 seconds and it will be cleared.
      const interval = setInterval( () => Vibration.vibrate(), 1000 );
      setTimeout( () => clearInterval(interval), 10000) 
    }else{
      Vibration.vibrate(10000)
    }
  }

  const onEnd = () => {
      vibrate();
      setMinutes(DEFAULT_TIME);
      setProgress(1);
      setIsStarted(false);
      onTimerEnd()
  }

  const changeTime = (min) => {
        setMinutes(min);
        setProgress(1);
        setIsStarted(false);
  }

  return (
    <View style={styles.container}>
      <View style={{paddingTop: size.xxl}}>
          <View style={styles.countdown}>
            <Countdown 
                minutes={minutes} 
                isPaused={!isStarted} 
                onProgress={onProgress}
                onEnd= {onEnd}
            />
          </View>
          <View>
          <Text style={styles.title}>Focussing on:</Text>
          <Text style={styles.task}>{focusSubject}</Text>
          </View>
          <View style={{ paddingTop: size.sm }}>
            <ProgressBar
              progress={progress}
              color='#5E84E2'
              style={{height:15}} />
           </View>
           <View style={styles.buttonWrapper}>
             <Timing onChangeTime={(min) => changeTime(min)}/>
           </View>
          <View style={styles.buttonWrapper}>
          {isStarted ?
            (<RoundedButton title="pause" size={80} onPress={() => setIsStarted(false)}/>):
            (<RoundedButton title="start" size={80} onPress={() => setIsStarted(true)}/>)}
          </View>
      </View>
      <View style={styles.clearSubject}>
            <RoundedButton title="-" size={50} onPress={() => clearSubject()}/>
      </View>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: 'center',

  },
  task: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  countdown: {
    alignItems: 'center',
    justifyContent: 'center'

  },
  buttonWrapper: {
    flexDirection: 'row',
    paddingTop: size.sm,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  clearSubject: {
    paddingBotton: 25,
    paddingLeft: 25


  }

})
