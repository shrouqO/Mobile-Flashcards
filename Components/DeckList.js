import React, {Component} from 'react'
import { StyleSheet,Text, View ,Button} from 'react-native';
import { getDecks } from '../utils/api'
import {getData}from '../utils/api'
import {recieveDecks} from '../Actions'
import { lightGray, white, purple } from '../utils/colors'
import {connect} from 'react-redux'

class DeckList extends Component {
    componentDidMount(){
        getDecks()
        .then(decks => this.props.recieveAllDecks(decks))
     
      }
      getCardsLength = (questions) => {
        if(questions.length === 0) {
          return <Text>0 cards</Text>
        }else if(questions.length >= 1){
          return <Text>{questions.length} cards</Text>
        }
    }
    render() { 
        // const decks=getData()
        const {decks} = this.props

        return ( 
        <View style={styles.container}>
            {Object.keys(decks).map((deck)=> {
            const {title ,questions} = decks[deck]
            return (
            <View key={deck} style={styles.card}>
                <Text style={styles.cardText}>{title}</Text>
                <Text style={styles.count}>{questions ? questions.length : 0} cards</Text>
                <Button
                onPress={() => this.props.navigation.navigate('Details',{entryId:deck})}
                title='view deck'
                />
            </View>
            )
        })}
        </View>
        );
    }
}
const styles =StyleSheet.create({
    container :{
        flex:1,
        alignSelf: 'stretch',
        padding:2,
    },
    card: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: lightGray,
      margin: 2,
      height: 100,
    },
    cardText: {
      fontSize: 30,
      color: purple
  
    },
    count:{
      fontSize: 20,
      color: white
    }
})
function mapStateToProps(decks){
  return {
    decks,
  }
}

function mapDispatchToProps( dispatch ){
  return {
    recieveAllDecks: (decks) => dispatch(recieveDecks(decks))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)