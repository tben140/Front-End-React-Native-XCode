import React from 'react';
import {StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, AsyncStorage, Button, Alert} from 'react-native';
import postUser from './Api.js';
import Login from './LoginPage';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';


const login = createStackNavigator({
    home:{
      screen: Login
    }
    
  },
  {
    navigationOptions:{
      header:false,
    }
  }
  );

 const LogInpage = createAppContainer(login);




export default class SignUpPage extends React.Component{
    

   

 

       state = {
       userName: '',
       email:'',
       passWord: '',
       currentLocation:'53.4860211, -2.2397307'
       }

       //goes to login page

       goToLogIn = () => {

        

        return LogInpage;

    }

    //if the user is already in the data base, User is alerted. If registration is successful then User is taken to login page.

       signUp = () => {
        const {userName, email, passWord, currentLocation} = this.state;
        
        postUser(userName, email, passWord, currentLocation).then(()=>
          {  if(res === 'Username already found'){

            return (
                <Alert>Please type in a unique username :)</Alert>

            )
              
            }
            else {
                this.goToLogIn;
            }
        }
        )
       }
   



   
     


    render() {
        const {userName, email, passWord, currentLocation} = this.state

        return (
            <KeyboardAvoidingView behavior='padding' style = {styles.wrapper}>
                <View style = {styles.container}>
                    <Text styles= {styles.footer}/>

                        <TextInput style = {styles.TextInput} placeholder= 'username'
                        onChangeText = {(userName) => this.setState({userName})}/>


                        <TextInput style = {styles.TextInput} placeholder= 'email'
                        onChangeText = {(email) => this.setState({email})}/>



                        <TextInput
                        style = {styles.TextInput} placeholder= 'password'
                        onChangeText = {(passWord) => this.setState({passWord})}

                        />

                   <TouchableOpacity 

                   styles={styles.btn}
                   onPress={this.signUp(userName, email, passWord, currentLocation)}>

                       <Text>Sign Up</Text>

                   </TouchableOpacity>



                    <TouchableOpacity 


                   styles={styles.btn}
                   onPress={this.goToLogIn}
                   >
                     <Text>Log in</Text>

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


