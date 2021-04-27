export const  PUNCH_IN = 'PUNCH_IN';
export const  PUNCH_OUT = 'PUNCH_OUT';
export const SET_ATTENDANCEDATA = 'SET_ATTENDANCEDATA';

export const punchIn = (date, time) => {
    return async (dispatch, getState) => { 
        console.log(date, time)
        const emailId = getState().auth.userId
        console.log(emailId)
        const response1 = await fetch(`https://i-employee-default-rtdb.firebaseio.com/attendance/${emailId}/${date}.json`, {
            method : 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                punch_in_time : time
            })
        });
        dispatch({type: PUNCH_IN, date, time }) 
    }
}

export const punchOut = (date, time) => {
    return async (dispatch, getState) => { 
        console.log(date, time)
        const emailId = getState().auth.userId
        const response1 = await fetch(`https://i-employee-default-rtdb.firebaseio.com/attendance/${emailId}/${date}.json`, {
            method : 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                punch_out_time : time
            })
        });
        dispatch({type: PUNCH_OUT, date, time }) 
    }
}

export const fetchAttendanceData = () => {
    return async (dispatch, getState) => {
        const emailId = getState().auth.userId
    try {
        const responses = await fetch(`https://i-employee-default-rtdb.firebaseio.com/attendance/${emailId}.json`);
            const resData = await responses.json();
            const Events = [];
            const AttendanceData = []
            for ( const key in resData ) {
                let year = key.substring(key.length - 4, key.length);
                let month = key.substring(3, key.length - 5);
                let day = key.substring(0,2);
                let hour_in = resData[key].punch_in_time.substring(0, resData[key].punch_in_time.length - 9);
                let minute_in = resData[key].punch_in_time.substring(resData[key].punch_in_time.length - 8, resData[key].punch_in_time.length - 6);
                let hour_out = resData[key].punch_out_time.substring(0, resData[key].punch_out_time.length - 9);
                let minute_out = resData[key].punch_out_time.substring(resData[key].punch_out_time.length - 8, resData[key].punch_out_time.length - 6);

                Events.push({
                    title: 'Attendance',
                    start: new Date( year, month, day, hour_in, minute_in),
                    end: new Date( year, month, day, hour_out, minute_out),
                })

                AttendanceData.push({
                    date: key,
                    punch_in_time: resData[key].punch_in_time,
                    punch_out_time: resData[key].punch_out_time,
                })

            }
            console.log(AttendanceData)
        dispatch({ type: SET_ATTENDANCEDATA, events: Events, attendanceData: AttendanceData})
        } catch (err) {
        console.log(error);
           throw err;
        }
    }
}
