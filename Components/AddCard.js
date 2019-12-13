import React, { Component } from 'react'
import { addCardToDeck } from '../utils/api'
import { NavigationActions } from 'react-navigation'
import { blue, white,purple,black} from '../utils/colors'
import { connect } from 'react-redux'
import { addCard } from '../Actions'
import { StyleSheet, 
        Text,
        View,
        TouchableOpacity,
        TextInput,
        KeyboardAvoidingView } from 'react-native'

class AddCard extends Component {
    state = { 
        question: '',
        answer: '',
        correctAnswer: ''
    }

    submitCard = (deck) => {

        const { question, answer,correctAnswer } = this.state

        if (question && answer){
		this.props.dispatch(addCard({question, answer, deck,correctAnswer}))		
		addCardToDeck(deck, {question, answer} )
		this.setState({ question: '', answer: '',correctAnswer: ''})
		this.props.navigation.dispatch(NavigationActions.back({ key: null }))
        }
	}


    render() { 
        const deckName = this.props.navigation.state.params.entryId
        return ( 
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.title}>What is the question?</Text>
                <TextInput style={styles.input}
                    onChangeText={(question) => this.setState({ question })}
			        value={this.state.question}
                />
                <Text style={styles.title}>the correct answer is</Text>
			    <TextInput
			        style={styles.input}
			        onChangeText={(answer) => this.setState({ answer })}
			        value={this.state.answer}
			    />
			    <Text style={styles.title}>True or False?</Text>
			    <TextInput
			        style={styles.input}
			        onChangeText={(correctAnswer) => this.setState({ correctAnswer })}
			        value={this.state.correctAnswer}
			    />
                <TouchableOpacity style={styles.submitBtn} onPress={() => this.submitCard(deckName)}>
                    <Text style={styles.submitBtnText}>
                        submit
                    </Text>
                </TouchableOpacity>

            </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',

	},
	submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
    },
    title: {
		fontSize: 20,
		color: black,
	},
	submitBtn: {
        borderWidth: 0.5,
        padding: 10,
        backgroundColor: blue,
        borderRadius: 7,
        overflow: 'hidden'
	},
    input: {
		  width: 250,
		  height: 40,
		  padding: 8,
		  borderWidth: 1,
		  borderColor: purple,
		  margin: 20
	},
})
export default connect()(AddCard);