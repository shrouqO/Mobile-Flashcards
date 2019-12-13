import React, { Component} from 'react'
import NewDeck from './Components/NewDeck'
import DeckList from './Components/DeckList'
import DeckView from './Components/DeckView'
import AddCard from './Components/AddCard'
import Quize from './Components/Quiz';
import { View,StatusBar} from 'react-native'
import { black } from './utils/colors'
import Constants from 'expo-constants';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducer'
import { setLocalNotification } from './utils/helpers'

function UdaciStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor,
                 height: Constants.statusBarHeight }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}
const HomeStack = createStackNavigator({
  Decks: DeckList,
  newCard: AddCard,
});

const AddDeckstack = createStackNavigator({
  newDeck: NewDeck,
  Details: DeckView,
  Quizepage:Quize
});

const AppContainer =createAppContainer(
  createBottomTabNavigator(
    {
      Home: HomeStack,
      AddDeck: AddDeckstack,
    }
  )
);
export default class App extends Component{
  componentDidMount() {
    setLocalNotification()
  }

  render(){
    return(
      <Provider store ={createStore(reducer)}>
        <View style={{flex:1}}>
          <UdaciStatusBar backgroundColor={black} barStyle='light-content'/>
        <AppContainer/>
        </View>
      </Provider>
    );
  }
}