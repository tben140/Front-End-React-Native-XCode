import React from 'react';
import {StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, AsyncStorage, Button} from 'react-native';
import { getSupportedVideoFormats } from 'expo/build/AR';
import getUser from './Api.js';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SignUpPage from './SignUpPage.js';





const signup = createStackNavigator({
    signuppage:{
      screen: SignUpPage
    }
    
  },
  {
    navigationOptions:{
      header:false,
    }
  }
  );

 const SignUppage = createAppContainer(signup);


export default class Login extends React.Component{



 

       state = {
       userName: '',
       passWord: ''
       }
   


        //sends user/password to api function and then goes to homepage
    

    login = () => {
        
        
        const {userName, passWord} = this.state;
        
        getUser(userName, passWord).then((res)=>{
            
            if(res.success){

                return goToHomePage(res[0].username)
          
             }
            
        }
          

        )    

    }

   
      //goes to sign up page

    goToSignUp = () => {

        

        return SignUppage;

    }


    render() {
        const {userName, passWord} = this.state
        return (
            <KeyboardAvoidingView behavior='padding' style = {styles.wrapper}>
                <View style = {styles.container}>
                    <Text styles= {styles.footer}/>

                        <TextInput style = {styles.TextInput} placeholder= 'username'
                        onChangeText = {(userName) => this.setState({userName})}/>



                        <TextInput
                        style = {styles.TextInput} placeholder= 'password'
                        onChangeText = {(passWord) => this.setState({passWord})}
                        />

                   <TouchableOpacity 
                   styles={styles.btn}
                   onPress={this.login(userName,passWord)}
                   ><Text>Log in</Text></TouchableOpacity>

<TouchableOpacity 
                   styles={styles.btn}
                   onPress={this.goToSignUp}
                   ><Text>Sign up</Text>
                   </TouchableOpacity>
                      

                   
                </View>

            </KeyboardAvoidingView>
        )
    }

    

}
const styles = StyleSheet.create({

    wrapper:{
        flex:1,
    },
    container:{
        flex:1,
        alignItems :'center',
        justifyContent: 'center',
        paddingLeft:40,
        paddingRight: 40,




        
    },
    header:{
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 60,



    },
    TextInput:{
        marginBottom: 20,
        padding: 20,
        alignSelf: 'stretch'
    },

    Button:{
        alignSelf:'stretch'
    }





})




