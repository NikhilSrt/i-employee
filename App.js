import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import authReducer from './store/reducers/auth';
import profilesReducer from './store/reducers/profiles';
import attendanceReducer from './store/reducers/attendance';

import PrimaryNavigator from './Navigation/PrimaryNavigator';


const rootReducer = combineReducers({
  auth: authReducer,
  profile: profilesReducer,
  attendance: attendanceReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const firebaseConfig = {
  apiKey: 'AIzaSyCQF8-AXzuTo_hxQz2FW3biOfGNLDvT4N4', 
  authDomain: 'i-employee.firebaseapp.com', // Post Auth Setup
  databaseURL: 'https://i-employee-default-rtdb.firebaseio.com/', // Post Database Setup
  projectId: 'i-employee', 
  storageBucket: 'i-employee.appspot.com',
  messagingSenderId: '180627563564', // Post Cloud Messaging Setup
  appId: '1:180627563564:android:351adc0da60645f2d31d89', 
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);

}

export default function App() {

  const [isReady, setisReady] = useState(false)

  const fetchFonts = () => {
     return Font.loadAsync({ 
       'Open-Sans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
       'Open-Sans': require('./assets/fonts/OpenSans-Regular.ttf') ,
       'Georgia': require('./assets/fonts/Georgia.ttf') ,
       'Ubuntu-Light': require('./assets/fonts/Ubuntu-Light.ttf') ,
       'Ubuntu-Bold': require('./assets/fonts/Ubuntu-Bold.ttf') ,
       'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf') ,
       'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf') ,
       'Samantha': require('./assets/fonts/Samantha.ttf') ,
       'StrickenBrush': require('./assets/fonts/StrickenBrush.ttf') ,
  });
  }

  if (!isReady) {
    return(
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setisReady(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
    <PrimaryNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
