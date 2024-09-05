import { useEffect, useState, useRef } from 'react';
import { Questions } from '../../assets/questions';
import { useNavigate, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { PiListBulletsFill } from 'react-icons/pi';
import { FaAnglesRight } from 'react-icons/fa6';
import { FaAnglesLeft } from 'react-icons/fa6';

export default function SingleQuestion() {
  const inputRefs = useRef([]);
  const { t } = useTranslation();
  const { id } = useParams();
  const question = Questions[id]
  const storageKey = `question-${id}-input`;
  const navigate = useNavigate();

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

  const [selectedBox, setSelectedBox] = useState(null);
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
      setSelectedBox(index + 1);
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

    setSelectedBox(null);
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
          <h2 className="text-xl font-bold">{t('answer')}</h2>
          <div className="flex flex-wrap">
            {t(question.answer)
              .split('')
              .map((c, i) =>
                c === ' ' ? (
                  // show space instead of a input box
                  <div key={i} style={{ width: '24px' }}></div>
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
                    {((question.id < 3 && i === 1) || (question.id > 3 && i === 1)) && (
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
                        {replaceWithSpaces(t(question.answer))[i]}
                      </div>
                    )}
                  </div>
                )
              )}
          </div>
        </div>

        <div className="buttons flex w-full justify-around text-sm font-bold" style={{ color: Questions[id].bg_border_code }}>
          {id >= 1 && (
            <div className="previous-question flex flex-col items-center gap-1">
              <FaAnglesLeft className="size-12" onClick={() => navigate(`/question/${question.id - 1}`)} />
              <p>{t('back')}</p>
            </div>
          )}
          <div className="go-to-all-questions flex flex-col items-center gap-1">
            <PiListBulletsFill className="size-12" onClick={() => navigate('/questions')} />
            <p>{t('home')}</p>
          </div>
          {id < Questions.length - 1 && (
            <div className="next-question flex flex-col items-center gap-1">
              <FaAnglesRight className="size-12" onClick={() => navigate(`/question/${question.id + 1}`)} />
              <p>{t('next')}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
