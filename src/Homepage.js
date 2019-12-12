import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Dimensions,
} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

// import {createAppContainer} from 'react-navigation';
// import {createStackNavigator} from 'react-navigation-stack';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiaGFycnlwZnJ5IiwiYSI6ImNrM3EwYTVmYjA4Mzgzbm1vd2h0NjRobDgifQ.ZrK9wTTyKg6YpwI2KGC9bQ',
);

// import EndPointMap from "./endpointmap";

export default class Homepage extends Component {
  static navigationOptions = ({navigation}) => {
    const test = this.props;
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
      endCoordinates: [-2.2392781722504367, 53.48492529435421],
      markerDropped: false,
    };
  }

  componentDidMount() {
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

  mapPressed = e => {
    console.log(e.geometry.coordinates);
    this.setState({
      endCoordinates: e.geometry.coordinates,
      markerDropped: true,
    });
  };

  render() {
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
              Welcome to Saviar {this.state.username.toUpperCase()},{'\n'} a
              clean route through impure air!{'\n'}
              You have set Your start point to "Manchester Federation house".
              Please, select on the below map were you would like to go
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
                    coordinate={this.state.endCoordinates}
                  />
                )}
              </MapboxGL.MapView>
              <Button
                title="Create Route"
                color="white"
                onPress={() => {
                  this.props.navigation.navigate('Map');
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