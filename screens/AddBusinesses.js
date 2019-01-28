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
} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Carousel from 'react-native-looped-carousel';
import Modal from "react-native-modal";

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
            category:''
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
                        <Text style={{color:'#aaa',marginBottom:5}}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.businessName+': '}</Text>
                        <TextInput style={{fontSize:20, borderBottomColor:'#000', borderBottomWidth:1}} />
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
                        <Text style={{color:'#aaa',marginBottom:5}}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.description+': '}</Text>
                        <TextInput style={{fontSize:20, borderBottomColor:'#000', borderBottomWidth:1}} />
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
                        <Text style={{color:'#aaa',marginBottom:5}}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.ownerName+': '}</Text>
                        <TextInput style={{fontSize:20, borderBottomColor:'#000', borderBottomWidth:1}} />
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
                        <Text style={{color:'#aaa',marginBottom:5}}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.tags+': '}</Text>
                        <TextInput style={{fontSize:20, borderBottomColor:'#000', borderBottomWidth:1}} />
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
            submitButtonTextStyle
        }=styles;

        return(
            <ScrollView style={{flex:1}}>
            <View style={{flex:1, alignItems:'center'}}>
                <TouchableOpacity style={buttonStyle} onPress={()=>{this._toggleModal()}}>
                    <Text style={buttonTextStyle}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.addCategory}</Text>
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
                    <Text style={{color:'#aaa',marginBottom:5}}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.telephoneNumber+': '}</Text>
                    <TextInput style={{fontSize:20, borderBottomColor:'#000', borderBottomWidth:1}} />
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
                    <Text style={{color:'#aaa',marginBottom:5}}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.email+': '}</Text>
                    <TextInput style={{fontSize:20, borderBottomColor:'#000', borderBottomWidth:1}} />
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
                    <Text style={{color:'#aaa',marginBottom:5}}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.website+': '}</Text>
                    <TextInput style={{fontSize:20, borderBottomColor:'#000', borderBottomWidth:1}} />
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
                    <Text style={{color:'#aaa',marginBottom:5}}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.address+': '}</Text>
                    <TextInput style={{fontSize:20, borderBottomColor:'#000', borderBottomWidth:1}} />
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
            <KeyboardAvoidingView style={container} enabled behavior='padding' keyboardVerticalOffset={Platform.OS==='android'?100:0}>
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

                <Modal style={{flex:1}} isVisible={this.state.showAddCategoryModal} onBackdropPress={this._toggleModal}>
                    <View style={modalContent}>
                        <TextInput
                        style={{
                            height: 40,
                            width: '100%',
                            borderColor: 'gray',
                            borderBottomWidth: 1,
                        }}
                        onChangeText={text => this.setState({ category: text })}
                        value={this.state.category}
                        />
                        <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            margin: 10,
                        }}
                        >
                        <TouchableOpacity style={buttonStyle} onPress={()=>{this.addCategory}}>
                            <Text style={buttonTextStyle}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.confirm}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={submitButtonStyle}
                            onPress={()=>{this._toggleModal()}}
                        >
                            <Text style={submitButtonTextStyle}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.cancel}</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                
            </KeyboardAvoidingView>
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
        width: 140,
        marginTop: 10,
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
        width: 120,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        justifyContent:'center',
        alignItems: 'center',
    },
    submitButtonTextStyle: {
        color: '#fff',
        fontSize: 18,
    }
}

export default AddBusinesses;