"""Recreating Deck class in Python for fun."""
from random import randint

from cards import Minor, Major, suits, values, majors

class Deck:
    """Models a standard 78-card tarot deck."""
    def __init__(self):
        self.deck = []

        # Minors
        for i in range(len(suits)):
            for j in range(len(values)):
               self.deck.append(Minor(values[j], suits[i]))

        # Majors
        for i in range(len(majors)):
            self.deck.append(Major(majors[i], str(i)))

        # Start with a shuffled deck
        self.reader(42)

    def reader(self, index):
        """Calls the shuffle and split-and-stack methods."""
        self.shuffle(index)
        self.shuffle(index)
        self.cut_and_stack(index)

    def split(self, index):
        index -= 1
        print('** Splitting Deck at index ' + str(index))
        left, right = self.deck[:index], self.deck[index:]
        return {'left': left, 'right': right}

    def cut_and_stack(self, index):
        split = self.split(index)
        left, right = split['left'], split['right']
        self.deck = right + left

    def shuffle(self, index):
        shuffled_deck = []
        
        split = self.split(index)
        left, right = split['left'], split['right']

        side = randint(1, 2)
        if side == 1:
            side = 'left'
        else: 
            side = 'right'

        active = True
        while active:
            # Choose how many cards to insert
            insert = randint(1, 3)
            for i in range(insert):
                if side == 'left':
                    if len(left) == 0:
                        break
                    else:
                        shuffled_deck.append(left.pop())
                else:
                    if len(right) == 0:
                        break
                    else:
                        card = right.pop()
                        # Cards on the right change alignment
                        if card.reversed:
                            card.reversed = False
                        else:
                            card.reversed = True
                        shuffled_deck.append(card)
            # Change sides
            if side == 'left':
                side = 'right'
            else:
                side = 'left'
            
            # Repeat if any cards are left
            if len(left) == 0 and len(right) == 0:
                active = False
        
        self.deck = shuffled_deck


my_deck = Deck()

my_deck.reader(35)

for card in my_deck.deck:
    print(card.name)
