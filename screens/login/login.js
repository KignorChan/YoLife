'use strict';
import React, { Component } from 'react';
import {
  Text,
  View,
  Platform,
  TextInput,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import ModalBox from 'react-native-modalbox';
import { logIn, skipLogin } from '../../redux/actions/user';
import commonStyle from '../../styles/common';
import loginStyle from '../../styles/login';
import { Actions } from 'react-native-router-flux';


class LoginPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: 'sup1',
            password: '123456',
            btnFlag: true,
            modalVisible: false,
        };
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePswd = this.onChangePswd.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleLogin(){
        alert("111111");
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
              
                    <View style={loginStyle.loginMain}>
                        <View style={loginStyle.loginMainCon}>
                            <View style={loginStyle.companyCulture}>
                                <Text style={[commonStyle.textCenter,{color:'#cccccc'}]}>Follow Your Interests</Text>
                                <Text style={[commonStyle.textCenter,{color:'#cccccc'}]}>Discover Your World</Text>
                            </View>
                            <View style={loginStyle.formStyle}>
                                <View style={[loginStyle.formInput,loginStyle.formInputSplit]}>
                                    <Image
                                        source={require('../../imgs/icons/user.png')}
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
                                    <Image source={require('../../imgs/icons/passicon.png')} style={{width:25,height:25,resizeMode: 'contain'}}/>
                                    <TextInput 
                                        ref="login_psw"  
                                        style={loginStyle.loginInput} 
                                        secureTextEntry={true}
                                        placeholder='password' 
                                        value={password}
                                        onChangeText={this.onChangePswd} />
                                </View>
                                <View style={{alignItems: 'flex-end'}}>
                                    <View style={loginStyle.forget}>
                                    <View>
                                        <Image source={require('../../imgs/icons/prompt.png')} style={{width:15,height:15,resizeMode: 'contain',marginRight:10}}/>
                                    </View>
                                    <View >
                                        <Text style={{color:'#62a2e0', backgroundColor: 'white'}}>forget password?</Text>
                                    </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.btn}>
                                <TouchableOpacity style={styles.btnWrap} onPress={()=>{this.handleLogin();}}>
                                    <Text style={styles.loginBtn1} >Log in</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btnWrap} onPress={alert('1111')}>
                                    <Text style={styles.loginBtn2}>Register</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        
                    </View>
                

            </View>
        );
    }
}

var styles = StyleSheet.create({
    btn: {
        flexDirection:'row',
      },
  
      btnWrap:{
        marginTop: 150,
        borderRadius: 5,
        height: 50,
      },
    
      loginBtn1: {
          fontSize: 20,
          color: '#ffffff',
          backgroundColor: 'transparent',
          width: 150,
          height: 50,
          borderWidth: 1,
          borderColor: '#fff',
          paddingTop: 15,
          marginRight: 20,
          flex: 1,
          textAlign: 'center',
      },  
      loginBtn2: {
        fontSize: 20,
        color: '#C7D634',
        backgroundColor: '#fff',
        width: 150,
        height: 50,
        borderWidth: 1,
        borderColor: '#fff',
        paddingTop: 15,
        flex: 1,
        textAlign: 'center',
      },
})

function mapState2Props(store){
    return {
        isLoggedIn: store.userStore.isLoggedIn,
        user: store.userStore.user,
        status: store.userStore.status,
    }
}


export default connect(mapState2Props)(LoginPage);


