import { useRef, useState } from 'react';
import { Questions } from '../../assets/questions.js';
import { Link } from 'react-router-dom';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import Password from './Password.jsx';
import { useTranslation } from 'react-i18next';
import { PrimaryButton } from './PrimaryButton.jsx';

export const AllQuestions = () => {
  // 't' function from useTranslation dynamically renders text based on selected language
  const { t, i18n } = useTranslation();

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
      <section id="all-questions" className="flex flex-col justify-evenly items-center">
        <div className="questions w-full flex flex-col gap-2" style={{ height: 'calc(100vh - 48px)' }}>
          <h1 className="text-sm italic">Click and solve all the questions, when click and solve the password!</h1>
          <div className="questions flex flex-col gap-3">
            {Questions.map((question) => (
              <Link to={`/questions/${question.id + 1}?lang=${i18n.language}`} key={question.id}>
                <div
                  className="py-3 border-b-4 rounded flex items-center text-lg justify-between"
                  id={question.id}
                  style={{ borderColor: question.bg_border_code }}
                >
                  <div className="flex items-center flex-wrap gap-2">
                    {t(question.answer)
                      .split(' ')
                      .map((word, index) => (
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
                  <MdOutlineKeyboardDoubleArrowRight className="absolute right-2 size-5" style={{color: question.bg_border_cod}}/>
                </div>
              </Link>
            ))}
          </div>
          <Link
            onClick={() => passwordRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' })}
            className="my-auto"
          >
            <PrimaryButton text={'Solve Password!'} />
          </Link>
        </div>
        <div className="h-screen py-6" ref={passwordRef}>
          <Password />
        </div>
      </section>
    </>
  );
};
