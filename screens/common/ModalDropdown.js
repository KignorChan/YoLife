import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, Text, TouchableOpacity } from 'react-native';
import { FormLabel } from 'react-native-elements';

export class ModalDropdown extends Component {
  static defaultProps = {
    labels:[],
    handlePress:()=>alert('Can not handle on press'),
  }

  componentDidMount(){
  }
  render() {
    const { labels, handlePress } = this.props;
    console.log(JSON.stringify(labels))

    return (
      <View style={{backgroundColor:'#fff'}}>
        {labels.map((label, idx) => (
          <TouchableWithoutFeedback
            key={idx}
            onPress={() => handlePress(label, idx)}
          >
            <View style={{padding:20, paddingTop:15, paddingBottom:15}}>
              <Text style={{fontSize:16, color:'#999'}}>{label}</Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    );
  }
}

export default ModalDropdown;
