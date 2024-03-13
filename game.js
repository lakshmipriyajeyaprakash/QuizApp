const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("option-text"));
const progressText = document.getElementById("progress_text");
const scoreCountDiv = document.getElementById("score");
const progressbarfull = document.getElementById("progressbar_full");
const loader = document.getElementById("loader");
const game = document.getElementById("game");
const correctAnswer = document.getElementById("correctAnswer");
console.log(question);
let currentQuestion = {};
let selectAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];

fetch(
  "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple"
)
  .then((res) => {
    return res.json();
  })
  .then((loadedQuestions) => {
    console.log(loadedQuestions.results);
    questions = loadedQuestions.results.map((loadedQuestion) => {
      const formattedQuestion = {
        question: loadedQuestion.question,
      };

      const answerChoices = [...loadedQuestion.incorrect_answers];
      formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
      answerChoices.splice(
        formattedQuestion.answer - 1,
        0,
        loadedQuestion.correct_answer
      );

      answerChoices.forEach((choice, index) => {
        formattedQuestion["choice" + (index + 1)] = choice;
      });
      console.log(formattedQuestion);
      return formattedQuestion;
    });
    startGame();
  })
  .catch((err) => console.log(err));
const CORRECT_SCORE = 10;
const MAX_QUESTIONS = 10;

const startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
  game.classList.remove("hidden");
  loader.classList.add("hidden");
};

const getNewQuestion = () => {
  if (availableQuestions === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("MaxScore", score);
    // End page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  // On Increasing question counter update Progress bar
  progressbarfull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;
  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });
  availableQuestions.splice(questionIndex, 1);
  selectAnswers = true;
};
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!selectAnswers) return;

    selectAnswers = false;
    const selectedChoice = e.target;
    console.log(selectedChoice);
    const selectedAnswer = selectedChoice.dataset["number"];
    console.log(selectedAnswer);
    console.log(currentQuestion.answer);
    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    if (classToApply === "correct") {
      IncrementScore(CORRECT_SCORE);
    } else {
      if ((selectAnswers = true)) {
        correctAnswer.innerText = `Correct Answer: ${displayAnswer(
          currentQuestion.answer
        )}`;
      }
    }
    console.log(selectedAnswer == currentQuestion.answer);
    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      correctAnswer.innerText = "";
      getNewQuestion();
    }, 1000);
  });
});

const IncrementScore = (num) => {
  score += num;
  scoreCountDiv.innerText = score;
};

const displayAnswer = (answer) => {
  switch (answer) {
    case 1: {
      return "A";
    }
    case 2: {
      return "B";
    }
    case 3: {
      return "C";
    }
    default: {
      return "D";
    }
  }
};
