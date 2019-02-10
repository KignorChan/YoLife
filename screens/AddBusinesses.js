import React, { Component } from 'react'
import { 
    View, 
    Text, 
    TextInput, 
    Dimensions, 
    TouchableOpacity, 
    Image, 
    ScrollView, 
    Platform, 
    StatusBar, 
    SafeAreaView, 
    KeyboardAvoidingView, 
    Keyboard, 
    Animated, 
    Alert
} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Carousel from 'react-native-looped-carousel';
import Modal from "react-native-modal";
import { Actions } from 'react-native-router-flux';
import {Toast} from 'teaset';
import { Isao,Fumi, Hoshi } from 'react-native-textinput-effects';
import { connect } from 'react-redux';
import { CONSTANT_API, ADDRESS_TYPE } from '../constants/Constants';


import DeviceSetting from '../utils/DeviceSetting';

const { width, height } = Dimensions.get('window');

const BUSINESS_IMAGE_WIDTH = width;
const BUSINESS_IMAGE_HEIGHT = BUSINESS_IMAGE_WIDTH*0.6;
const ADD_PHOTO_ICON_SIZE = 60;


var ScrollableTabView = require('react-native-scrollable-tab-view');

const keyboardVerticalOffset = Platform.OS === 'ios' ? 100 : 0

class AddBusinesses extends Component{

    constructor(props){
        super(props);

        this.state = {
            showAddCategoryModal:false,
            category:'',
            items:[],

            businessName:'',
            description:'',
            ownerName:'',
            tags:'',
            telephoneNumber:'',
            email:'',
            website:'',
            address:'',
        }

        this.keyboardMove = new Animated.ValueXY();
    }

    componentDidMount(){
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
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

    _toggleModal(){
        this.setState({showAddCategoryModal:!this.state.showAddCategoryModal, category:''})
        //alert(this.state.showAddCategoryModal)
    }

    _handleSubmit(){
        //Toast.success('Success!')
        if(this.state.businessName===''){
            alert('Business name can not be empty');
            return;
        }
        if(this.state.address===''){
            alert('Business address can not be empty');
            return;
        }

        var address = {
            addressType:ADDRESS_TYPE.businessAddress,
            address:this.state.address,
            latitude: this.props.location.coords.latitude!==undefined?this.props.location.coords.latitude:0.000,
            longitude: this.props.location.coords.longitude!==undefined?this.props.location.coords.longitude:0.000,
        }

        var business = {
            uid:this.props.account.uid,
            businessName:this.state.businessName,
            description:this.state.description,
            ownerName:this.state.ownerName,
            tags:this.state.tags,
            telephoneNumber:this.state.telephoneNumber,
            email:this.state.email,
            website:this.state.website,
            address:address,
        }
        console.log('business: '+JSON.stringify(business));

        Alert.alert('Business added', 'Your business has been created!',[{text:'OK', onPress:()=>Actions.pop()}]);
        
    }

    _addressSetting(){
        Actions.push('addressinputview',{
          _getAddress: (address)=>{this.setState({address})},
          address:this.state.address
      });
    }

    _renderInformationSection(){
        const {
            carouselStyle,
        } = styles;
        return (
            <Animated.ScrollView style={[{flex:1}]}>
                <Carousel
                    delay={3000}
                    autoplay={false}
                    onAnimateNextPage={(p) => console.log(p)}
                    style={carouselStyle}
                    isLooped={false}
                >
                    <Image source={require('../assets/images/noimages.jpg')} style={{width:BUSINESS_IMAGE_WIDTH, height:BUSINESS_IMAGE_HEIGHT, resizeMode:'contain'}} />
                </Carousel>

                <TouchableOpacity onPress={()=>{alert('Pressed')}} style={{position:'relative', left:width-ADD_PHOTO_ICON_SIZE, top:-ADD_PHOTO_ICON_SIZE}}>
                    <Image source={require('../assets/images/add_photo.png')} style={{width:ADD_PHOTO_ICON_SIZE, height:ADD_PHOTO_ICON_SIZE}} />
                </TouchableOpacity> 
                    <View style={{
                        justifyContent:'space-between', 
                        backgroundColor:'#fff',
                        paddingLeft:20,
                        paddingRight:20,
                        paddingTop:10,
                        paddingBottom:10,
                        marginTop:2,
                    }}>
                        <Hoshi
                        label={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.businessName}
                        borderColor={'#b76c94'}
                        onChangeText={(value)=>{
                          this.setState({ businessName: value })
                        }}
                        />
                    </View>
                    <View style={{
                        justifyContent:'space-between', 
                        backgroundColor:'#fff',
                        paddingLeft:20,
                        paddingRight:20,
                        paddingTop:10,
                        paddingBottom:10,
                        marginTop:2,
                    }}>
                        <Hoshi
                        label={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.description}
                        borderColor={'#b76c94'}
                        onChangeText={(value)=>{
                        this.setState({ description: value })
                        }}
                        />
                    </View>
                    <View style={{
                        justifyContent:'space-between', 
                        backgroundColor:'#fff',
                        paddingLeft:20,
                        paddingRight:20,
                        paddingTop:10,
                        paddingBottom:10,
                        marginTop:2,
                    }}>
                        <Hoshi
                        label={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.ownerName}
                        borderColor={'#b76c94'}
                        onChangeText={(value)=>{
                        this.setState({ ownerName: value })
                        }}
                        />
                    </View>
                    <View style={{
                        justifyContent:'space-between', 
                        backgroundColor:'#fff',
                        paddingLeft:20,
                        paddingRight:20,
                        paddingTop:10,
                        paddingBottom:10,
                        marginTop:2,
                    }}>
                        <Hoshi
                        label={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.tags}
                        borderColor={'#b76c94'}
                        onChangeText={(value)=>{
                        this.setState({ tags: value })
                        }}
                        />
                    </View>

                    <View style={{height:50}} />
            </Animated.ScrollView>
        )
    }

    _renderItemsSection(){
        const {
            modalContent,
            buttonStyle,
            buttonTextStyle,
            submitButtonStyle,
            submitButtonTextStyle,
            editButtonStyle
        }=styles;

        return(
            <ScrollView style={{flex:1}}>
                <View style={{
                    alignItems:'center', 
                    flexDirection:'row', 
                    justifyContent:'space-around', 
                    paddingTop: 10,
                    paddingBottom: 10,
                    borderBottomWidth:1,
                    borderColor: '#ddd'
                }}>
                    <TouchableOpacity style={editButtonStyle} onPress={()=>{this._toggleModal()}}>
                        <Text style={buttonTextStyle}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.addCategory}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={editButtonStyle} onPress={()=>{this._toggleModal()}}>
                        <Text style={buttonTextStyle}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.edit}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }

    _renderContactSection(){

        return (
            <ScrollView style={{flex:1}}>
                <View style={{
                    justifyContent:'space-between', 
                    backgroundColor:'#fff',
                    paddingLeft:20,
                    paddingRight:20,
                    paddingTop:10,
                    paddingBottom:10,
                    marginTop:2,
                }}>
                    <Hoshi
                    label={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.telephoneNumber}
                    borderColor={'#b76c94'}
                    onChangeText={(value)=>{
                    this.setState({ telephoneNumber: value })
                    }}
                    keyboardType='numeric'
                    />
                </View>
                <View style={{
                    justifyContent:'space-between', 
                    backgroundColor:'#fff',
                    paddingLeft:20,
                    paddingRight:20,
                    paddingTop:10,
                    paddingBottom:10,
                    marginTop:2,
                }}>
                    <Hoshi
                    label={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.email}
                    borderColor={'#b76c94'}
                    onChangeText={(value)=>{
                    this.setState({ email: value })
                    }}
                    />
                </View>
                <View style={{
                    justifyContent:'space-between', 
                    backgroundColor:'#fff',
                    paddingLeft:20,
                    paddingRight:20,
                    paddingTop:10,
                    paddingBottom:10,
                    marginTop:2,
                }}>
                    <Hoshi
                    label={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.website}
                    borderColor={'#b76c94'}
                    onChangeText={(value)=>{
                    this.setState({ website: value })
                    }}
                    />
                </View>
                <View style={{
                    justifyContent:'space-between', 
                    backgroundColor:'#fff',
                    paddingLeft:20,
                    paddingRight:20,
                    paddingTop:10,
                    paddingBottom:10,
                    marginTop:2,
                }}>
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
                </View>
            </ScrollView>
        )
    }

    render(){
        const {
            container,
            scrollableView,
            body,
            modalContent,
            buttonStyle,
            buttonTextStyle,
            submitButtonStyle,
            submitButtonTextStyle
        } = styles;

        return(
            <SafeAreaView style={{paddingTop: Platform.OS==='android'?StatusBar.currentHeight:0, backgroundColor:'#fff', flex:1}}>
            <KeyboardAvoidingView style={container} enabled behavior='padding' keyboardVerticalOffset={Platform.OS==='android'?100:0}>
                <View style={{height:50, flexDirection:'row', alignItems:'center', backgroundColor:'#fff'}}>
                <View style={{flex:1, paddingLeft:20}}>
                    <TouchableOpacity onPress={()=>{Actions.pop()}}>
                        <FeatherIcon name='arrow-left' size={28} />
                    </TouchableOpacity>
                </View>
                <View style={{flex:3, alignItems:'center'}}>
                    <Text style={{fontSize:18}}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.address}</Text>
                </View>
                <View style={{flex:1, paddingRight:20, alignItems:'flex-end'}}>
                    <TouchableOpacity onPress={()=>{this._handleSubmit()}}>
                        <FeatherIcon name='check-circle' size={28} />
                    </TouchableOpacity>
                </View>
                </View>
                <ScrollableTabView style={scrollableView}>
                    <View tabLabel={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.information} style={body}>
                        {this._renderInformationSection()}
                    </View>
                    <View tabLabel={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.items} style={body}>
                        {this._renderItemsSection()}
                    </View>
                    <View tabLabel={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.contact} style={body}>
                        {this._renderContactSection()}
                    </View>
                </ScrollableTabView>

                <Modal style={{flex:1}} isVisible={this.state.showAddCategoryModal} onBackdropPress={()=>this._toggleModal()}>
                    <View style={modalContent}>
                        <Hoshi
                        label={DeviceSetting.setting.APP_LANGUAGE_PACKAGE.categoryName}
                        borderColor={'#b76c94'}
                        onChangeText={(value)=>{
                        this.setState({ category: value })
                        }}
                        value={this.state.category}
                        style={{width:'100%'}}
                        />
                        <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            flexDirection: 'row',
                            margin: 10,
                            alignSelf: 'stretch',
                        }}
                        >
                        <TouchableOpacity
                            style={submitButtonStyle}
                            onPress={()=>{this._toggleModal()}}
                        >
                            <Text style={submitButtonTextStyle}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.cancel}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={buttonStyle} onPress={()=>{this.addCategory}}>
                            <Text style={buttonTextStyle}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.confirm}</Text>
                        </TouchableOpacity>

                        </View>
                    </View>
                </Modal>
                
            </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }
}

const styles = {
    container:{
        flex:1,
    },
    scrollableView:{
        backgroundColor:'#fff'
    },
    carouselStyle:{
        width:BUSINESS_IMAGE_WIDTH, 
        height:BUSINESS_IMAGE_HEIGHT
    },
    body:{
        flex:1,
    },
    modalContent:{
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    buttonStyle: {
        borderColor: '#000',
        backgroundColor: '#fff',
        borderWidth: 2,
        borderRadius: 0,
        width: width*0.3,
        marginLeft: 5,
        marginRight: 5,
        justifyContent:'center',
        alignItems: 'center',
    },
    buttonTextStyle: {
        color: '#000',
        fontSize: 18,
    },
    submitButtonStyle: {
        borderColor: '#fff',
        backgroundColor: '#000',
        borderWidth: 2,
        borderRadius: 0,
        width: width*0.3,
        marginLeft: 5,
        marginRight: 5,
        justifyContent:'center',
        alignItems: 'center',
    },
    submitButtonTextStyle: {
        color: '#fff',
        fontSize: 18,
    },
    editButtonStyle:
    {
        backgroundColor: '#fff',
        marginLeft: 5,
        marginRight: 5,
        justifyContent:'center',
        alignItems: 'center',
    }
}

function mapStateToProps(store){
    return{
        account: store.userStore.account,
        location: store.userStore.location,
    }
}
  
function mapDispatchToProps(dispatch){
    return {
        saveAccount(account){
            dispatch(saveAccount(account));
        },
        saveUser(user){
            dispatch(firstLogin(user));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBusinesses);