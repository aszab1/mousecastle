import { useEffect, useState, useRef, useCallback } from 'react';
import { Questions } from '../../assets/questions';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { QuestionNavigation } from './QuestionNavigation.jsx';
import { InputBox } from './InputBoxes.jsx';


export default function SingleQuestion() {
  const { id } = useParams()
  const inputRefs = useRef([])
  const { t, i18n } = useTranslation()
  const question = Questions[id]
  const answer = t(question.answer)
  const storageKey = `question-${id}-input`
  // Index for the letter hint (second letter)
  const hintIndex = 1
  const isEnglish = i18n.language === 'en'

  const [inputSize, setInputSize] = useState(window.innerWidth > 768 ? 12 : 10)


  useEffect(() => {
    const handleResize = () => {
      setInputSize(window.innerWidth > 768 ? 12 : 10)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const initInputWithHints = useCallback(() => {
    // Hint logic specific to 4th question with ID '3'
    const hintForIdThree = () => {
      const [firstWord, secondWord] = answer.split(' ')
      return [
        ...firstWord.split('').map((char, index) => (index === hintIndex ? char : '')),
        '\n',
        ...secondWord.split(''),
      ]
    }


    // hint logic for 6th qestiom, id 5
    const hintForIdFive = () => {
      if (answer.includes(' ')) {
        const [firstWord, secondWord] = answer.split(' ')
        return [
          ...firstWord.split('').map((char, index) => (index === hintIndex ? char : '')),
          '\n',
          ...secondWord.split('').map(() => ''),
        ]
      } else {
        return answer.split('').map((char, index) => (index === hintIndex ? char : ''))
      }

    }
    // Default hint logic for other questions
    const defaultHint = () =>
      answer.replace(/\s/g, '').split('').map((char, index) => (index === hintIndex ? char : ''))

    if (id === '3') {
      return hintForIdThree()
    }
    else if (id == '5') {
      return hintForIdFive()
    } else {
      return defaultHint()
    }
  }, [id, answer])


  // Initializes the user input state, checking if there is saved input in sessionStorage
  const [userInput, setUserInput] = useState(() => {
    try {
      const savedInput = sessionStorage.getItem(storageKey)
      return savedInput ? JSON.parse(savedInput) : initInputWithHints()
    } catch (error) {
      console.error('Error parsing:', error)
      return initInputWithHints()
    }
  })

  // Helper function to update state and save input to sessionStorage
  const saveInput = (input) => {
    setUserInput(input)
    sessionStorage.setItem(storageKey, JSON.stringify(input))
  }

  // Handles input changes and manages focus shifts between inputs
  const handleInputChange = (e, index) => {
    const { value } = e.target
    const newInput = [...userInput]


    // Focuses the next available input field based on direction (1 for forward, -1 for backward)
    const focusNextAvailableInput = (startIndex, direction = 1) => {
      let nextIndex = startIndex + direction

      // Prevent focusing on the second word for the 4th question
      while (
        nextIndex >= 0 &&
        nextIndex < userInput.length &&
        (nextIndex === hintIndex ||
          (id === '3' && (userInput[nextIndex] === '\n' || nextIndex > answer.split(' ')[0].length))) ||
        (id === '5' && userInput[nextIndex] === '\n')
      ) {
        nextIndex += direction
      }

      // Focus the next valid input field
      if (nextIndex >= 0 && nextIndex < userInput.length) {
        inputRefs.current[nextIndex]?.focus()
      }
    };

    // Update input and shift focus based on the input change
    if (value) {
      newInput[index] = value.toUpperCase()
      saveInput(newInput)
      focusNextAvailableInput(index) // Move to the next input
    } else {
      newInput[index] = ''
      saveInput(newInput)
      focusNextAvailableInput(index, -1) // Move to the previous input
    }
  }

  // Effect to load saved input on component mount or when ID/answer changes
  useEffect(() => {
    try {
      const savedInput = sessionStorage.getItem(storageKey)
      setUserInput(savedInput ? JSON.parse(savedInput) : initInputWithHints())
    } catch (error) {
      console.error('Error parsing:', error)
      setUserInput(initInputWithHints())
    }
  }, [id, answer, initInputWithHints, storageKey])

  return (
    <section className=" relative flex flex-col items-center min-h-screen p-2">
      <div className="w-full max-w-md mt-4">
        <img src={question.img_url} alt={`Question ${question.id}`} className="w-full max-h-64 object-contain mb-4" />
        <div className="question text-center mb-8">
          <h1 className="font-bold text-xl mb-4">
            {t('question')} {question.id + 1}
          </h1>
          <p className="whitespace-pre-line">{t(question.question)}</p>
        </div>
      </div>

      <div className="answer w-full max-w-md mb-10">
        <div className="flex flex-wrap justify-center">
          {userInput.map((char, index) => {
            const applyCustomMargin = isEnglish && id === '0' && index === 2
            const [firstWord, secondWord] = answer.split(' ')

            // Determine if the current index is in the second word or beyond the last character of the first word
            const isSecondWordChar = (id === '3' && index > firstWord.length) || (id === '5' && secondWord && index > firstWord.length)

            if (char === '\n' && secondWord) {
              return <div key={index} className="w-full"></div> // Render line break without an input
            }

            return (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
                className={`relative ${applyCustomMargin ? 'mr-2' : ''}`}
              >
                <InputBox
                  size={inputSize}
                  color={question}
                  inputRef={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => handleInputChange(e, index)}
                  value={char || ''}
                  readOnly={
                    index === hintIndex || isSecondWordChar
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' && !userInput[index]) {
                      e.preventDefault()
                      handleInputChange({ target: { value: '' } }, index)
                    }
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>

      <QuestionNavigation questionId={Number(id)} question={question} />
    </section>
  )
}