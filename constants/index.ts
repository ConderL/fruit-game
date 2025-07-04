export const fruitsData = [
  {
    src: '/img/form7.png',
    audioSrc: '/audio/fruits/7_l.mp3',
    color: '#2de43f',
    index: 0,
    score: 10,
    point: 6,
  },
  {
    src: '/img/form5.png',
    audioSrc: '/audio/fruits/5_l.mp3',
    color: '#f038c4',
    index: 1,
    score: 20,
    point: 4,
  },
  {
    src: '/img/form1.png',
    audioSrc: '/audio/fruits/1_l.mp3',
    color: '#fd9a38',
    index: 2,
    score: 120,
    point: 0,
  },
  {
    src: '/img/form1-2.png',
    audioSrc: '/audio/fruits/1_s.mp3',
    color: '#2de43f',
    index: 3,
    score: 50,
    point: 0,
  },
  {
    src: '/img/form8.png',
    audioSrc: '/audio/fruits/8_l.mp3',
    color: '#f038c4',
    index: 4,
    score: 5,
    point: 7,
  },
  {
    src: '/img/form8-2.png',
    audioSrc: '/audio/fruits/8_s.mp3',
    color: '#fd9a38',
    index: 5,
    score: 2,
    point: 7,
  },
  {
    src: '/img/form6.png',
    audioSrc: '/audio/fruits/6_l.mp3',
    color: '#2de43f',
    index: 6,
    score: 15,
    point: 5,
  },
  {
    src: '/img/form5-2.png',
    audioSrc: '/audio/fruits/5_s.mp3',
    color: '#f038c4',
    index: 23,
    score: 2,
    point: 4,
  },
  {},
  {},
  {},
  {},
  {},
  {
    src: '/img/form4.png',
    audioSrc: '/audio/fruits/4_l.mp3',
    color: '#f038c4',
    index: 7,
    score: 20,
    point: 3,
  },
  {
    src: '/img/form8.png',
    audioSrc: '/audio/fruits/8_l.mp3',
    color: '#fd9a38',
    index: 22,
    score: 5,
    point: 7,
  },
  {},
  {},
  {},
  {},
  {},
  {
    src: '/img/form4-2.png',
    audioSrc: '/audio/fruits/4_s.mp3',
    color: '#fd9a38',
    index: 8,
    score: 2,
    point: 3,
  },
  {
    src: '/img/forms.png',
    color: '#dd1f1f',
    index: 21,
  },
  {},
  {},
  {},
  {},
  {},
  {
    src: '/img/forms.png',
    color: '#dd1f1f',
    index: 9,
  },
  {
    src: '/img/form3-2.png',
    audioSrc: '/audio/fruits/3_s.mp3',
    color: '#2de43f',
    index: 20,
    score: 2,
    point: 2,
  },
  {},
  {},
  {},
  {},
  {},
  {
    src: '/img/form8.png',
    audioSrc: '/audio/fruits/8_l.mp3',
    color: '#2de43f',
    index: 10,
    score: 5,
    point: 7,
  },
  {
    src: '/img/form3.png',
    audioSrc: '/audio/fruits/3_l.mp3',
    color: '#f038c4',
    index: 19,
    score: 30,
    point: 2,
  },
  {},
  {},
  {},
  {},
  {},
  {
    src: '/img/form7-2.png',
    audioSrc: '/audio/fruits/7_s.mp3',
    color: '#f038c4',
    index: 11,
    score: 10,
    point: 6,
  },
  {
    src: '/img/form6.png',
    audioSrc: '/audio/fruits/6_l.mp3',
    color: '#fd9a38',
    index: 18,
    score: 15,
    point: 5,
  },
  {
    src: '/img/form6-2.png',
    audioSrc: '/audio/fruits/6_s.mp3',
    color: '#f038c4',
    index: 17,
    score: 2,
    point: 5,
  },
  {
    src: '/img/form8.png',
    audioSrc: '/audio/fruits/8_l.mp3',
    color: '#2de43f',
    index: 16,
    score: 5,
    point: 7,
  },
  {
    src: '/img/form2.png',
    audioSrc: '/audio/fruits/2_l.mp3',
    color: '#fd9a38',
    index: 15,
    score: 40,
    point: 1,
  },
  {
    src: '/img/form2-2.png',
    audioSrc: '/audio/fruits/2_s.mp3',
    color: '#2de43f',
    index: 14,
    score: 2,
    point: 1,
  },
  {
    src: '/img/form5.png',
    audioSrc: '/audio/fruits/5_l.mp3',
    color: '#f038c4',
    index: 13,
    score: 20,
    point: 4,
  },
  {
    src: '/img/form7.png',
    audioSrc: '/audio/fruits/7_l.mp3',
    color: '#fd9a38',
    index: 12,
    score: 10,
    point: 6,
  },
]

export const sortedFruitsData = fruitsData
  .filter((item) => JSON.stringify(item) !== '{}')
  // @ts-ignore
  .sort((a, b) => a.index - b.index)

export const lowMelodys = [
  '/audio/piano/C2.mp3',
  '/audio/piano/D2.mp3',
  '/audio/piano/E2.mp3',
  '/audio/piano/F2.mp3',
  '/audio/piano/G2.mp3',
  '/audio/piano/A2.mp3',
  '/audio/piano/B2.mp3',
  '/audio/piano/C3.mp3',
  '/audio/piano/D3.mp3',
  '/audio/piano/E3.mp3',
  '/audio/piano/F3.mp3',
  '/audio/piano/G3.mp3',
  '/audio/piano/A3.mp3',
  '/audio/piano/B3.mp3',
].reverse()
