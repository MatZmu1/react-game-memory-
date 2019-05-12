import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import shuffle from 'array-shuffle';

class App extends Component {
  constructor() {
    super();
    const cards = [
      {
        id: 1,
        isSelected: false,
        isDisabled: false
      },
      {
        id: 2,
        isSelected: false,
        isDisabled: false
      },
      {
        id: 3,
        isSelected: false,
        isDisabled: false
      },
      {
        id: 4,
        isSelected: false,
        isDisabled: false
      },
    ];

    this.state = {
      bucket_1: shuffle(cards.map(card => ({...card}))), 
      bucket_2: shuffle(cards.map(card => ({...card}))),
      counter: 0
    };
  }

  handleClick(bucketId, card) {
    if (card.isDisabled === false) {
      card.isSelected = !card.isSelected;
      const bucket = this.state[`bucket_${bucketId}`];
      const bucketMirror = this.state[`bucket_${bucketId === 1 ? '2' : '1'}`];
      const cardMirror = bucketMirror.find(cardClone => cardClone.id === card.id);
      if (cardMirror.isSelected === true) {
        card.isDisabled = true;
        cardMirror.isDisabled = true;
        card.isSelected = false;
        cardMirror.isSelected = false;
      }

  
      const allCards = [...bucket, ...bucketMirror];
      const selectedCards = allCards.filter(item => item.isSelected === true);
      if (selectedCards.length === 2) {

        setTimeout(() => {
          allCards.map(item => item.isSelected = false);
        
          this.setState({}); 
        }, 2000);
      }

      this.setState({counter: this.state.counter + 1});
    }
  }

  render() {
    return (
      <div>
        <h1>Your score: {this.state.counter}</h1>
        <ul>
          {this.state.bucket_1.map(card => (
            <li 
            onClick={() => this.handleClick(1, card)}
            className={`${ card.isSelected ? 'selected' : ''} ${ card.isDisabled? 'disabled' : ''}`}>
              {card.isSelected || card.isDisabled ? card.id : ''}
            </li>)
            )}
        </ul>
        <ul>
          {this.state.bucket_2.map(card => (
            <li 
            onClick={() => this.handleClick(2, card)}
            className={`${ card.isSelected ? 'selected' : ''} ${ card.isDisabled? 'disabled' : ''}`}>
              {card.isSelected || card.isDisabled ? card.id : ''}
            </li>)
            )}
        </ul>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
