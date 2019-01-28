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
  SafeAreaView
} from 'react-native';
import { connect } from 'react-redux';
import ModalBox from 'react-native-modalbox';
import Spinner from 'react-native-spinkit';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { logIn, skipLogin } from '../redux/actions/user';
import commonStyle from '../styles/common';
import loginStyle from '../styles/login';
import { Actions } from 'react-native-router-flux';


class LoginPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: 'username',
            password: '',
            btnFlag: true,
            modalVisible: false,
        };
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePswd = this.onChangePswd.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleLogin(){
        const { username, password } = this.state;
        if (!username || !password) {
            return;
        }
        let opt = {
            'name': this.state.username,
            'password': this.state.password,
        };
        this.setState({
            modalVisible: true
        })
        this.props.dispatch(logIn(opt));
        Actions.pop();
    }

    handleRegister(){
        // const {dispatch} = this.props;
        // dispatch(skipLogin());
        Actions.push('register');
    }

    onChangeName(text){
        this.setState({'username': text});
    }

    onChangePswd(text){
        this.setState({'password': text});
    }


    render(){
        const { username, password, modalVisible } = this.state;
        return (
            <View style={[commonStyle.wrapper, loginStyle.loginWrap]}>
                <ImageBackground
                    source={require('../assets/images/foodPic.jpg')}
                    style={{ resizeMode: 'stretch', flex: 1 }}
                >
                <View style={loginStyle.loginMain}>
                    <View style={loginStyle.formStyle}>
                        <View style={[loginStyle.formInput,loginStyle.formInputSplit]}>
                            <Image
                                source={require('../imgs/icons/user.png')}
                                style={{ width:25, height:25, resizeMode: 'contain'}}
                            />
                            <TextInput 
                                ref="login_name" 
                                placeholder='username' 
                                style={loginStyle.loginInput} 
                                onChangeText={this.onChangeName}
                                value={username}
                            />
                        </View>
                        <View style={loginStyle.formInput}>
                            <Image source={require('../imgs/icons/passicon.png')} style={{width:25,height:25,resizeMode: 'contain'}}/>
                            <TextInput 
                                ref="login_psw"  
                                style={loginStyle.loginInput} 
                                secureTextEntry={true}
                                placeholder='password' 
                                value={password}
                                onChangeText={this.onChangePswd} />
                        </View>

                    </View>
                    <View style={{alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>{alert('sfjas')}} style={[loginStyle.forget,{flexDirection:'row'}]}>
                            <Image source={require('../imgs/icons/prompt.png')} style={{width:15,height:15,resizeMode: 'contain',marginRight:10}}/>
                            <Text style={{color:'#62a2e0'}}>forget password?</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={loginStyle.btn}>
                        <TouchableOpacity style={loginStyle.btnWrap} onPress={this.handleLogin}>
                            <Text style={loginStyle.loginBtn1} >Log in</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={loginStyle.btnWrap} onPress={this.handleRegister}>
                            <Text style={loginStyle.loginBtn2}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </ImageBackground>
                <TouchableOpacity style={{
                    position:'absolute',
                    top:60,
                    left:20
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
    }
}


export default connect(mapState2Props)(LoginPage);


