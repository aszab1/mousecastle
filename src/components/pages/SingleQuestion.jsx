import { useEffect, useState, useRef } from "react"
import { Questions } from "../../assets/questions"
import { useParams } from "react-router"
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'



export default function SingleQuestion() {
  const inputRefs = useRef([])
  const { t } = useTranslation()
  const { id } = useParams()
  const question = Questions.find((q) => q.id === parseInt(id, 15))
  const storageKey = `question-${id}-input`
  console.log(t)
  // useState init. to handle array vs string
  const [userInput, setUserInput] = useState(() => {
    const savedInput = sessionStorage.getItem(storageKey)

    // Check if the saved input is a string or an array
    if (savedInput) {
      try {
        const parsedInput = JSON.parse(savedInput)
        // If parsed input is already an array, use it; otherwise, split the string
        return Array.isArray(parsedInput) ? parsedInput : parsedInput.split('')
      } catch (error) {
        console.error("Error parsing:", error);
        return Array(t(question.answer).length).fill('')
      }
    } else {
      return Array(t(question.answer).length).fill('')
    }
  })


  const [selectedBox, setSelectedBox] = useState(null)
  const hint = t(question.answer).toUpperCase().split('')


  function replaceWithSpaces(str) {
    const index = str.indexOf(' ')
    if (index === -1) {
      
      return str.split('')
    }
    const spaces = ' '.repeat(index)
    const replaced = spaces + str.slice(index)
    return replaced.split('')
  }

  const gradientBorderStyle = {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: '5px',
    border: 'solid',
    borderWidth: '5px',
    // borderImage: 'linear-gradient(to right, #fbcf3d, #51367a, #2f712f, #cc4241, #a31a73, #34a51e, #077bae) 1',
    // background: 'linear-gradient(to right, #feffd6, #ebdbff, #e7ffa7, #ffc5b3, #ff75b0, #b9ff8e, #81d8ff)',
    background: question.bg_clr_code,
    borderColor: question.bg_border_code,
    borderRadius: '10px',
    padding: '10px',
    fontWeight: 'bold'
    


  };

  const handleInputChange = (e, index) => {
    const { value } = e.target
    if (value.length > 1) return

    const newInput = [...userInput]
    newInput[index] = value
    setUserInput(newInput)
    // Save the input as a plain string 
    sessionStorage.setItem(storageKey, newInput.join(''))

    // Move focus to the next input field
    if (value.length === 1 && index < t(question.answer).length - 1) {
      inputRefs.current[index + 1].focus()
      setSelectedBox(index + 1)
    }
  }

  useEffect(() => {
    const savedInput = sessionStorage.getItem(storageKey)
    if (savedInput) {
      try {
        const parsedInput = JSON.parse(savedInput)
        setUserInput(Array.isArray(parsedInput) ? parsedInput : parsedInput.split(''))
      } catch (error) {
        console.error("Error parsing:", error)
        setUserInput(Array(t(question.answer).length).fill(''))
      }
    } else {
      setUserInput(Array(t(question.answer).length).fill(''))
    }


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
          <h2 style={{ textAlign: 'center' }}>{t('question')} {question.id + 1}</h2>
          <p> {t(question.question)}</p>

        </section>

        <section className="answer" >
          <h2 style={{ textAlign: 'center' }}>{t('answer')}</h2>
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
                  {(question.id < 3 && i === 1 || (question.id > 3 && i === 1)) && (
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
                      {replaceWithSpaces(t(question.answer))[i]}
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

          <div style={{ display: 'flex', fontSize: '25px' }}>

            {question.id >= 1 && <Link to={`/question/${question.id - 1}`}>◀️</Link>}
            {question.id < 6 && <Link style={{ marginLeft: 'auto' }} to={`/question/${question.id + 1}`}>▶️</Link>}
          </div>

          {/* <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
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
            })}</div> */}







        </section >
      </div >
    </>
  )
}