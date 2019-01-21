import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Router, Scene, Actions, Tabs, Stack, Drawer } from 'react-native-router-flux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './screens/Home';
import OrderHistory from './screens/OrderHistory';
import MyCenter from './screens/MyCenter';
 
const scenes = Actions.create(
  <Scene key="root" hideNavBar>
  <Tabs>
    <Scene 
      key="home" 
      initial 
      component={Home} 
      title="Home" 
      icon={Ionicons} 
      name="ios-home" 
      size={26}
      />

    <Scene 
      key="orderHistory" 
      component={OrderHistory} 
      title="OrderHistory"
      icon={Ionicons} 
      name="ios-list-box" 
      size={26}/>

    <Scene 
      key="myCenter" 
      component={MyCenter} 
      title="OrderHistory"
      icon={Ionicons} 
      name="md-person" 
      size={26}/>
  </Tabs>

  </Scene>
)

export default class App extends React.Component {



  render() {
    return (
        <Router scenes={scenes}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
