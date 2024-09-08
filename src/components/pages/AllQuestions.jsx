import { useEffect, useRef, useState } from 'react';
import { Questions } from '../../assets/questions.js';
import { Link, useLocation } from 'react-router-dom';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import Password from './Password.jsx';
import { useTranslation } from 'react-i18next';
import { PrimaryButton } from './PrimaryButton.jsx';
import { DisplayOnlyBox } from './InputBoxes.jsx';


export const AllQuestions = () => {
  // 't' function from useTranslation dynamically renders text based on selected language
  const { t } = useTranslation();
  const passwordRef = useRef(null);
  const [scrollToPassword, setScrollToPassword] = useState(false);
  const { hash } = useLocation(); // destructure hash from location

  const [answers] = useState(() =>
    Questions.map((_, index) => {
      const savedAnswer = sessionStorage.getItem(`question-${index}-input`);
      if (savedAnswer) {
        try {
          const parsedAnswer = JSON.parse(savedAnswer);
          return Array.isArray(parsedAnswer) ? parsedAnswer : parsedAnswer.split('');
        } catch (error) {
          console.error('Error parsing saved answer:', error);
          return [];
        }
      }
      return [];
    })
  );

  useEffect(() => {
    if (hash === '#solve-password' && !scrollToPassword) {
      passwordRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setScrollToPassword(true);
    }
  }, [hash, scrollToPassword]);

  return (
    <>
      <section id="all-questions" className="space-y-6 md:space-y-8 lg:space-y-10">
        <div className="questions flex flex-col h-screen py-6 gap-2 justify-center">
          <h1 className="italic">{t('introToAllQs')}</h1>
          <div className="questions-list space-y-4 md:space-y-6"></div>
          {Questions.map((question) => (
            <Link to={`/question/${question.id}`} key={question.id}>
              <div
                className="py-2 border-b-4 rounded flex items-center text-lg justify-between"
                id={question.id}
                style={{ borderColor: question.bg_border_code }}
              >
                <div className="flex items-center flex-wrap px-2">
                  {answers[question.id] && answers[question.id].length > 0 ? (
                    answers[question.id].map((char, index) => {
                      if (char === '\n') {
                        // Render a new line instead of an input box for the line break character
                        return <div key={index} className="w-full"></div>
                      }
                      return (
                        <DisplayOnlyBox
                          key={index}
                          backgroundColor={question.bg_clr_code}
                          borderColor={question.bg_border_code}
                        >
                          <span
                            className="font-bold">
                            {char.toUpperCase()}
                          </span>
                        </DisplayOnlyBox>
                      );
                    })
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
            className="w-full md:w-auto md:px-8 my-4"
          />
        </div>
        <div className="h-screen py-6" ref={passwordRef}>
          <Password />
        </div>
      </section>
    </>
  );
};