import { useEffect, useRef, useState } from 'react';
import { Questions } from '../../assets/questions.js';
import { Link, useLocation } from 'react-router-dom';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import Password from './Password.jsx';
import { useTranslation } from 'react-i18next';
import { PrimaryButton } from './PrimaryButton.jsx';
import { AnswerBox } from './AnswerBox.jsx';

export const AllQuestions = () => {
  // 't' function from useTranslation dynamically renders text based on selected language
  const { t } = useTranslation();
  const passwordRef = useRef(null);
  const [scrollToPassword, setScrollToPassword] = useState(false);
  const { hash } = useLocation(); // destructure hash from location

  const [answers, setAnswers] = useState(() =>
    Questions.map((_, index) => sessionStorage.getItem(`question-${index}-input`) || '')
  );

  useEffect(() => {
    if (hash === '#solve-password' && !scrollToPassword) {
      // Scroll to the Password section
      passwordRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setScrollToPassword(true);
    }
  }, [hash, scrollToPassword]);

  return (
    <>
      <section id="all-questions" className="flex flex-col justify-between items-center">
        <div className="questions w-full flex flex-col h-screen py-6 gap-2">
          <h1 className="text-sm italic">{t('introToAllQs')}</h1>
          {Questions.map((question) => (
            <Link to={`/question/${question.id}`} key={question.id}>
              <div
                className="py-2 border-b-4 rounded flex items-center text-lg justify-between"
                id={question.id}
                style={{ borderColor: question.bg_border_code }}
              >
                <div className="flex items-center flex-wrap px-2">
                  {/* Display answer if available, otherwise display Question X */}
                  {answers[question.id] ? (
                    answers[question.id].split('').map((char, index) => (
                      <AnswerBox key={index} backgroundColor={question.bg_clr_code} borderColor={question.bg_border_code}>
                        <span className="font-bold">{char.toUpperCase()}</span>
                      </AnswerBox>
                    ))
                  ) : (
                    <span className="font-bold">{`${t('question')} ${question.id + 1}`}</span>
                  )}
                </div>
                <MdOutlineKeyboardDoubleArrowRight className="text-amber-800 shrink-0" />
              </div>
            </Link>
          ))}
          <PrimaryButton
            text={t('solvePwd')}
            onClick={() => passwordRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' })}
            style={'mt-4'}
          />
        </div>
        <div className="h-screen py-6" ref={passwordRef}>
          <Password />
        </div>
      </section>
    </>
  );
};
