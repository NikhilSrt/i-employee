import React, { useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';


import { Avatar, Icon, SocialIcon, ItemData } from 'react-native-elements';
import {LinearGradient} from 'expo-linear-gradient';

import TopContainer from '../Blocks/TopContainer';
import CustomButton from '../components/CustomButton';



const SCREEN_WIDTH = Dimensions.get('window').width;

const IMAGE_SIZE = SCREEN_WIDTH - 80;

const Profile = props => {

  const availableProfiles = useSelector(state => state.profile.profiles);

  const catId = props.navigation.getParam('categoryId');


  const selectedCategory = availableProfiles.find(cat => cat.Email === catId);

  const dispatch = useDispatch();



return(

<View style={{flex: 1, backgroundColor:'#fff'}}>
<TopContainer style={{...styles.imageContainer,  paddingVertical:'10%'}}>
<Image
   resizeMode= 'contain'
   style= {{flex:1}}
   source={require('../assets/images/logo.png')}/>
</TopContainer>
<View style={{backgroundColor:'#000', flexDirection:'row', alignItems:'center',borderColor:'#000', borderWidth:0.5}}>
<Avatar
     source={{ uri: selectedCategory.Dp,}}
     rounded
     size={100}
     containerStyle={{marginLeft:20, marginTop:-30, borderColor:'#fff', borderWidth:1}}
     />
 <View style={{flexDirection:'column'}}>
 <Text style={{color:'#fff', marginLeft:10, fontSize:20}}>{selectedCategory.Name}</Text>
 <Text style={{color:'#fff', marginLeft:10, fontSize:15}}>{selectedCategory.Post}</Text>
 </View>
 </View>
 <ScrollView>
 <LinearGradient 
                style={styles.container}
                colors={['#B2BEC3', '#DFE6E9', '#EAEAEA']}>
 <View
   style={{
     flex: 1,
     width: SCREEN_WIDTH,
     flexDirection: 'row',
     alignItems:'center',
     justifyContent:'flex-start',
     paddingLeft:20,
     borderColor:'#000',
     borderBottomWidth:0
     }}>
   <View style={{width:'90%', paddingVertical:20}}>
   <Text
     style={{
       flex: 1,
       fontSize: 17,
       color: '#000',
       fontWeight:'200',
     }}
     >
     {selectedCategory.Bio}
   </Text>
   </View>
 </View>
 <View
   style={{
     flex: 1,
     width: SCREEN_WIDTH,
     flexDirection: 'row',
     alignItems:'center',
     borderBottomWidth:0,
     paddingTop:0
     }}>
 <Icon
       type='font-awesome'
       name='graduation-cap'
       color='#000'
       size= {20}
       containerStyle={{marginRight:10, width:'15%', height:'100%', justifyContent:'center', padding:10}}/>
   <View style={{width:'70%', paddingVertical:10}}>
   <Text
     style={{
       flex: 1,
       fontSize: 15,
       color: '#000',
       fontWeight:'100',
     }}
     >
     {selectedCategory.College}
   </Text>
   </View>
 </View>
 <View
   style={{
     flex: 1,
     marginTop: 0,
     width: SCREEN_WIDTH,
     flexDirection: 'row',
     alignItems:'center',
     borderBottomWidth:0
     }}>
 <Icon
       type='font-awesome'
       name='map-marker'
       color='#000'
       size= {20}
       containerStyle={{marginRight:10, width:'15%', height:'100%', justifyContent:'center', padding:10}}/>
   <View style={{width:'70%', paddingVertical:10}}>
   <Text
     style={{
       flex: 1,
       fontSize: 15,
       color: '#000',
       fontWeight:'100',
     }}
     >
     {selectedCategory.Hometown}
   </Text>
   </View>
 </View>
 <View
   style={{
     flex: 1,
     width: SCREEN_WIDTH,
     flexDirection: 'row',
     alignItems:'center',
     borderBottomWidth:0,
     paddingTop:0
     }}>
 <Icon
       type='font-awesome'
       name='suitcase'
       color='#000'
       size= {20}
       containerStyle={{marginRight:10, width:'15%', height:'100%', justifyContent:'center', padding:10}}/>
   <View style={{width:'70%', paddingVertical:10}}>
   <Text
     style={{
       flex: 1,
       fontSize: 15,
       color: '#000',
       fontWeight:'100',
     }}
     >
     {selectedCategory.Joined}
   </Text>
   </View>
 </View>
 <View
   style={{
     flex: 1,
     marginTop: 0,
     width: SCREEN_WIDTH,
     flexDirection: 'row',
     alignItems:'center',
     borderBottomWidth:0,
     paddingBottom:15
     }}>
     <Icon
           type='font-awesome' 
           name='paper-plane'
           color='#000'
           size= {20}
           containerStyle={{marginRight:10, width:'15%', height:'100%', justifyContent:'center', padding:10}}/>
   <View style={{width:'70%', paddingVertical:10}}>
   <Text
     style={{
       flex: 1,
       fontSize: 15,
       color: '#000',
       fontWeight:'100',
     }}
     >
     {selectedCategory.Email}
   </Text>
   </View>
 </View>

 <View style={{ paddingLeft:30, marginTop:10}}>
   <Text
     style={{
       flex: 1,
       fontSize: 15,
       color: '#000',
     }}
   >
    CAMPAIGNS
   </Text>
  </View>

  <View style={{ flex: 1, width: SCREEN_WIDTH, marginTop: 20 }}>
    <ScrollView
      style={{ flex: 1 }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          height: 170,
          marginLeft: 15,
          marginRight: 10,
        }}
      >
        <View style={{ flex: 1, flexDirection: 'row'}}>
          <CustomButton title="Maharashtra" selected={true} />
          <CustomButton title="West Bengal" />
          <CustomButton title="Andra Pradesh" />
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <CustomButton title="Tamil Nadu" />
          <CustomButton title="Lok Sabha'19" selected={true} />
          <CustomButton title="Uttar Pradesh" />

        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <CustomButton title="Bihar AE'15" />
          <CustomButton title="Punjab AE'17" />
          <CustomButton title="Lok Sabha'14" />
        </View>
      </View>
    </ScrollView>
  </View>
<View style={{flexDirection:'row',  alignItems:'center',justifyContent:'center', marginVertical:30}}>
<SocialIcon
raised={true}
type='facebook'
underlayColor= 'rgba(213, 100, 140, 1)'
/>
<SocialIcon
raised={true}
type='google'
underlayColor= 'rgba(213, 100, 140, 1)'
/>
<SocialIcon
raised={true}
type='twitter'
/>
<SocialIcon
raised={true}
type='linkedin'
/>
<SocialIcon
raised={true}
type='instagram'
/>
   </View>
 </LinearGradient>
 </ScrollView>

 </View>

  );

}


const styles = StyleSheet.create({
  imageContainer:{
    backgroundColor:'rgba(47,44,60,1)',
    width: '100%',
    height:'25%',
    paddingBottom: 30,
    borderWidth:0
  },
});

export default Profile;
