import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImages = [
  {'src': 'img/helmet-1.png', matched: false},
  {'src': 'img/potion-1.png', matched: false},
  {'src': 'img/ring-1.png', matched: false},
  {'src': 'img/scroll-1.png', matched: false},
  {'src': 'img/shield-1.png', matched: false},
  {'src': 'img/sword-1.png', matched: false},
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choice, setChoice] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random() }))

    setChoice(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  //handle choice
  const handleChoice = (card) => {
    choice ? setChoiceTwo(card) : setChoice(card)
  }

  // Compare choices
  useEffect(() => {
    if (choice && choiceTwo) {
      setDisabled(true)
      if (choice.src === choiceTwo.src) {
        console.log('card do match')
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choice.src ) {
              return {...card, matched: true}
            }
            return card
          })
        })
        resetTurns()
      } else {
        console.log('card don\'t match')
        setTimeout(() => resetTurns(), 1000)
      }
    }
  }, [choice, choiceTwo])
  console.log(cards)

  // reset turns and choices
  const resetTurns = () => {
    setChoice(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // start a new game
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App"> 
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className='card-grid'>
         {cards.map(card => (
           <SingleCard 
            key={card.id} 
            card={card} 
            handleChoice={handleChoice}
            flipped={card === choice || card.matched || card === choiceTwo}
            disabled={disabled}
          />
         ))}
      </div>

      <p>Turns: {turns}</p>
    </div>
  );
}

export default App