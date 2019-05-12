suits = ['Wands', 'Cups', 'Pentacles', 'Swords']

values = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Page', 'Knight', 'Queen', 'King']

majors = ['The Fool', 'The Magician', 'The High Priestess', 'The Empress', 'The Emperor', 'The Hierophant', 'The Lovers', 'The Chariot', 'Strength', 'The Hermit', 'The Wheel of Fortune', 'Justice', 'The Hanged Man', 'Death', 'Temperance', 'The Devil', 'The Tower', 'The Star', 'The Moon', 'The Sun', 'Judgement', 'The World']


class Minor:
    """Models a tarot card of the minor arcana."""
    def __init__(self, value, suit, meaning=''):
        self.arcana = 'minor'
        self.name = value + ' of ' + suit
        self.value = value
        self.suit = suit
        self.meaning = meaning
        self.reversed = False
        self.image = 'img/cards/' + value + ' ' + suit + '.jpg'


class Major:
    """Models a tarot card of the major arcana."""
    def __init__(self, name, value, meaning=''):
        self.arcana = 'major'
        self.name = name
        self.value = value
        self.meaning = meaning
        self.reversed = False
        self.image = 'img/cards/' + value + ' ' + name + '.jpg'