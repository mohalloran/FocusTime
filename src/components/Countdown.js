import React ,{useState, useEffect} from 'react';
import {Text, View, StyleSheet } from 'react-native';
import {sizes as size } from '../utils/sizes';
import { colors } from '../utils/colors';

const minutesToMillisecs = (min) => min * 1000 * 60;

const formatTime = (time) => (time < 10 ? `0${time}`: time)

//const formatTime = () => 

export const Countdown = ({
  minutes = 1,
  isPaused,
  onProgress,
  onEnd
}) => {
  console.log('minutes are:',minutes);

  const interval = React.useRef(null);
  let [millis, setMillis] = useState(minutesToMillisecs(minutes));

  const minute= Math.floor(millis/1000/60) % 60;
  const seconds = Math.floor(millis/1000) % 60;

  const countDown = () => {
    
    console.log('in countDown');

    setMillis((time) => {  //time is the prev millis what it is currently
      console.log('TIME IS:',time);
      if(time === 0){
        clearInterval(interval.curent);//Clean up 
        onEnd();//Vibrates the phone
        return time;
      }
      const timeLeft = time - 1000;
      //report the progress
      onProgress(timeLeft / minutesToMillisecs(minutes));
      return timeLeft;
    })
  }

  useEffect(() => {
    console.log('Running.....');
    setMillis(minutesToMillisecs(minutes))
  },[minutes])

  useEffect(() => {
    console.log('In Paused use Effect');
    if(isPaused){
      if(interval.current) clearInterval(interval.current)
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current)
  }, [isPaused])//isPaused is set to false to trigger the countDown function

  return (
    <View>
      <Text style={styles.text}>{formatTime(minute)}:{formatTime(seconds)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
   text: {
     fontSize: size.xxl,
     fontWeight: 'bold',
     color: colors.white,
     padding: size.lg,
     backgroundColor: 'rgba(94, 132, 226, 0.3)'
   }
})