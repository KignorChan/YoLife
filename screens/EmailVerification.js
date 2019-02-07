import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    SafeAreaView, 
    Dimensions, 
    AsyncStorage, 
    DeviceEventEmitter, 
    Alert,
    Image,
    Platform,
    StatusBar,
    ActivityIndicator
 } from 'react-native';
//import FireBase from '../backend/Firebase';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {Toast} from 'teaset';
import DeviceSetting from '../utils/DeviceSetting';

const { width, height } = Dimensions.get('window');

const IMAGE_WIDTH = width*0.5;

class EmailVerification extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {
            expireSeconds:0,
            expireMessage:'',
            emailVerified:null,
            loading:true,
            refreshing:false
        }
        this.timer = null;
    }

    componentDidMount(){
        this.setState({refreshing:false})
        firebase.auth().currentUser.reload().then(()=>{
            firebase.auth().onAuthStateChanged(user=>{
                //console.log('USERRR:'+JSON.stringify(user));
                if(user){
                    this.setState({
                        emailVerified:user.emailVerified,
                    })
                    if(!user.emailVerified){
                        this._sendEmailVerification();
                    }
                }
                this.setState({loading:false});
            })
        });
        
        this.countDown();
    }

    countDown(){
        this.timer = setInterval(()=>{
            if(this.state.expireSeconds>0){
                var time = this.state.expireSeconds-1;
                this.setState({expireSeconds:time});
                if(time<=0){
                    this.setState({expireMessage:DeviceSetting.setting.APP_LANGUAGE_PACKAGE.emailVerifyExpireMessage})
                }
            }    
        },1000)
    }

    componentWillUnmount(){
        clearInterval(this.timer);
    }

    _sendEmailVerification(){
        firebase.auth().currentUser.sendEmailVerification().then(()=>{
            this.setState({expireSeconds:60})
        }).catch(err=>{
            console.log('USERRRR'+JSON.stringify(err));
        })

    }

    // _backToHome(){

        
    //     this._gotoLogout();
    // }

    // _gotoLogout(){
    //     if(this.state.isLogout){
    //         //Toast.sad('Please login first!');
    //     }else{
    //         DeviceEventEmitter.emit('isLogout','yes');
    //         FireBase.signout().then(() => {
    //         //Actions.reset('mainPage');
    //         AsyncStorage.removeItem("userId");
    //         AsyncStorage.removeItem("phoneNumber");
    //         AsyncStorage.removeItem("credential");

    //         this.setState({
    //             isLogout:true,
    //         });
    //         //Toast.success("Logout success!");
    //         Actions.reset('mainPage');

    //     }).catch(e => {
    //         //Actions.reset('mainPage');
    //         DeviceEventEmitter.emit('isLogout','yes');
    //         AsyncStorage.removeItem("userId");
    //         AsyncStorage.removeItem("credential");
    //         AsyncStorage.removeItem("phoneNumber");
    //         this.setState ({
    //             isLogout:true,
    //         });
    //     });
    //     }  
    // }

    // _login(){
    //     Actions.push('login');
    // }

    _registMoreInfo(){
        Actions.push('registmoreinfo')
    }

    _logoutAndGoToMain(){
        //this.setState({refreshing:true, loading:true});
        this.setState({loading:true});
        firebase.auth().signOut().then(()=>{
            Actions.reset('tabs');
            this.setState({loading:false});
        })
        
    }

    _refreshComponent(){
        this.setState({loading:true})
        firebase.auth().currentUser.reload().then(()=>{
            firebase.auth().onAuthStateChanged(user=>{
                //console.log('USERRR:'+JSON.stringify(user));
                if(user){
                    this.setState({
                        emailVerified:user.emailVerified,
                    })
                    if(!user.emailVerified){
                        this._sendEmailVerification();
                        Toast.sad(DeviceSetting.setting.APP_LANGUAGE_PACKAGE.emailVerifyFailMessage);
                    }
                }
                this.setState({loading:false});
            })
        });
    }

    render(){
        if(this.state.loading){
            return (
                <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#3CB97F'}}>
                  <ActivityIndicator size="large" color="#3F7B61" />
                </View>
            )
        }

        if(!this.state.emailVerified){
            return (
                <SafeAreaView style={{
                    flex:1, 
                    backgroundColor:'#3CB97F',
                    paddingTop: Platform.OS==='android'?StatusBar.currentHeight:0,
                }}>
                    <View style={{alignItems:'center', marginTop:20}}>
                    <Image source={require('../assets/images/emailVerify.gif')} style={{width:IMAGE_WIDTH, height:IMAGE_WIDTH}}/>
                    </View>
                    <View style={{padding:20}}>
                        <Text style={{fontSize:24, color:'#fff'}}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.emailVerificationMessage}</Text>
                    </View>
                    <View style={{alignItems:'center'}}>
                        <TouchableOpacity style={{
                            marginTop:20,
                            width:330, 
                            height:60, 
                            justifyContent:'center', 
                            alignItems:'center', 
                            backgroundColor:'#3F7B61'}}
                            onPress={this._sendEmailVerification.bind(this)}
                            >
                            <Text style={{color:'#3CB97F', fontSize:20, fontWeight:'bold'}}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.sendEmailVerification}</Text>
                        </TouchableOpacity>
                        {
                            this.state.expireSeconds<=0?
                            <Text style={{color:'#fff'}}>{this.state.expireMessage}</Text>:
                            <Text style={{color:'#fff'}}>{'Expire in: '+this.state.expireSeconds}</Text>
                        }

                        <TouchableOpacity style={{
                            marginTop:20,
                            width:330, 
                            height:60, 
                            justifyContent:'center', 
                            alignItems:'center', 
                            borderColor:'#3F7B61',
                            borderWidth:2
                        }}
                            onPress={this._refreshComponent.bind(this)}
                            >
                            <Text style={{color:'#3F7B61', fontSize:20, fontWeight:'bold'}}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.verified+'? '+DeviceSetting.setting.APP_LANGUAGE_PACKAGE.clickHereToNext}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            marginTop:20,
                            width:330, 
                            height:60, 
                            justifyContent:'center', 
                            alignItems:'center', 
                            borderColor:'#FFFFFF',
                            borderWidth:2
                        }}
                            onPress={this._logoutAndGoToMain.bind(this)}
                            >
                            <Text style={{color:'#FFFFFF', fontSize:20, fontWeight:'bold'}}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.backToHome}</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            )
        }

        return(
            <SafeAreaView style={{
                flex:1, 
                backgroundColor:'#FFFFFF',
                paddingTop: Platform.OS==='android'?StatusBar.currentHeight:0,
            }}>
                <View style={{alignItems:'center', marginTop:40}}>
                <Image source={require('../assets/images/sucess.gif')} style={{width:IMAGE_WIDTH, height:IMAGE_WIDTH}}/>
                </View>
                <View style={{padding:30}}>
                    <Text style={{fontSize:24, color:'#3F7B61'}}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.emailVerifySucessMessage}</Text>
                </View>
                <View style={{alignItems:'center'}}>
                    <TouchableOpacity style={{
                        marginTop:20,
                        width:330, 
                        height:60, 
                        justifyContent:'center', 
                        alignItems:'center', 
                        borderColor:'#3F7B61',
                        borderWidth:2
                    }}
                        onPress={this._registMoreInfo.bind(this)}
                        >
                        <Text style={{color:'#3F7B61', fontSize:20, fontWeight:'bold'}}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.next}</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )

    }
}

export default EmailVerification;