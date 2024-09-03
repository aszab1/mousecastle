import { useState } from 'react';
import { Questions, Passwords } from '../../assets/questions.js';
import { Link } from 'react-router-dom';

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

  return (
    <>
      <section id="all-questions" className="flex flex-col justify-between h-full items-center gap-4">
        <h1 className="text-sm italic">Click and solve all the questions, when done scroll down and solve the password!</h1>
        <div className="questions w-full flex flex-col gap-1">
          {Questions.map((question) => (
            <div
              className="p-3 border-4 rounded-md flex grow items-center text-lg justify-between gap-2"
              id={question.id}
              style={{ background: question.bg_clr_code, borderColor: question.bg_border_code }}
              key={question.id}
            >
              <div className='flex items-center flex-wrap'>
                {question.eng_answer.split(' ').map((word, index) => (
                  <div className={`word-${index} flex flex-wrap`} key={index}>
                    {word.split('').map((char, index) => (
                      <div 
                      className="text-sm size-4 border-4 p-4 rounded-md flex items-center justify-center" 
                      key={index}
                      style={{borderColor: question.bg_border_code}}
                      >
                        <span className='font-bold'>{char}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <Link to={`/questions/${question.id + 1}`}>
                <button className="text-xl">&gt;</button>
              </Link>
            </div>
          ))}
        </div>
        <div className="password flex flex-col items-center w-full gap-4 grow">
          <h1 className="text-xl">PASSWORD: </h1>
          <div className="p-4 border rounded-md flex w-full"></div>
        </div>
      </section>
    </>
  );
};
