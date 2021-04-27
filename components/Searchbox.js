import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';


const Searchbox = props => {

const [loading, setloading] = useState(false);

 
    return (
      <View style={{flex: 1, marginTop:0}}>
      <SearchBar
        placeholder="Type Someone's Name"
        darkTheme
        round 
        onChangeText={text => {props.onChangeText.bind(this, text)}}
        autoCorrect={false}
        value={props.value}/>
      </View>
    );
  

}



export default Searchbox;
