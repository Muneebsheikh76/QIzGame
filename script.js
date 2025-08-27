const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question");
const answersContainer = document.getElementById("answer-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress"); 
const quizQuestions = [
  {
    question: "Who is known as the 'Founder of Pakistan'?",
    answers: [
      { text: "Allama Iqbal", correct: false },
      { text: "Liaquat Ali Khan", correct: false },
      { text: "Quaid-e-Azam Muhammad Ali Jinnah", correct: true },
      { text: "Sir Syed Ahmed Khan", correct: false },
    ],
  },
  {
    question: "Pakistan came into being on:",
    answers: [
      { text: "15th August 1947", correct: false },
      { text: "14th August 1947", correct: true },
      { text: "23rd March 1940", correct: false },
      { text: "3rd June 1947", correct: false },
    ],
  },
  {
    question: "The Lahore Resolution was passed in:",
    answers: [
      { text: "1930", correct: false },
      { text: "1940", correct: true },
      { text: "1947", correct: false },
      { text: "1956", correct: false },
    ],
  },
  {
    question: "Who was the first Prime Minister of Pakistan?",
    answers: [
      { text: "Quaid-e-Azam", correct: false },
      { text: "Khawaja Nazimuddin", correct: false },
      { text: "Liaquat Ali Khan", correct: true },
      { text: "Ayub Khan", correct: false },
    ],
  },
  {
    question: "The first constitution of Pakistan was enforced in:",
    answers: [
      { text: "1956", correct: true },
      { text: "1962", correct: false },
      { text: "1973", correct: false },
      { text: "1949", correct: false },
    ],
  },
  {
    question: "The capital of Pakistan was shifted from Karachi to Islamabad in:",
    answers: [
      { text: "1958", correct: false },
      { text: "1967", correct: false },
      { text: "1960", correct: true },
      { text: "1972", correct: false },
    ],
  },
  {
    question: "Who was the first President of Pakistan?",
    answers: [
      { text: "Iskander Mirza", correct: true },
      { text: "Ayub Khan", correct: false },
      { text: "Liaquat Ali Khan", correct: false },
      { text: "Quaid-e-Azam", correct: false },
    ],
  },
];
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  if (answersDisabled) return;
  answersDisabled = true;
  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";
  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}
