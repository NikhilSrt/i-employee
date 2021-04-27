import React, { useState, useEffect, useCallback } from 'react';

import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    LayoutAnimation,
    UIManager,
    KeyboardAvoidingView,
    Image, 
    Platform,
    Alert,
    TouchableOpacity,
    ScrollView
  } from 'react-native';

import { Input, Button, Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import * as Facebook from 'expo-facebook'
import * as firebase from 'firebase';
import * as Google from 'expo-google-app-auth';

import * as authActions from '../store/actions/auth';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;


// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

const Login = (props) => {

  const [selectedCategory, setselectedCategory] = useState(0)
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [passwordConfirmation, setpasswordConfirmation] = useState('')
  const [isLoading, setisLoading] = useState(false)
  const [isEmailValid, setisEmailValid] = useState(true)
  const [isPasswordValid, setisPasswordValid] = useState(true)
  const [isConfirmationValid, setisConfirmationValid] = useState(true)
  const [error, seterror] = useState()

  const [method, setmethod] = useState('')
  const [Token, setToken] = useState(null)
  const token = useSelector(state => state.auth.token);

  const dispatch = useDispatch();
  
  
  const selectCategory = (Category)  => {
      LayoutAnimation.easeInEaseOut()
      setselectedCategory(Category)
  }
  
  const emailSetter = enteredValue => {
      setemail(enteredValue)
  }

  const passwordSetter = enteredValue => {
    setpassword(enteredValue)
}

  const passwordConfirmer = enteredValue => {
    setpasswordConfirmation(enteredValue)
}

const isLoginPage = selectedCategory === 0;
const isSignUpPage = selectedCategory === 1;

  const TabSelector = ({ selected }) => {
    return (
      <View style={styles.selectorContainer}>
        <View style={selected && styles.selected} />
      </View>
    );
  };

  TabSelector.propTypes = {
    selected: PropTypes.bool.isRequired,
  };

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
      console.log(error)
    }
  }, [error]);

  useEffect(() => { 
    if(Token != null || token != null) {
      props.navigation.navigate('Main')
}})

  const validateEmail = (email)  => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const login = useCallback((email, password) => {
   setisLoading(true);
   // Simulate an API call
   setTimeout(async () => {
    LayoutAnimation.easeInEaseOut();
    setisLoading(false);
    seterror(null);
    setisEmailValid(validateEmail(email) );
    setisPasswordValid(password.length >= 8 );
    if (isEmailValid && isPasswordValid) {
      try {
        await dispatch(authActions.login(email, password));
      } catch (err) {
        seterror(err.message);
    }
    }
  }, 1500);
  },[email, password ])

  const signUp = useCallback((email, password) => {
    // Simulate an API call
    setTimeout( async() => {
     LayoutAnimation.easeInEaseOut();
     setisLoading(false);
     setisEmailValid(validateEmail(email) );
     setisPasswordValid(password.length >= 8);
     setisConfirmationValid(password === passwordConfirmation )
     if (isEmailValid && isPasswordValid && isConfirmationValid) {
      try {
        await dispatch(authActions.signup(email, password));
      } catch (err) {
        seterror(err.message);
    }
  }
   }, 1500);
   }, [password, email])

  const signInWithFacebook = useCallback(async () => {
    try {
      await Facebook.initializeAsync('3055411754781219', 'i-employee');
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
        setToken(token)
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
      console.log(message)
    }
  },[Facebook, firebase])

  const signInWithGoogle = useCallback(async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: '180627563564-oak7800ludtsdfr98jsmo1i5dn5k8th1.apps.googleusercontent.com',
        iosClientId: '180627563564-g0uhb9jdlrcdtok92jli0qbo6q51bmdf.apps.googleusercontent.com',
        behavior: 'web',
        scopes: ['profile', 'email']
      });
      console.log(result)
      
      if (result.type  === 'success') {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken);
        Alert.alert('Logged in!', `Hi ${result.user.name}!`);
        setToken(result.idToken)
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }
  },[] )


return (
  
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.container}>
            <KeyboardAvoidingView
              contentContainerStyle={styles.loginContainer}
              behavior={Platform.OS == "ios" ? "padding" : "height"}>
              <View style={styles.imageContainer}>
                    <Image
                      resizeMode='contain'
                      style= {{flex:1, width:'80%'}}
                      source={require('../assets/images/logo.png')} />
                  </View>
                  <View style={styles.introContainer}>
                    <Text style={styles.introText}>
                      Welcome to 
                    </Text>
                    <Text style={styles.titleText}>
                      i-employee
                    </Text>
                  </View>

     
                    <TouchableOpacity
                      style={styles.loginButton}
                      onPress={() => signInWithFacebook()}>
                      <View style={styles.fbbutton}>
                        <Text
                          style={{
                            letterSpacing: 0.5,
                            fontSize: 16,
                            color: '#FFFFFF'
                          }}>
                          Continue with Facebook
                        </Text>
                      </View>
                    </TouchableOpacity>

                   <TouchableOpacity
                      style={styles.loginButton}
                      onPress={() => signInWithGoogle()}>
                       <View style={styles.googleButton}>
                        <Text
                          style={{
                            letterSpacing: 0.5,
                            fontSize: 16,
                            color: "#000"
                          }}>
                          Continue with Google
                        </Text>
                      </View>
                  </TouchableOpacity>


                    <View>
                        <View style={{ flexDirection: 'row'}}>
                          <Button
                            disabled={isLoading}
                            type="clear"
                            activeOpacity={0.7}
                            onPress={selectCategory.bind(this, 0)}
                            containerStyle={{ flex: 1 }}
                            titleStyle={[
                              styles.categoryText,
                              isLoginPage && styles.selectedCategoryText,
                            ]}
                            title={'Login'}
                          />
                          <Button
                            disabled={isLoading}
                            type="clear"
                            activeOpacity={0.7}
                            onPress={selectCategory.bind(this, 1)}
                            containerStyle={{ flex: 1 }}
                            titleStyle={[
                              styles.categoryText,
                              isSignUpPage && styles.selectedCategoryText,
                            ]}
                            title={'Sign up'}
                          />
                        </View>


                      <View style={styles.rowSelector}>
                        <TabSelector selected={isLoginPage} />
                        <TabSelector selected={isSignUpPage} />
                      </View>
          
                        <View style={styles.formContainer}>
                        <Input
                          leftIcon={
                            <Icon
                              name="envelope-o"
                              type="font-awesome"
                              color="rgba(0, 0, 0, 0.38)"
                              size={25}
                              style={{ backgroundColor: 'transparent' }}
                            />
                          }
                          value={email}
                          keyboardAppearance="light"
                          autoFocus={false}
                          autoCapitalize="none"
                          autoCorrect={false}
                          keyboardType="email-address"
                          returnKeyType="next"
                          inputStyle={{ marginLeft: 10 }}
                          placeholder={'Email'}
                          containerStyle={{
                            borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                          }}
                          onChangeText={emailSetter}
                          errorMessage={
                            isEmailValid ? null : 'Please enter a valid email address'
                          }
                        />
                        <Input
                          leftIcon={
                            <Icon
                              name="lock"
                              type="simple-line-icon"
                              color="rgba(0, 0, 0, 0.38)"
                              size={25}
                              style={{ backgroundColor: 'transparent' }}
                            />
                          }
                          value={password}
                          keyboardAppearance="light"
                          autoCapitalize="none"
                          autoCorrect={false}
                          secureTextEntry={true}
                          returnKeyType={isSignUpPage ? 'next' : 'done'}
                          blurOnSubmit={true}
                          containerStyle={{
                            marginTop: SCREEN_HEIGHT/50,
                            borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                          }}
                          inputStyle={{ marginLeft: 10 }}
                          placeholder={'Password'}
                          onChangeText={passwordSetter}
                          onSubmitEditing={() =>
                            isSignUpPage ? this.confirmationInput.focus() : login.bind(this, email)
                          }
                          errorMessage={
                            isPasswordValid
                              ? null
                              : 'Please enter at least 8 characters'
                          }
                        />
                        {isSignUpPage && (
                          <Input
                            icon={
                              <Icon
                                name="lock"
                                type="simple-line-icon"
                                color="rgba(0, 0, 0, 0.38)"
                                size={25}
                                style={{ backgroundColor: 'transparent' }}
                              />
                            }
                            value={passwordConfirmation}
                            secureTextEntry={true}
                            keyboardAppearance="light"
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="default"
                            returnKeyType={'done'}
                            blurOnSubmit={true}
                            containerStyle={{
                              marginTop: SCREEN_HEIGHT/50,
                              borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                            }}
                            inputStyle={{ marginLeft: 10 }}
                            placeholder={'Confirm password'}
                            onChangeText={passwordConfirmer}
                            onSubmitEditing={signUp.bind(this, email, password)}
                            errorMessage={
                              isConfirmationValid
                                ? null
                                : 'Please enter the same password'
                            }
                          />
                        )}
                        <Button
                          buttonStyle={styles.loginButton}
                          containerStyle={{ marginTop: SCREEN_HEIGHT/20, flex: 0 }}
                          activeOpacity={0.8}
                          title={isLoginPage ? 'LOGIN' : 'SIGN UP'}
                          titleStyle={styles.loginTextButton}
                          onPress={isLoginPage ? login.bind(this, email, password) : signUp.bind(this, email, password)}
                          loading={isLoading}
                          disabled={isLoading}
                        />
                      </View>
                    </View>
 
            
            {isLoginPage  && (
            <View style={styles.ForgotPasswordContainer}>
              <Button
                title={'Forgot Password?'}
                titleStyle={{ color: 'white' }}
                buttonStyle={{ backgroundColor: 'transparent' }}
                underlayColor="transparent"
                onPress={() => console.log('Account created')}
              />
            </View>
            )}
   </KeyboardAvoidingView>
   </ScrollView>
    
)}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: 'rgba(47,44,60,1)',
    justifyContent:'center',
    paddingVertical: '15%',
  },
  imageContainer: {
    width: SCREEN_WIDTH,
    height: '15%',
    alignItems:'center',
    marginTop: SCREEN_HEIGHT/100,
    marginLeft: 10,
  },
  introContainer:{
    alignItems: 'center',
    marginTop: SCREEN_HEIGHT/100,
  },
  introText: {
    color: 'white',
    fontSize: 20,
  },
  titleText: {
    color: 'white',
    fontSize: Platform.select({ios:35, android:30}),
  },
  loginContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    backgroundColor: 'transparent',
    opacity: 0.54,
  },
  selectedCategoryText: {
    opacity: 1,
  },
  rowSelector: {
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectorContainer: {
    flex: 1,
    alignItems: 'center',
  },
  selected: {
    position: 'absolute',
    borderRadius: 50,
    height: 0,
    width: 0,
    top: -5,
    borderRightWidth: 70,
    borderBottomWidth: 70,
    borderColor: 'white',
    backgroundColor: 'white',
  },
  selectorContainer: {
    flex: 1,
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingTop: SCREEN_HEIGHT/20,
    paddingBottom: SCREEN_HEIGHT/20,
    alignItems: 'center',
    marginHorizontal:'5%',
    paddingHorizontal:'3%'
  },
  loginButton: {
    borderRadius: 10,
    height: 50,
    width: 200,
  },
  loginTextButton: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ForgotPasswordContainer: { 
    alignItems: 'center',
    justifyContent: 'center',
  },
  fbbutton: {
    backgroundColor: '#3A559F',
    height: 44,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22
  },
  googleButton: {
    backgroundColor: "#FFFFFF",
    height: 44,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#707070"
  },
  container: {
    flexGrow: 1,
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: '#293046',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    marginVertical:'2.5%',
    marginHorizontal:'10%'
  }
})

export default Login; 