import React from 'react'

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native'

import getUser from '../api/api.js'

import LogoTitle from './LogoTitle'

export default class Login extends React.Component {
  state = {
    username: '',
    password: '',
  }

  static navigationOptions = {
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#2196F3',
      color: 'white',
    },
  }
  //sends user/password to api function and then goes to homepage

  render() {
    const {username, password} = this.state
    return (
      // <ImageBackground
      //   source={require('../assets/pics/running.jpeg')}
      //   style={styles.imgBackground}
      //   resizeMode="cover"
      //   imageStyle={{opacity: 0.2}}>
      <View style={styles.container}>
        {/* <Text style={styles.header} /> */}

        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          placeholderTextColor="white"
          onChangeText={username => this.setState({username})}
        />

        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="white"
          onChangeText={password => this.setState({password})}
        />
        <View style={styles.loginButton}>
          <TouchableOpacity
            style={styles.button}
            color="#11A0E2"
            title="Log in"
            onPress={() => {
              const {username, password} = this.state

              getUser(username, password)
                .then(res => {
                  console.log(res)

                  //   if (res) {
                  this.props.navigation.navigate('Homepage', {
                    username,
                    password,
                  })

                  //   } else {
                  //     Alert.alert('Username not found. Please sign up');
                  //   }
                })
                .catch(err => {
                  Alert.alert(err)
                })
            }}>
            <Text style={styles.textbutton}>Sign in</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.loginButton}>
          <TouchableOpacity
            style={styles.button}
            title="Sign Up"
            color="#11A0E2"
            onPress={() => this.props.navigation.navigate('SignUpPage')}>
            <Text style={styles.textbutton}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
      // </ImageBackground>
    )
  }
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 55,
    paddingRight: 55,
    // backgroundColor: '#DFE8FF',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 60,
  },
  TextInput: {
    fontSize: 17,
    marginBottom: 20,
    // padding: 10,
    textAlignVertical: 'top',
    alignSelf: 'stretch',
    color: 'white',
    backgroundColor: '#A4A4A4',
    opacity: 0.8,
    borderColor: '#11A0E2',
    borderWidth: 2,
    // height: 65,
    width: 300,
    borderRadius: 7,
  },

  loginButton: {
    // alignSelf: 'stretch',
    padding: 10,
    color: 'white',
  },
  singinButton: {padding: 10},
  imgBackground: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  button: {
    width: 100,
    height: 60,
    backgroundColor: '#11A0E2',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    shadowColor: 'white',
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 1,
    shadowRadius: 50,
    elevation: 20,
  },
  textbutton: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
})
