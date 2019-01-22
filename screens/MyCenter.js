import React,{Component} from 'react';
import {View, 
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    Image,
    AsyncStorage,
    DeviceEventEmitter,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';

import DeviceSetting from '../utils/DeviceSetting';

const { width, height } = Dimensions.get('window');
const HEADER_HEIGHT = height*0.18;
const AVATAR_SIZE = HEADER_HEIGHT*0.5;

class MyCenter extends React.Component {

    componentDidMount(){
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
                    <Image source={require('../assets/images/qq.jpg')} style={avatar}/>
                    <Text style={headerUsername}>UserName</Text>
                </View>
                <ScrollView style={buttonSection}>

                    <TouchableOpacity style={styles.buttonContainer}>
                        <Icon 
                            name={'ios-briefcase'}
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
                  
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonContainer}>
                        <Icon 
                            name={'ios-briefcase'}
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
                        <Icon 
                            name={'ios-briefcase'}
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
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Icon 
                            name={'ios-briefcase'}
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

                    <TouchableOpacity style={styles.buttonContainer}>
                        <Icon 
                            name={'ios-briefcase'}
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

                    <TouchableOpacity style={styles.buttonContainer}>
                        <Icon 
                            name={'ios-briefcase'}
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

                    <TouchableOpacity style={styles.buttonContainer}>
                        <Icon 
                            name={'ios-briefcase'}
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
        backgroundColor:'#fff',
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
    }

}

export default MyCenter;