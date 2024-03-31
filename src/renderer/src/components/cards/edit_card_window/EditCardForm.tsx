import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Card } from 'src/types/types'
import InputColumn from '../InputColumn'
import InputLabel from '../InputLabel'

function EditCardInputs({ card }: { card: Card }): JSX.Element {
  const [cardFrontToEdit, setCardFrontToEdit] = useState<string>('')
  const [cardBackToEdit, setCardBackToEdit] = useState<string>('')

  useEffect(() => {
    setCardFrontToEdit(card.front)
    setCardBackToEdit(card.back)

    // console.log('setting default card attributes!')
  }, [card])

  const saveAndExit = (): void => {
    const cardToUpdate: Card = { cardID: card.cardID, front: cardFrontToEdit, back: cardBackToEdit }
    window.api.store.addCard(cardToUpdate)

    // console.log('adding: ' + JSON.stringify(cardToUpdate))

    window.api.closeCurrentWindow()
  }

  const onCardFrontChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const cardFront = event.target.value
    setCardFrontToEdit(cardFront)
  }

  const onCardBackChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const cardBack = event.target.value
    setCardBackToEdit(cardBack)
  }

  return (
    <div>
      <InputColumn>
        <InputLabel>Front</InputLabel>
        <input type={'text'} onChange={onCardFrontChange} defaultValue={cardFrontToEdit}></input>
      </InputColumn>
      <InputColumn>
        <InputLabel>Back</InputLabel>
        <input type={'text'} onChange={onCardBackChange} defaultValue={cardBackToEdit}></input>
      </InputColumn>

      <button className="bg-slate-800 hover:bg-slate-900 p-1" onClick={saveAndExit}>
        Save and Exit
      </button>
    </div>
  )
}

function EditCardForm(): JSX.Element {
  const location = useLocation()
  const [cardToEdit, setCardData] = useState<Card>()

  useEffect(() => {
    const cardIDToEdit = location.state.key
    // console.log('Location is: ' + JSON.stringify(location))
    // console.log('Card name is: ' + cardNameToEdit)

    const setupCardToEditData = async (): Promise<void> => {
      const card = await window.api.store.getCardByID(cardIDToEdit)

      setCardData(card)
    }

    setupCardToEditData()
  }, [location])

  if (cardToEdit == undefined) return <div>Loading...</div>

  return (
    <div className="grid place-items-center">
      <h1 className="text-xl font-bold">Currently editing a card!</h1>
      {/* <input onChange={changeCardToAddFront} type="text" placeholder={'Front'}></input> */}
      <EditCardInputs card={cardToEdit!} />
    </div>
  )
}

export default EditCardForm