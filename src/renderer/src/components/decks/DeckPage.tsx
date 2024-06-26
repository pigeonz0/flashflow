import { useEffect, useState } from 'react'
import { Deck } from 'src/types/types'
import DeleteIcon from '../cards/DeleteIcon'
import AddSignIcon from '../cards/AddSignIcon'
const DEFAULT_DECK_NAME: string = 'DEFAULT'

function AddDeckForm({ decks }: { decks: Deck[] }): JSX.Element | string {
  function addDeck(): void {
    const deckNameForm = document.getElementById('deckNameInput') as HTMLInputElement
    const deckName = deckNameForm.value.toUpperCase()

    const newDeck: Deck = {
      name: deckName.toUpperCase(),
      cards: []
    }

    if (decks.find((x) => x.name.localeCompare(deckName) == 0)) {
      triggerToast(false, 'Name already exists!')
    } else if (!deckName.trim()) {
      triggerToast(false, 'Must enter text!')
    } else {
      deckNameForm.value = ''
      window.api.store.addDeck(newDeck)
      triggerToast(true, 'Added Deck!')
    }
  }

  return (
    <div className="pt-2">
      <input id="deckNameInput" placeholder="Enter new deck..."></input>
      <button onClick={addDeck} className="align-middle p-5">
        <AddSignIcon width="30px" height="30px" />
      </button>
    </div>
  )
}

function DeckTable({
  decks,
  toCardsByDeckBtn
}: {
  decks: Deck[]
  toCardsByDeckBtn: Function
}): JSX.Element | string {
  function deleteDeck(name: string): void {
    if (name !== DEFAULT_DECK_NAME) {
      triggerToast(true, 'Deleted Deck!')
      window.api.store.deleteDeck(name)
    } else alert(DEFAULT_DECK_NAME + ' cannot be deleted!')
  }
  const deckEntries = decks.map((deck) => (
    <tr className="bg-slate-800 border" height="50px" key={deck.name}>
      <td className="pl-5" width="300px">
        {toCardsByDeckBtn(deck.name)}
      </td>

      <td>
        <button className="pl-10 align-middle" onClick={() => deleteDeck(deck.name)}>
          <DeleteIcon width="30px" height="30px" />
        </button>
      </td>
    </tr>
  ))
  return (
    <table width="400px">
      <thead>
        <tr>
          <th>Deck</th>
        </tr>
      </thead>
      <tbody>{deckEntries}</tbody>
    </table>
  )
}

function triggerToast(positive: boolean, text: string) {
  let timeVisible = 3
  var uptime = setInterval(function () {
    if (timeVisible <= 0) {
      ;(document.getElementById('deckToast')! as HTMLElement).className = 'invisible'
      clearInterval(uptime)
    } else {
      ;(document.getElementById('deckToast')! as HTMLElement).className = positive
        ? 'rounded p-2 outline outline-green-500 bg-white absolute top-10 right-12'
        : 'rounded p-2 outline outline-red-500 bg-white absolute top-10 right-12'
      ;(document.getElementById('deckToast')! as HTMLElement).innerHTML =
        text + ' ' + timeVisible.toString()
      timeVisible -= 1
    }
  }, 1000)
}

function DecksPage({ toCardsByDeckBtn }: { toCardsByDeckBtn: Function }): JSX.Element {
  const [decks, setDecks] = useState<Deck[]>([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    async function GetAllDecks(): Promise<void> {
      setDecks(await window.api.store.getAllDecks())
      setLoading(false)
    }

    GetAllDecks()
  }, [decks])

  if (isLoading) return <p>Loading...</p>

  return (
    <div className="pt-5">
      <DeckTable decks={decks} toCardsByDeckBtn={toCardsByDeckBtn} />
      <AddDeckForm decks={decks} />
      <div id="deckToast" className="invisible"></div>
    </div>
  )
}

export default DecksPage
export { DEFAULT_DECK_NAME }
