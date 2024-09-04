import { useEffect, useState } from "react"
import { Questions } from "../../assets/questions"
import { useParams } from "react-router"


export default function SingleQuestion() {
  const { id } = useParams()
  const question = Questions.find(q => q.id === parseInt(id))
  const storageKey = `question-${id}-input`
  const [userInput, setUserInput] = useState(() => {
    const savedInput = localStorage.getItem(storageKey)
    return savedInput ? JSON.parse(savedInput) : Array(question.answer.length).fill('')
  })

  const correctAnswer = question.answer === userInput.join('')
  const [selectedBox, setSelectedBox] = useState(null)

  useEffect(() => {
    const handler = (e) => {
      const key = e.key

      if (selectedBox !== null && key.length === 1 && /[a-zA-Z0-9.]/.test(key)) {
        const newInput = [...userInput]
        newInput[selectedBox] = key
        setUserInput(newInput)
        localStorage.setItem(storageKey, JSON.stringify(newInput))
      }
    }


    window.addEventListener('keydown', handler)


  }, [selectedBox, storageKey, userInput])
  return (

    <>
      <div className="flex flex-col justify-between items-center"
        style={{ height: '100dvh', width: '100%' }}>
        <section className="image">
          <img src={question.img_url} alt={`Question ${question.id}`} />
        </section>

        <section className="question">
          <h2>Question {question.id}</h2>
          <p> {question.question}</p>

        </section>

        <section className="answer" >
          <h2 style={{ textAlign: 'center' }}>Answer</h2>
          <div style={{ display: 'flex' }}>
            {question.answer.split('').map((c, i) => (
              <div
                key={i}
                className="text-sm size-4 border-4 p-4 rounded-md flex items-center justify-center "
                style={{
                  background: question.bg_clr_code,
                  borderColor: question.bg_border_code,
                  margin: '2px',
                  cursor: 'pointer',
                  transition: 'opacity 0.3s ease',
                  boxShadow: selectedBox === i ? '0 0 5px 2px rgba(0, 0, 0, 1)' : 'none',


                }}
                onClick={() => setSelectedBox(i)}
              >
                {console.log(selectedBox)}
                <p>{userInput[i]}</p>

              </div>
            ))}


          </div>
          <div style={{ textAlign: 'center' }}>{correctAnswer && <p> You Guessed Correct Well Done!</p>}</div>
        </section>

        <section className="buttons"
          style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <button style={{ fontSize: '24px' }}> ◀️ </button>
          <button style={{ fontSize: '24px' }}> ▶️ </button>
        </section>
      </div>
    </>
  )
}