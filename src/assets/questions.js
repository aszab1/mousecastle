import Image1 from './images/pic3.jpeg';
import Image2 from './images/mates-mouses.jpg';
import Image3 from './images/writing-mouse1.jpg';
import Image4 from './images/mouse1-nobg.png';
import Image5 from './images/welcome-mouse-pic.jpg';
import Image6 from './images/pic4.jpeg';
import Image7 from './images/mouse1-withbg.jpg';

export const Questions = [
  {
    id: 0,
    img_url: Image1,
    bg_border_code: '#fbcf3d',
    bg_clr_code: '#feffd6',
    eng_question:
      "Baron Alexander Castlehouse has found some lovely wall paintings in the entrance hall. What is the part of the angel's foot that is closest to you?",
    eng_answer: 'BIG TOE',
    hun_question: 'Itt az elötérben Báró Kastély-Hazy Sándor barátom fedezte fel ezeket a szép,',
    hun_answer: 'LÁBUJJ',
    ger_question: '',
    ger_answer: '',
  },
  {
    id: 1,
    img_url: Image2,
    bg_border_code: '#51367a',
    bg_clr_code: '#ebdbff',
    eng_question:
      "When I was little, Minka grandma told me a story about how the Count built this big beautiful palace. At first, he built just a little bit. As time went on and the Count had more money he added on and on to the Palace. Now we can all fit really well! What is the Count's family name?",
    eng_answer: 'GRASSALKOVICH',
    hun_question: '',
    hun_answer: 'ANTAL',
    ger_question: '',
    ger_answer: '',
  },
  {
    id: 2,
    img_url: Image3,
    bg_border_code: '#2f712f',
    bg_clr_code: '#e7ffa7',
    eng_question:
      'Here in the Palace, we have had many guests. King I. Franz Joseph spent lots of time here but he usually always worked. I found that very boring! Here on the picture what I am doing?',
    eng_answer: 'YAWNING',
    hun_question: '',
    hun_answer: 'ÁSITOK',
    ger_question: '',
    ger_answer: '',
  },
  {
    id: 3,
    img_url: Image4,
    bg_border_code: '#cc4241',
    bg_clr_code: '#ffc5b3',
    eng_question:
      'If you would have looked out of this window 150 years ago then you would have seen a gorgeous lake. They named the lake after the animals that swam on it. What is the name of this animal?',
    eng_answer: 'SWAN LAKE',
    hun_question: '',
    hun_answer: 'HATTYÚS TÓ',
    ger_question: '',
    ger_answer: '',
  },
  {
    id: 4,
    img_url: Image5,
    bg_border_code: '#a31a73',
    bg_clr_code: '#ff75b0',
    eng_question:
      'Queen Elizabeth had beautiful long hair. It took hours to brush everyday. While her maids brushed her hair she would study languages, Greek and Ancient Greek. Here, in Gödöll Queen Elisabeth spoke this language with her youngest daughter, Marie Valerie:',
    eng_answer: 'HUNGARIAN',
    hun_question: '',
    hun_answer: 'MAGYARUL',
    ger_question: '',
    ger_answer: '',
  },
  {
    id: 5,
    img_url: Image6,
    bg_border_code: '#34a51e',
    bg_clr_code: '#b9ff8e',
    eng_question: 'Queen Elizabeth was very fit because she loved sports. Her favorite was...',
    eng_answer: 'HORSE RIDING',
    hun_question: '',
    hun_answer: 'LOVAGLÁS',
    ger_question: '',
    ger_answer: '',
  },
  {
    id: 6,
    img_url: Image7,
    bg_border_code: '#077bae',
    bg_clr_code: '#81d8ff',
    eng_question:
      "The royal couple's youngest daughter, Marie Valerie, lived in this beautiful powder blue suite. Princess Marie Valerie had a very strict schedule, she had a lot to study. My friend Count Chester Gorgonzola was often inspired by the Princess. What will the Count do when he goes home?",
    eng_answer: 'PAINT',
    hun_question: '',
    hun_answer: 'FESTENI',
    ger_question: '',
    ger_answer: '',
  },
];

export const Passwords = [
  {
    lang: 'en',
    pass: 'BUTTER COOKIE',
    codes: [
      {codeLocation: '1/1', colorCode: '#feffd6', borderColorCode: '#fbcf3d'},
      {codeLocation: '5/2', colorCode: '#ff75b0', borderColorCode: '#a31a73'},
      {codeLocation: '1/4', colorCode: '#feffd6', borderColorCode: '#fbcf3d'},
      {codeLocation: '7/5', colorCode: '#81d8ff', borderColorCode: '#077bae'},
      {codeLocation: '1/6', colorCode: '#feffd6', borderColorCode: '#fbcf3d'},
      {codeLocation: '6/3', colorCode: '#b9ff8e', borderColorCode: '#34a51e'},
      {codeLocation: '2/12', colorCode: '#ebdbff', borderColorCode: '#51367a'},
      {codeLocation: '6/2', colorCode: '#b9ff8e', borderColorCode: '#34a51e'},
      {codeLocation: '2/9', colorCode: '#ebdbff', borderColorCode: '#51367a'},
      {codeLocation: '4/7', colorCode: '#ffc5b3', borderColorCode: '#cc4241'},
      {codeLocation: '3/5', colorCode: '#e7ffa7', borderColorCode: '#2f712f'},
      {codeLocation: '6/5', colorCode: '#b9ff8e', borderColorCode: '#34a51e'},
    ]
  },
  {
    lang: 'hun',
    pass: 'MÁKOS BEJGLI',
    codes: [
      {codeLocation: '5/1', colorCode: '#ff75b0', borderColorCode: '#a31a73'},
      {codeLocation: '6/7', colorCode: '#b9ff8e', borderColorCode: '#34a51e'},
      {codeLocation: '3/6', colorCode: '#e7ffa7', borderColorCode: '#2f712f'},
      {codeLocation: '3/5', colorCode: '#e7ffa7', borderColorCode: '#2f712f'},
      {codeLocation: '4/7', colorCode: '#ffc5b3', borderColorCode: '#cc4241'},
      {codeLocation: '1/3', colorCode: '#feffd6', borderColorCode: '#fbcf3d'},
      {codeLocation: '7/2', colorCode: '#81d8ff', borderColorCode: '#077bae'},
      {codeLocation: '1/6', colorCode: '#feffd6', borderColorCode: '#fbcf3d'},
      {codeLocation: '6/5', colorCode: '#b9ff8e', borderColorCode: '#34a51e'},
      {codeLocation: '2/5', colorCode: '#ebdbff', borderColorCode: '#51367a'},
      {codeLocation: '7/7', colorCode: '#81d8ff', borderColorCode: '#077bae'},
    ]
  },
  {
    lang: 'ger',
    pass: '',
    codes: []
  }
]
