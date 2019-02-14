'use strict';
import React, { Component } from 'react';
import {
  Text,
  View,
  Platform,
  TextInput,
  ImageBackground,
  Image,
  AlertIOS,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import ModalBox from 'react-native-modalbox';
import Spinner from 'react-native-spinkit';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Makiko } from 'react-native-textinput-effects';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Font, AppLoading } from "expo";
import Axios from 'axios';
import {Toast} from 'teaset';
import { logIn, skipLogin } from '../redux/actions/user';
//import firebase from 'firebase';
import commonStyle from '../styles/common';
import loginStyle from '../styles/login';
import { Actions } from 'react-native-router-flux';
import Firebase from '../backend/Firebase';
import * as TYPES from '../redux/actions/types';
import { CONSTANT_API } from '../constants/Constants';



class LoginPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            btnFlag: true,
            modalVisible: false,
            loading: true,
            isLoggedIn:null,
        };
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePswd = this.onChangePswd.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    async componentWillMount() {
        try{
          await Font.loadAsync({
            Arial: require("../assets/fontFamily/Arial.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Roboto: require("native-base/Fonts/Roboto.ttf"),
          });
          this.setState({ loading: false });
        }catch(e){
          console.log('Fail to load fonts!')
        }
    
      }

    handleLogin(){
        const { email, password } = this.state;
        if (!email) {
            Toast.sad(this.props.language.pleaseEnterYourEmail);
            return;
        }
        if(!password){
            Toast.sad(this.props.language.pleaseEnterYourPassword);
            return;
        }
        this.setState({loading:true});

        Firebase.signinWithEmailAndPassword(email, password).then(result=>{
            //console.log('RESULT: '+JSON.stringify(result.user.uid));
            if(result){
                //this.props.saveAccount(result.user);
                console.log('LOGIN:'+JSON.stringify(result.user))
                if(result.user.emailVerified){
                    Axios.post(CONSTANT_API.getUserById, {'id':result.user.uid}).then(result=>{
                        if( result && result.data.totel!==0 ){
                            var user = result.data.rows[0];
                            this.props.login(user);
                        }
                        Actions.pop();
                        this.setState({loading:false});
                    })      
                }else{
                    Actions.push('emailverification');
                    this.setState({loading:false});
                }    
            }
        }).catch(e=>{
            console.error(e);
        })
        // firebase.auth().signInWithEmailAndPassword(email, password).then(result=>{
        //     console.log('RESULT: '+JSON.stringify(result));
        //     if(result){
        //         if(result.user.emailVerified){
        //             Actions.pop();
        //             this.setState({loading:false});
        //         }else{
        //             Actions.push('emailverification');
        //             this.setState({loading:false});
        //         }
        //     }
        // }).catch(e=>{
        //     console.error(e);
        // });
        // let opt = {
        //     'name': this.state.email,
        //     'password': this.state.password,
        // };
        // this.setState({
        //     modalVisible: true
        // })
        //this.props.dispatch(logIn(opt));
        //Actions.pop();
        
    }

    handleRegister(){
        // const {dispatch} = this.props;
        // dispatch(skipLogin());
        Actions.push('register');
    }

    onChangeName(text){
        this.setState({'email': text});
    }

    onChangePswd(text){
        this.setState({'password': text});
    }


    render(){
        const { email, password, modalVisible } = this.state;

        if(this.state.loading){
            return (
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }

        return (
            <View style={[commonStyle.wrapper, loginStyle.loginWrap]}>
                <ImageBackground
                    source={require('../assets/images/foodPic.jpg')}
                    style={{ resizeMode: 'stretch', flex: 1, justifyContent:'center', alignItems:'center' }}
                >
                <View style={loginStyle.loginMain}>
                    <Text style={{fontSize:28, fontFamily:'Arial', color:'#ffffff'}}>{this.props.language.welcome+'!'}</Text>
                    <View style={loginStyle.formStyle}>
                        <View style={[loginStyle.formInput,loginStyle.formInputSplit]}>
                            <Image
                                source={require('../imgs/icons/user.png')}
                                style={{ width:25, height:25, resizeMode: 'contain'}}
                            />
                            <TextInput 
                                ref="login_name" 
                                placeholder={this.props.language.email}
                                style={loginStyle.loginInput} 
                                onChangeText={this.onChangeName}
                                value={email}
                                keyboardType='email-address'
                            />
                        </View>
                        <View style={loginStyle.formInput}>
                            <Image source={require('../imgs/icons/passicon.png')} style={{width:25,height:25,resizeMode: 'contain'}}/>
                            <TextInput 
                                ref="login_psw"  
                                style={loginStyle.loginInput} 
                                secureTextEntry={true}
                                placeholder={this.props.language.password}
                                value={password}
                                onChangeText={this.onChangePswd} />
                        </View>

                    </View>
                    <View style={{alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>{alert('sfjas')}} style={[loginStyle.forget,{flexDirection:'row'}]}>
                            <FeatherIcon name='alert-circle' size={16} style={{color:'#fff', marginRight:5}}/>
                            <Text style={{color:'#fff'}}>{this.props.language.forgetPassword+'?'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={loginStyle.btn}>
                        <TouchableOpacity style={loginStyle.btnWrap} onPress={this.handleLogin}>
                            <Text style={loginStyle.loginBtn1} >{this.props.language.login}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={loginStyle.btnWrap} onPress={this.handleRegister}>
                            <Text style={loginStyle.loginBtn2}>{this.props.language.register}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </ImageBackground>
                <TouchableOpacity style={{
                    position:'absolute',
                    marginTop:40,
                    marginLeft:20
                }} onPress={()=>{Actions.pop()}}>
                    <FeatherIcon name='arrow-left' size={30} />
                </TouchableOpacity>
            </View>
        );
    }
}

function mapState2Props(store){
    return {
        isLoggedIn: store.userStore.isLoggedIn,
        user: store.userStore.user,
        status: store.userStore.status,
        language: store.setting.language,
    }
}

function mapDispatchToProps(dispatch){
    return{
        login(user){
            dispatch({'type':TYPES.LOGGED_IN, user:user});
        },
        saveAccount(account){
            dispatch({'type':TYPES.SAVE_ACCOUNT,account: account});
        }
    }
}


export default connect(mapState2Props, mapDispatchToProps)(LoginPage);


