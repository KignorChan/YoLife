import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';



class Classify extends Component{
    render(){
        return(
            <View style={styles.icons}>
                <TouchableOpacity style={styles.iconitem} onPress={()=>{
                    //Actions.push('businesstypelist',{businessType:'美食外卖'});
                }}>
                    <View style={styles.icon}>
                        <Image 
                            source={require('../images/icons/homeTypeIcon/food.png')}
                            style={{
                                height:width*0.085,
                                width:width*0.085,
                                tintColor:'black',
                                
                            }}
                        />
                    </View>
                    <Text style={styles.icontitle}>美食外卖</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconitem} onPress={()=>{
                    //Actions.push('businesstypelist',{businessType:'万能快跑'})
                }}>
                    <View style={styles.icon}>
                        <Image 
                            source={require('../images/icons/homeTypeIcon/delivary.png')}
                            style={{
                                height:width*0.085,
                                width:width*0.085,
                                tintColor:'black',
                                
                            }}
                        />
                    </View>
                    <Text style={styles.icontitle}>万能快跑</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconitem} onPress={()=>{
                    //Actions.push('businesstypelist',{businessType:'甜品饮品'})
                }}>
                    <View style={styles.icon}>
                        <Image 
                            source={require('../images/icons/homeTypeIcon/drink.png')}
                            style={{
                                height:width*0.085,
                                width:width*0.085,
                                tintColor:'black',
                                
                            }}
                        />
                    </View>
                    <Text style={styles.icontitle}>甜品饮品</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconitem} onPress={()=>{
                    //Actions.push('businesstypelist',{businessType:'美妆母婴'})
                }}>
                    <View style={styles.icon}>
                        <Image 
                            source={require('../images/icons/homeTypeIcon/milk.png')}
                            style={{
                                height:width*0.085,
                                width:width*0.085,
                                tintColor:'black',
                                
                            }}
                        />
                    </View>
                    <Text style={styles.icontitle}>美妆母婴</Text>
                </TouchableOpacity>         
            </View>
                
        )
    }
}
var {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFE',
    },
    icons:{
        flexDirection:'row',
        paddingBottom: 10,
        paddingTop:6,
        justifyContent:'space-around',
        backgroundColor:'#FFFFFE',
        height:120

    },
    iconitem:{
        width:'20%',
        alignItems:'center',
        borderRadius:10,
        paddingTop: 5,
    },
    icon:{
        width:width*0.14,
        height:width*0.14,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
        borderRadius:100,
        borderColor:'#000',
        borderWidth:1
    },
    icontitle:{
        fontSize:15,
        marginTop: 10,
    },

});

export default Classify;