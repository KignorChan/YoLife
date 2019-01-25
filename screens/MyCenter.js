import React,{Component} from 'react';
import {View, 
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    Image,
    Button,
    AsyncStorage,
    DeviceEventEmitter,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import DeviceSetting from '../utils/DeviceSetting';
import { logOut } from '../redux/actions/user';

const { width, height } = Dimensions.get('window');
const HEADER_HEIGHT = height*0.18;
const AVATAR_SIZE = HEADER_HEIGHT*0.5;

class MyCenter extends React.Component {

    componentDidMount(){
    }

    _goLoginPage(){
        Actions.push('login');
    }
    
    render(){
        const { 
            container, 
            header, 
            avatar,
            headerUsername,
            buttonSection 
        } = styles;

        return(
            <SafeAreaView style={container}>
                <View style={header}>
                    <TouchableOpacity onPress={()=>this._goLoginPage()} style={styles.left}>
                        <Image source={require('../assets/images/qq.jpg')} style={avatar}/>
                        <Text style={headerUsername}>{this.props.isLoggedIn ? this.props.user.email :  DeviceSetting.setting.APP_LANGUAGE_PACKAGE.loginText}</Text>
                    </TouchableOpacity> 
                </View>
                
                <ScrollView style={buttonSection}>

                    {/*<TouchableOpacity style={styles.buttonContainer}>
                        <SimpleLineIcons 
                            name={'paper-clip'}
                            size={25}
                            color='#000'
                            style={styles.buttonIcon}
                        />
         
                        <Text style={styles.buttonText}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.myProfile}</Text>
                        <Icon 
                            name={'ios-arrow-forward'}
                            size={25}
                            style={styles.buttonArrowIcon}
                        />
                  
        </TouchableOpacity>*/}

                    <TouchableOpacity style={styles.buttonContainer}>
                        <SimpleLineIcons 
                            name={'star'}
                            size={25}
                            color='#000'
                            style={styles.buttonIcon}
                        />
        
                        <Text style={styles.buttonText}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.favoriteStore}</Text>
                        <Icon 
                            name={'ios-arrow-forward'}
                            size={25}
                            style={styles.buttonArrowIcon}
                        />
                
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonContainer}>
                        <SimpleLineIcons 
                            name={'organization'}
                            size={25}
                            color='#000'
                            style={styles.buttonIcon}
                        />
        
                        <Text style={styles.buttonText}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.manageStore}</Text>
                        <Icon 
                            name={'ios-arrow-forward'}
                            size={25}
                            style={styles.buttonArrowIcon}
                        />
                
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonContainer} onPress={()=>{Actions.push('addbusinesses')}}>
                        <SimpleLineIcons 
                            name={'plus'}
                            size={25}
                            color='#000'
                            style={styles.buttonIcon}
                        />
        
                        <Text style={styles.buttonText}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.addBusiness}</Text>
                        <Icon 
                            name={'ios-arrow-forward'}
                            size={25}
                            style={styles.buttonArrowIcon}
                        />
                
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonContainer} onPress={()=>{Actions.push('contactus')}}>
                        <SimpleLineIcons 
                            name={'phone'}
                            size={25}
                            color='#000'
                            style={styles.buttonIcon}
                        />
        
                        <Text style={styles.buttonText}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.contactUs}</Text>
                        <Icon 
                            name={'ios-arrow-forward'}
                            size={25}
                            style={styles.buttonArrowIcon}
                        />
                
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonContainer} onPress={()=>{Actions.push('setting')}}>
                        <SimpleLineIcons 
                            name={'settings'}
                            size={25}
                            color='#000'
                            style={styles.buttonIcon}
                        />
        
                        <Text style={styles.buttonText}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.setting}</Text>
                        <Icon 
                            name={'ios-arrow-forward'}
                            size={25}
                            style={styles.buttonArrowIcon}
                        />
                
                    </TouchableOpacity>

                    {/*<TouchableOpacity onPress={() => this.props.gotoLogout()} style={styles.buttonContainer}>
                        <SimpleLineIcons 
                            name={'logout'}
                            size={25}
                            color='#000'
                            style={styles.buttonIcon}
                        />
        
                        <Text style={styles.buttonText}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.logout}</Text>
                        <Icon 
                            name={'ios-arrow-forward'}
                            size={25}
                            style={styles.buttonArrowIcon}
                        />
                
                        </TouchableOpacity>*/}

                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = {
    container:{
        flex:1,
        backgroundColor:'#fff',
        paddingTop: Platform.OS==='android'?StatusBar.currentHeight:0,
        

    },
    header:{
        height:HEADER_HEIGHT,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 10,
        backgroundColor:'#fff',
    },
    avatar:{
        height:AVATAR_SIZE,
        width:AVATAR_SIZE,
        borderRadius: AVATAR_SIZE/2,
    },
    headerUsername:{
        fontSize: 20,
        marginLeft: 15,
    },
    buttonSection:{
        backgroundColor:'#eee'
    },
    buttonContainer:{
        backgroundColor:'#fff',
        marginTop:2,
        flexDirection:'row',
        alignItems: 'center',
        paddingLeft:20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 20,
        
    },
    buttonIcon:{
    },
    buttonText:{
        fontSize:18,
        flex:1,
        marginLeft: 20
    },
    buttonArrowIcon:{
        justifyContent:'flex-end',
        color:'rgba(0,0,0,0.3)',
    },
    left:{
        width:'70%',
        height:width/3/2,
        marginLeft: 10,
        flexDirection:'row',
        alignItems:'center',
    },

}


function mapState2Props(store){
    return {
        isLoggedIn: store.userStore.isLoggedIn,
        user: store.userStore.user,
        status: store.userStore.status,
    }
}

function mapDispatch2Props(dispatch){
    return {
        gotoLogout(){
            dispatch(logOut());
        }
    }
}


export default connect(mapState2Props,mapDispatch2Props)(MyCenter);
