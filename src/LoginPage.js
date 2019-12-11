import React from 'react';
import {StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, AsyncStorage, Button} from 'react-native';
import getUser from './Api.js';








export default class Login extends React.Component{


  
       state = {
       userName: '',
       passWord: ''
       }
   


        //sends user/password to api function and then goes to homepage
    

   

   


    render() {
        const {userName, passWord} = this.state
        return (
            <KeyboardAvoidingView behavior='padding' style = {styles.wrapper}>

                <View style = {styles.container}>

                    <Text styles= {styles.header}/>

                        <TextInput style = {styles.TextInput} placeholder= 'username'
                        onChangeText = {(userName) => this.setState({userName})}/>



                        <TextInput
                        style = {styles.TextInput} placeholder= 'password'
                        onChangeText = {(passWord) => this.setState({passWord})}

                        />

                    <Button
                                style = {styles.button}
                                title="Log in"
                                onPress={() => {
        
        
                                    const {userName, passWord} = this.state;
                                    
                                    getUser(userName, passWord).then((res)=>{
                                        console.log(res)
                                        
                                        if(res){
                            
                                            return this.props.navigation.navigate('HomePage');
                                         }
                                        
                                    }
                                      
                            
                                    )    
                            
                                }}>
                     </Button>


                    <Button 
                                style = {styles.button}
                                title="Sign Up"
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






