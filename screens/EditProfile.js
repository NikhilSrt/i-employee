import React, { useState, useCallback, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    KeyboardAvoidingView,
    Platform
}  from 'react-native';

import { Avatar, Button, Input, Overlay } from 'react-native-elements';
import { useSelector } from 'react-redux';


import { ScrollView } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import BouncyCheckbox from "react-native-bouncy-checkbox";


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const EditProfile = (props) => {

  const availableProfiles = useSelector(state => state.profile.profiles);

  const selectedCategory = availableProfiles.find(cat => cat.Email === 'nikhil.srivastava@indianpac.com');

  const { navigation } = props;

  
  const [mode, setMode] = useState(false);
  const [show, setShow] = useState(false);
  const [isDateVisible, setisDateVisible] = useState(false);
  const [CampaignOptions, setCampaignOptions] = useState(false);
  const [showEditBio, setshowEditBio] = useState(false);

  const [joined, setjoined] = useState(selectedCategory.Joined);
  const [date, setdate] = useState(new Date());
  const [bio, setbio] = useState(selectedCategory.Bio);
  const [name, setname] = useState(selectedCategory.Name);
  const [post, setpost] = useState(selectedCategory.Post);
  const [college, setcollege] = useState(selectedCategory.College);
  const [hometown, sethometown] = useState(selectedCategory.Hometown);
  const [Dp, setDp] = useState(selectedCategory.Dp);
  
  
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setdate(currentDate)
    const dd = date.getDate();
    const mm = date.getMonth();
    const yyyy = date.getFullYear();
    const newEvent = new Date(Date.UTC(yyyy, mm, dd));
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = newEvent.toLocaleDateString(undefined, options);
    setjoined(formattedDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
    setisDateVisible(true)
  };

  const saveChanges = useCallback(() => {
  const editedProfile = [{
      Email: selectedCategory.Email,
      Dp: selectedCategory.Dp,
      Name: name,
      Post: post,
      Bio: bio,
      College: college,
      Hometown: hometown,
      Joined: joined, 
  }]
  console.log(editedProfile)
}, [name, post, bio, college, hometown, joined]);
  

useEffect(() => {
        navigation.setParams({ save: saveChanges })
}, [saveChanges])
  
  
console.log(date)


   
    return( 

    <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}>
        <View style={styles.dpContainer}>
        <Avatar
        source={{ uri: selectedCategory.Dp}}
        rounded
        size= {SCREEN_HEIGHT > 700 ? 110 : 90}
        containerStyle={{borderColor:'#cccccc', borderWidth:2}}
        />
        <View style={{marginTop:'1%'}}>
            <Button 
                type = 'clear'
                title='Change Profile Photo' 
                />
     </View>
      </View>
      <ScrollView contentContainerStyle={{alignItems:'center', paddingBottom:40}}>
      <Button 
            type = 'clear'
            title='Edit Bio' 
            containerStyle={{backgroundColor:'#000', borderWidth:0.5, borderColor:'#fff', marginBottom:15, width:'90%', marginTop:10}}
            titleStyle={{color:'#fff'}}
            onPress={()=>{setshowEditBio(true)}} />
      <Input
            containerStyle={{ width: SCREEN_WIDTH*.8 }}
            value={name}
            inputStyle = {{ color:'#000'}}
            label="Name"
            labelStyle={{ marginTop: '2%' }}
            onChangeText={(enteredtext)=>{setname(enteredtext)}}
          />
        <Input
            containerStyle={{ width: SCREEN_WIDTH*.8 }}
            value={post}
            inputStyle = {{ color:'#000'}}
            label="Post"
            labelStyle={{ marginTop: '5%' }}
            onChangeText={(enteredtext)=>{setpost(enteredtext)}}
          />
        <Input
            containerStyle={{ width: SCREEN_WIDTH*.8 }}
            value={college}
            inputStyle = {{ color:'#000'}}
            label="College"
            labelStyle={{ marginTop: '5%' }}
            onChangeText={(enteredtext)=>{setcollege(enteredtext)}}
          />
        <Input
            containerStyle={{ width: SCREEN_WIDTH*.8 }}
            value={hometown}
            inputStyle = {{ color:'#000'}}
            label="Hometown"
            labelStyle={{ marginTop: '5%' }}
            onChangeText={(enteredtext)=>{sethometown(enteredtext)}}
          />
          <View style={{marginTop:SCREEN_HEIGHT/30, width:'80%'}}>
        <Button 
            onPress={showDatepicker} 
            title="Select Joining Date" 
            type='clear'
            containerStyle={{backgroundColor:'white'}}
            titleStyle={{color:'#000', fontFamily:'Open-Sans-Bold'}}/>
      </View>
      <View style={{marginTop:SCREEN_HEIGHT/50 , width:'80%'}}>
        <Button  
            onPress={()=>{setCampaignOptions(true)}}
            title="Select Campaigns" 
            type='clear'
            containerStyle={{backgroundColor:'white'}}
            titleStyle={{color:'#000', fontFamily:'Open-Sans-Bold'}}/>
      </View>
      <View style={{marginTop:SCREEN_HEIGHT/50, width:'80%'}}>
      <Button 
            onPress={() => {}} 
            title="Add Social Media Profiles" 
            type='clear'
            containerStyle={{backgroundColor:'white'}}
            titleStyle={{color:'#000', fontFamily:'Open-Sans-Bold'}}/>
      </View>


      <Overlay
          width="80%"
          height='auto'
          isVisible={showEditBio}
          onBackdropPress = {() => {setshowEditBio(false)}}
          overlayBackgroundColor = 'rgba(242, 242, 242, 1)'
          windowBackgroundColor = 'rgba(255, 255, 255, 1)'
          >
            <View>
            <View style={styles.title}>
                <Text style={styles.titleText}>
                    Enter Your Bio!
                </Text>
            </View>
           <View
            style={{
                backgroundColor: 'fff',
                bordercolor: '#000000',
                borderWidth: 1,
            }}>
            <Input
                multiline
                numberOfLines={5}
                onChangeText={(enteredtext) =>{setbio(enteredtext)}}
                value={bio}
            />
          </View>
          <Button 
             type ='clear'
             title='Done'
             onPress={() => {setshowEditBio(false)}}
             containerStyle={{alignItems:'center'}}
             titleStyle={{color:'#000', fontFamily:'Open-Sans-Bold'}}>
          </Button>
          </View>
          </Overlay>

        
        {show && Platform.OS === 'ios' && (
          <Overlay
          width="90%"
          height="auto"
          isVisible={isDateVisible}
          onBackdropPress = {() => {setisDateVisible(false)}}
          >
         <View>
         <DateTimePicker
           style={{backgroundColor:'#fff', width:'100%'}}
           testID="dateTimePicker"
           timeZoneOffsetInMinutes={0}
           value={date}
           mode={mode}
           is24Hour={true}
           display= {Platform.select({ios:'spinner', android:'default'})}
           onChange={onChange}
         />
         <View style={{marginTop:'1%'}}>
          <Button 
             type = 'clear'
             title='Done'
             color= 'rgba(47,44,60,1)'
             onPress={() => {setisDateVisible(false)}}>
          </Button>
      </View>
      </View>
         </Overlay>
      )}
      {show && Platform.OS === 'android' && (
         <DateTimePicker
         testID="dateTimePicker"
         timeZoneOffsetInMinutes={0}
         value={date}
         mode={mode}
         is24Hour={true}
         display="default"
         onChange={onChange}
       />
      )}

       <Overlay
          width="80%"
          height='auto'
          isVisible ={CampaignOptions}
          onBackdropPress = {() => {setCampaignOptions(false)}}
          overlayBackgroundColor = 'rgba(242, 242, 242, 1)'
          windowBackgroundColor = 'rgba(255, 255, 255, 1)'
          >
              <View style={styles.CampaignOptions}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Choose your campaigns!</Text>
                </View>
                <View style={styles.Campaign}>
                <BouncyCheckbox
                    textColor="#000"
                    fillColor="green" 
                    fontFamily="Open-Sans"
                    text="Maharashtra"
                />
                <BouncyCheckbox
                    textColor="#000"
                    fillColor="green" 
                    fontFamily="Open-Sans"
                    text="West Bengal"
                />
                <BouncyCheckbox
                    textColor="#000"
                    fillColor="green" 
                    fontFamily="Open-Sans"
                    text="Andra Pradesh"
                />
                <BouncyCheckbox
                    textColor="#000"
                    fillColor="green" 
                    fontFamily="Open-Sans"
                    text="Tamil Nadu"
                />
                <BouncyCheckbox
                    textColor="#000"
                    fillColor="green" 
                    fontFamily="Open-Sans"
                    text="Lok Sabha'19"
                />
                <BouncyCheckbox
                    textColor="#000"
                    fillColor="green" 
                    fontFamily="Open-Sans"
                    text="Uttar Pradesh"
                />
                <BouncyCheckbox
                    textColor="#000"
                    fillColor="green" 
                    fontFamily="Open-Sans"
                    text="Bihar AE'15"
                />
                <BouncyCheckbox
                    textColor="#000"
                    fillColor="green" 
                    fontFamily="Open-Sans"
                    text="Punjab AE'17"
                />
                <BouncyCheckbox
                    textColor="#000"
                    fillColor="green" 
                    fontFamily="Open-Sans"
                    text="Lok Sabha'14"
                />
                </View>
          <Button 
             type ='clear'
             title='Done'
             onPress={() => {setCampaignOptions(false)}}
             containerStyle={{alignItems:'center'}}
             titleStyle={{color:'#000', fontFamily:'Open-Sans-Bold'}}>
          </Button>
              </View>
          </Overlay>
       </ScrollView>
      </KeyboardAvoidingView>
    );
}



const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems:"center",
    backgroundColor:'#fff',
    width:'100%'
}, 
dpContainer: {
    alignItems:'center',
    justifyContent: 'center',
    height:'30%',
    width: '100%',
    borderBottomColor:'#f2f2f2',
    position: 'relative'
},
CampaignOptions: {
    justifyContent: 'center',
},
Campaign: {
    alignItems: 'flex-start'
},
title: {
    alignItems:'flex-start',
    marginVertical: 10,
    alignItems: 'center'
},
titleText: {
    fontFamily:'Open-Sans-Bold',
    fontSize: 16
},
})

export default EditProfile;