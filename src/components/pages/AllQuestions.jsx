import { useRef, useState } from 'react';
import { Questions } from '../../assets/questions.js';
import { Link } from 'react-router-dom';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import Password from './Password.jsx';
import { useTranslation } from 'react-i18next';



export const AllQuestions = () => {
  // 't' function from useTranslation dynamically renders text based on selected language 
  const { t, i18n } = useTranslation()

  


  // answers give to questions
  const [answers, setAnswers] = useState({
    0: '',
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
  });

  const passwordRef = useRef(null);

  return (
    <>
      <section id="all-questions" className="flex flex-col justify-between items-center">
        <div className="questions w-full flex flex-col h-screen py-6 gap-2">
          <h1 className="text-sm italic">Click and solve all the questions, when click and solve the password!</h1>
          {Questions.map((question) => (
            <Link to={`/question/${question.id + 1}?lang=${i18n.language}`} key={question.id}>
              <div
                className="py-2 border-b-4 rounded flex items-center text-lg justify-between"
                id={question.id}
                style={{ borderColor: question.bg_border_code }}
              >
                <div className="flex items-center flex-wrap gap-2 px-2">
                  {t(question.answer).split(' ').map((word, index) => (
                    <div className={`word-${index} flex flex-wrap`} key={index}>
                      {word.split('').map((char, index) => (
                        <div
                          className="text-sm size-4 border-4 p-4 rounded-md flex items-center justify-center"
                          key={index}
                          style={{ background: question.bg_clr_code, borderColor: question.bg_border_code }}
                        >
                          <span className="font-bold">{char}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <MdOutlineKeyboardDoubleArrowRight className="text-amber-800 shrink-0" />
              </div>
            </Link>
          ))}
          <button
            onClick={() => passwordRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' })}
            className="text-md bg-amber-400 py-2 px-10 my-auto rounded"
          >
            Solve password!
          </button>
        </div>
        <div className="h-screen py-6" ref={passwordRef}>
          <Password />
        </div>
      </section>
    </>
  );
};