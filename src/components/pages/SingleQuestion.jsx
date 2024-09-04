import { useEffect, useState, useRef } from "react"
import { Questions } from "../../assets/questions"
import { useParams } from "react-router"
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'



export default function SingleQuestion() {
  const inputRefs = useRef([])
  const { t, i18n } = useTranslation()
  const { id } = useParams()
  const question = Questions.find(q => q.id === parseInt(id))
  const storageKey = `question-${id}-input`
  const [userInput, setUserInput] = useState(() => {
    const savedInput = sessionStorage.getItem(storageKey)
    
      return savedInput ? JSON.parse(savedInput) : Array(t(question.answer).length).fill('')
    
  })
  // const correctAnswer = t(question.answer) === userInput.join('').toUpperCase()
  const [selectedBox, setSelectedBox] = useState(null)
  const hint = t(question.answer).toUpperCase().split('')
  // new array with spaces followed by the second word 
  const hint2 = Array(5).fill(' ').concat(hint.slice(5));


  const gradientBorderStyle = {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: '5px',
    border: 'solid',
    borderWidth: '5px',
    borderImage: 'linear-gradient(to right, #fbcf3d, #51367a, #2f712f, #cc4241, #a31a73, #34a51e, #077bae) 1',
    background: 'linear-gradient(to right, #feffd6, #ebdbff, #e7ffa7, #ffc5b3, #ff75b0, #b9ff8e, #81d8ff)',
    borderRadius: '10px',
    padding: '10px',


  };

  const handleInputChange = (e, index) => {
    const { value } = e.target
    if (value.length > 1) return

    const newInput = [...userInput]
    newInput[index] = value
    setUserInput(newInput)
    sessionStorage.setItem(storageKey, JSON.stringify(newInput))

    // Move focus to the next input field
    if (value.length === 1 && index < t(question.answer).length - 1) {
      inputRefs.current[index + 1].focus()
      setSelectedBox(index + 1)
    }
  }

  useEffect(() => {

    const savedInput = sessionStorage.getItem(storageKey)
    setUserInput(savedInput ? JSON.parse(savedInput) : Array(t(question.answer).length).fill(''))


    setSelectedBox(null)
  }, [id, question.answer, storageKey, t])



  return (

    <>
      <div className="flex flex-col justify-between items-center"
        style={{ height: '100dvh', width: '100%' }}>
        <section className="image">
          <img src={question.img_url} alt={`Question ${question.id}`} />
        </section>

        <section className="question">
          <h2 style={{ textAlign: 'center' }}>Question {question.id + 1}</h2>
          <p> {t(question.question)}</p>

        </section>

        <section className="answer" >
          <h2 style={{ textAlign: 'center' }}>Answer</h2>
          <div style={{ display: 'flex', flexWrap: "wrap" }}>
            {t(question.answer).split('').map((c, i) => (
              c === ' ' ? (
                // show space instead of a input box
                <div key={i} style={{ width: '24px', margin: '2px' }}></div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }} key={i}>

                  <input
                    type="text"
                    id={`input-${i}`}
                    maxLength={1}
                    autoCapitalize="on"
                    className="border-4 rounded-md size-10 aspect-square text-center text-lg font-bold"
                    style={{
                      background: question.bg_clr_code,
                      borderColor: question.bg_border_code,
                      margin: '0.5px',
                      cursor: 'pointer',
                      transition: 'opacity 0.3s ease',
                      boxShadow: selectedBox === i ? '0 0 5px 2px rgba(0, 0, 0, 1)' : 'none',
                      
                    }}
                    onClick={() => setSelectedBox(i)}
                    ref={(el) => (inputRefs.current[i] = el)} // Assign ref to each input
                    onChange={(e) => handleInputChange(e, i)} // Handle input change
                    value={userInput[i]?.toUpperCase() || ''}
                  />
                  {id < 3 || id > 3 && i === 1 && (
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      fontSize: '18px',
                      color: '#888',
                      pointerEvents: 'none',
                      userSelect: 'none',
                    }}>
                      {hint[1]}
                    </div>
                  )}

                  {id === '3' && (
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      fontSize: '18px',
                      color: '#888',
                      pointerEvents: 'none',
                      userSelect: 'none',
                    }}>
                      {hint2[i]}
                    </div>
                  )}
                </div>
              )))}


          </div>
          {/* <div style={{ textAlign: 'center', marginTop: '10px' }}>{correctAnswer && <p> You Guessed Correct Well Done!</p>}</div> */}
        </section>

        <section className="buttons"
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ textAlign: 'center', margin: '20px', }} >
            <Link style={gradientBorderStyle} to={`/questions`}>Back To Questions</Link>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            {Questions.map((question) => {
              return (
                <Link className="border-4 rounded-md size-9 aspect-square text-center text-lg font-bold mb-5"
                  style={{
                    background: question.bg_clr_code,
                    borderColor: question.bg_border_code
                  }} key={question.id} to={`/question/${question.id}`}>
                  {question.id + 1}
                </Link>
              )
            })}</div>







        </section >
      </div >
    </>
  )
}