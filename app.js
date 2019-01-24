function Card (name, value, suit, arcana, meaning) {
  this.name = name;
  this.value = value;
  this.suit = suit;
  this.arcana = arcana;
  this.meaning = '';
  this.alignment = 'up';
}

// build the minor arcana
// for each suit
// build entire suit

let suits = ['Wands', 'Cups', 'Disks', 'Swords'];
let values = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Page', 'Knight', 'Queen', 'King'];
let deck = [];

for(let i = 0; i < suits.length; i++){
  for(let j = 0; j < values.length; j++){
    deck.push(new Card(`${j} of ${i}`, j, i, 'minor'));
  }
}