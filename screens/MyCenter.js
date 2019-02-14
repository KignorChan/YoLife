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
import { logOut } from '../redux/actions/user';
import Toast from 'teaset/components/Toast/Toast';

const { width, height } = Dimensions.get('window');
const HEADER_HEIGHT = height*0.18;
const AVATAR_SIZE = HEADER_HEIGHT*0.5;
const DEFAULT_IMAGE_SOURCE = require('../assets/images/qq.jpg');


class MyCenter extends React.Component {
    static defaultProps = {
        user:{
            email:''
        }
    }

    componentDidMount(){
    }

    _goLoginPage(){
        Actions.push('login');
    }

    _goLoginPageWithErrorMassage(){
        Toast.fail('Please login first!')
        Actions.push('login');
    }

    _goToFavorites(){
        if(this.props.isLoggedIn){
            alert('comming soon')
        }else{
            this._goLoginPageWithErrorMassage()
        }
    }

    _goToManageStore(){
        if(this.props.isLoggedIn){
            alert('comming soon')
        }else{
            this._goLoginPageWithErrorMassage()
        }
    }

    _goToAddBusiness(){
        if(this.props.isLoggedIn){
            Actions.push('addbusinesses')
        }else{
            this._goLoginPageWithErrorMassage()
        }
    }

    _goToSetting(){
        // if(this.props.isLoggedIn){
             Actions.push('setting')
        // }else{
        //     this._goLoginPageWithErrorMassage()
        // }
        
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
                {
                    this.props.isLoggedIn?
                    <TouchableOpacity onPress={()=>Actions.push('profile')} style={styles.left}>
                    {
                        this.props.user.photoUrl?
                        <Image source={{uri:this.props.user.photoUrl}} style={avatar}/>:
                        <Image source={DEFAULT_IMAGE_SOURCE} style={avatar}/>
                    }
                        
                        <Text style={headerUsername}>{this.props.user.email}</Text>
                    </TouchableOpacity>:
                    <TouchableOpacity onPress={()=>this._goLoginPage()} style={styles.left}>
                        <Image source={require('../assets/images/qq.jpg')} style={avatar}/>
                        <Text style={headerUsername}>{this.props.language.loginText}</Text>
                    </TouchableOpacity> 
                }

                    
                </View>
                
                <ScrollView style={buttonSection}>

                    {/*<TouchableOpacity style={styles.buttonContainer}>
                        <SimpleLineIcons 
                            name={'paper-clip'}
                            size={25}
                            color='#000'
                            style={styles.buttonIcon}
                        />
         
                        <Text style={styles.buttonText}>{this.props.language.myProfile}</Text>
                        <Icon 
                            name={'ios-arrow-forward'}
                            size={25}
                            style={styles.buttonArrowIcon}
                        />
                  
        </TouchableOpacity>*/}

                    <TouchableOpacity style={styles.buttonContainer} onPress={()=>{this._goToFavorites()}}>
                        <SimpleLineIcons 
                            name={'star'}
                            size={25}
                            color='#000'
                            style={styles.buttonIcon}
                        />
        
                        <Text style={styles.buttonText}>{this.props.language.favoriteStore}</Text>
                        <Icon 
                            name={'ios-arrow-forward'}
                            size={25}
                            style={styles.buttonArrowIcon}
                        />
                
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonContainer} onPress={()=>{this._goToManageStore()}}>
                        <SimpleLineIcons 
                            name={'organization'}
                            size={25}
                            color='#000'
                            style={styles.buttonIcon}
                        />
        
                        <Text style={styles.buttonText}>{this.props.language.manageStore}</Text>
                        <Icon 
                            name={'ios-arrow-forward'}
                            size={25}
                            style={styles.buttonArrowIcon}
                        />
                
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonContainer} onPress={()=>{this._goToAddBusiness()}}>
                        <SimpleLineIcons 
                            name={'plus'}
                            size={25}
                            color='#000'
                            style={styles.buttonIcon}
                        />
        
                        <Text style={styles.buttonText}>{this.props.language.addBusiness}</Text>
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
        
                        <Text style={styles.buttonText}>{this.props.language.contactUs}</Text>
                        <Icon 
                            name={'ios-arrow-forward'}
                            size={25}
                            style={styles.buttonArrowIcon}
                        />
                
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonContainer} onPress={()=>{this._goToSetting()}}>
                        <SimpleLineIcons 
                            name={'settings'}
                            size={25}
                            color='#000'
                            style={styles.buttonIcon}
                        />
        
                        <Text style={styles.buttonText}>{this.props.language.setting}</Text>
                        <Icon 
                            name={'ios-arrow-forward'}
                            size={25}
                            style={styles.buttonArrowIcon}
                        />
                
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.gotoLogout()} style={styles.buttonContainer}>
                        <SimpleLineIcons 
                            name={'logout'}
                            size={25}
                            color='#000'
                            style={styles.buttonIcon}
                        />
        
                        <Text style={styles.buttonText}>{this.props.language.logout}</Text>
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
        language: store.setting.language,
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
