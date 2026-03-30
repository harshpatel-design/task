const optionsContainer = document.querySelector("ul");
const answerButton = document.getElementById("answer-btn");
const marksElement = document.getElementById("marks");
const questionElement = document.getElementById("question");
const questionNumber = document.getElementById("progress");

let currentQuestionIndex = 0;
let marks = 0;

const quizData = [
  {
    question: "What is the capital of India?",
    options: ["Mumbai", "Delhi", "Chennai", "Kolkata"],
    answer: "Delhi",
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Python", "Java", "C++", "JavaScript"],
    answer: "JavaScript",
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyper Tool Multi Language",
      "Hyperlinks Text Mark Language",
    ],
    answer: "Hyper Text Markup Language",
  },
  {
    question: "Which company developed React?",
    options: ["Google", "Facebook", "Microsoft", "Amazon"],
    answer: "Facebook",
  },
  {
    question: "Which tag is used for a paragraph in HTML?",
    options: ["<h1>", "p", "<div>", "<span>"],
    answer: "<p>",
  },
  {
    question: "Which is not a JavaScript data type?",
    options: ["String", "Boolean", "Float", "Undefined"],
    answer: "Float",
  },
  {
    question: "Which CSS property is used for text color?",
    options: ["font-color", "text-color", "color", "bgcolor"],
    answer: "color",
  },
  {
    question: "Which keyword is used to declare a variable in JS?",
    options: ["var", "let", "const", "All of these"],
    answer: "All of these",
  },
  {
    question: "Which method is used to print in console?",
    options: ["console.log()", "print()", "log()", "echo()"],
    answer: "console.log()",
  },
  {
    question: "Which symbol is used for comments in JS?",
    options: ["//", "<!-- -->", "#", "**"],
    answer: "//",
  },
];

function loadQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];

  questionElement.innerHTML = currentQuestion.question;
  questionNumber.textContent = currentQuestionIndex + 1;

  optionsContainer.innerHTML = "";

  currentQuestion.options.forEach((v) => {
    const li = document.createElement("li");
    li.innerHTML = `
                <input type="radio" name="option" value="${v}">
                ${v}
        `;

    optionsContainer.appendChild(li);
  });
}

loadQuestion();

answerButton.addEventListener("click", () => {
  const selectedOption = document.querySelector('input[name="option"]:checked');
  
  if (!selectedOption) {
    alert("Please select an option!");
    return;
  }

  const answer = selectedOption.value;
  const currentQuestion = quizData[currentQuestionIndex];
  if (answer === currentQuestion.answer) {
    marks++;
    marksElement.textContent = marks;
  } else {
    alert("Wrong answer! ans is :" + currentQuestion.answer);
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    alert(`Quiz completed! Your score: ${marks}/${quizData.length}`);
    currentQuestionIndex = 0;
    marks = 0;
    marksElement.textContent = marks;
    loadQuestion();
  }
});
