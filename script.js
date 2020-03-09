const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'The condition of the Earth’s atmosphere at any given time and place is called _______.',
    answers: [
      { text: 'Mood', correct: false },
      { text: 'Weather', correct: true },
      { text: 'Temperature', correct: false },
      { text: 'Pressure', correct: false }
    ]
  },
  {
    question: 'The _______ is the temperature of atmosphere below which water droplets begin to condense.',
    answers: [
      { text: 'Dew Point', correct: true },
      { text: 'Condensory Temperature', correct: false },
      { text: 'Water Form Constant', correct: false },
      { text: 'Weather', correct: false }
    ]
  },
  {
    question: 'The ratio of the amount of water the air does hold to the amount of water the air can hold at its current temperature is it’s _______.',
    answers: [
      { text: 'Precipitation', correct: false },
      { text: 'Cloud Density', correct: false },
      { text: 'Relative Humidity', correct: true },
      { text: 'Dew Point', correct: false }
    ]
  },
  {
    question: '_______ is an indication of the amount of thermal energy in the air.',
    answers: [
      { text: 'Wind Chill', correct: false },
      { text: 'Humidity', correct: false },
      { text: 'Heat', correct: false },
      { text: 'Temperature', correct: true }
    ]
  },
  {
    question: 'Microscopic particles in the air that attract water molecules to condense around them are known as _______.',
    answers: [
      { text: 'Precipitation Point', correct: false },
      { text: 'Condensation Nuclei', correct: true },
      { text: 'Dew Particle', correct: false },
      { text: 'Cumulonimbus', correct: false }
    ]
  },
]