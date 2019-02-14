import React from 'react';
import { StyleSheet, Text, View, Platform, Dimensions } from 'react-native';
import { Router, Scene, Actions, Tabs, Stack, Drawer } from 'react-native-router-flux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Constants, Location, Permissions } from 'expo';
import { connect } from 'react-redux';

import { saveLocation } from './redux/actions/user';
import { languageSetting } from './redux/actions/setting';

import { LANGUAGES } from './constants/Languages';

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

  componentWillMount(){
    if(this.props.language.languageSelected==='CHINESE'){
      this.props.languageSetting(LANGUAGES.CHINESE)
    }
    if(this.props.language.languageSelected==='ENGLISH'){
      this.props.languageSetting(LANGUAGES.ENGLISH)
    }

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
              title={this.props.language.home}
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
              title={this.props.language.myOrder}
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
              title={this.props.language.me}
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
          title={this.props.language.setting}
          hideNavBar={true}/>
          
        <Scene 
          key="languagessetting"
          component={LanguagesSetting}
          title={this.props.language.language}
          hideNavBar={false}/> 

        <Scene 
          key="contactus"
          component={ContactUs}
          title={this.props.language.contactUs}
          hideNavBar={false}/> 
        
        <Scene 
            key="login"
            component={Login}
            title={this.props.language.login}
            hideNavBar={true}/>
        
        <Scene 
            key="register"
            component={Register}
            title={this.props.language.register}
            hideNavBar={false}/>

        <Scene 
            key="profile"
            component={Profile}
            title={this.props.language.profile}
            hideNavBar={true}/>

        <Scene 
            key="locationsetting"
            component={LocationSetting}
            title={this.props.language.locationSetting}
            hideNavBar={false}/>

        <Scene 
            key="addbusinesses"
            component={AddBusinesses}
            title={this.props.language.newBusiness}
            hideNavBar={true}/>

        <Scene 
            key="feedback"
            component={Feedback}
            title={this.props.language.feedback}
            hideNavBar={false}/>

        <Scene 
            key="registmoreinfo"
            component={RegistMoreInfo}
            title={this.props.language.moreInfo}
            hideNavBar={false}
            />

        <Scene 
            key="addressinputview"
            component={AddressInputView}
            title={this.props.language.address}
            hideNavBar={true} />

        <Scene 
            key="signupsuccessscreen"
            component={SignupSuccessScreen}
            title={this.props.language.welcome}
            hideNavBar={true} />

        <Scene 
            key="emailverification"
            component={EmailVerification}
            title={this.props.language.emailVerification}
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
    language: store.setting.language,
    isLoggedIn: store.userStore.isLoggedIn
  }
}

function mapDispatchToProps(dispatch){
  return{
    saveLocation(location){
      dispatch(saveLocation(location));
    },
    languageSetting(language){
      dispatch(languageSetting(language))
    },
    logout(){
      dispatch(logOut());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
