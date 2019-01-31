import React from 'react';
import { View, Text, ScrollView, SafeAreaView, Platform, StatusBar, Dimensions, TouchableOpacity } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import DeviceSetting from '../utils/DeviceSetting';
import SettingHeader from './components/SettingHeader';
import { logOut } from '../redux/actions/user';

const { width, height } = Dimensions.get('window');
const HEADER_HEIGHT = height*0.18;
const AVATAR_SIZE = HEADER_HEIGHT*0.5;

class Setting extends React.Component{
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
                <SettingHeader/>
                <ScrollView style={buttonSection}>
                    <TouchableOpacity style={[styles.buttonContainer,{marginTop:20}]} onPress={()=>{Actions.push('languagessetting')}}>
                        <EntypoIcon 
                            name={'language'}
                            size={25}
                            color='#000'
                            style={styles.buttonIcon}
                        />
                        <Text style={styles.buttonText}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.language}</Text>
                        <Icon 
                            name={'ios-arrow-forward'}
                            size={25}
                            style={styles.buttonArrowIcon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer} onPress={()=>{Actions.push('locationsetting')}}>
                        <EntypoIcon 
                            name={'location'}
                            size={25}
                            color='#000'
                            style={styles.buttonIcon}
                        />
                        <Text style={styles.buttonText}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.location}</Text>
                        <Icon 
                            name={'ios-arrow-forward'}
                            size={25}
                            style={styles.buttonArrowIcon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer} onPress={()=>{}}>
                        <EntypoIcon 
                            name={'credit-card'}
                            size={25}
                            color='#000'
                            style={styles.buttonIcon}
                        />
                        <Text style={styles.buttonText}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.payment}</Text>
                        <Icon 
                            name={'ios-arrow-forward'}
                            size={25}
                            style={styles.buttonArrowIcon}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.buttonContainer,{marginTop:20}]} onPress={()=>{}}>
                        <EntypoIcon 
                            name={'info-with-circle'}
                            size={25}
                            color='#000'
                            style={styles.buttonIcon}
                        />
                        <Text style={styles.buttonText}>{DeviceSetting.setting.APP_LANGUAGE_PACKAGE.aboutUs}</Text>
                        <Icon 
                            name={'ios-arrow-forward'}
                            size={25}
                            style={styles.buttonArrowIcon}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.buttonContainer,{marginTop:20}]} onPress={()=>{this.props.gotoLogout();Actions.pop()}}>
                        <EntypoIcon 
                            name={'log-out'}
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
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView> 
        )
    }
}

const styles = {
    container:{
        flex:1,
        backgroundColor:'#eee',
        paddingTop: Platform.OS==='android'?StatusBar.currentHeight:0,
    },
    header:{
        height:HEADER_HEIGHT,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: width*0.1,
        backgroundColor:'#fff',
    },
    avatar:{
        height:AVATAR_SIZE,
        width:AVATAR_SIZE,
        borderRadius: AVATAR_SIZE/2,
    },
    headerUsername:{
        fontSize: 24,
        marginLeft: 20,
    },
    buttonSection:{
        backgroundColor:'#eee',
        paddingTop:0
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
    }
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


export default connect(mapState2Props,mapDispatch2Props)(Setting);