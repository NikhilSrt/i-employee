import { PUNCH_IN } from '../actions/attendance';
import { PUNCH_OUT } from '../actions/attendance';
import { SET_ATTENDANCEDATA } from '../actions/attendance';


const initialState = {
    date: null,
    punch_in_time: null,
    punch_out_time: null,
    events: [],
    attendanceData: []
  };

  const attendanceReducer = (state = initialState, action) => {

    switch (action.type) {
     
      case PUNCH_IN:
        return {
            date: action.date,
            punch_in_time: action.time,
        };

      case PUNCH_OUT:
            return {
                date: action.date,
                punch_in_time: state.punch_in_time,
                punch_out_time: action.time,
      };

      case SET_ATTENDANCEDATA:
            return {
              events : action.events,
              attendanceData: action.attendanceData
      };
                                         
      default:
        return state;
    }
  };

  export default attendanceReducer ;