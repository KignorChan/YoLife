import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Font, AppLoading } from "expo";
import * as _ from 'lodash';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Isao,Fumi, Hoshi } from 'react-native-textinput-effects';
import { CheckBox } from 'react-native-elements';
import { Constants, ImagePicker, Permissions } from 'expo';
import {
  Button,
  Text,
  Left,
  Body,
  Right,
  Container,
  Content,
  Header,
  Icon,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as firebase from 'firebase';
import {Toast} from 'teaset';
import { parsePhoneNumberFromString } from 'libphonenumber-js/max';
import Modal from "react-native-modal";
import { resolve } from 'uri-js';
import { reject } from 'rsvp';
import FileUploader from "react-firebase-file-uploader";
import { connect } from 'react-redux';
import { saveAccount } from '../redux/actions/user';
import axios from 'axios';
import Qs from 'qs';

import { CONSTANT_API, ADDRESS_TYPE } from '../constants/Constants';


import DeviceSetting from '../utils/DeviceSetting';
import DataUtil from  '../utils/DataUtil';

import '../utils/AdroidTimeout';

//import { Platform } from 'expo-core';

var {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const HEADER_HEIGHT = height*0.25;
const AVATAR_SIZE = HEADER_HEIGHT*0.5;
const DEFAULT_IMAGE_SOURCE = require('../assets/images/qq.jpg');
const LOADING_AVATAR = require('../assets/images/loadingAvatar.gif')


class RegistMoreInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      message: '',
      confirmed: true,
      loading: true,
      userType:['customer'],
      dropdownText: 'customer',
      mobile:'',
      photoURL:'',
      image: null,
      uploading: false,
      showImageGrabModal:false,
      loadingAvatar:false,
      businessType:false,
      address:'',
    };
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

  async componentDidMount(){
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }

  async _renderImagePicker(){
    if(Platform.OS==='ios'){
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }

    ImagePicker.launchImageLibraryAsync({
        mediaTypes:'Images',
        quality:0.1
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

  _nextOnPress(){
    if(this.state.loadingAvatar){
      alert('Please wait for loading avatar!')
      return;
    }

    this.setState({loading:true})
    if(!DataUtil.check_phone_format(this.state.mobile)){
      Toast.sad("The mobile format is not right!");
      return;
    }

    const phoneNumber = parsePhoneNumberFromString(this.state.mobile, 'CA');

    if(phoneNumber){
        if(!phoneNumber.isValid()){
            Toast.sad("The phone number is not valid!");
            return;
        }
    }

    var account = this.props.account;
    account.firstName = this.state.firstName;
    account.lastName = this.state.lastName;
    account.photoURL = this.state.photoURL;
    account.phoneNumber = this.state.mobile;
    account.userType = 'customer';
    account.comeFrom = 'firebase';

    if(this.state.businessType){
      account.isOwner = true;
      account.userType = account.userType+',business';
    }else{
      account.isOwner = false;
    }

    var address = {
      addressType:ADDRESS_TYPE.pickupAddress,
      address:this.state.address,
      latitude: this.props.location.coords.latitude!==undefined?this.props.location.coords.latitude:78.84573,
      longitude: this.props.location.coords.longitude!==undefined?this.props.location.coords.longitude:-144.347567,
    }

    addressList = [];
    addressList.push(address);

    account.addressList = addressList;

    console.log(JSON.stringify(account));

    // var account = {
    //   account:'hello world'
    // }

    //account = JSON.stringify(account)

    axios.post(CONSTANT_API.addUsers, account).then(res=>{
      console.log(JSON.stringify(res));
    }).catch(e=>{
      console.log(JSON.stringify(e))
    })    
  }

  _addressSetting(){
    Actions.push('addressinputview',{
      _getAddress: (address)=>{this.setState({address})},
      address:this.state.address
  });
  }

  render() {
    if(this.state.loading){
      return (
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
      )
    }
    return (
      <Container>
        <Content style={{ backgroundColor: 'white' }}>
          <View style={{ marginLeft: 20, marginRight: 20, marginTop: 30 }}>
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
            </View>
            <Hoshi
            label={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.firstName}
            borderColor={'#b76c94'}
            onChangeText={(value)=>{
              this.setState({ firstName: value })
            }}
            />
            <Hoshi
            label={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.lastName}
            borderColor={'#b76c94'}
            onChangeText={(value)=>{
              this.setState({ lastName: value })
            }}
            />
            <Hoshi
            label={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.phoneNumber}
            borderColor={'#b76c94'}
            onChangeText={(value)=>{
              this.setState({ mobile: value })
            }}
            keyboardType='numeric'
            />
            {
              Platform.OS==='android'?
              <TouchableOpacity onPress={()=>{this._addressSetting()}}>
              <Hoshi
              label={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.address}
              borderColor={'#b76c94'}
              value={this.state.address}
              editable={false}
              multiline={true}
              />
              </TouchableOpacity>:
              <Hoshi
              label={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.address}
              borderColor={'#b76c94'}
              onFocus={()=>{this._addressSetting(); this.addressInput.blur();}}
              editable={true}
              value={this.state.address}
              ref={addressInput =>this.addressInput = addressInput}
              />
            }


            <View>
            {/*
              this.state.address?
              <Text>Pickup location</Text>
              :
              <TouchableOpacity style={{justifyContent:'center', alignItems:'center', borderWidth:1, padding:10, marginTop:10}}>
                <Text style={{color:'#333'}}>Set up pickup location</Text>
              </TouchableOpacity>
            */}
            </View>
            <CheckBox
              center
              title={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.includeBusinessFeature}
              checked={this.state.businessType}
              onPress={()=>{this.setState({businessType:!this.state.businessType})}}
            />
            {this.state.message.length > 0 ? (
              <Text>{this.state.message}</Text>
            ) : null}
          </View>
          <View
            style={{
              marginTop: 20,
              marginLeft:50,
              marginRight:50,
              flexDirection: 'row',
              justifyContent:'space-around'
            }}
          >
            <Button
              dark
              onPress={() => this.register()}
              disabled={this.state.loading}
            >
              <Text style={{ color: 'white' }}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.skip}</Text>
            </Button>
            <Button
                onPress={() => this._nextOnPress()}
                disabled={this.state.loading}
            >
                <Text style={{ color: 'white' }}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.next}</Text>
            </Button>
          </View>
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
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(store){
  return{
    account: store.userStore.account,
    location: store.userStore.location,
  }
}

function mapDispatchToProps(){
   return {
    saveAccount(dispatch){
        dispatch(saveAccount(account));
    }
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistMoreInfo)