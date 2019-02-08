import React, { Component } from 'react'
import { View, Text, TextInput, Dimensions, TouchableOpacity, Image, ScrollView, Platform, StatusBar, SafeAreaView, Animated, Keyboard, KeyboardAvoidingView } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Constants, ImagePicker, Permissions } from 'expo';
import Modal from "react-native-modal";

import DeviceSetting from '../utils/DeviceSetting';
import DataUtil from  '../utils/DataUtil';
import { saveUser } from '../redux/actions/user';
import * as TYPES from '../redux/actions/types';


var {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const HEADER_HEIGHT = height*0.25;
const AVATAR_SIZE = HEADER_HEIGHT*0.5;
//const DEFAULT_IMAGE_SOURCE = 'https://firebasestorage.googleapis.com/v0/b/pickupper-47f2b.appspot.com/o/images%2FMcDonald%2F1547679255517%2F1548365479365.jpg?alt=media&token=053e4a9a-7cd4-48ba-808f-8cf5be91787a';
const DEFAULT_IMAGE_SOURCE = require('../assets/images/qq.jpg');
const LOADING_AVATAR = require('../assets/images/loadingAvatar.gif')

 class Profile extends Component {
    constructor(props){
        super(props);

        this.state = {
            firstName:this.props.user.firstName,
            lastName:this.props.user.lastName,
            phoneNumber:this.props.user.phoneNumber,
            email:this.props.user.email,
            avatarUrl:this.props.user.photoUrl,
            photoURL:this.props.user.photoUrl,

            showImageGrabModal:false,
        }
        this.keyboardMove = new Animated.ValueXY();

    }

    async componentDidMount(){
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
        
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        await Permissions.askAsync(Permissions.CAMERA);

        console.log('PROFILE: '+JSON.stringify(this.props.account))
    }

    _keyboardDidShow(e){
        Animated.timing(this.keyboardMove,{
            toValue: {x:0, y:-e.endCoordinates.height},
            duration:250
        }).start();
    }

    _keyboardDidHide(e){
        Animated.timing(this.keyboardMove,{
            toValue: {x:0, y:0},
            duration:250
        }).start();
    }

    async _renderImagePicker(){
        if(Platform.OS==='ios'){
          await Permissions.askAsync(Permissions.CAMERA_ROLL);
        }
    
        ImagePicker.launchImageLibraryAsync({
            mediaTypes:'Images',
            quality:0.01
        }).then(image=>{
            this.setState({showImageGrabModal:false})
            if (!image.cancelled) {
              this.setState({loadingAvatar:true})
                DataUtil.uploadPhoto(image.uri, this.props.user.externalId).then(photoURL=>{
                  this.setState({ photoURL, loadingAvatar:false});
                }).catch(()=>{
                  console.log('get url failed!')
                })
            }else{
                console.log('CANCEL!');
            }
        }).catch(e=>{
            console.log('Image picker error: '+ JSON.stringify(e));
        })
      }
    
      async _renderCamera(){
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
    
        ImagePicker.launchCameraAsync({
            allowsEditing:true,
            quality:0.1,
        }).then(image=>{
            this.setState({showImageGrabModal:false})
            if (!image.cancelled) {
              this.setState({loadingAvatar:true})
              DataUtil.uploadPhoto(image.uri, this.props.account.uid).then(photoURL=>{
                this.setState({ photoURL, loadingAvatar:false});
              }).catch(()=>{
                console.log('get url failed!')
              })
            }else{
                console.log('CANCEL!');
            }
        }).catch(e=>{
            console.log('Image error: '+ JSON.stringify(e));
        })
      }

    _handleOnBack(){
        var user = this.props.user;
        user.firstName = this.state.firstName;
        user.lastName = this.state.lastName;
        user.photoUrl = this.state.photoURL;
        user.email = this.state.email;
        user.phoneNumber = this.state.phoneNumber;

        console.log('SAVE'+JSON.stringify(user))

        this.props.saveUser(user);

        Actions.pop()
    }

    render() {
        return (
        <SafeAreaView style={{
            flex:1,
            paddingTop: Platform.OS==='android'?StatusBar.currentHeight:0,
            }}>
            <KeyboardAvoidingView style={{flex:1}} enabled behavior='padding'>
            <View style={{
                backgroundColor:'#fff', 
                height:HEADER_HEIGHT, 
                justifyContent:'center', 
                alignItems:'center',
            }}>
                <TouchableOpacity onPress={()=>{this.setState({showImageGrabModal:true})}}>
                {this.state.photoURL&&!this.state.loadingAvatar?
                <Image source={{uri:this.state.photoURL}} style={{
                    height:AVATAR_SIZE, 
                    width:AVATAR_SIZE, 
                    borderRadius: AVATAR_SIZE/2,
                    marginBottom:10
                }}/>
                :null
                }

                {
                this.state.loadingAvatar?
                <Image source={LOADING_AVATAR} style={{
                    height:AVATAR_SIZE, 
                    width:AVATAR_SIZE, 
                    borderRadius: AVATAR_SIZE/2,
                    marginBottom:10
                }}/>:null
                }
                
                {
                !this.state.loadingAvatar&&!this.state.photoURL?
                <Image source={DEFAULT_IMAGE_SOURCE} style={{
                    height:AVATAR_SIZE, 
                    width:AVATAR_SIZE, 
                    borderRadius: AVATAR_SIZE/2,
                    marginBottom:10
                }}/>:null
                }

                </TouchableOpacity>
                <TouchableOpacity style={{
                    position:'absolute',
                    top:20,
                    left:20
                }} onPress={()=>{this._handleOnBack()}}>
                    <FeatherIcon name='arrow-left' size={28} />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={{
                    justifyContent:'space-between', 
                    backgroundColor:'#fff',
                    paddingLeft:20,
                    paddingTop:10,
                    paddingBottom:10,
                    marginTop:2,
                }}>
                    <Text style={{color:'#aaa',marginBottom:5}}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.firstName+': '}</Text>
                    <TextInput style={{fontSize:20}}
                        value={this.state.firstName}
                        onChangeText={(text)=>{this.setState({firstName:text})}}
                    />
                </View>
                <View style={{
                    justifyContent:'space-between', 
                    backgroundColor:'#fff',
                    paddingLeft:20,
                    paddingTop:10,
                    paddingBottom:10,
                    marginTop:2,
                }}>
                    <Text style={{color:'#aaa',marginBottom:5}}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.lastName+': '}</Text>
                    <TextInput style={{fontSize:20}}
                        value={this.state.lastName}
                        onChangeText={(text)=>{this.setState({lastName:text})}}
                    />
                </View>
                <View style={{
                    justifyContent:'space-between', 
                    backgroundColor:'#fff',
                    paddingLeft:20,
                    paddingTop:10,
                    paddingBottom:10,
                    marginTop:2,
                }}>
                    <Text style={{color:'#aaa',marginBottom:5}}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.telephoneNumber+': '}</Text>
                    <TextInput style={{fontSize:20}}
                        value={this.state.phoneNumber}
                        onChangeText={(text)=>{this.setState({phoneNumber:text})}}
                    />
                </View>
                <View style={{
                    justifyContent:'space-between', 
                    backgroundColor:'#fff',
                    paddingLeft:20,
                    paddingTop:10,
                    paddingBottom:10,
                    marginTop:2,
                }}>
                    <Text style={{color:'#aaa',marginBottom:5}}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.email+': '}</Text>
                    <TextInput style={{fontSize:20}}
                        value={this.state.email}
                        onChangeText={(text)=>{this.setState({email:text})}}
                    />
                </View>

                <TouchableOpacity style={{
                    flexDirection:'row', 
                    justifyContent:'center', 
                    backgroundColor:'#fff',
                    padding:20,
                    marginTop:20
                }}>
                    <Text style={{fontSize:18}}>Change password</Text>
                </TouchableOpacity>

                <Modal isVisible={this.state.showImageGrabModal} style={{justifyContent:'center', alignItems:'center'}} onBackdropPress={()=>this.setState({showImageGrabModal:false})}>
                <View style={{backgroundColor:'#fff',paddingTop:10, paddingBottom:10, width:width*0.8, borderRadius:10}}>
                  <View style={{padding:10, borderBottomColor:'#ddd', borderBottomWidth:1}}>
                      <View><Text style={{fontSize:23, marginLeft:20}}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.choosePhotoFrom+':'}</Text></View>
                  </View>
                  <TouchableOpacity style={{
                      justifyContent:'center', 
                      alignItems:'center', 
                      padding:10,
                      borderBottomColor:'#ddd', 
                      borderBottomWidth:1}}
                      onPress={()=>{
                          this._renderImagePicker()
                      }}>
                      <Text style={{fontSize:18}}>Album</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{
                      justifyContent:'center', 
                      alignItems:'center', 
                      padding:10}}
                      onPress={()=>{
                          this._renderCamera()
                      }}>
                      <Text style={{fontSize:18}}>Camera</Text>
                  </TouchableOpacity>
                </View>
      
                </Modal>
            </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
        )
    }
}

function mapState2Props(store){
    return {
        isLoggedIn: store.userStore.isLoggedIn,
        user: store.userStore.user,
        status: store.userStore.status,
        account:store.userStore.account
    }
}

function mapDispatch2Props(dispatch){
    return {
        saveUser(user){
            dispatch({"type":TYPES.SAVE_USER, user:user})
        }
    }
}


export default connect(mapState2Props,mapDispatch2Props)(Profile);
