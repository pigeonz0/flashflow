type ActiveTab = 'Decks' | 'Cards' | 'Stats' | 'Study' 

type Card = {
  name: string
  front: string
  back: string
  tags?: string[]
  // Any other properties cards should hold
}

type Deck = {
  name: string
  cards: Card[]
  // Any other properties decks should hold
}

type DatabaseSchema = {
  cards: Card[]
  decks: Deck[]
}

type Study = {
	decks: Deck[]
}

export { type ActiveTab, type DatabaseSchema, type Card, type Deck, type Study}
