import React, {Component} from 'react'

import {
  StyleSheet,
  Platform,
  PermissionsAndroid,
  ImageBackground,
} from 'react-native'

import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import Homepage from './src/components/Homepage'
import Map from './src/components/Map'
import LoginPage from './src/components/LoginPage'
import MyAccount from './src/components/account'
import SignUpPage from './src/components/SignUpPage'

const appStackNavigator = createStackNavigator(
  {Homepage, Map, LoginPage, MyAccount, SignUpPage},
  {initialRouteName: 'Homepage'},
)

const Application = createAppContainer(appStackNavigator)

class App extends Component {
  state = {
    latitude: null,
    longitude: null,
    endCoordinates: [],
  }

  componentDidMount() {
    if (Platform.OS !== 'ios') {
      async function requestLocationPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message: 'Running App needs access to your camera ',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Location Permission Granted')
          } else {
            console.log('Location permission denied')
          }
        } catch (err) {
          console.warn(err)
        }
      }
      requestLocationPermission()
    }
  }

  render() {
    return (
      // <ImageBackground
      //   source={require('./src/assets/pics/running.jpeg')}
      //   style={styles.imgBackground}
      //   resizeMode="cover"
      //   imageStyle={{opacity: 0.2}}>
      <Application />
      // </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  imgBackground: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
})

export default App
