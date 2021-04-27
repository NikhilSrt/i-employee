import React from 'react';

import { createStackNavigator  } from 'react-navigation-stack';
import { createAppContainer,  createSwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {Ionicons, EvilIcons} from '@expo/vector-icons'


import Login from '../screens/Login.js'
import ProfileSearch from '../screens/ProfileSearch.js'
import Profile from '../screens/Profile.js'
import StartupScreen from '../screens/StartupScreen.js'

import MyProfile from '../screens/MyProfile.js'
import EditProfile from '../screens/EditProfile.js'
import Attendance from '../screens/Attendance.js'



const ProfileNavigator = createStackNavigator(
  {
    Search: {
      screen: ProfileSearch
    },
    Profile: {
      screen: Profile
    },   
  },
  {
    defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#000',
    },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontFamily: 'Open-Sans'
      },
      headerBackTitleStyle: {
        fontFamily: 'Open-Sans'
      }
  }
}  
);

const MyProfileNavigator = createStackNavigator(
  {
    Edit_Profile: {
      screen: EditProfile
    },
},
{
  defaultNavigationOptions: {
  headerStyle: {
    backgroundColor: '#000',
  },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontFamily: 'Open-Sans'
    },
    headerBackTitleStyle: {
      fontFamily: 'Open-Sans'
    }
}
}    
);

const AttendanceNavigator = createStackNavigator(
  {
    Attendance: {
      screen: Attendance
    },
},
{
  defaultNavigationOptions: {
  headerStyle: {
    backgroundColor: '#000',
  },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontFamily: 'Open-Sans'
    },
    headerBackTitleStyle: {
      fontFamily: 'Open-Sans'
    }
}
}    
);

const HomeBottamTab = Platform.OS === 'android'? createMaterialBottomTabNavigator({
  Search : { 
      screen : ProfileNavigator,
     navigationOptions: {
         tabBarIcon: tabInfo =>{
             return <Ionicons name ="md-search" size = {25} color= {"#fff"}/>
         }
     }},
  MyInfo: {
      screen : MyProfileNavigator,
     navigationOptions: {
         tabBarIcon : tabInfo =>{
             return <EvilIcons name="user" size={32} color="black" />
         }
     }},
     Attendance: {
      screen : AttendanceNavigator,
      navigationOptions: {
        tabBarIcon : tabInfo =>{
            return <EvilIcons name="calendar" size={32} color="black" />
        }
    }
  }
},{
  activeColor: 'grey',
  barStyle: {
      backgroundColor: 'black'
  }
}
): createBottomTabNavigator({
  Search : { 
       screen : ProfileNavigator,
      navigationOptions: {
          tabBarIcon: tabInfo =>{
              return <Ionicons name ="md-search" size = {25} color= {"#000"}/>
          }
      }},
      MyInfo: {
       screen : MyProfileNavigator,
      navigationOptions: {
          tabBarIcon : tabInfo =>{
              return <EvilIcons name="user" size={32} color="black" />
          }
      }},
      Attendance: {
        screen : AttendanceNavigator,
        navigationOptions: {
          tabBarIcon : tabInfo =>{
              return <EvilIcons name="calendar" size={32} color="black" />
          }
      },
      }
},{
  tabBarOptions: {
      activeTintColor: 'black',
      backgroundColor: '#000'
  }
})

const MainNavigator = createSwitchNavigator({
    StartupScreen: StartupScreen,
    Auth: Login,
    Main: HomeBottamTab,
  });
  
  export default createAppContainer(MainNavigator);
  