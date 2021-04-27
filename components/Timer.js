import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator
} from 'react-native';
import { Button } from 'react-native-elements';


const Timer = props => { 

    const [currentDay, setcurrentDay] = useState(null)
    const [currentTime, setcurrentTime] = useState(null)
    const [currentMonth, setcurrentMonth] = useState(null)
    const [todayDate, settodayDate] = useState(null)


    const daysArray = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const monthArray = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];



    const getCurrentTime = useCallback(() => {
    let hour = new Date().getHours();
    let minutes = new Date().getMinutes();
    let seconds = new Date().getSeconds();
    let am_pm = 'pm';
    
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      if (seconds < 10) {
        seconds = '0' + seconds;
      }
      if (hour > 12) {
        hour = hour - 12;
      }
      if (hour == 0) {
        hour = 12;
      }
      if (new Date().getHours() < 12) {
        am_pm = 'am';
      }
      setcurrentTime(hour + ':' + minutes + ':' + seconds + ' ' + am_pm)
      daysArray.map((item, key) => {
        if (key == new Date().getDay()) {
            setcurrentDay(item.toUpperCase())
        }
    })
    },[setcurrentTime, setcurrentDay ])

   
    useEffect(() => {
        let date = new Date().getDate();
        let month = new Date().getMonth();
        let year = new Date().getFullYear();
        settodayDate(`${date}-${month}-${year}`)

        setInterval(getCurrentTime, 1000);
    },[getCurrentTime, settodayDate,])

  



return (
    <View style={styles.attendanceCard}>
        <View style={styles.container}>
            <View>
            <Text style={styles.daysText}>{currentDay}</Text>
            <Text style={styles.timeText}>{currentTime}</Text>
            </View>
        </View>
        <Button 
            disabled = {props.buttonTitle == 'Punch Out Done!' ? true : false}
            title={props.buttonTitle} 
            onPress= {props.onPress.bind(this, {todayDate, currentTime})}
        />
   </View>
);

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical:'7.5%',
      },
      timeText: {
        fontSize: 50,
        color: '#000'
      },
      daysText: {
        color: '#2196f3',
        fontSize: 25,
        paddingBottom: 0
      },
      attendanceCard: {
        width:'80%',
        backgroundColor:"#dee3de",
        borderRadius: 4
    }
})

export default Timer;