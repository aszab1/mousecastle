/* eslint-disable react/prop-types */
import { useTranslation } from 'react-i18next';
import { FaAnglesLeft, FaAnglesRight } from 'react-icons/fa6';
import { PiListBulletsFill } from 'react-icons/pi';
import { useNavigate } from 'react-router';
import { Questions } from '../../assets/questions.js';

export const QuestionNavigation = ({ questionId, question }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <div className="buttons flex w-full justify-around text-sm font-bold" style={{ color: question.bg_border_code }}>
        {questionId >= 1 && (
          <div className="previous-question flex flex-col items-center gap-1">
            <FaAnglesLeft className="size-12" onClick={() => navigate(`/question/${questionId - 1}`)} />
            <p>{t('back')}</p>
          </div>
        )}
        <div className="go-to-all-questions flex flex-col items-center gap-1">
          <PiListBulletsFill className="size-12" onClick={() => navigate('/questions')} />
          <p>{t('home')}</p>
        </div>
        {questionId < Questions.length - 1 && (
          <div className="next-question flex flex-col items-center gap-1">
            <FaAnglesRight className="size-12" onClick={() => navigate(`/question/${questionId + 1}`)} />
            <p>{t('next')}</p>
          </div>
        )}
      </div>
    </>
  );
};
