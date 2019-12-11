/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from './src/LoginPage';


const Applicate = createStackNavigator({
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

const Application = createAppContainer(Applicate);

export default class App extends React.Component{
  render()
    { return(<Application/>)
    }
  }



export default App;
