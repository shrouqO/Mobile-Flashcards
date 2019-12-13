import React, { Component } from 'react'
import { StyleSheet, Text, View,TouchableOpacity ,TextInput } from 'react-native'
import { saveDeckTitle } from '../utils/api'
import { addDeck } from '../Actions'
import { connect } from 'react-redux'
import { blue, white,purple,black } from '../utils/colors'


class NewDeck extends Component {
    state ={
      text:''
    }

    submitName = ()=> {
        const { text } = this.state
      if (this.state.text){
      saveDeckTitle(text)	
      this.props.dispatch(addDeck(text))
      this.props.navigation.navigate('Details',{entryId: text})
      this.setState({
		    text: ''
	})
  }
}

  render(){
    return(  
  <View style={styles.container}>
    <Text style={styles.title}>What is the title of your new deck?</Text>

    <TextInput style={styles.input}
      onChangeText={(text)=>this.setState({text})}
      value={this.state.text}>
    </TextInput>

    <TouchableOpacity style={styles.submitBtn} onPress={this.submitName}>
    <Text style={styles.submitBtnText}>
      Submit
    </Text>
    </TouchableOpacity> 
  </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	input: {
		width: 200,
		height: 44,
		padding: 8,
		borderWidth: 1,
		borderColor: purple,
		margin: 50
	},
	title: {
		fontSize: 20,
		color: black,
	},
	submitBtn: {
        borderWidth: 0.5,
        borderColor: purple,
        padding: 8,
        backgroundColor: blue,
        borderRadius: 7,
        overflow: 'hidden'
	},
	submitBtnText: {
	    color: white,
	    fontSize: 22,
	    textAlign: 'center'
  },
 
});

export default connect()(NewDeck)
