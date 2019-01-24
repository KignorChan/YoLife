import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { Router, Scene, Actions, Tabs, Stack, Drawer } from 'react-native-router-flux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import DeviceSetting from './utils/DeviceSetting';

import Home from './screens/Home';
import OrderHistory from './screens/OrderHistory';
import MyCenter from './screens/MyCenter';
import Setting from './screens/Setting';
import Login from './screens/login/login'
import Register from './screens/login/regis';
import LanguagesSetting from './screens/LanguagesSetting';



export default class Root extends React.Component {

  icon = (result)=>{
    console.log(JSON.stringify(result));
    return (
      <Ionicons name='ios-home'/>
    )
  }

  _renderScenes(){
    return (
      <Scene key="root" hideNavBar>
        <Tabs>
          <Scene 
            key="home" 
            initial 
            component={Home} 
            title={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.home}
            icon={({focused})=>{
              if(focused){
                return(<MaterialCommunityIcons name='home' size={30} />)
              }else{
                return (<MaterialCommunityIcons name='home-outline' size={30} />)
              }
            }} 
            hideNavBar/>
      
          <Scene 
            key="orderHistory" 
            component={OrderHistory} 
            title={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.myOrder}
            icon={({focused})=>{
              if(focused){
                return(<Ionicons name='ios-list-box' size={30} />)
              }else{
                return (<Ionicons name='ios-list' size={30} />)
              }
            }} 
            hideNavBar/>
      
          <Scene 
            key="myCenter" 
            component={MyCenter} 
            title={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.me}
            icon={({focused})=>{
              if(focused){
                return(<MaterialIcons name='person' size={30} />)
              }else{
                return (<MaterialIcons name='person-outline' size={30} />)
              }
            }} 
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
        
        <Scene 
            key="login"
            component={Login}
            title={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.login}
            hideNavBar={false}/>
        
        <Scene 
            key="register"
            component={Register}
            title={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.register}
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
