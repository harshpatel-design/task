const optionsContainer = document.getElementById("options");
const marksElement = document.getElementById("marks");
const questionElement = document.getElementById("question");
const questionNumber = document.getElementById("progress");
const sidebarList = document.getElementById("sidebar-list");
const quizBox = document.querySelector(".container");
const startBox = document.querySelector(".start-box");

const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");

const resultBox = document.getElementById("result");
const finalScore = document.getElementById("final-score");
const report = document.getElementById("report");

let currentQuestionIndex = 0;
let marks = 0;
let wrongCount = 0;

const quizData = [
  {
    question: "What is the capital of India?",
    options: ["Mumbai", "Delhi", "Chennai", "Kolkata"],
    answer: "Delhi",
  },
  {
    question: "Which language runs in browser?",
    options: ["Python", "Java", "C++", "JavaScript"],
    answer: "JavaScript",
  },
  {
    question: "HTML stands for?",
    options: ["Hyper Text Markup Language", "High Text", "Hyper Tool", "None"],
    answer: "Hyper Text Markup Language",
  },
  {
    question: "React developed by?",
    options: ["Google", "Facebook", "Amazon", "Microsoft"],
    answer: "Facebook",
  },
  {
    question: "Paragraph tag?",
    options: ["<h1>", "<p>", "<div>", "<span>"],
    answer: "<p>",
  },
  {
    question: "Not JS datatype?",
    options: ["String", "Boolean", "Float", "Undefined"],
    answer: "Float",
  },
  {
    question: "CSS color property?",
    options: ["text-color", "font-color", "color", "bg"],
    answer: "color",
  },
  {
    question: "who is not a Variable keyword?",
    options: ["var", "let", "const", "All"],
    answer: "All",
  },
  {
    question: "Console print?",
    options: ["log()", "console.log()", "print()", "echo()"],
    answer: "console.log()",
  },
  {
    question: "JS comment?",
    options: ["//", "#", "<!-- -->", "**"],
    answer: "//",
  },
];

let userAnswers = new Array(quizData.length).fill(null);

quizData.forEach((_, i) => {
  const li = document.createElement("li");
  li.innerText = i + 1;

  li.onclick = () => {
    currentQuestionIndex = i;
    loadQuestion();
  };

  sidebarList.appendChild(li);
});

function loadQuestion() {
  const q = quizData[currentQuestionIndex];

  questionElement.innerText = q.question;
  questionNumber.innerText = currentQuestionIndex + 1;

  optionsContainer.innerHTML = "";

  let number = document.querySelectorAll(".sidebar li");

  number.forEach((e) => e.classList.remove("active"));
  sidebarList.children[currentQuestionIndex].classList.add("active");

  q.options.forEach((e) => {
    const li = document.createElement("li");
    li.innerText = e;

    li.onclick = () => handleAnswer(e);

    optionsContainer.appendChild(li);
  });

  if (userAnswers[currentQuestionIndex]) {
    showAnswer(userAnswers[currentQuestionIndex]);
  }
  checkAllAnswered();
}

function handleAnswer(selected) {
  console.log("selected", selected);

  userAnswers[currentQuestionIndex] = selected;
  showAnswer(selected);
  checkAllAnswered();
}

function showAnswer(selected) {
  const q = quizData[currentQuestionIndex];
  const allOptions = optionsContainer.querySelectorAll("li");

  allOptions.forEach((item) => {
    item.style.pointerEvents = "none";

    if (item.innerText === q.answer) {
      item.style.background = "green";
      item.style.color = "white";
    }

    if (item.innerText === selected && selected !== q.answer) {
      item.style.background = "red";
      item.style.color = "white";
    }
  });
}

nextBtn.onclick = () => {
  if (currentQuestionIndex < quizData.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  }
};

prevBtn.onclick = () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion();
  }
};

submitBtn.onclick = () => {
  calculateResult();
};

function calculateResult() {
  let marks = 0;
  let penalty = 0;

  report.innerHTML = "";

  quizData.forEach((q, i) => {
    
    const userAns = userAnswers[i];
    if (userAns === q.answer) {
      marks++;
    } 
    else {
      if (i < 5 && userAns !== null) {
        penalty += 0.5;
      }
    }

    const p = document.createElement("p");
    p.classList.add("box");
    p.innerText = `Q${i + 1}: Your: ${userAns || "Not Answered"} | Correct: ${q.answer}`;
    report.appendChild(p);

  });

  let finalMarks = marks - penalty;

  finalScore.innerText = `Final Score: ${finalMarks} / ${quizData.length}`;

  document.querySelector(".quiz-box").style.display = "none";
  document.querySelector(".sidebar").style.display = "none";
  resultBox.style.display = "block";
  quizBox.classList.add("none");

  const start = document.createElement("button");
    start.innerText = "Start Again";
    startBox.appendChild(start);
    start.onclick = () => {
      location.reload();
      quizBox.classList.remove("none");
    }
}

loadQuestion();

function checkAllAnswered() {
  const allAnswered = userAnswers.every((ans) => ans !== null);

  if (allAnswered) {
    submitBtn.style.display = "inline-block";
  } else {
    submitBtn.style.display = "none";
  }
}
