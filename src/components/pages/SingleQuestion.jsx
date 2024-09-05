import { useEffect, useState, useRef } from 'react';
import { Questions } from '../../assets/questions';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { QuestionNavigation } from './QuestionNavigation.jsx';
import { InputBox } from './InputBoxes.jsx';

export default function SingleQuestion() {
  const { id } = useParams();
  const inputRefs = useRef([]);
  const { t } = useTranslation();
  const question = Questions[id];
  const answer = t(question.answer)
  const storageKey = `question-${id}-input`;

  console.log(answer)

  // useState init. to handle array vs string
  const [userInput, setUserInput] = useState(() => {
    const savedInput = sessionStorage.getItem(storageKey);

    // Check if the saved input is a string or an array
    if (savedInput) {
      try {
        const parsedInput = JSON.parse(savedInput);
        // If parsed input is already an array, use it; otherwise, split the string
        return Array.isArray(parsedInput) ? parsedInput : parsedInput.split('');
      } catch (error) {
        console.error('Error parsing:', error);
        return Array(t(question.answer).length).fill('');
      }
    } else {
      return Array(t(question.answer).length).fill('');
    }
  });

  const hint = t(question.answer).toUpperCase().split('');
  function replaceWithSpaces(str) {
    const index = str.indexOf(' ');
    if (index === -1) {
      return str.split('');
    }
    const spaces = ' '.repeat(index);
    const replaced = spaces + str.slice(index);
    return replaced.split('');
  }

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    if (value.length > 1) return;

    const newInput = [...userInput];
    newInput[index] = value;
    setUserInput(newInput);
    // Save the input as a plain string
    sessionStorage.setItem(storageKey, newInput.join(''));

    // Move focus to the next input field
    if (value.length === 1 && index < t(question.answer).length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  useEffect(() => {
    const savedInput = sessionStorage.getItem(storageKey);
    if (savedInput) {
      try {
        const parsedInput = JSON.parse(savedInput);
        setUserInput(Array.isArray(parsedInput) ? parsedInput : parsedInput.split(''));
      } catch (error) {
        console.error('Error parsing:', error);
        setUserInput(Array(t(question.answer).length).fill(''));
      }
    } else {
      setUserInput(Array(t(question.answer).length).fill(''));
    }
  }, [id, question.answer, storageKey, t]);

  return (
    <>
      <section className="flex flex-col justify-between items-center h-full">
        <img src={question.img_url} alt={`Question ${question.id}`} />
        <div className="question text-center flex flex-col gap-4">
          <h1 className="font-bold text-2xl">
            {t('question')} {question.id + 1}
          </h1>
          <p> {t(question.question)}</p>
        </div>

        <div className="answer flex flex-col gap-4 text-center">
          <div className="flex flex-wrap justify-center">
            {t(question.answer)
              .split('')
              .map((char, index) =>
                char === ' ' ? (
                  // go to next line instead of a input box
                  <div key={index} className="w-full"></div>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }} key={index}>
                    <InputBox
                    size={12}
                    color={question}
                    ref={(el) => (inputRefs.current[index] = el)}
                    onChange={(e) => handleInputChange(e, index)}
                    value={userInput[index]?.toUpperCase() || ''}
                    />
                    {((question.id < 3 && index === 1) || (question.id > 3 && index === 1)) && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          color: '#888',
                          pointerEvents: 'none',
                          userSelect: 'none',
                        }}
                      >
                        {hint[1]}
                      </div>
                    )}

                    {id === '3' && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          fontSize: '18px',
                          color: '#888',
                          pointerEvents: 'none',
                          userSelect: 'none',
                        }}
                      >
                        {replaceWithSpaces(t(question.answer))[index]}
                      </div>
                    )}
                  </div>
                )
              )}
          </div>
        </div>
        <QuestionNavigation questionId={Number(id)} question={question} />
      </section>
    </>
  );
}