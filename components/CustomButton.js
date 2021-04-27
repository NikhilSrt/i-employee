import  React, {useState} from 'react'
import { View} from 'react-native'

import {Button} from 'react-native-elements';


const CustomButton = (props) => {

  return(
    <Button
      title={props.title}
      titleStyle={{ fontSize: 15, color: '#000'}}
      buttonStyle={
        props.selected
          ? {
              backgroundColor: 'rgba(213, 100, 140, 1)',
              borderRadius: 100,
              width: 122,
              padding:10
            }
          : {
              borderWidth: 0,
              borderColor: '#000',
              borderRadius: 30,
              width: 122,
              backgroundColor: 'transparent',
              padding:10
            }
      }
      containerStyle={{ marginRight: 10 }}
    />

)
}

export default CustomButton;
