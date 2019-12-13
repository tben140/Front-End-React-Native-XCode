import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  AsyncStorage,
  Button,
  Alert,
  // ImageBackground,
} from 'react-native';
import axios from 'axios';
import LogoTitle from './LogoTitle';

export default class SignUpPage extends React.Component {
  postUser = async (username, email, password, currentLocation) => {
    const url = 'https://project-bhilt.appspot.com/api';

    const end_location = {
      lat: 0,
      long: 0,
    };

    const {data} = await axios.post(`${url}/users`, {
      username: username,
      email: email,
      password: password,
      current_location: currentLocation,
      end_location: end_location,
    });
    return data;
  };

  state = {
    username: '',
    email: '',
    password: '',
    currentlocation: '53.4860211, -2.2397307',
  };

  static navigationOptions = {
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#2196F3',
      color: 'white',
    },
  };

  signUp = () => {
    const {username, email, password, currentLocation} = this.state;

    this.postUser(username, email, password, currentLocation)
      .then(res => {
        Alert.alert('Account created');
        this.props.navigation.navigate('Homepage');
      })
      .catch(error => {
        Alert.alert('User already exist');
      });
  };

  render() {
    const {username, email, password, currentLocation} = this.state;

    return (
      // <ImageBackground
      //   source={require('../assets/pics/running.jpeg')}
      //   style={styles.imgBackground}
      //   resizeMode="cover"
      //   imageStyle={{opacity: 0.2}}>
      <View behavior="padding" style={styles.wrapper}>
        <View style={styles.container}>
          <Text styles={styles.header} />

          <TextInput
            style={styles.TextInput}
            placeholder="username"
            onChangeText={username => this.setState({username})}
          />

          <TextInput
            style={styles.TextInput}
            placeholder="email"
            onChangeText={email => this.setState({email})}
          />

          <TextInput
            style={styles.TextInput}
            placeholder="password"
            onChangeText={password => this.setState({password})}
          />
          <View style={styles.loginButton}>
            <TouchableOpacity
              style={styles.button}
              color="#11A0E2"
              title="Log in"
              onPress={() =>
                this.signUp(username, email, password, currentLocation)
              }>
              <Text style={styles.textbutton}>Create Account</Text>
            </TouchableOpacity>
          </View>

          {/* <Button
            style={styles.btn}
            title="Log in"
            onPress={() => this.props.navigation.navigate('Home')}></Button> */}
        </View>
      </View>
      // </ImageBackground>
    );
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
    marginBottom: 20,
    padding: 20,
    alignSelf: 'stretch',
    color: 'white',
    backgroundColor: '#A4A4A4',
    opacity: 0.8,
    borderColor: 'blue',
    borderWidth: 1,
    height: 55,
    width: 300,
    borderRadius: 7,
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
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginButton: {
    // alignSelf: 'stretch',
    padding: 10,
    color: 'white',
  },
});
