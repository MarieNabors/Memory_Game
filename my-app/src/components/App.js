// importing components
import React, { Component } from 'react';
import './App.css';
import Header from "./header";
import NameDiv from "./nameDiv";
import MemoryCards from "./memoryCrds";
import card from "../cards.json";

class App extends Component {
  
  state = {
    userScore: 0,
    highScore: 0,
    cards: card,
  
  }

  shuffleArrayUnfinished = array => {
    let arrayUnfinished = array;
    let counter = arrayUnfinished.length;
    while (counter > 0) {
       
        let index = Math.floor(Math.random() * counter);
        counter--;
        let lastItem = arrayUnfinished[counter];
        arrayUnfinished[counter] = arrayUnfinished[index];
        arrayUnfinished[index] = lastItem;
    }

    this.setState({cards: arrayUnfinished});
  };

  shuffleArrayFinished = (array, callback) => {
    let arrayFinished = array;
    let counter = arrayFinished.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let lastItem = arrayFinished[counter];
        arrayFinished[counter] = arrayFinished[index];
        arrayFinished[index] = lastItem;
    }

    for(let i = 0; i < arrayFinished.length; i++){
      arrayFinished[i].clicked = false;
    }

     callback(arrayFinished);
  };

  handleLosing = array => {
    let newGameArray = array;
  
    let setScoreBack = 0;
   
    this.setState({ userScore: setScoreBack });
    
    this.shuffleArrayFinished(newGameArray, (array) => {
      this.setState({cards: newGameArray});
      console.log("shuffle finished");
      console.log(newGameArray);
      console.log("new game");
    });
  };

  handleSuccess = array => {
    let arrayToBeShuffled = array;
    let newScore = this.state.userScore;
    console.log("handle success function reached");
    if (this.state.userScore >= this.state.highScore){
      // add count total to the score
      newScore += 1;
      // reset the score & high score
      this.setState({ userScore: newScore, highScore: newScore });
      this.shuffleArrayUnfinished(arrayToBeShuffled);
    } else {
      newScore += 1;
      this.setState({ userScore: newScore });
      this.shuffleArrayUnfinished(arrayToBeShuffled);
    }
  };

  // image click to play game
  handleClick = id => {
   
    let newArray = this.state.cards.slice(0);
    
    for(let i = 0; i < newArray.length; i++){
     
      if (newArray[i].id === id && newArray[i].clicked === true){
        console.log("true")
        console.log(newArray);
        this.handleLosing(newArray);
        break;
     
      } else if (newArray[i].id === id && newArray[i].clicked === false){
       
        newArray[i].clicked = true;
        
        this.handleSuccess(newArray);
        
        console.log("success");
        break;
      }
    }
  };

  // rendering to dom
  render() {
    return (
      // enclosing div
      <div className="wrapper">
        {/* passing user score and high score states to header to display */}
        <Header 
        userScore = {this.state.userScore}
        highScore = {this.state.highScore}
        />
        {/* passing static name div below it */}
        <NameDiv />
        {/* mapping (displaying each) card and passing the json object's properties to each */}
        {this.state.cards.map(card => (
        <MemoryCards 
        handleClick = {this.handleClick}
        name = {card.name}
        url = {card.url}
        id = {card.id}
        key={card.id}
        />
        ))}
      </div>
    );
  }
}

export default App;
