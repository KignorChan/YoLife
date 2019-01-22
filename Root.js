import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { Router, Scene, Actions, Tabs, Stack, Drawer } from 'react-native-router-flux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import DeviceSetting from './utils/DeviceSetting';

import Home from './screens/Home';
import OrderHistory from './screens/OrderHistory';
import MyCenter from './screens/MyCenter';
import Setting from './screens/Setting';
import LanguagesSetting from './screens/LanguagesSetting';

export default class Root extends React.Component {

  _renderScenes(){
    return (
      <Scene key="root" hideNavBar>
        <Tabs>
          <Scene 
            key="home" 
            initial 
            component={Home} 
            title={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.home}
            icon={Ionicons} 
            name="ios-home" 
            size={26}
            hideNavBar/>
      
          <Scene 
            key="orderHistory" 
            component={OrderHistory} 
            title={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.myOrder}
            icon={Ionicons} 
            name="ios-list-box" 
            size={26}
            hideNavBar/>
      
          <Scene 
            key="myCenter" 
            component={MyCenter} 
            title={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.me}
            icon={Ionicons} 
            name="md-person" 
            size={26}
            hideNavBar/>
        </Tabs>

      
          <Scene 
            key="setting"
            component={Setting}
            title={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.setting}
            hideNavBar={false}/>
            
          <Scene 
            key="languagessetting"
            component={LanguagesSetting}
            title={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.language}
            hideNavBar={false}/> 
        

      
      </Scene>
    );
  }

  render() {




    return (
        <Router>
          {this._renderScenes()}
        </Router>
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
