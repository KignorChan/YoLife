import React from 'react';
import { StyleSheet, Text, View, Platform, Dimensions } from 'react-native';
import { Router, Scene, Actions, Tabs, Stack, Drawer } from 'react-native-router-flux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Constants, Location, Permissions } from 'expo';

import { connect } from 'react-redux';
import { saveLocation } from './redux/actions/user';

import DeviceSetting from './utils/DeviceSetting';

import Home from './screens/Home';
import OrderHistory from './screens/order/OrderHistory';
import MyCenter from './screens/MyCenter';
import Setting from './screens/Setting';
import Login from './screens/Login'
import Register from './screens/Register';
import LanguagesSetting from './screens/LanguagesSetting';
import ContactUs from './screens/ContactUs';
import Profile from './screens/Profile';
import LocationSetting from './screens/LocationSetting';
import AddBusinesses from './screens/AddBusinesses';
import Feedback from './screens/Feedback';
import RegistMoreInfo from './screens/RegistMoreInfo';
import AddressInputView from './screens/AddressInputView';
import SignupSuccessScreen from './screens/SignupSuccessScreen';
import EmailVerification from './screens/EmailVerification';



const { width, height } = Dimensions.get('window');

const TABBAR_HEIGHT = height*0.08;

class Root extends React.Component {

  icon = (result)=>{
    console.log(JSON.stringify(result));
    return (
      <Ionicons name='ios-home'/>
    )
  }

  componentDidMount(){
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
      errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      // setInterval(()=>
      // {
      //   this._getLocationAsync()
      // } 
      // ,30000);
      this._getLocationAsync()
    }
  }

  async _getLocationAsync(){
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
    this.props.saveLocation(location);
  };


  _renderScenes(){
    return (
      <Scene key="root" hideNavBar>
        <Scene key="tabs" hideNavBar initial>
          <Tabs tabBarStyle={{height:TABBAR_HEIGHT}} swipeEnabled={true} >
            <Scene 
              key="home" 
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
        </Scene>

      
        <Scene 
          key="setting"
          component={Setting}
          title={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.setting}
          hideNavBar={true}/>
          
        <Scene 
          key="languagessetting"
          component={LanguagesSetting}
          title={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.language}
          hideNavBar={false}/> 

        <Scene 
          key="contactus"
          component={ContactUs}
          title={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.contactUs}
          hideNavBar={false}/> 
        
        <Scene 
            key="login"
            component={Login}
            title={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.login}
            hideNavBar={true}/>
        
        <Scene 
            key="register"
            component={Register}
            title={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.register}
            hideNavBar={false}/>

        <Scene 
            key="profile"
            component={Profile}
            title={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.profile}
            hideNavBar={true}/>

        <Scene 
            key="locationsetting"
            component={LocationSetting}
            title={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.locationSetting}
            hideNavBar={false}/>

        <Scene 
            key="addbusinesses"
            component={AddBusinesses}
            title={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.newBusiness}
            hideNavBar={false}/>

        <Scene 
            key="feedback"
            component={Feedback}
            title={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.feedback}
            hideNavBar={false}/>

        <Scene 
            key="registmoreinfo"
            component={RegistMoreInfo}
            title={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.moreInfo}
            hideNavBar={false}
            />

        <Scene 
            key="addressinputview"
            component={AddressInputView}
            title={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.address}
            hideNavBar={true} />

        <Scene 
            key="signupsuccessscreen"
            component={SignupSuccessScreen}
            title={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.welcome}
            hideNavBar={true} />

        <Scene 
            key="emailverification"
            component={EmailVerification}
            title={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.emailVerification}
            hideNavBar={true} />

      
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

function mapStateToProps(store){
  return {
  }
}

function mapDispatchToProps(dispatch){
  return{
    saveLocation(location){
      dispatch(saveLocation(location));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
