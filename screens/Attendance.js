import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  ScrollView
} from 'react-native';

import Timer from '../components/Timer.js'

import { Calendar } from 'react-native-big-calendar'

import { useSelector, useDispatch } from 'react-redux';
import { punchIn, punchOut, fetchAttendanceData } from '../store/actions/attendance';


const Attendance = props => { 

    const [IsLoading, setIsloading] = useState(false)
    const [buttonTitle, setbuttonTitle] = useState('Punch-In')

   
    const events = useSelector(state => state.attendance.events)
    const attendanceData = useSelector(state => state.attendance.attendanceData)
    

    const [punch_in_time, setpunch_in_time] = useState()
    const [punch_out_time, setpunch_out_time] = useState()

    const dispatch = useDispatch();


    const punch_In = useCallback(async ({todayDate, currentTime}) => {
           setIsloading(true)
           await  dispatch(punchIn(todayDate,currentTime))
           await dispatch(fetchAttendanceData())
           setpunch_in_time(currentTime)
           setbuttonTitle('Punch-Out')
           setIsloading(false)
        },[fetchAttendanceData, punchIn, dispatch])
 
     
     const punch_Out = useCallback(async ({todayDate, currentTime}) => {
         setIsloading(true)
         await dispatch(punchOut(todayDate,currentTime))
         await dispatch(fetchAttendanceData())
         setpunch_out_time(currentTime)
         setbuttonTitle('Punch Out Done!')
         setIsloading(false)
     },[fetchAttendanceData, punchOut, dispatch])


     if (IsLoading) {
        return (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color='#000' />
          </View>
        );
      }
    
      
return (
    <View style={styles.screen}>

    <View style={{width:'100%', alignItems:'center', height:'30%', backgroundColor:'#FFFAFA', paddingVertical: '5%'}}>
    <Timer 
      buttonTitle= {buttonTitle}
      onPress= {({todayDate, currentTime}) => {
          buttonTitle == 'Punch-In' ? punch_In({todayDate, currentTime}) : punch_Out({todayDate, currentTime})}
      }
    />
    </View>
    
    <View style={styles.userAttendanceTable}>
     <View style={styles.header}>
        <Text style={styles.headerText}>
            Today's Attendance
        </Text>
     </View>
     <View style={styles.contentRow}>
         <View style={styles.leftRow}>
            <Text style={{fontSize:14, color:'#000'}}>
                Punch-In
            </Text>
         </View>
         <View style={styles.rightRow}>
            <Text style={{fontSize:14, color:'#000'}}>
                { punch_in_time != null ? punch_in_time : "Not Done Yet"}
            </Text>
         </View>
         </View>

         <View style={styles.contentRow}>
         <View style={styles.leftRow}>
            <Text style={{fontSize:14, color:'#000'}}>
                Punch-Out 
            </Text>
         </View>
         <View style={styles.rightRow}>
            <Text style={{fontSize:14, color:'#000'}}>
                { punch_out_time != null ? punch_out_time : "Not Done Yet"}
            </Text>
         </View>
     </View>
    </View>
    
    
    <Calendar  
        events={events} 
        height={600} />
   
    
   </View>
);

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
      },
      userAttendanceTable : {
        backgroundColor:"#dee3de",
        borderRadius: 4,
        width:'100%',
      },
      header: {
          width:'100%',
          backgroundColor:'#000',
          alignItems:'center',
          justifyContent:'center',
          paddingVertical:'1.0%',
          borderWidth:1,
          borderColor:'#fff'
      },
      headerText: {
          fontSize: 20,
          color : '#fff'
      },
      contentRow : {
          flexDirection:'row',
          backgroundColor:"#dee3de",
          width:'100%',
          justifyContent:'flex-start'
      },
      leftRow: {
          alignItems:'center',
          justifyContent:'center',
          width:'30%',
          borderWidth:1,
          borderColor: '#fff',
          padding:10
      },
      rightRow: {
        alignItems:'center',
        justifyContent:'center',
        width:'70%',
        borderWidth:1,
        borderColor: '#fff',
        padding:10
    },
    centered: {
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
    
})

export default Attendance;