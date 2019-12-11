import React from 'react';
import {StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, AsyncStorage, Button, Alert} from 'react-native';
import axios from 'axios';








export default class SignUpPage extends React.Component{
    

     postUser = async (userName, email, passWord, currentLocation) => {

        const url = 'https://project-bhilt.appspot.com/api';
       

        
        const end_location = {
            lat: 0,
             long: 0};
    
       
            const { status} = await axios.post(`${url}/users`, {
                username: userName,
                email: email,
                password: passWord,
                current_location: currentLocation,
                end_location:end_location
             }
            )
            

           return status
       
            }
    

   

 

       state = {
       userName: '',
       email:'',
       passWord: '',
       currentLocation:'53.4860211, -2.2397307'
       }



       signUp = () => {
           
        const {userName, email, passWord, currentLocation} = this.state;
        
        
        this.postUser(userName, email, passWord, currentLocation).then((res)=>
          { 
          
            
               if(res === 201){
                Alert.alert("You are now a new user, please go back to log in :)")       
              
            }
            
        }
        ).catch(err=> {Alert.alert(err)})
       }
   



   
     


    render() {
        const {userName, email, passWord, currentLocation} = this.state
       

        return (
            <KeyboardAvoidingView behavior='padding' style = {styles.wrapper}>

                <View style = {styles.container}>


                    <Text styles= {styles.header}/>

                        <TextInput style = {styles.TextInput} placeholder= 'username'
                        onChangeText = {(userName) => this.setState({userName})}/>


                        <TextInput style = {styles.TextInput} placeholder= 'email'
                        onChangeText = {(email) => this.setState({email})}/>



                        <TextInput
                        style = {styles.TextInput} placeholder= 'password'
                        onChangeText = {(passWord) => this.setState({passWord})}

                        />

                        <Button style = {styles.btn}
                                title="Sign Up"
                                onPress={() => this.signUp(userName, email, passWord, currentLocation)}>
                     </Button>

              


                    <Button
                                style = {styles.btn}
                                title="Log in"
                                onPress={() => this.props.navigation.navigate('Home')}>
                     </Button>

                   
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




