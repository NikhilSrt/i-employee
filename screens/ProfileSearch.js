import  React, {useState} from 'react'
import { View, Text, StyleSheet, Image, Dimensions, Button, FlatList} from 'react-native'
import { ListItem, SearchBar } from 'react-native-elements'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

import { useSelector, useDispatch } from 'react-redux'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';



const ProfileSearch = props => {

  const availableProfiles = useSelector(state => state.profile.profiles);
    
  const [filtered_Data, setfiltered_Data] = useState(availableProfiles);
  const [enteredValue, setenteredValue] = useState('');


const searchFilterFunction = (text) => {
  setenteredValue(text);
  const newData = availableProfiles.filter(item => {
    const itemData = `${item.Name.toUpperCase()} ${item.Email.toUpperCase()}`; 
    const textData = text.toUpperCase();
    return itemData.indexOf(textData) > -1;
  });

  if(newData.length == availableProfiles.length) {
    setfiltered_Data(availableProfiles)
  } else {
    setfiltered_Data(newData)
  }

}

const renderSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: '86%',
        backgroundColor: '#CED0CE',
        marginLeft: '14%',
      }}
    />
  );
};


return (
  <View style={styles.screen}>
          <View style={{width:SCREEN_WIDTH, height:SCREEN_HEIGHT/3.5, backgroundColor:'#e6e6e6', width: '100%', paddingTop: 25}}>
            <Image
              resizeMode= 'contain'
              style= {{flex:1, width:'100%'}}
              source={require('../assets/images/ipac-logo.png')}/>
          </View>

          <SearchBar
              platform= 'ios'
              inputStyle= {{fontSize: hp('1.54%')}}
              placeholder= {'Search using name or email'}
              containerStyle={{paddingHorizontal:hp('1.1%'), marginVertical:hp('.5%'), backgroundColor:'#000'}}
              inputContainerStyle={{paddingHorizontal:hp('1.1%'), borderRadius:hp('4.4%'), height: hp('4.4%')}} 
              onChangeText={searchFilterFunction}
              value={enteredValue}/>
              <View style={{justifyContent:'flex-start', flex:1}}>
                <FlatList
                  data={filtered_Data}
                  renderItem={({ item }) => (
                    <ListItem
                      leftAvatar={{ source: { uri: item.Dp } }}
                      title={item.Name}
                      subtitle={item.Email}
                      onPress={()=>{props.navigation.navigate({
                        routeName: 'Profile',
                        params: {
                          categoryId: item.Email
                        }
                      })
                    }}/>
                  )}
                  keyExtractor={item => item.Email}
                  ItemSeparatorComponent={renderSeparator}
                />
              </View>
  </View>
  );
}


const styles = StyleSheet.create({
  screen:{
    flex: 1,
    backgroundColor: '#292E49',
    height: SCREEN_HEIGHT
  },
})

export default ProfileSearch;
