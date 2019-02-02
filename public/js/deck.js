'use strict';

let suits = ['Wands', 'Cups', 'Pentacles', 'Swords'];
let values = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Page', 'Knight', 'Queen', 'King'];
let majors = ['The Fool', 'The Magician', 'The High Priestess', 'The Empress', 'The Emperor', 'The Hierophant', 'The Lovers', 'The Chariot', 'Strength', 'The Hermit', 'The Wheel of Fortune', 'Justice', 'The Hanged Man', 'Death', 'Temperance', 'The Devil', 'The Tower', 'The Star', 'The Moon', 'The Sun', 'Judgement', 'The World'];
// let deck = [];

//=============
// Constructors
//=============

function Minor (value, suit, meaning) {
  this.arcana = 'minor';
  this.name = `${value} of ${suit}`;
  this.value = value;
  this.suit = suit;
  this.meaning = '';
  this.reversed = false;
  this.image = `img/cards/${value} ${suit}.jpg`;
}

function Major (name, value, meaning) {
  this.arcana = 'major';
  this.name = name;
  this.value = value;
  this. meaning = '';
  this.reversed = false;
  this.image = `img/cards/${value} ${name}.jpg`;
}

function Deck () {
  this.deck = [];

  for(let i = 0; i < suits.length; i++){
    for(let j = 0; j < values.length; j++){
      this.deck.push(new Minor(values[j], suits[i], ''));
    }
  }

  for(let i = 0; i < majors.length; i ++) {
    this.deck.push(new Major(majors[i], i, ''));
  }
}

Deck.prototype.split = function(index) {
  index -= 1;
  let left = [];
  let right = [];

  console.log(`** Splitting Deck at index ${index}`);
  left = this.deck.slice(0, index);
  right = this.deck.slice(index);

  return {left, right};
}

Deck.prototype.finalSplit = function(index) {
  console.log('** This is the final split')
  let result = this.split(index);
  let shuffledDeck = [];
  let leftLimit = result.left.length;
  let rightLimit = result.right.length;

  for(let i = 0; i < leftLimit; i++){
    shuffledDeck.push(result.left.shift());
  }

  for(let j = 0; j < rightLimit; j++){
    shuffledDeck.push(result.right.shift());
  }

  this.deck = shuffledDeck;
}

Deck.prototype.shuffle = function(index) {
  // Split the deck
  let split = this.split(index)
  let left = split.left;
  let right = split.right; 
  let shuffledDeck = [];
  console.log('** Shuffling Deck')

  // Choose which side starts
  let side = Math.floor(Math.random() * 2);
  if(side === 0) side = 'left';
  if(side === 1) side = 'right';

  do {
    // Choose if 1-3 cards goes in
    let insert = Math.floor(Math.random() * 3) + 1;
    for(let i = 0; i < insert; i ++){

      if(side === 'left'){
        if(left.length === 0) break;
        shuffledDeck.push(left.shift());
      } else {
        if(right.length === 0) break;

        // Right switches alignment
        let card = right.shift();
        if (card.reversed) {
          card.reversed = false;
        } else {
          card.reversed = true;
        }
        shuffledDeck.push(card);
      }
    }
    // Swap sides and repeat
    if(side === 'left') {
      side = 'right';
    } else {
      side = 'left';
    }
  } while(left.length > 0 || right.length > 0)

  this.deck = shuffledDeck;
}

Deck.prototype.theShuffler = function(index) {
  this.shuffle(index);
  this.shuffle(index);
}

//===========
// Test Calls
//===========

let test = new Deck();
test.theShuffler(35);
test.theShuffler(40);
test.theShuffler(45);
test.finalSplit(40);

//==========
// Rendering
//==========

let card_1 = test.deck.pop();
let card_2 = test.deck.pop();
let card_3 = test.deck.pop();
let cards = [card_1, card_2, card_3];

// Event Handler
$('.card-image').on('click', function() {
  let $election = $(this).attr('data-position');
  $(this).removeAttr('src');
  let card = cards[$election - 1];
  $(this).attr('src', card.image);

  let position = `#position-${$election}`;
  $(position).append(`<h4>${card.name}</h4>`);
  console.log(`** Revealing ${card.name}`);

  if(card.reversed) {
    $(this).addClass('reversed')
  }

});
