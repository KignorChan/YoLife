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
  Platform
} from 'react-native';
import { Font, AppLoading } from "expo";
import * as _ from 'lodash';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Isao,Fumi, Hoshi } from 'react-native-textinput-effects';
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
import DeviceSetting from '../utils/DeviceSetting';
import DataUtil from  '../utils/DataUtil';
import {Toast} from 'teaset';
import { parsePhoneNumberFromString } from 'libphonenumber-js/max';
import Modal from "react-native-modal";
import { resolve } from 'uri-js';
import { reject } from 'rsvp';
import FileUploader from "react-firebase-file-uploader";



//import { Platform } from 'expo-core';

var {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const HEADER_HEIGHT = height*0.25;
const AVATAR_SIZE = HEADER_HEIGHT*0.5;
const DEFAULT_IMAGE_SOURCE = 'https://firebasestorage.googleapis.com/v0/b/yolife-541a7.appspot.com/o/images%2Favatar%2FSwhzLFSDZNMFZRZx8L2L6bJvTyx1.jpg?alt=media&token=d10f8821-385a-45ee-b1d6-5cc066c50fc5';


export default class RegistMoreInfo extends React.Component {
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
      showImageGrabModal:false
    };
  }

  async componentWillMount() {
    console.log(JSON.stringify(this.props.account.user.uid));

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

  register = () => {
    if(this.state.email===''){
        Toast.sad("Please enter your email!");
        return;
    }

    if(this.state.password===''){
        Toast.sad("Please enter your password!");
        return;
    }

    if(!DataUtil.check_email_format(this.state.email)){
      Toast.sad("The email format is not right!");
      return;
    }
    if(!DataUtil.check_phone_format(this.state.mobile)){
      Toast.sad("The mobile format is not right!");
      return;
    }
    if (this.state.password != '' && this.state.password != null){
        if(this.state.password.length<6 || this.state.password.length > 14 ){
            Toast.sad("The password length is between 6 and 14!");
            //this.setState({ message: 'the password length is between 6 and 14!', confirmed: false });
            return;
        }
    }
    if (this.state.password !== this.state.passwordConfirm) {
      //this.setState({ message: 'Password does not match', confirmed: false });
      Toast.sad('Password does not match');
      return ;
    } else {
      this.setState({ message: 'Loading...', loading: true, confirmed: true });

      const phoneNumber = parsePhoneNumberFromString(this.state.mobile, 'CA');

      if(phoneNumber){
          if(!phoneNumber.isValid()){
              Toast.sad("The phone number is not valid!");
              return;
          }
      }

      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(user=>{
        console.log(JSON.stringify(user));
      })




      
    //   FireBase.signup(this.state.username, this.state.password)
    //     .then(result => {
    //       FireBase.updateUserType(result.uid, this.state.dropdownText);
    //       //if(result.emailVerified){
    //         FireBase.login(false, {
    //           email: this.state.username,
    //           password: this.state.password,
    //         })
    //           .then(r1 => {
    //             FireBase.getDatabase().ref('users/'+result.uid).on('value',snapshot=>{
    //               var user = snapshot.val();
    //               Authentication.saveItem('userId', result.uid);
    //               Authentication.saveItem('userEmail', this.state.username);
    //               FireBase.currentUser.userType = user.userType;
    //             });
  
    //             Actions.push('mainPage');
    //           })
    //           .catch(e => {
    //             console.log(e.message);
    //             this.setState({ message: e.message, loading: false });
    //           });
    //       // }else{
    //       //   Actions.push('emailVerification',{from:'registerView'})
    //       // }
          
    //     })
    //     .catch(error => {
    //       // Handle Errors here.
    //       const errorCode = error.code;
    //       const errorMessage = error.message;
    //       this.setState({ message: error.message, loading: false });
    //     });
    }
  };

  componentDidMount() {
    this.debouncedSetState = _.debounce(this.setState, 300);
  }

  renderUserTypeSelection(){
    Alert.alert(
      'Account Type',
      'Please choose an account type:',
      [
        {text: 'customer', onPress: () => this.setState({dropdownText: 'customer'})},
        {text: 'business', onPress: () => this.setState({dropdownText: 'business'})},
        {text: 'Cancel', onPress: () => console.log('cancel pressed!')},
      ],
      { cancelable: false }
    )

    // return (
    //   <DropdownMenu
    //     style={{flex: 1}}
    //     bgColor={'white'}
    //     tintColor={'#666666'}
    //     activityTintColor={'green'}
    //     // arrowImg={}      
    //     // checkImage={}   
    //     // optionTextStyle={{color: '#333333'}}
    //     // titleStyle={{color: '#333333'}} 
    //     maxHeight={300} 
    //     handler={(selection, row) => this.setState({dropdownText: this.state.userType[selection][row]})}
    //     data={this.state.userType}
    //   >
    //   </DropdownMenu>
    // );
  }

  async _renderImagePicker(){
    if(Platform.OS==='ios'){
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }

    ImagePicker.launchImageLibraryAsync({
        mediaTypes:'Images'
    }).then(image=>{
        console.log('IMAGE: '+JSON.stringify(image));
        if (!image.cancelled) {
            this.uploadPhoto(image.uri, this.props.account.user.uid)
            this.setState({ image: image.uri, photoURL: photoURL });
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
        allowsEditing:true
    }).then(image=>{
        //console.log('IMAGE: '+JSON.stringify(image));
        if (!image.cancelled) {
            this.setState({ image: image.uri });
        }else{
            console.log('CANCEL!');
        }
    }).catch(e=>{
        console.log('Image picker error: '+ JSON.stringify(e));
    })
  }

    async uploadPhoto(uri, uid){
        //alert(uid);
        //this.setState({loading:true});
        const response = await fetch(uri);
        const blob = await response.blob();
        var storageRef = firebase.storage().ref().child('/images/avatar/'+uid+'.jpg');
        storageRef.put(blob, {contentType: 'image/*'}).then(()=>storageRef.getDownloadURL()).then(downloadURI=>{
            console.log(downloadURI);
            this.setState({photoURL:downloadURI, showImageGrabModal:false});
        }).catch(e=>{
            console.log('ERRRR'+e)
        })
    };

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
                {this.state.photoURL!==''?
                <Image source={{uri:this.state.photoURL}} style={{
                    height:AVATAR_SIZE, 
                    width:AVATAR_SIZE, 
                    borderRadius: AVATAR_SIZE/2,
                    marginBottom:10
                }}/>
                :<Image source={{uri:DEFAULT_IMAGE_SOURCE}} style={{
                    height:AVATAR_SIZE, 
                    width:AVATAR_SIZE, 
                    borderRadius: AVATAR_SIZE/2,
                    marginBottom:10
                }}/>
                }

                </TouchableOpacity>
            </View>
            <Hoshi
            label={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.firstName}
            borderColor={'#b76c94'}
            onChangeText={value =>
                this.debouncedSetState({ firstName: value })
        ``  }
            />
            <Hoshi
            label={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.lastName}
            borderColor={'#b76c94'}
            onChangeText={value =>
                this.debouncedSetState({ lastName: value })
            }
            />
            <Hoshi
            label={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.phoneNumber}
            borderColor={'#b76c94'}
            onChangeText={value =>
                this.debouncedSetState({ mobile: value })
            }
            keyboardType='numeric'
            />
            {/*<Fumi
              label={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.firstName}
              iconClass={FontAwesomeIcon}
              iconName={'user'}
              iconColor={'#f95a25'}
              iconSize={20}
              onChangeText={value =>
                this.debouncedSetState({ firstName: value })
              }
              keyboardType='email-address'
            />
            <Fumi
              label={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.lastName}
              iconClass={FontAwesomeIcon}
              iconName={'user'}
              iconColor={'#f95a25'}
              iconSize={20}
              onChangeText={value =>
                this.debouncedSetState({ lastName: value })
              }
              
            />

            <Fumi
                iconClass={FontAwesomeIcon}
                iconName={'phone'}
                iconColor={'#f95a25'}
                iconSize={20}
                label={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.phoneNumber}
                onChangeText={value =>
                  this.debouncedSetState({ mobile: value })
                }
                keyboardType='numeric'
            />*/}

              {/* <TouchableOpacity onPress={this.renderUserTypeSelection.bind(this)}>
              <View style={{flex: 1, paddingTop:20, flexDirection:'row'}}>
  
                <Text style={{fontSize:16, fontWeight:'bold'}}>Sign up as:</Text>
                <Text style={{fontSize:16, marginLeft:20}}>{this.state.dropdownText}</Text>
                </View>

              </TouchableOpacity> */}


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
                onPress={() => this.register()}
                disabled={this.state.loading}
            >
                <Text style={{ color: 'white' }}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.next}</Text>
            </Button>
          </View>
          <Modal isVisible={this.state.showImageGrabModal} style={{justifyContent:'center', alignItems:'center'}} onBackdropPress={()=>this.setState({showImageGrabModal:false})}>
          <View style={{backgroundColor:'#fff',paddingTop:10, paddingBottom:10, width:width*0.8, borderRadius:10}}>
            <View style={{padding:10, borderBottomColor:'#ddd', borderBottomWidth:1}}>
                <View><Text style={{fontSize:23, marginLeft:20}}>{'Choose a photo from:'}</Text></View>
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
