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
//import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {Toast} from 'teaset';
import FireBase from '../backend/Firebase';
import { connect } from 'react-redux';


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

        FireBase.onAuthStateChanged().then(user=>{
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
        }).catch(e=>{
            console.error(e);
        })

        // firebase.auth().currentUser.reload().then(()=>{
        //     firebase.auth().onAuthStateChanged(user=>{
        //         //console.log('USERRR:'+JSON.stringify(user));
        //         if(user){
        //             this.setState({
        //                 emailVerified:user.emailVerified,
        //             })
        //             if(!user.emailVerified){
        //                 this._sendEmailVerification();
        //             }
        //         }
        //         this.setState({loading:false});
        //     })
        // });
        
        this.countDown();
    }

    countDown(){
        this.timer = setInterval(()=>{
            if(this.state.expireSeconds>0){
                var time = this.state.expireSeconds-1;
                this.setState({expireSeconds:time});
                if(time<=0){
                    this.setState({expireMessage:this.props.language.emailVerifyExpireMessage})
                }
            }    
        },1000)
    }

    componentWillUnmount(){
        clearInterval(this.timer);
    }

    _sendEmailVerification(){
        FireBase.sendEmailVerification().then(result=>{
            this.setState({expireSeconds:60})
        }).catch(e=>{
            console.error(e);
        })
        // firebase.auth().currentUser.sendEmailVerification().then(()=>{
        //     this.setState({expireSeconds:60})
        // }).catch(err=>{
        //     console.log('USERRRR'+JSON.stringify(err));
        // })

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
        FireBase.signOut().then((result)=>{
            Actions.reset('tabs');
            this.setState({loading:false});
        })
        // firebase.auth().signOut().then(()=>{
        //     Actions.reset('tabs');
        //     this.setState({loading:false});
        // })
        
    }

    _refreshComponent(){
        this.setState({loading:true})
        FireBase.onAuthStateChanged().then(user=>{
            //console.log('USERRR:'+JSON.stringify(user));
            if(user){
                this.setState({
                    emailVerified:user.emailVerified,
                })
                if(!user.emailVerified){
                    this._sendEmailVerification();
                    Toast.sad(this.props.language.emailVerifyFailMessage);
                }
            }
            this.setState({loading:false});
        }).catch(e=>{
            console.error(e);
        })
        // firebase.auth().currentUser.reload().then(()=>{
        //     firebase.auth().onAuthStateChanged(user=>{
        //         //console.log('USERRR:'+JSON.stringify(user));
        //         if(user){
        //             this.setState({
        //                 emailVerified:user.emailVerified,
        //             })
        //             if(!user.emailVerified){
        //                 this._sendEmailVerification();
        //                 Toast.sad(this.props.language.emailVerifyFailMessage);
        //             }
        //         }
        //         this.setState({loading:false});
        //     })
        // });
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
                        <Text style={{fontSize:24, color:'#fff'}}>{this.props.language.emailVerificationMessage}</Text>
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
                            <Text style={{color:'#3CB97F', fontSize:20, fontWeight:'bold'}}>{this.props.language.sendEmailVerification}</Text>
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
                            <Text style={{color:'#3F7B61', fontSize:20, fontWeight:'bold'}}>{this.props.language.verified+'? '+this.props.language.clickHereToNext}</Text>
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
                            <Text style={{color:'#FFFFFF', fontSize:20, fontWeight:'bold'}}>{this.props.language.backToHome}</Text>
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
                    <Text style={{fontSize:24, color:'#3F7B61'}}>{this.props.language.emailVerifySucessMessage}</Text>
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
                        <Text style={{color:'#3F7B61', fontSize:20, fontWeight:'bold'}}>{this.props.language.next}</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )

    }
}

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
  
export default connect(mapStateToProps, mapDispatchToProps)(EmailVerification);