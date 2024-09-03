import { useRef, useState } from 'react';
import { Questions, Passwords } from '../../assets/questions.js';
import { Link } from 'react-router-dom';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import PasswordMouse from '../../assets/images/writing-mouse1.jpg';
import Password from './Password.jsx';

export const AllQuestions = () => {
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
      <section id="all-questions" className="flex flex-col justify-between h-full items-center gap-4">
        <h1 className="text-sm italic">Click and solve all the questions, when click and solve the password!</h1>
        <div className="questions w-full flex flex-col">
          {Questions.map((question) => (
            <div
              className="p-3 border-b-4 rounded flex grow items-center text-lg justify-between gap-2"
              id={question.id}
              style={{ borderColor: question.bg_border_code }}
              key={question.id}
            >
              <div className="flex items-center flex-wrap gap-2">
                {question.eng_answer.split(' ').map((word, index) => (
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
              <Link to={`/questions/${question.id + 1}`}>
                <MdOutlineKeyboardDoubleArrowRight className="text-amber-800" />
              </Link>
            </div>
          ))}
        </div>
        <div className="password flex flex-col items-center w-full gap-4 grow">
          <button
            onClick={() => passwordRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' })}
            className="text-md bg-amber-400 my-auto py-2 px-10 rounded"
          >
            Solve password!
          </button>
          <div className='h-screen py-6' ref={passwordRef}>
            <Password />
            </div>
        </div>
      </section>
    </>
  );
};
