import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation'
import {StyleSheet, View ,Text, TouchableOpacity,Button} from 'react-native';
import { connect } from 'react-redux'
import {blue,lightGray,white,green,red,shinGreen} from '../utils/colors'

class Quiz extends Component {
    state = { 
        questionNumber: 0,
        showQuestion: false,
        correct: 0,
		incorrect: 0
     }
     showAnswer = () => (
		!this.state.showQuestion ? this.setState({ showQuestion: true }) 
		: this.setState({ showQuestion: false })
    )

    submitAnswer = (answer) => {
		
		const { questionNumber } = this.state
		const deck = this.props.navigation.state.params.entryId
		const decks = this.props.decks
		const correct = decks[deck].questions[questionNumber].correctAnswer.toLowerCase()
		
		
		if(answer.trim() === correct.trim()){
			this.setState({ correct: this.state.correct + 1 })
		}else {
			this.setState({ incorrect: this.state.correct + 1 })
		}
		this.setState({ questionNumber: this.state.questionNumber + 1, showQuestion: false })
		
	}

	replayQuiz = () => {

		this.setState({
			questionNumber: 0, 
			showQuestion: false,
			correct: 0,
			incorrect: 0
		})
	}

	goBack = () => {
		this.props.navigation.dispatch(NavigationActions.back({ key: null }))
	}
    

    render() { 
        const { questionNumber } = this.state
        const decks = this.props.decks
        const deck = this.props.navigation.state.params.entryId
        const number = this.state.questionNumber + 1

        if(questionNumber === decks[deck].questions.length){
			return (
				<View style={styles.container}>
					<View style={styles.card}>
						<Text style={styles.answer}>You got {this.state.correct} out of {decks[deck].questions.length}</Text>
						<View>
							<Button styles={styles} title={'Try again!'} color={green} onPress={this.replayQuiz}/>
				        	<Button styles={styles} title={'Back to Deck'} color={red} onPress={this.goBack}/>
						</View>
					</View>
				</View>
			)
		}


        return ( 
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.questions}>{number}/{decks[deck].questions.length}</Text>
                   
                    {!this.state.showQuestion ? <Text style={styles.mainText}>{decks[deck].questions[questionNumber].question}</Text>
					:<Text style={styles.mainText}>{decks[deck].questions[questionNumber].answer}</Text>}

                    {!this.state.showQuestion ? <Button title={"Show Answer"} style={styles.answer} onPress={this.showAnswer}/>
					: <Button title={"Show Question"} style={styles.answer} onPress={this.showAnswer}/>}
							
					<View>
						<TouchableOpacity style={styles.submitBtn1} onPress={()=>this.submitAnswer('true')}>
    					<Text style={styles.submitBtnText}>
      						Correct
    					</Text>
    					</TouchableOpacity> 
						
						<TouchableOpacity style={styles.submitBtn2} onPress={()=>this.submitAnswer('false')}>
    					<Text style={styles.submitBtnText}>
      						Incorrect
    					</Text>
    					</TouchableOpacity> 
					</View>
                   
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
		justifyContent: 'space-around',
		alignItems: 'center',
		margin: 10,
		backgroundColor: lightGray,
		alignSelf: 'stretch',
		
	},
	mainText: {
		fontSize: 40,
		color: blue,
		marginTop: 40,
		textAlign: 'center'
		
    },
    questions: {
        top: 0,
        alignSelf: 'flex-start',
        left: 0,
        top: 0,
        color: white,
        fontSize: 20,
        margin: 5,
        position: 'absolute',
	},
	submitBtn1: {
		borderWidth: 0.5,
		backgroundColor:shinGreen,
        padding: 10,
        borderRadius: 7,
        overflow: 'hidden'
	},
	submitBtn2: {
		borderWidth: 0.5,
		backgroundColor:red,
        padding: 10,
        borderRadius: 7,
        overflow: 'hidden'
	},
	submitBtnText: {
	    color: white,
	    fontSize: 22,
	    textAlign: 'center'
  }
})
function mapStateToProps(decks){
	return {
		decks
	}
}

export default connect(mapStateToProps)(Quiz)