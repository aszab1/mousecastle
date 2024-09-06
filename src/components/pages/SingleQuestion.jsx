import { useEffect, useState, useRef, useCallback } from 'react';
import { Questions } from '../../assets/questions';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { QuestionNavigation } from './QuestionNavigation.jsx';
import { InputBox } from './InputBoxes.jsx';

export default function SingleQuestion() {
  const { id } = useParams()
  const inputRefs = useRef([])
  const { t } = useTranslation()
  const question = Questions[id]
  const answer = t(question.answer)
  const storageKey = `question-${id}-input`
  const hintIndex = 1

  const initInputWithHints = useCallback(() => {
    const hintForIdThree = () => {
      const [firstWord, secondWord] = answer.split(' ')
      return [
        ...firstWord.split('').map((char, index) => (index === hintIndex ? char : '')),
        ' ',
        ...secondWord.split(''),
      ]
    }

    const defaultHint = () =>
      answer.replace(/\s/g, '').split('').map((char, index) => (index === hintIndex ? char : ''))

    return id === '3' ? hintForIdThree() : defaultHint()
  }, [id, answer])

  const [userInput, setUserInput] = useState(() => {
    try {
      const savedInput = sessionStorage.getItem(storageKey)
      return savedInput ? JSON.parse(savedInput) : initInputWithHints()
    } catch (error) {
      console.error('Error parsing:', error)
      return initInputWithHints()
    }
  })

  const saveInput = (input) => {
    setUserInput(input);
    sessionStorage.setItem(storageKey, JSON.stringify(input))
  }

  const handleInputChange = (e, index) => {
    const { value } = e.target
    const newInput = [...userInput]

    const focusNextAvailableInput = (startIndex, direction = 1) => {
      let nextIndex = startIndex + direction
      while (
        nextIndex >= 0 &&
        nextIndex < userInput.length &&
        (nextIndex === hintIndex || (id === '3' && userInput[nextIndex] === ' ') || (id === '3' && nextIndex > userInput.indexOf(' ')))
      ) {
        nextIndex += direction
      }
      if (nextIndex >= 0 && nextIndex < userInput.length) {
        inputRefs.current[nextIndex]?.focus()
      }
    }

    if (value) {
      newInput[index] = value.toUpperCase()
      saveInput(newInput)
      focusNextAvailableInput(index)
    } else {
      newInput[index] = ''
      saveInput(newInput)
      focusNextAvailableInput(index, -1)
    }
  }

  useEffect(() => {
    try {
      const savedInput = sessionStorage.getItem(storageKey);
      setUserInput(savedInput ? JSON.parse(savedInput) : initInputWithHints());
    } catch (error) {
      console.error('Error parsing:', error)
      setUserInput(initInputWithHints())
    }
  }, [id, answer, initInputWithHints, storageKey])

  return (
    <section className="flex flex-col justify-between items-center h-full">
      <img src={question.img_url} alt={`Question ${question.id}`} />
      <div className="question text-center flex flex-col gap-4">
        <h1 className="font-bold text-2xl">{t('question')} {question.id + 1}</h1>
        <p>{t(question.question)}</p>
      </div>

      <div className="answer flex flex-col gap-4 text-center">
        <div className="flex flex-wrap justify-center">
          {userInput.map((char, index) => (
            char === ' ' ? <div key={index} className="w-full"></div> :
            <div key={index} style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <InputBox
                size={12}
                color={question}
                inputRef={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleInputChange(e, index)}
                value={char || ''}
                readOnly={index === hintIndex || (id === '3' && index > userInput.indexOf(' '))}
                onKeyDown={(e) => {
                  if (e.key === 'Backspace' && !userInput[index]) {
                    e.preventDefault()
                    handleInputChange({ target: { value: '' } }, index)
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <QuestionNavigation questionId={Number(id)} question={question} />
    </section>
  )
}
