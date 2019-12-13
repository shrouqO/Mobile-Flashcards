import React, { Component } from 'react'
import { StyleSheet, Text, View ,Button } from 'react-native'
import { connect } from 'react-redux'
import { red, white,blue,lightGray, purple } from '../utils/colors'


class DeckView extends Component {
        render() { 
          const deck = this.props.navigation.state.params.entryId
        
        getCardsLength = (questions) => {
          if(questions.length === 0) {
            return <Text>0 cards</Text>
          }else if(questions.length >= 1){
            return <Text>{questions.length}cards</Text>
          }
        }

        return (
          <View style={styles.container}>
            <View style={styles.card}>
            <Text style={styles.mainText}>{deck}</Text>
              <Button style={styles.iosBtn} title={'Add Card'} color={blue} onPress={() => this.props.navigation.navigate('newCard', { entryId: deck })}/>
              <Button style={styles.iosBtn} title={'Start Quiz'} color={red} onPress={() => this.props.navigation.navigate('Quizepage', { entryId: deck })}/>
            </View>
          </View>
        );
    }
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},

	card: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 10,
		backgroundColor: lightGray,
		alignSelf: 'stretch'
	},
	mainText: {
		fontSize: 30,
		color: purple,
	},
	iosBtn: {
    padding: 10,
    borderRadius: 7,
    height: 45,
    margin: 5,
    width: 160
    
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  },
})

function mapStateToProps(decks) {
    return decks
}
export default connect(mapStateToProps)(DeckView)