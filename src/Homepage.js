import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Dimensions,
  Alert,
} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

// import {createAppContainer} from 'react-navigation';
// import {createStackNavigator} from 'react-navigation-stack';

import Geolocation from 'react-native-geolocation-service';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiaGFycnlwZnJ5IiwiYSI6ImNrM3EwYTVmYjA4Mzgzbm1vd2h0NjRobDgifQ.ZrK9wTTyKg6YpwI2KGC9bQ',
);

// import EndPointMap from "./endpointmap";

export default class Homepage extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerRight: () => (
        <Button
          color="white"
          title="Log in"
          onPress={navigation.getParam('LoginPage')}
        />
      ),
      headerStyle: {
        backgroundColor: '#2196F3',
        color: 'white',
      },
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      user: {},
      username: '',
      location: '',
      latitudeDelta: 0.0022,
      longitudeDelta: 0.0121,
      latitude: 0,
      longitude: 0,
      defaultCenter: {
        lat: 53.479915,
        lng: -2.236825,
      },
      zoom: 14,
      markerDropped: false,
      startCoordinates: [],
      endCoordinates: [],
    };
  }

  componentDidMount() {
    this.findCoordinates();
    this.props.navigation.setParams({
      LoginPage: () => this.props.navigation.navigate('LoginPage'),
    });
    return fetch('https://project-bhilt.appspot.com/api/users')
      .then(response => response.json())
      .then(responseJson => {
        const singleUser = responseJson.users.filter(user => {
          return user.username == 'ben';
        });
        const location = singleUser[0].current_location.split(', ');
        const latitude = Number(location[0]);
        const longitude = Number(location[1]);
        this.setState({
          isLoading: false,
          user: singleUser,
          username: singleUser[0].username,
          location: singleUser[0].current_location,
          latitude: latitude,
          longitude: longitude,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  findCoordinates = () => {
    // console.log('Find coordinates running');
    Geolocation.getCurrentPosition(
      location => {
        console.log(location.coords.latitude, location.coords.longitude);
        this.setState({
          startCoordinates: [
            location.coords.latitude,
            location.coords.longitude,
          ],
        });
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  mapPressed = e => {
    // console.log(e.geometry.coordinates);
    this.setState({
      endCoordinates: [e.geometry.coordinates[1], e.geometry.coordinates[0]],
      markerDropped: true,
    });
  };

  render() {
    // {
    //   this.state.startCoordinates === null && this.findCoordinates();
    // }
    const username = this.props.navigation.getParam('username');
    // console.log('PROPS =>', this.props.navigation.getParam('username'));
    if (this.state.isLoading) {
      return (
        <View>
          <Text style={styles.loading}>Loading...</Text>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.header}>
            <Text style={styles.boldText}> Savior</Text>
          </View>
          <View style={styles.welcome}>
            <Text style={styles.welcomeText}>
              <Text>
                Welcome to Saviar
                {username ? (
                  <Text> {username}</Text>
                ) : (
                  <Text> - Please log in</Text>
                )}
              </Text>
              {/* Welcome to Saviar {this.state.username.toUpperCase()},{'\n'} a
              clean route through impure air!{'\n'}
              You have set Your start point to "Manchester Federation house".
              Please, select on the below map were you would like to go */}
            </Text>
          </View>
          <View style={styles.welcome}></View>
          <View style={styles.page}>
            <View style={styles.container}>
              <MapboxGL.MapView onPress={this.mapPressed} style={styles.map}>
                <MapboxGL.UserLocation visible={true} />
                <MapboxGL.Camera
                  defaultSettings={{
                    centerCoordinate: [
                      this.state.defaultCenter.lng,
                      this.state.defaultCenter.lat,
                    ],
                    zoomLevel: this.state.zoom,
                  }}
                />
                {this.state.markerDropped && (
                  <MapboxGL.PointAnnotation
                    id={'1'}
                    coordinate={[
                      this.state.endCoordinates[1],
                      this.state.endCoordinates[0],
                    ]}
                  />
                )}
              </MapboxGL.MapView>
              <Button
                title="Create Route"
                color="white"
                onPress={() => {
                  if (!this.state.markerDropped) {
                    Alert.alert('Please drop pin');
                  } else {
                    this.props.navigation.navigate('Map', {
                      endCoordinates: this.state.endCoordinates,
                      startCoordinates: this.state.startCoordinates,
                    });
                  }
                }}
              />
            </View>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  // header: {
  //   fontWeight: "bold",
  //   color: "#000"
  // },
  boldText: {
    fontFamily: 'Lobster-Regular',
    // fontWeight: 'bold',
    fontSize: 46,
    alignSelf: 'center',
    color: '#24416b',
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 100,
    fontSize: 40,
    fontWeight: 'bold',
  },
  welcomeText: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
    paddingLeft: 20,
    color: '#24354f',
  },
  map: {
    flex: 1,
    height: 100,
    width: Dimensions.get('window').width,
    padding: 0,
  },

  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 0,
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#2196F3',
    padding: 0,
  },
});

const mapStyle = StyleSheet.create({
  annotationContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  annotationFill: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'green',
    transform: [{scale: 0.6}],
  },
});
